const HeritageSite = require("../models/HeritageSite");


//list every active heritage sites
exports.getAllSites = async (req, res) => {
    try {
        const sites = await HeritageSite.find({ isActive: true });

        console.log("Total active heritage sites:", sites.length);
        console.log(
            "Slugs:",
            sites.map((site) => site.slug)
        );

        res.status(200).json({
            success: true,
            count: sites.length,
            sites,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
//gett single site by slug
exports.getSiteBySlug = async (req,res) => {
    try{
        const { slug } = req.params;
        const site = await HeritageSite.findOne({
            slug,
            isActive:true
        });
        if(!site){
            return res.status(404).json({
                success: false,
                message:"Site not found"
            });
        }
        res.status(200).json({
            success: true,
            site,
        });
    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//FEATURE 1 — resolve a scanned QR code to a heritage place.
//
//The scanner is deliberately "dumb": it decodes whatever text is on the QR
//and hands it here. This resolver accepts a qrId ("HL-001"), a legacy code
//prefix ("BB") or a slug ("bagh-bhairav"), so old printed QR codes keep
//working alongside the new ones. Adding HL-026 later needs no frontend change.
exports.getSiteByQrId = async (req, res) => {
    try {
        const raw = (req.params.qrId || "").trim();

        if (!raw) {
            return res.status(400).json({
                success: false,
                message: "This QR code is not a valid HeritageLink QR code.",
            });
        }

        const upper = raw.toUpperCase();
        const lower = raw.toLowerCase();

        // Look the place up without caring which identifier was scanned.
        const site = await HeritageSite.findOne({
            $or: [
                { qrId: upper },
                { codePrefix: upper },
                { slug: lower },
            ],
        });

        if (!site) {
            return res.status(404).json({
                success: false,
                code: "INVALID_QR",
                message: "This QR code is not a valid HeritageLink QR code.",
            });
        }

        // The record exists but has been deactivated by an admin — that is a
        // different situation from a QR code we have never heard of.
        if (site.isActive === false) {
            return res.status(410).json({
                success: false,
                code: "INACTIVE_HERITAGE",
                message: "This HeritageLink QR code is no longer available.",
            });
        }

        res.status(200).json({
            success: true,
            site,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//create a new heritage site
//bagh bhairav into the database

exports.createSite = async(req,res) => {
    try{
        const site = await HeritageSite.create(req.body);

        res.status(201).json({
            success: true,
            site,
        });
    }catch (error){
        if(error.code === 11000){
            return res.status(400).json({
                success: false,
                message:"Asite with the slug already exists.",
            });
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};