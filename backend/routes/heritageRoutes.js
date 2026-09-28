const express = require("express");
const router = express.Router();

const {
    getAllSites,
    getSiteBySlug,
    getSiteByQrId,
    createSite,
} = require("../controller/heritageController");

router.get("/", getAllSites);
router.post("/", createSite);

// IMPORTANT: this must be declared BEFORE "/:slug", otherwise Express would
// treat the literal word "qr" as a slug and never reach the QR resolver.
router.get("/qr/:qrId", getSiteByQrId);

router.get("/:slug", getSiteBySlug);

module.exports = router;
