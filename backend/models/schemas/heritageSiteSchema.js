const mongoose = require("mongoose");

const heritageSiteSchema = new mongoose.Schema(
  {
    // Basic information
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    codePrefix: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    // FEATURE 1 — the ID printed on the physical HeritageLink QR code
    // e.g. "HL-001"
    qrId: {
      type: String,
      unique: true,
      sparse: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    tagline: {
      type: String,
      default: "",
    },

    locationLabel: {
      type: String,
      default: "",
    },

    // Hero Section
    heroImage: {
      type: String,
      default: "",
    },

    // History
    history: {
      type: String,
      default: "",
    },

    // Multi-chapter story used by the premium "History" walkthrough
    chapters: [
      {
        title: {
          type: String,
          default: "",
        },

        heading: {
          type: String,
          default: "",
        },

        content: {
          type: String,
          default: "",
        },

        timeline: [
          {
            year: {
              type: String,
              default: "",
            },

            title: {
              type: String,
              default: "",
            },
          },
        ],
      },
    ],

    // Hidden story
    hiddenStory: {
      type: String,
      default: "",
    },

    // Audio Guide
    audioTitle: {
      type: String,
      default: "",
    },

    audioGuide: {
      type: String,
      default: "",
    },

    // Video
    video: {
      type: String,
      default: "",
    },

    // Gallery Images
    gallery: [
      {
        type: String,
      },
    ],

    // ARTISAN INFORMATION
  
    artisan: {
      name: {
        type: String,
        default: "",
      },

      role: {
        type: String,
        default: "",
      },

      location: {
        type: String,
        default: "",
      },

      image: {
        type: String,
        default: "",
      },

      bio: {
        type: String,
        default: "",
      },

      // Artisan email
      email: {
        type: String,
        default: "",
      },

      // Artisan phone number
      phone: {
        type: String,
        default: "",
      },

      // Artist themes / focus areas
      themes: {
        type: [String],
        default: [],
      },

      // Artwork price range
      priceRange: {
        type: String,
        default: "",
      },

      // Dedicated artisan interview/process video
      video: {
        type: String,
        default: "",
      },
    },

    // Material / craft tradition
    // shown in the premium "Artwork Details"
    material: {
      type: String,
      default: "",
    },

    craft: {
      type: String,
      default: "",
    },

    // Deeper cultural narrative
    culturalStory: {
      type: String,
      default: "",
    },

    // "How It Is Made" process
    makingProcess: [
      {
        title: {
          type: String,
          default: "",
        },

        description: {
          type: String,
          default: "",
        },

        image: {
          type: String,
          default: "",
        },
      },
    ],

    // Badge Information
    badge: {
      title: {
        type: String,
        default: "",
      },

      image: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },
    },

    // Translations
    translations: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Optional location data
    latitude: Number,

    longitude: Number,

    // Active or hidden
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = heritageSiteSchema;