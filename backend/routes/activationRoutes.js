const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createActivationCode,
  verifyActivationCode,
  claimActivationCode,
} = require("../controller/activationController");

router.post("/", createActivationCode);

// Public: only verifies that the code is valid
router.post("/verify", verifyActivationCode);

// Protected: actually awards badge & marks code used
router.post("/claim", protect, claimActivationCode);

module.exports = router;