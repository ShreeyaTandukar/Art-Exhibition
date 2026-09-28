// Seeds the 25 demo heritage places and gives every one of them a QR ID.
//
// Run: cd backend
// Then: node seed/seedHeritageQR.js
//
// Safe to re-run. Places that already exist (bagh-bhairav, nyatapola and
// their full hand-written content) are NEVER overwritten — the script only
// fills in a qrId for them. Only genuinely new slugs get demo content.

const dotenv = require("dotenv");
const connectDB = require("../config/db");
const HeritageSite = require("../models/HeritageSite");

dotenv.config();

// The single list that drives the demo. Replace the content later — or edit
// it straight in MongoDB — without touching the scanner or badge code.
const places = [
  { slug: "bagh-bhairav", codePrefix: "BB", name: "Bagh Bhairav Temple", locationLabel: "Kirtipur, Nepal" },
  { slug: "umamaheswor-temple", codePrefix: "UM", name: "Umamaheswor Temple", locationLabel: "Kirtipur, Nepal" },
  { slug: "patan-durbar-square", codePrefix: "PDS", name: "Patan Durbar Square", locationLabel: "Patan, Nepal" },
  { slug: "krishna-mandir", codePrefix: "KM", name: "Krishna Mandir", locationLabel: "Patan, Nepal" },
  { slug: "golden-temple", codePrefix: "GT", name: "Golden Temple", locationLabel: "Patan, Nepal" },
  { slug: "kumbeshwar-temple", codePrefix: "KT", name: "Kumbeshwar Temple", locationLabel: "Patan, Nepal" },
  { slug: "bhaktapur-durbar-square", codePrefix: "BDS", name: "Bhaktapur Durbar Square", locationLabel: "Bhaktapur, Nepal" },
  { slug: "nyatapola", codePrefix: "NY", name: "Nyatapola Temple", locationLabel: "Bhaktapur, Nepal" },
  { slug: "dattatreya-square", codePrefix: "DS", name: "Dattatreya Square", locationLabel: "Bhaktapur, Nepal" },
  { slug: "55-window-palace", codePrefix: "WP", name: "55 Window Palace", locationLabel: "Bhaktapur, Nepal" },
  { slug: "changu-narayan", codePrefix: "CN", name: "Changu Narayan Temple", locationLabel: "Changunarayan, Nepal" },
  { slug: "swayambhunath", codePrefix: "SW", name: "Swayambhunath", locationLabel: "Kathmandu, Nepal" },
  { slug: "boudhanath", codePrefix: "BN", name: "Boudhanath", locationLabel: "Kathmandu, Nepal" },
  { slug: "pashupatinath", codePrefix: "PN", name: "Pashupatinath", locationLabel: "Kathmandu, Nepal" },
  { slug: "kathmandu-durbar-square", codePrefix: "KDS", name: "Kathmandu Durbar Square", locationLabel: "Kathmandu, Nepal" },
  { slug: "kasthamandap", codePrefix: "KA", name: "Kasthamandap", locationLabel: "Kathmandu, Nepal" },
  { slug: "taleju-temple", codePrefix: "TT", name: "Taleju Temple", locationLabel: "Kathmandu, Nepal" },
  { slug: "rani-pokhari", codePrefix: "RP", name: "Rani Pokhari", locationLabel: "Kathmandu, Nepal" },
  { slug: "dharahara", codePrefix: "DH", name: "Dharahara", locationLabel: "Kathmandu, Nepal" },
  { slug: "seto-machindranath", codePrefix: "SM", name: "Seto Machindranath Temple", locationLabel: "Kathmandu, Nepal" },
  { slug: "indra-chowk", codePrefix: "IC", name: "Indra Chowk Heritage Area", locationLabel: "Kathmandu, Nepal" },
  { slug: "bungamati", codePrefix: "BU", name: "Bungamati Heritage Area", locationLabel: "Lalitpur, Nepal" },
  { slug: "khokana", codePrefix: "KH", name: "Khokana Heritage Area", locationLabel: "Lalitpur, Nepal" },
  { slug: "rudrayani-temple", codePrefix: "RT", name: "Rudrayani Temple", locationLabel: "Khokana, Nepal" },
  { slug: "kirtipur", codePrefix: "KP", name: "Kirtipur Heritage Area", locationLabel: "Kirtipur, Nepal" },
];

// QR IDs are positional in this list only at seed time. Once written to the
// database they belong to the record, and can be changed there at will.
const qrIdFor = (index) => `HL-${String(index + 1).padStart(3, "0")}`;

// Placeholder content for the new demo records. Real photos, audio, video and
// artisan details get dropped in later; the shape is already correct.
const demoContentFor = (place, qrId) => ({
  slug: place.slug,
  codePrefix: place.codePrefix,
  qrId,
  name: place.name,
  shortDescription: `${place.name} — a living piece of Nepal's cultural heritage.`,
  tagline: "Demo heritage record",
  locationLabel: place.locationLabel,
  heroImage: "/images/image.png",
  history: `Placeholder history for ${place.name}. Replace this text in MongoDB or through a future admin screen — the scanner and badge will pick it up automatically.`,
  hiddenStory: `Placeholder hidden story for ${place.name}.`,
  audioTitle: `${place.name} Audio Guide`,
  audioGuide: "",
  video: "",
  gallery: ["/images/image.png", "/images/gallery.jpg"],
  chapters: [
    {
      title: "Chapter 1",
      heading: "Introduction",
      content: `Placeholder chapter for ${place.name}.`,
    },
  ],
  artisan: {
    name: "",
    role: "",
    location: place.locationLabel,
    image: "",
    bio: "",
    video: "",
  },
  material: "",
  craft: "",
  culturalStory: "",
  makingProcess: [],
  badge: {
    title: `${place.name} Explorer`,
    image: "/images/badge.jpg",
    description: `Awarded for exploring ${place.name}.`,
  },
  translations: {},
  isActive: true,
});

const run = async () => {
  await connectDB();

  let created = 0;
  let tagged = 0;
  let untouched = 0;

  for (let i = 0; i < places.length; i++) {
    const place = places[i];
    const qrId = qrIdFor(i);

    const existing = await HeritageSite.findOne({ slug: place.slug });

    if (existing) {
      // Never clobber real content. Only fill in what is genuinely missing.
      if (existing.qrId === qrId) {
        untouched++;
        console.log(`Unchanged: ${existing.name} (${qrId})`);
        continue;
      }

      existing.qrId = qrId;

      if (existing.isActive === undefined || existing.isActive === null) {
        existing.isActive = true;
      }

      await existing.save();
      tagged++;
      console.log(`QR assigned: ${existing.name} -> ${qrId}`);
      continue;
    }

    await HeritageSite.create(demoContentFor(place, qrId));
    created++;
    console.log(`Created: ${place.name} -> ${qrId}`);
  }

  console.log(
    `\nDone. ${created} created, ${tagged} tagged with a QR ID, ${untouched} already up to date.`
  );
  console.log("Total demo QR codes: HL-001 ... HL-025");

  process.exit(0);
};

run().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
