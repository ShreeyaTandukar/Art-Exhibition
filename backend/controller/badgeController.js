const mongoose = require("mongoose");
const User = require("../models/User");
const HeritageSite = require("../models/HeritageSite");
const { ensureBadgeNumber } = require("../utils/badgeNumber");

// FEATURE 2 — THE PERSISTENT USER BADGE
//
// This controller knows nothing about cameras or QR codes. It only deals
// with "which heritage places does THIS authenticated account own?".
// The user is always taken from req.user (set by the JWT middleware) and
// never from anything the frontend sends, so one account can never read
// or modify another account's badge.

// Fields worth returning for a collected place. Deliberately small — the
// badge page lists names, the full content lives on the heritage page.
const COLLECTED_FIELDS = "name slug qrId locationLabel heroImage badge isActive";

const buildBadgePayload = (user, collectedSites, totalActive) => {
  const collectedCount = collectedSites.length;
  const remaining = Math.max(totalActive - collectedCount, 0);

  return {
    badgeNumber: user.badgeNumber,
    title: user.currentJourney || "Heritage Explorer",
    name: user.name,
    // Nothing here is hardcoded: both numbers are read live, so the moment
    // five more active heritage records exist, "7 / 25" becomes "7 / 30".
    collectedCount,
    totalCount: totalActive,
    remainingCount: remaining,
    percentage:
      totalActive > 0
        ? Math.round((collectedCount / totalActive) * 100)
        : 0,
    collectedHeritage: collectedSites,
  };
};

// GET /api/user/badge
const getMyBadge = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Accounts created before badge numbers existed get one now, once.
    await ensureBadgeNumber(user);

    await user.populate({
      path: "collectedHeritage",
      select: COLLECTED_FIELDS,
    });

    // A place an admin has since deactivated should not inflate progress,
    // because the denominator only counts active places.
    const collectedSites = (user.collectedHeritage || []).filter(
      (site) => site && site.isActive !== false
    );

    const totalActive = await HeritageSite.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      badge: buildBadgePayload(user, collectedSites, totalActive),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /api/user/badge/collect/:heritageId
//
// Idempotent on purpose. Scanning the same place a second or third time
// still succeeds, still opens the content, but the collection is unchanged
// and no duplicate document is ever written.
const collectHeritage = async (req, res) => {
  try {
    const { heritageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(heritageId)) {
      return res.status(400).json({
        success: false,
        message: "This QR code is not a valid HeritageLink QR code.",
      });
    }

    const site = await HeritageSite.findById(heritageId);

    if (!site) {
      return res.status(404).json({
        success: false,
        message: "This HeritageLink QR code is no longer available.",
      });
    }

    if (site.isActive === false) {
      return res.status(410).json({
        success: false,
        message: "This HeritageLink QR code is no longer available.",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await ensureBadgeNumber(user);

    const alreadyCollected = (user.collectedHeritage || []).some(
      (id) => id.toString() === site._id.toString()
    );

    if (!alreadyCollected) {
      user.collectedHeritage.push(site._id);

      // Keep the older passport fields in step so existing UI that reads
      // them (stats, souvenirs) stays correct instead of drifting.
      if (!user.journeys.includes(site.name)) {
        user.journeys.push(site.name);
      }

      const badgeTitle = site.badge?.title || `${site.name} Explorer`;

      if (!user.badges.includes(badgeTitle)) {
        user.badges.push(badgeTitle);
      }

      const souvenir = `${site.name} Souvenir`;

      if (!user.souvenirs.includes(souvenir)) {
        user.souvenirs.push(souvenir);
      }

      // Derived from the real collection rather than incremented blindly,
      // so it can never drift out of sync.
      user.completedSites = user.collectedHeritage.length;

      await user.save();
    }

    await user.populate({
      path: "collectedHeritage",
      select: COLLECTED_FIELDS,
    });

    const collectedSites = (user.collectedHeritage || []).filter(
      (item) => item && item.isActive !== false
    );

    const totalActive = await HeritageSite.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      alreadyCollected,
      // "Already collected" is good news, not an error.
      message: alreadyCollected
        ? "You've already explored this heritage place."
        : `${site.name} added to your Heritage Badge!`,
      heritage: {
        id: site._id,
        name: site.name,
        slug: site.slug,
      },
      badge: buildBadgePayload(user, collectedSites, totalActive),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMyBadge,
  collectHeritage,
};
