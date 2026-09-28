const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getMyBadge,
  collectHeritage,
} = require("../controller/badgeController");

// Both routes are protected: the account is identified by the JWT alone,
// never by a userId sent from the browser.
router.get("/badge", protect, getMyBadge);
router.post("/badge/collect/:heritageId", protect, collectHeritage);

module.exports = router;
