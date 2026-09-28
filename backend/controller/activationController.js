const ActivationCode = require("../models/ActivationCode");
const User = require("../models/User");
const HeritageSite = require("../models/HeritageSite");

// A code's prefix is everything before the first "-", e.g.
// "BB-92731" -> "BB". This is what ties a physical code to a site —
// no manual site-typing, no mismatch possible.
const getPrefixFromCode = (code) => {
  return code.split("-")[0].trim().toUpperCase();
};

const findSiteForCode = async (code) => {
  const prefix = getPrefixFromCode(code);
  return HeritageSite.findOne({ codePrefix: prefix });
};

//create activation code
const createActivationCode = async (req, res) => {
  try {
    const { code, site } = req.body;

    // Sanity-check the prefix actually maps to a real site before
    // creating the code, so a typo gets caught immediately instead
    // of producing a code nobody can ever verify.
    const heritageSite = await findSiteForCode(code);

    if (!heritageSite) {
      return res.status(400).json({
        success: false,
        message: `No heritage site found with prefix "${getPrefixFromCode(
          code
        )}". Add a matching codePrefix to a HeritageSite first.`,
      });
    }

    const activationCode = await ActivationCode.create({
      code,
      site: site || heritageSite.slug,
    });

    res.status(201).json({
      success: true,
      data: activationCode,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//verify Activation code
const verifyActivationCode = async (req, res) => {
  try {
    const { code } = req.body;

    const activationCode = await ActivationCode.findOne({
      code: code?.trim().toUpperCase(),
    });

    if (!activationCode) {
      return res.status(404).json({
        success: false,
        message: "Invalid Activation Code",
      });
    }

    if (activationCode.used) {
      return res.status(400).json({
        success: false,
        message: "This Activation Code has already been used.",
      });
    }

    // The prefix on the code itself tells us the site — always the
    // real, canonical name/slug straight from the database.
    const heritageSite = await findSiteForCode(activationCode.code);

    if (!heritageSite) {
      return res.status(400).json({
        success: false,
        message: `This code references an unknown site ("${getPrefixFromCode(
          activationCode.code
        )}"). Check that a HeritageSite with that codePrefix exists.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Activation code verified.",
      site: heritageSite.name,
      siteSlug: heritageSite.slug,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const claimActivationCode = async (req, res) => {
  try {
    const { code } = req.body;

    const activationCode = await ActivationCode.findOne({
      code: code?.trim().toUpperCase(),
    });

    if (!activationCode) {
      return res.status(404).json({
        success: false,
        message: "Invalid Activation Code",
      });
    }

    if (activationCode.used) {
      return res.status(400).json({
        success: false,
        message: "This Activation Code has already been used.",
      });
    }

    const heritageSite = await findSiteForCode(activationCode.code);

    if (!heritageSite) {
      return res.status(400).json({
        success: false,
        message: `This code references an unknown site ("${getPrefixFromCode(
          activationCode.code
        )}"). Check that a HeritageSite with that codePrefix exists.`,
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // A code always gets consumed once scanned/entered — even if the
    // person already owns this site's badge — so it can't be reused
    // by someone else. But we don't want to duplicate their badge.
    activationCode.used = true;
    await activationCode.save();

    const alreadyOwned = user.journeys.includes(heritageSite.name);

    if (alreadyOwned) {
      return res.status(200).json({
        success: true,
        alreadyOwned: true,
        message: `You've already collected the badge for ${heritageSite.name}! This code has been marked as used.`,
      });
    }

    user.badges.push(heritageSite.badge?.title || `${heritageSite.name} Explorer`);
    user.journeys.push(heritageSite.name);
    user.souvenirs.push(`${heritageSite.name} Souvenir`);
    user.completedSites += 1;

    await user.save();

    res.status(200).json({
      success: true,
      alreadyOwned: false,
      message: `Badge collected for ${heritageSite.name}!`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createActivationCode,
  verifyActivationCode,
  claimActivationCode,
};