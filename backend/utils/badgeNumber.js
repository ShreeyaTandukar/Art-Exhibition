const Counter = require("../models/Counter");

const COUNTER_ID = "badgeNumber";
const PREFIX = "HL";
const PAD = 4;

// Returns the next badge number in the HeritageLink series: HL-0001,
// HL-0002, HL-0003 ...
//
// Generated on the SERVER only, never by the frontend, and never derived
// from an array index — the counter document is the single source of truth,
// so a user's number stays theirs forever even if other users are deleted.
const generateBadgeNumber = async () => {
  const counter = await Counter.findByIdAndUpdate(
    COUNTER_ID,
    { $inc: { seq: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  return `${PREFIX}-${String(counter.seq).padStart(PAD, "0")}`;
};

// Older accounts were created before badge numbers existed. Rather than a
// migration script, we hand them a number the first time we notice one is
// missing, then persist it. After that it never changes again.
const ensureBadgeNumber = async (user) => {
  if (!user) return user;
  if (user.badgeNumber) return user;

  user.badgeNumber = await generateBadgeNumber();
  await user.save();

  return user;
};

module.exports = {
  generateBadgeNumber,
  ensureBadgeNumber,
};
