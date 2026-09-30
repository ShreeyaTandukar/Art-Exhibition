// Seed the exhibition artworks from the provided catalogue images.
//
// Run:
//
// cd backend
// node seed/seedExhibitionArts.js
//
// IMPORTANT:
// This script completely clears the existing HeritageSite records
// and then recreates the current exhibition catalogue.
//
// Safe to re-run:
// - Existing HeritageSite records are removed.
// - The current exhibition artworks are recreated.
// - QR IDs are kept unique.

const dotenv = require("dotenv");
const connectDB = require("../config/db");
const HeritageSite = require("../models/HeritageSite");

dotenv.config();

// ================================================================
// HOW IT IS MADE — PROCESS DATA
// ================================================================

const makingProcesses = {
  handpainted: [
    {
      title: "Preparing the Canvas",
      description:
        "The canvas is prepared and secured as the foundation for the artwork.",
      image: "",
    },
    {
      title: "Planning the Composition",
      description:
        "The artist plans the composition, proportions, colours, and major elements of the artwork.",
      image: "",
    },
    {
      title: "Creating the Base",
      description:
        "The first layers of paint are applied to establish the background, atmosphere, and main forms.",
      image: "",
    },
    {
      title: "Building the Artwork",
      description:
        "Paint is gradually layered by hand to develop shapes, textures, light, and depth.",
      image: "",
    },
    {
      title: "Adding Fine Details",
      description:
        "Smaller details, textures, highlights, and distinctive features are carefully painted.",
      image: "",
    },
    {
      title: "Final Refinement",
      description:
        "The artist reviews the composition and refines colour, contrast, texture, and finishing details.",
      image: "",
    },
    {
      title: "Completed Artwork",
      description:
        "The finished painting is inspected and prepared for exhibition or collection.",
      image: "",
    },
  ],

  digital: [
    {
      title: "Developing the Concept",
      description:
        "The artist develops the central idea, visual message, and overall direction of the digital artwork.",
      image: "",
    },
    {
      title: "Gathering Visual Elements",
      description:
        "Reference images, photographs, illustrations, textures, and other visual elements are selected.",
      image: "",
    },
    {
      title: "Creating the Composition",
      description:
        "The selected elements are arranged digitally to establish the composition and visual hierarchy.",
      image: "",
    },
    {
      title: "Digital Editing",
      description:
        "Images, colours, shapes, and textures are digitally edited and combined to create the intended visual effect.",
      image: "",
    },
    {
      title: "Colour & Detail",
      description:
        "Colours, lighting, contrast, textures, and fine details are adjusted to strengthen the artwork.",
      image: "",
    },
    {
      title: "Final Refinement",
      description:
        "The artwork is reviewed and refined to ensure that the visual composition communicates the intended concept.",
      image: "",
    },
    {
      title: "Final Digital Artwork",
      description:
        "The completed digital artwork is exported in a suitable format for exhibition and presentation.",
      image: "",
    },
  ],

  handcrafted: [
    {
      title: "Selecting the Material",
      description:
        "The artist carefully selects the material according to its quality, texture, strength, and suitability for the artwork.",
      image: "",
    },
    {
      title: "Preparing the Material",
      description:
        "The selected material is cleaned, prepared, measured, or shaped before the main creative process begins.",
      image: "",
    },
    {
      title: "Planning the Design",
      description:
        "The composition and important visual elements are planned before the artwork is developed.",
      image: "",
    },
    {
      title: "Hand Crafting",
      description:
        "Traditional or manual techniques are used to gradually create the main form of the artwork.",
      image: "",
    },
    {
      title: "Adding Details",
      description:
        "Fine patterns, textures, colours, and decorative elements are carefully added by hand.",
      image: "",
    },
    {
      title: "Finishing",
      description:
        "The artwork is refined, cleaned, polished, or otherwise finished according to the material and technique.",
      image: "",
    },
    {
      title: "Final Artwork",
      description:
        "The completed handmade artwork is inspected and prepared for exhibition or collection.",
      image: "",
    },
  ],

  traditional: [
    {
      title: "Preparing the Materials",
      description:
        "Traditional materials and tools are carefully prepared according to the requirements of the artwork.",
      image: "",
    },
    {
      title: "Planning the Design",
      description:
        "The artist establishes the composition, proportions, symbolic elements, and important details.",
      image: "",
    },
    {
      title: "Creating the Base",
      description:
        "The initial surface, background, or foundational layers are carefully prepared.",
      image: "",
    },
    {
      title: "Developing the Artwork",
      description:
        "Traditional artistic techniques are used to gradually develop the main forms and composition.",
      image: "",
    },
    {
      title: "Detailed Handwork",
      description:
        "Fine details, patterns, symbolic elements, and decorative features are completed by hand.",
      image: "",
    },
    {
      title: "Final Finishing",
      description:
        "The artist carefully refines the artwork and completes the final surface and presentation details.",
      image: "",
    },
    {
      title: "Completed Artwork",
      description:
        "The finished traditional artwork is inspected and prepared for exhibition.",
      image: "",
    },
  ],

  thangka: [
    {
      title: "Preparing the Canvas",
      description:
        "The traditional painting surface is prepared carefully to create a smooth foundation for the thangka.",
      image: "",
    },
    {
      title: "Creating the Guidelines",
      description:
        "Precise guidelines are established to maintain the traditional proportions and arrangement of the sacred figure.",
      image: "",
    },
    {
      title: "Drawing the Deity",
      description:
        "The main figure and surrounding elements are carefully drawn according to traditional iconographic proportions.",
      image: "",
    },
    {
      title: "Applying the Colours",
      description:
        "Traditional pigments are carefully applied to build the colours and visual structure of the painting.",
      image: "",
    },
    {
      title: "Detailed Painting",
      description:
        "Fine details, ornaments, facial features, symbolic elements, and decorative patterns are painted by hand.",
      image: "",
    },
    {
      title: "Final Outlining",
      description:
        "The artist refines outlines and details to give the completed thangka its clarity and visual definition.",
      image: "",
    },
    {
      title: "Completed Thangka",
      description:
        "The finished thangka is carefully reviewed and prepared for display and preservation.",
      image: "",
    },
  ],

  canvas: [
    {
      title: "Preparing the Canvas",
      description:
        "The canvas is prepared and secured before painting begins.",
      image: "",
    },
    {
      title: "Planning the Composition",
      description:
        "The artist plans the placement, proportions, colours, and main visual elements.",
      image: "",
    },
    {
      title: "Creating the Background",
      description:
        "Initial layers of colour are applied to establish the background and atmosphere.",
      image: "",
    },
    {
      title: "Building the Forms",
      description:
        "Paint is layered gradually to create the main forms, textures, and depth.",
      image: "",
    },
    {
      title: "Adding Details",
      description:
        "Fine textures, highlights, shadows, and other details are added by hand.",
      image: "",
    },
    {
      title: "Refining the Painting",
      description:
        "The artist adjusts colours, contrast, texture, and composition to complete the work.",
      image: "",
    },
    {
      title: "Final Artwork",
      description:
        "The completed canvas is inspected and prepared for exhibition.",
      image: "",
    },
  ],

  charcoal: [
    {
      title: "Preparing the Surface",
      description:
        "The drawing surface is prepared before the charcoal work begins.",
      image: "",
    },
    {
      title: "Sketching the Composition",
      description:
        "The artist lightly sketches the main proportions, shapes, and composition.",
      image: "",
    },
    {
      title: "Building the Shadows",
      description:
        "Charcoal is gradually applied to establish darker areas and the overall tonal structure.",
      image: "",
    },
    {
      title: "Developing Form",
      description:
        "Layers of charcoal are built to create depth, volume, texture, and realistic forms.",
      image: "",
    },
    {
      title: "Blending & Detailing",
      description:
        "Charcoal is blended and refined while fine details and expressive features are developed.",
      image: "",
    },
    {
      title: "Highlights & Contrast",
      description:
        "Highlights are introduced and dark areas are refined to strengthen the contrast and mood.",
      image: "",
    },
    {
      title: "Completed Drawing",
      description:
        "The finished charcoal artwork is reviewed and prepared for exhibition.",
      image: "",
    },
  ],
};

// ================================================================
// SELECT MAKING PROCESS AUTOMATICALLY
// ================================================================

const getMakingProcess = (craft = "", material = "") => {
  const value = `${craft} ${material}`.toLowerCase();

  if (value.includes("thangka")) {
    return makingProcesses.thangka;
  }

  if (value.includes("charcoal")) {
    return makingProcesses.charcoal;
  }

  if (value.includes("digital")) {
    return makingProcesses.digital;
  }

  if (value.includes("dhaka") || value.includes("woven")) {
    return makingProcesses.handcrafted;
  }

  if (value.includes("canvas painting") || value.includes("canvas")) {
    return makingProcesses.canvas;
  }

  if (value.includes("traditional")) {
    return makingProcesses.traditional;
  }

  if (value.includes("handcrafted")) {
    return makingProcesses.handcrafted;
  }

  return makingProcesses.handpainted;
};

// ================================================================
// EXHIBITION ARTWORKS
// ================================================================

const arts = [
  // ── HANDPAINTED ──────────────────────────────────────────────

  {
  slug: "Nature and it’s cycle",
  codePrefix: "RIK",
  qrId: "HL-101",
  name: "Nature and it’s cycle",

  shortDescription:
    "This piece represents the inevitability of life’s cycle. The tiger’s calm gaze reflects the peace found in accepting one’s destiny, while the swirling water symbolizes nature’s endless cycle of change, renewal, and continuity.",

  tagline: "HANDPAINTED",

  locationLabel: "Acrylic on canvas",

  heroImage: "/images/Handpainted/Rikma-Thapa.jpeg",
  audioTitle: "Heritage Story",
  audioGuide: "/audio/Rikma.mp3",

  history:
    "This artwork explores the inevitability of life’s cycle through the relationship between the tiger and the flowing water. The tiger’s calm gaze reflects the peace found in accepting one’s destiny, while the swirling water represents nature’s endless cycle of change, renewal, and continuity.",

  hiddenStory: "",

  material: "Acrylic on canvas",

  craft: "Handpainted",

  culturalStory:
    "The artwork reflects on nature and its cycle, exploring themes of acceptance, transformation, renewal, and continuity. The calm presence of the tiger represents acceptance of one’s journey, while the movement of water symbolizes the constant process of change within life and nature.",

  makingProcess: [
    {
      title: "Preparing the Canvas",
      description:
        "The canvas is prepared carefully to create a smooth and stable surface for the acrylic painting."
    },
    {
      title: "Planning the Composition",
      description:
        "The main elements of the artwork, including the tiger and flowing water, are planned to create a balanced representation of nature and its continuous cycle."
    },
    {
      title: "Building the Background",
      description:
        "Layers of acrylic paint are gradually applied to establish the atmosphere, colours, movement, and natural surroundings of the scene."
    },
    {
      title: "Painting the Tiger",
      description:
        "The tiger is painted with careful attention to its expression, fur, form, and calm gaze, giving the central subject a sense of stillness and acceptance."
    },
    {
      title: "Creating the Flowing Water",
      description:
        "Swirling water is developed through layered brushwork and flowing forms to represent movement, renewal, change, and the continuous cycle of nature."
    },
    {
      title: "Adding Fine Details",
      description:
        "Fine details, textures, highlights, and tonal variations are added to strengthen the connection between the tiger and its surrounding natural environment."
    },
    {
      title: "Final Finishing",
      description:
        "The completed artwork is reviewed and refined, balancing the calm expression of the tiger with the movement of the water to communicate the idea of life's continuous cycle."
    }
  ],

  artisan: {
    name: "Rikma Thapa",
    role: "Artist",
    location: "Nepal",
    image: "/images/Handpainted/Rikma-Thapa.jpeg",

    bio:
      "My artwork explores acrylic painting as a medium for expressing personal experiences, transformation, acceptance, and the relationship between people and nature. This artwork reflects the tranquility and movement of nature, with the tiger representing calm acceptance and the flowing water representing the continuous cycle of change, renewal, and life.",

    email: "rikmathapa16@gmail.com",

    phone: "9767856067",

    themes: [
      "Nature and its cycle",
      "Acceptance",
      "Transformation",
      "Renewal",
      "Continuity",
      "Tranquillity",
      "Nature",
    ],

    //priceRange: "NPR 10,001 – 15,000",
  },

  badge: {
    title: "Nature Cycle Explorer",
    image: "/images/badge.jpg",
    description:
      "Collected from Rikma Thapa's artwork exploring nature, acceptance, change, renewal, and the continuous cycle of life.",
  },

  isActive: true,
},

  {
    slug: "timeless-bloom",
    codePrefix: "MOK",
    qrId: "HL-102",
    name: "Timeless Bloom",
    shortDescription:
      "A fine blend of Van Gogh's Irises and Vermeer's Girl with a Pearl Earring, created with one purpose: to show that art is timeless. Even when two distinct periods possess their own artistic styles, they can still come together to create something that transcends time.",
    tagline: "HANDPAINTED",
    locationLabel: "Acrylic / mixed",
    heroImage: "/images/Handpainted/Mokshyada-Thapa.jpg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/Mokshada.mp3",
    history:
      "A fine blend of Van Gogh's Irises and Vermeer's Girl with a Pearl Earring, created with one purpose: to show that art is timeless. Even when two distinct periods possess their own artistic styles, they can still come together to create something that transcends time.",
    material: "Paint on canvas",
    craft: "Handpainted",
    culturalStory:
      "Bridges two iconic artistic periods into a single timeless composition.",
    artisan: {
      name: "Mokshyada Thapa",
      role: "Artist",
      location: "Nepal",
      image: "/images/Handpainted/Mokshyada-Thapa.jpg",
      bio: "Artist blending classical Western influences into contemporary Nepali handpainted work.",
      email: "mokshyada04@gmail.com",
      phone: "9744373326",
      themes: [
        "Baroque",
        "Post-Impressionism",
        "Artistic Fusion",
        "Contrasting Styles",
        "Historical Influence",
        "Contemporary Interpretation",
        "Timeless Art",
      ],
      //priceRange: "NPR 2,000-5,000",
    },
    badge: {
      title: "Timeless Bloom Collector",
      image: "/images/badge.jpg",
      description: "Collected from Mokshada Thapa's Timeless Bloom.",
    },
    isActive: true,
  },

  {
    slug: "the-golden-hour-veil",
    codePrefix: "SON",
    qrId: "HL-103",
    name: "The Golden Hour Veil",
    shortDescription:
      "A fleeting moment where cold stillness is softened by gold. In this piece, the harsh chill of winter recedes beneath the gentle light of the setting sun, captured through reflective paths, delicate branches, and the quiet presence of a solitary red bird high in the trees.",
    tagline: "HANDPAINTED",
    locationLabel: "Nepal",
    heroImage: "/images/Handpainted/the-golder-hour-veil.png",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/sonika.mp3",
    history:
      "A fleeting moment where cold stillness is softened by gold. In this piece, the harsh chill of winter recedes beneath the gentle light of the setting sun, captured through reflective paths, delicate branches, and the quiet presence of a solitary red bird high in the trees.",
    material: "Paint on canvas",
    craft: "Handpainted",
    culturalStory:
      "Captures the quiet beauty of winter light and a solitary bird at golden hour.",
    artisan: {
      name: "Sonika Giri",
      role: "Artist",
      location: "Nepal",
      image: "/images/Handpainted/the-golder-hour-veil.png",
      bio: "Artist focused on atmospheric landscapes and the fleeting quality of natural light.",
      themes: [
        "Winter Light",
        "Solitude",
        "Nature",
        "Golden Hour",
        "Stillness",
        "Serenity",
        "Birdlife",
      ],
      //priceRange: "NPR 12000",
    },
    badge: {
      title: "Golden Hour Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Sonika Giri's The Golden Hour Veil.",
    },
    isActive: true,
  },

  {
    slug: "the-hidden-sanctuary",
    codePrefix: "SON2",
    qrId: "HL-104",
    name: "The Hidden Sanctuary",
    shortDescription:
      "Framed by tall pine trees, this painting captures the quiet beauty of the Nepali mountains. With textured greenery, a flowing waterfall, and snowy peaks, it invites the viewer to step into nature and admire the timeless Himalayas.",
    tagline: "HANDPAINTED",
    locationLabel: "Nepali Himalayas",
    heroImage: "/images/Handpainted/the-hidden-sanctuary.png",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/sonika1.mp3",
    history:
      "Framed by tall pine trees, this painting captures the quiet beauty of the Nepali mountains. With textured greenery, a flowing waterfall, and snowy peaks, it invites the viewer to step into nature and admire the timeless Himalayas.",
    material: "Paint on canvas",
    craft: "Handpainted",
    culturalStory:
      "An invitation into the quiet sanctuaries of the Nepali Himalayas.",
    artisan: {
      name: "Sonika Giri",
      role: "Artist",
      location: "Nepal",
      image: "",
      bio: "Artist focused on atmospheric landscapes and the fleeting quality of natural light.",
      themes: [
        "Serenity",
        "Nature",
        "Solitude",
        "Mountain Majesty",
        "Tranquillity",
        "Wilderness",
        "Timelessness",
      ],
      //priceRange: "NPR 10000",
    },
    badge: {
      title: "Hidden Sanctuary Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Sonika Giri's The Hidden Sanctuary.",
    },
    isActive: true,
  },

  // ── DIGITAL ARTWORK ──────────────────────────────────────────

  {
    slug: "the-cost-of-air",
    codePrefix: "RON",
    qrId: "HL-105",
    name: "The Cost of Air – Environmental Degradation & Pollution Endurance",
    shortDescription:
      "The Cost of Air explores the consequences of environmental collapse through the image of a meditating monk dependent on oxygen tanks and a gas mask. The blue tubes replacing his hands symbolize humanity's growing dependence on technology for survival. The artwork reflects on the sacred connection between breath, life, and spiritual consciousness, while asking: What does enlightenment mean if we can no longer breathe clean air?",
    tagline: "DIGITAL ARTWORK",
    locationLabel: "Digital",
    heroImage: "/images/digitalArt/Ronish-Prazapati.png",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/ronish.mp3",
    history:
      "The Cost of Air explores the consequences of environmental collapse through the image of a meditating monk dependent on oxygen tanks and a gas mask. The blue tubes replacing his hands symbolize humanity's growing dependence on technology for survival. The artwork reflects on the sacred connection between breath, life, and spiritual consciousness, while asking: What does enlightenment mean if we can no longer breathe clean air?",
    material: "Digital",
    craft: "Digital Artwork",
    culturalStory:
      "A meditation on environmental collapse, technology dependence, and the meaning of spiritual breath.",
    artisan: {
      name: "Ronish Prajapati",
      role: "Digital Artist",
      location: "Nepal",
      image: "",
      bio: "Digital artist exploring environmental and spiritual themes.",
      email: "ronishprajapati50@gmail.com",
      phone: "9861696008",
      themes: [
        "Environmental Collapse",
        "Technology",
        "Spirituality",
        "Human Dependence",
        "Reflection",
        "Existence",
        "Balance",
      ],
      //priceRange: "NPR 5,001-10,000",
    },
    badge: {
      title: "Cost of Air Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Ronish Prajapati's The Cost of Air.",
    },
    isActive: true,
  },

  {
    slug: "Coagulation",
    codePrefix: "RMS",
    qrId: "HL-106",
    name: "Coagulation",
    shortDescription:
      "The artwork is a photo overlay poster image of a monk worshipping a deity with another photo of a courtyard central deity's face details being painted overlayed on top of his head. The surrounding courtyard area is colored vibrantly, meaning to detach the feeling of reality in the scene. This poster is meant to invoke a feeling of self importance and self awareness about one's own existence in contrast to the world around.",
    tagline: "DIGITAL ARTWORK",
    locationLabel: "Digital / photo overlay",
    heroImage: "/images/digitalArt/Rohan-Man-Shakya.jpg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/rohan.mp3",
    history:
      "The artwork is a photo overlay poster image of a monk worshipping a deity with another photo of a courtyard central deity's face details being painted overlayed on top of his head. The surrounding courtyard area is colored vibrantly, meaning to detach the feeling of reality in the scene. This poster is meant to invoke a feeling of self importance and self awareness about one's own existence in contrast to the world around.",
    material: "Digital photo overlay",
    craft: "Digital Artwork",
    culturalStory:
      "Invokes self-awareness through layered imagery of devotion and vibrant detachment from ordinary reality.",
    artisan: {
      name: "Rohan Man Shakya",
      role: "Digital Artist",
      location: "Nepal",
      image: "/images/digitalArt/Rohan-Man-Shakya.jpg",
      bio: "Digital artist working with photo overlay and contemporary cultural imagery.",
      email: "rohanmshakya3@gmail.com",
      phone: "9761663400",
      themes: [
        "Self-awareness",
        "Devotion",
        "Detachment",
        "Inner Reflection",
        "Spirituality",
        "Perception",
        "Transformation",
      ],
      //priceRange: "NPR 2,000-5,000",
    },
    badge: {
      title: "Contemporary Art Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Rohan Man Shakya's Contemporary Art.",
    },
    isActive: true,
  },

  {
    slug: "footsteps-of-stillness",
    codePrefix: "SAG",
    qrId: "HL-107",
    name: "Footsteps of Stillness",
    shortDescription:
      "Amidst ancient ruins and a vibrant, dew-kissed field, a traveler follows a winding trail of stepping stones. This journey is a deliberate pilgrimage, not an escape from reality, but a purposeful search for equilibrium, guided by the quiet harmony of the earth and the towering emblem of duality in the distance.",
    tagline: "DIGITAL ARTWORK",
    locationLabel: "Digital",
    heroImage: "/images/digitalArt/Sagun-Bishwocarma.jpg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/sagun.mp3",
    history:
      "Amidst ancient ruins and a vibrant, dew-kissed field, a traveler follows a winding trail of stepping stones. This journey is a deliberate pilgrimage, not an escape from reality, but a purposeful search for equilibrium, guided by the quiet harmony of the earth and the towering emblem of duality in the distance.",
    material: "Digital",
    craft: "Digital Artwork",
    culturalStory:
      "A digital pilgrimage through ruins and fields toward equilibrium and duality.",
    artisan: {
      name: "Sagun Bishwokarma",
      role: "Digital Artist",
      location: "Nepal",
      image: "/images/digitalArt/Sagun-Bishwocarma.jpg",
      bio: "Digital artist exploring pilgrimage, stillness and duality.",
      email: "sbishwocarma@gmail.com",
      phone: "9714600116",
      themes: [
        "Pilgrimage",
        "Equilibrium",
        "Duality",
        "Stillness",
        "Journey",
        "Reflection",
        "Transformation",
      ],
    },
    badge: {
      title: "Footsteps of Stillness Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Sagun Bishwokarma's Footsteps of Stillness.",
    },
    isActive: true,
  },

  // ── HANDCRAFTED ARTWORK ──────────────────────────────────────

    {
    slug: "love-and-benevolence",
    codePrefix: "PRA",
    qrId: "HL-108",
    name: "Love and Benevolence",
    shortDescription:
      "A traditional painting of Lord Krishna made using acrylic medium on canvas roll.",
    tagline: "TRADITIONAL ARTWORK",
    locationLabel: "Acrylic on canvas roll",
    heroImage: "/images/Handcrafted/Prapti-Bhetawal.jpg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/prapti.mp3",
    history:
      "A traditional painting of Lord Krishna made using acrylic medium on canvas roll.",
    material: "Acrylic on canvas roll",
    craft: "Traditional",
    culturalStory:
      "The artwork portrays Lord Krishna through a traditional painting created using acrylic medium on canvas roll, exploring the theme of love and benevolence.",
    artisan: {
      name: "Prapti Bhetawal",
      role: "Artist",
      location: "Nepal",
      image: "",
      bio:
        "Artist working with acrylic medium on canvas roll, exploring traditional subjects and themes of love and benevolence.",
      email: "praptibhetwal25@gmail.com",
      phone: "9861489202",
      themes: [
        "Lord Krishna",
        "Love",
        "Benevolence",
        "Traditional Art",
        "Acrylic Painting",
        "Spirituality",
        "Cultural Heritage",
      ],
      // priceRange: "NPR 5,001-10,000",
    },
    badge: {
      title: "Krishna Explorer",
      image: "/images/badge.jpg",
      description:
        "Collected from Prapti Bhetawal's traditional painting of Lord Krishna.",
    },
    isActive: true,
  },

  {
    slug: "the-birth-of-divinity",
    codePrefix: "CHU",
    qrId: "HL-109",
    name: "The Birth of Divinity",
    shortDescription:
      "Woven in traditional Dhaka handloom, this artwork portrays Nagadaha, the legendary lake from which the Mahachaitaya of Swayambhu is believed to have emerged. At the heart of the composition, a radiant lotus opens to reveal Swayambhunath, symbolizing spiritual awakening. Above its spire, five coloured ribbons represent the Pancha Buddha and the five radiant lights of enlightenment.",
    tagline: "HANDCRAFTED ARTWORK",
    locationLabel: "Dhaka handloom",
    heroImage: "/images/Handcrafted/Chunu-Weaves.jpg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/chunu.mp3",
    history:
      "Woven in traditional Dhaka handloom, this artwork portrays Nagadaha, the legendary lake from which the Mahachaitaya of Swayambhu is believed to have emerged. At the heart of the composition, a radiant lotus opens to reveal Swayambhunath, symbolizing spiritual awakening. Above its spire, five coloured ribbons represent the Pancha Buddha and the five radiant lights of enlightenment.",
    material: "Traditional Dhaka handloom",
    craft: "Handcrafted / woven",
    culturalStory:
      "Nagadaha and the emergence of Swayambhu, woven in traditional Dhaka with Pancha Buddha symbolism.",
    artisan: {
      name: "Chunu Bastola",
      role: "Textile Artist",
      location: "Nepal",
      image: "",
      bio: "Artist working in traditional Dhaka handloom, depicting sacred Newar cosmology.",
      email: "chunuweaves@gmail.com",
      phone: "9861285070",
      themes: [
        "Nagadaha",
        "Swayambhu",
        "Pancha Buddha",
        "Dhaka Weaving",
        "Buddhist Symbolism",
        "Creation",
        "Spiritual Heritage",
      ],
      //priceRange: "Above NPR 25,000",
    },
    badge: {
      title: "Birth of Divinity Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Chunu Bastola's The Birth of Divinity.",
    },
    isActive: true,
  },

  {
    slug: "Reflection of Freedom",
    codePrefix: "NIT",
    qrId: "HL-110",
    name: "Reflection of Freedom",
    shortDescription:
      "An expressive oil painting portraying a figure submerged beneath rippling water, blending vibrant red and orange tones with deep blue reflections to create a sense of movement, mystery, and emotional depth.",
    tagline: "HANDCRAFTED ARTWORK",
    locationLabel: "Oil on canvas",
    heroImage: "/images/Handcrafted/Nitika-Shrestha.jpeg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/nitika.mp3",
    history:
      "An expressive oil painting portraying a figure submerged beneath rippling water, blending vibrant red and orange tones with deep blue reflections to create a sense of movement, mystery, and emotional depth.",
    material: "Oil paint",
    craft: "Handcrafted / oil painting",
    culturalStory:
      "A submerged figure and rippling colour create mystery and emotional depth.",
    artisan: {
      name: "Nitika Shrestha",
      role: "Artist",
      location: "Nepal",
      image: "",
      bio: "Artist working in expressive oil, exploring water, colour and emotion.",
      email: "np01mb7a250050@islingtoncollege.edu.np",
      phone: "9840038947",
      themes: [
        "Mystery",
        "Emotional Depth",
        "Submersion",
        "Fluidity",
        "Colour",
        "Solitude",
        "Introspection",
      ],
      //priceRange: "NPR 10,001-15,000",
    },
    badge: {
      title: "Hidden World Explorer",
      image: "/images/badge.jpg",
      description:
        "Collected from Nitika Shrestha's The Hidden World Beneath the Surface.",
    },
    isActive: true,
  },

  // ── DIGITAL ARTWORK ──────────────────────────────────────────

  {
    slug: "lakhe",
    codePrefix: "ANU",
    qrId: "HL-111",
    name: "Lakhe",
    shortDescription:
      "This artwork presents Lakhe as a ferocious, supernatural figure through a highly expressive contemporary style.",
    tagline: "DIGITAL ARTWORK",
    locationLabel: "Digital / contemporary",
    heroImage: "/images/digitalArt/Anubhav-Pradhan.jpeg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/anubhav.mp3",
    history:
      "This artwork presents Lakhe as a ferocious, supernatural figure through a highly expressive contemporary style.",
    material: "Digital",
    craft: "Digital Artwork",
    culturalStory:
      "Lakhe rendered as a ferocious supernatural presence in contemporary digital form.",
    artisan: {
      name: "Anubhav Pradhan",
      role: "Digital Artist",
      location: "Nepal",
      image: "",
      bio: "Digital artist reinterpreting Newar cultural figures in expressive contemporary style.",
      email: "anubhavpradhan102@gmail.com",
      phone: "9745556666",
      themes: [
        "Lakhe",
        "Supernatural",
        "Ferocity",
        "Mysticism",
        "Power",
        "Cultural Symbolism",
        "Contemporary Art",
      ],
      //priceRange: "NPR 5,001-10,000",
    },
    badge: {
      title: "Lakhe Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Anubhav Pradhan's Lakhe.",
    },
    isActive: true,
  },

  {
    slug: "monk-and-courtyard",
    codePrefix: "RMS2",
    qrId: "HL-112",
    name: "Monk and Courtyard",
    shortDescription:
      "A photo-overlay poster showing a monk worshipping a deity, with the painted details of a central courtyard deity's face layered over his head. The surrounding courtyard is filled with vibrant colours, creating a visual separation from the reality of the scene.",
    tagline: "DIGITAL ARTWORK",
    locationLabel: "Digital / contemporary",
    heroImage: "/images/digitalArt/Rohan-Man-Shrestha.png",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/rohan1.mp3",
    history:
      "The artwork features a photograph of a monk worshipping a deity, combined with another image showing the painted details of a central courtyard deity's face overlaid on top of his head. The surrounding courtyard area is coloured vibrantly, creating a sense of detachment from the reality of the scene. The layered imagery and contrasting colours create an unusual visual relationship between the figure and the environment around him.",
    material: "Digital",
    craft: "Digital Artwork",
    culturalStory:
      "A contemporary photo-overlay artwork combining devotion, a courtyard deity, layered imagery, and vibrant colour to create a sense of detachment from ordinary reality.",
    artisan: {
      name: "Rohan Man Shakya",
      role: "Digital Artist",
      location: "Nepal",
      image: "",
      bio: "Digital artist working with photo overlays and contemporary cultural imagery.",
      email: "",
      phone: "",
      themes: [
        "Devotion",
        "Deity",
        "Courtyard",
        "Layered Imagery",
        "Vibrant Colour",
        "Detachment",
        "Contemporary Art",
      ],
      //priceRange: "",
    },
    badge: {
      title: "Monk and Courtyard Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Rohan Man Shakya's Monk and Courtyard.",
    },
    isActive: true,
  },

  {
    slug: "the-echo-of-a-fist",
    codePrefix: "PK1",
    qrId: "HL-113",
    name: "The Echo of a Fist",
    shortDescription:
      "A digital artwork celebrating Jürgen Klopp, his legacy, and the special connection he shared with the supporters at Anfield. Through air punches, banners, murals, and messages of “Danke,” the artwork captures gratitude for the memories, belief, and everything he gave to the club.",
    tagline: "DIGITAL ARTWORK",
    locationLabel: "Digital artwork",
    heroImage: "/images/digitalArt/Prajwol-Khadka.jpg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/prajwol.mp3",
    history:
      "This artwork is a celebration of Jürgen Klopp, his legacy, and the special connection he shared with the supporters at Anfield. Through the air punches, banners, murals, and messages of “Danke,” it captures a simple feeling: thank you for the memories, the belief, and everything you gave us.",
    material: "Digital artwork",
    craft: "Digital Artwork",
    culturalStory:
      "A tribute to Jürgen Klopp's legacy at Anfield, expressed through gestures, banners, murals, and messages of gratitude.",
    artisan: {
      name: "Prajwol Khadka",
      role: "Digital Artist",
      location: "Nepal",
      image: "",
      bio: "Digital artist creating expressive works inspired by football, emotion, legacy, and visual storytelling.",
      phone: "9849644744",
      email: "prajwolkhadka8@gmail.com",
      themes: [
        "Legacy",
        "Gratitude",
        "Football",
        "Devotion",
        "Farewell",
        "Memory",
        "Connection",
      ],
      //priceRange: "NPR 2,000-5,000",
    },
    badge: {
      title: "Echo Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Prajwol Khadka's The Echo of a Fist.",
    },
    isActive: true,
  },

  {
    slug: "between-water-and-memory",
    codePrefix: "NIM",
    qrId: "HL-114",
    name: "Between Water and Memory",
    shortDescription:
      "Atmospheric contemporary illustration combining impressionistic brushwork, digital distortion, and dreamlike natural imagery.",
    tagline: "DIGITAL ARTWORK",
    locationLabel: "Digital illustration",
    heroImage: "/images/digitalArt/Nima-Ongel-Sherpa1.jpeg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/nima.mp3",
    history:
      "Atmospheric contemporary illustration combining impressionistic brushwork, digital distortion, and dreamlike natural imagery.",
    material: "Digital illustration",
    craft: "Digital Artwork",
    culturalStory:
      "Impressionistic and dreamlike imagery at the edge of water and memory.",
    artisan: {
      name: "Nima Ongel Sherpa",
      role: "Illustrator",
      location: "Nepal",
      image: "",
      bio: "Artist combining impressionistic brushwork with digital distortion and natural imagery.",
      email: "np01mm4a250019@islingtoncollege.edu.np",
      phone: "9861816330",
      themes: [
        "Impressionism",
        "Dreamlike",
        "Water",
        "Memory",
        "Reflection",
        "Atmosphere",
        "Serenity",
      ],
      //priceRange: "NPR 5,001-10,000",
    },
    badge: {
      title: "Between Water and Memory Explorer",
      image: "/images/badge.jpg",
      description:
        "Collected from Nima Ongel Sherpa's Between Water and Memory.",
    },
    isActive: true,
  },

  {
    slug: "From the Himalayas to the Stars",
    codePrefix: "NIM2",
    qrId: "HL-115",
    name: "From the Himalayas to the Stars",
    shortDescription:
      "An astronaut carrying the spirit of Nepal into the unknown, symbolizing identity, exploration, and connection to home.",
    tagline: "DIGITAL ARTWORK",
    locationLabel: "Digital",
    heroImage: "/images/digitalArt/Nima-Ongel-Sherpa.png",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/nima1.mp3",
    history:
      "An astronaut carrying the spirit of Nepal into the unknown, symbolizing identity, exploration, and connection to home.",
    material: "Digital",
    craft: "Digital Artwork",
    culturalStory:
      "Astronaut and the spirit of Nepal — identity, exploration, and home.",
    artisan: {
      name: "Nima Ongel Sherpa",
      role: "Digital Artist",
      location: "Nepal",
      image: "",
      bio: "Artist combining impressionistic brushwork with digital distortion and natural imagery.",
      email: "np01mm4a250019@islingtoncollege.edu.np",
      phone: "9861816330",
      themes: [
        "Identity",
        "Exploration",
        "Nepal",
        "Home",
        "Discovery",
        "Belonging",
        "Unknown",
      ],
      //priceRange: "NPR 5,001-10,000",
    },
    badge: {
      title: "Home & Identity Explorer",
      image: "/images/badge.jpg",
      description:
        "Collected from Nima Ongel Sherpa's Home, Identity & The Journey Beyond.",
    },
    isActive: true,
  },

  // ── TRADITIONAL ARTWORK ──────────────────────────────────────

  {
    slug: "Shakyamuni Buddha",
    codePrefix: "SHA",
    qrId: "HL-116",
    name: "Shakyamuni Buddha",
    shortDescription:
      "This artwork is traditional hand-painted thangka painting depicting Shakyamuni Buddha with bhumisparsha mudra.",
    tagline: "TRADITIONAL ARTWORK",
    locationLabel: "Hand-painted thangka",
    heroImage: "/images/traditionalArt/Shaira-Gurung.jpeg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/shaira.mp3",
    history:
      "This artwork is traditional hand-painted thangka painting depicting Shakyamuni Buddha with bhumisparsha mudra.",
    material: "Traditional thangka pigments",
    craft: "Thangka painting",
    culturalStory:
      "Shakyamuni Buddha in bhumisparsha mudra — traditional hand-painted thangka.",
    artisan: {
      name: "Shaira Gurung",
      role: "Thangka Artist",
      location: "Nepal",
      image: "",
      bio: "Traditional thangka painter depicting Buddhist iconography.",
      email: "np01ai4s250025@islingtoncollege.edu.np",
      phone: "9709077024",
      themes: [
        "Shakyamuni Buddha",
        "Bhumisparsha Mudra",
        "Buddhist Iconography",
        "Thangka",
        "Meditation",
        "Enlightenment",
        "Spirituality",
      ],
      //priceRange: "NPR 5,001-10,000",
    },
    badge: {
      title: "Thangka Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Shaira Gurung's Thangka Painting.",
    },
    isActive: true,
  },

  {
    slug: "luna",
    codePrefix: "SR1",
    qrId: "HL-117",
    name: "Luna",
    artistName: "Slesha Rawal",
    phone: "9841048495",
    email: "np01cp4a230378@islingtoncollege.edu.np",
    //priceRange: "NPR 2,000-5,000",
    //price: 2500,
    size: "20.5 cm in diameter, an 8-inch round canvas",
    shortDescription:
      "Luna captures the quiet beauty of the moon through soft shades, textures, and light, inspired by the Pink Moon of 13 April 2025. Each detail was painted by hand over approximately 6 hours.",
    tagline: "CANVAS PAINTING",
    locationLabel: "8-inch round canvas",
    heroImage: "/images/traditionalArt/Slesha-Rawal.jpg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/selsha.mp3",
    history:
      "Luna captures the quiet beauty of the moon through soft shades, textures, and light, inspired by the Pink Moon of 13 April 2025. Each detail was painted by hand over approximately 6 hours.",
    material: "Canvas",
    craft: "Canvas painting",
    culturalStory:
      "A hand-painted study of the moon inspired by the Pink Moon of 13 April 2025, created through soft shades, textures, and light.",
    artisan: {
      name: "Slesha Rawal",
      role: "Artist",
      location: "Nepal",
      image: "",
      bio: "Artist exploring the quiet beauty of nature and celestial forms through hand-painted canvas works.",
      email: "np01cp4a230378@islingtoncollege.edu.np",
      phone: "9841048495",
      themes: [
        "Moon",
        "Beauty",
        "Light",
        "Texture",
        "Serenity",
        "Nature",
        "Celestial",
      ],
      //priceRange: "NPR 2,000-5,000",
    },
    badge: {
      title: "Luna Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Slesha Rawal's Luna.",
    },
    isActive: true,
  },

  {
    slug: "manjushri",
    codePrefix: "SUG",
    qrId: "HL-118",
    name: "Manjushri",
    shortDescription:
      "The artwork captures Manjushri, the Bodhisattva of Wisdom, depicted in a tranquil and meditative posture. This contemporary artwork offers a reassed interpretation of the traditional form, presenting a modern approach to a deeply spiritual subject. Manjushri is portrayed with a serene expression, seated in the vajra posture, holding the sword of wisdom in his right hand to sever ignorance. In contrast, the left hand holds the stem of a utpala flower with the Prajnaparamita book above.",
    tagline: "TRADITIONAL ARTWORK",
    locationLabel: "Contemporary traditional",
    heroImage: "/images/traditionalArt/Sugat-Shakya.jpeg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/sugat.mp3",
    history:
      "The artwork captures Manjushri, the Bodhisattva of Wisdom, depicted in a tranquil and meditative posture. This contemporary artwork offers a reassed interpretation of the traditional form, presenting a modern approach to a deeply spiritual subject. Manjushri is portrayed with a serene expression, seated in the vajra posture, holding the sword of wisdom in his right hand to sever ignorance. In contrast, the left hand holds the stem of a utpala flower with the Prajnaparamita book above.",
    material: "Paint",
    craft: "Traditional / contemporary",
    culturalStory:
      "Manjushri — Bodhisattva of Wisdom — sword of wisdom and Prajnaparamita, in a contemporary reading of the traditional form.",
    artisan: {
      name: "Sugat Shakya",
      role: "Artist",
      location: "Nepal",
      image: "",
      bio: "Artist offering contemporary interpretations of traditional Buddhist subjects.",
      email: "sugat.shakya@islingtoncollege.edu.np",
      phone: "9768448684",
      themes: [
        "Manjushri",
        "Wisdom",
        "Enlightenment",
        "Meditation",
        "Prajnaparamita",
        "Spirituality",
        "Transformation",
      ],
      //priceRange: "Above 25000",
    },
    badge: {
      title: "Manjushri Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Sugat Shakya's Manjushri.",
    },
    isActive: true,
  },

  // ── CHARCOAL ARTWORK ─────────────────────────────────────────

  {
    slug: "portrait-prashanna",
    codePrefix: "PRS",
    qrId: "HL-119",
    name: "Portrait",
    shortDescription:
      "It's an old man expressing deep emotion after seeing something. As for what that emotion is or what he saw is up for interpretation.",
    tagline: "CHARCOAL ARTWORK",
    locationLabel: "Charcoal",
    heroImage: "/images/charcoal/Prashanna-Sthapit.jpg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/prasanna.mp3",
    history:
      "It's an old man expressing deep emotion after seeing something. As for what that emotion is or what he saw is up for interpretation.",
    material: "Charcoal",
    craft: "Charcoal drawing",
    culturalStory:
      "An old man's deep emotion — left open to the viewer's interpretation.",
    artisan: {
      name: "Prashanna Sthapit",
      role: "Artist",
      location: "Nepal",
      image: "",
      bio: "Charcoal artist focused on expressive portraiture.",
      email: "prashanna.sthapit@gmail.com",
      phone: "9864474210",
      themes: [
        "Emotion",
        "Mystery",
        "Interpretation",
        "Human Expression",
        "Reflection",
        "Memory",
        "Curiosity",
      ],
      //priceRange: "Above 25000",
    },
    badge: {
      title: "Portrait Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Prashanna Sthapit's Portrait.",
    },
    isActive: true,
  },

  {
  slug: "kumari-the-living-goddess",
  codePrefix: "MAHIKA1",
  qrId: "HL-120",
  name: "Kumari - The Living Goddess",
  shortDescription:
    "The Kumari holds a very special place in Nepalese culture, representing a living connection between spirituality, tradition and our rich Newari heritage. Through this piece, I wanted to portray not just her beauty, but the quiet strength and purity that she represents.",
  tagline: "PAPER ARTWORK / SKETCH",
  locationLabel: "A4 size",
  heroImage: "",
  audioTitle: "Heritage Story",
  audioGuide: "/audio/Mahika.mp3",
  history:
    "The Kumari holds a very special place in Nepalese culture, representing a living connection between spirituality, tradition and our rich Newari heritage. Through this piece, I wanted to portray not just her beauty, but the quiet strength and purity that she represents.",
  material: "Paper",
  craft: "Paper Artwork / sketch",
  culturalStory:
    "The Kumari represents a living connection between spirituality, tradition, and Newari heritage. This artwork portrays her beauty, quiet strength, and purity.",
  artisan: {
    name: "Mahika Lakoul",
    role: "Artist",
    location: "Nepal",
    image: "/images/traditionalArt/kumari-living-goddess.png",
    bio: "Artist exploring Nepalese culture and heritage through artwork.",
    phone: "9863191824",
    email: "np01cp4a230200@islingtoncollege.edu.np",
    themes: "Kumari, Newari heritage",
    priceRange: "2,000-5,000",
    //price: "3,500",
  },
  badge: {
    title: "Kumari Explorer",
    image: "/images/badge.jpg",
    description: "Collected from Mahika Lakoul's Kumari - The Living Goddess.",
  },
  isActive: true,
},

  {
    slug: "through-his-eyes",
    codePrefix: "DEE",
    qrId: "HL-121",
    name: "Through His Eyes",
    shortDescription:
      "A child's eyes often hold more than what they simply see. In his reflection, we see his father working in the field—a quiet reminder of the hard work, sacrifices, and love behind a family's dreams. It speaks of how, even before we fully understand our parents' struggles, we carry their efforts with us and grow up inspired by them.",
    tagline: "CHARCOAL ARTWORK",
    locationLabel: "Charcoal",
    heroImage: "/images/charcoal/through-his-eyes.jpeg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/deepti.mp3",
    history:
      "A child's eyes often hold more than what they simply see. In his reflection, we see his father working in the field—a quiet reminder of the hard work, sacrifices, and love behind a family's dreams. It speaks of how, even before we fully understand our parents' struggles, we carry their efforts with us and grow up inspired by them.",
    material: "Charcoal",
    craft: "Charcoal drawing",
    culturalStory:
      "A child's gaze reflecting a father's labour and the inheritance of quiet sacrifice.",
    artisan: {
      name: "Deepti Agarwal",
      role: "Artist",
      location: "Nepal",
      image: "",
      bio: "Charcoal and mixed-media artist focused on family, hope and quiet resilience.",
    },
    badge: {
      title: "Through His Eyes Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Deepti Agarwal's Through His Eyes.",
    },
    isActive: true,
  },

  {
    slug: "a-little-hope",
    codePrefix: "DEE2",
    qrId: "HL-122",
    name: "A Little Hope",
    shortDescription:
      "A quiet reminder to keep reaching for our dreams, even when they seem distant. The girl represents innocence, hope, and curiosity, while the glowing moon symbolizes the dreams that guide us through dark and uncertain moments. Sometimes, believing in what seems impossible is the first step toward reaching it.",
    tagline: "CHARCOAL ARTWORK",
    locationLabel: "Charcoal / mixed",
    heroImage: "/images/charcoal/a-little-hope.jpeg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/deepti1.mp3",
    history:
      "A quiet reminder to keep reaching for our dreams, even when they seem distant. The girl represents innocence, hope, and curiosity, while the glowing moon symbolizes the dreams that guide us through dark and uncertain moments. Sometimes, believing in what seems impossible is the first step toward reaching it.",
    material: "Charcoal / mixed media",
    craft: "Charcoal drawing",
    culturalStory:
      "A girl and a glowing moon — innocence, hope, and the courage to reach for distant dreams.",
    artisan: {
      name: "Deepti Agarwal",
      role: "Artist",
      location: "Nepal",
      image: "",
      bio: "Charcoal and mixed-media artist focused on family, hope and quiet resilience.",
    },
    badge: {
      title: "A Little Hope Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Deepti Agarwal's A Little Hope.",
    },
    isActive: true,
  },

  // ── HANDPAINTED ART - HIMALAYAN SERIES ───────────────────────

  {
    slug: "himalayan-mountain",
    codePrefix: "RUP",
    qrId: "HL-123",
    name: "Himalayan Mountain",
    shortDescription:
      "A detailed Himalayan mountain painting featuring dramatic rocky peaks, snowy glaciers and created with bold textures and contrasting colours.",
    tagline: "HANDPAINTED ART",
    locationLabel: "Himalayas",
    heroImage: "/images/Handpainted/Rupesh-Poddar.png",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/rupesh.mp3",
    history:
      "A detailed Himalayan mountain painting featuring dramatic rocky peaks, snowy glaciers and created with bold textures and contrasting colours.",
    material: "Paint on canvas",
    craft: "Handpainted",
    culturalStory:
      "Dramatic Himalayan peaks and glaciers in bold texture and contrasting colour.",
    artisan: {
      name: "Rupesh Poddar",
      role: "Artist",
      location: "Nepal",
      image: "",
      bio: "Painter of Himalayan landscapes with bold texture and contrasting colour.",
      email: "rupeshpoddar032@gmail.com",
      phone: "9844345566",
      themes: [
        "Himalayas",
        "Mountains",
        "Glaciers",
        "Nature",
        "Texture",
        "Contrast",
        "Majesty",
      ],
      //priceRange: "NPR 10,001-15,000",
    },
    badge: {
      title: "Himalayan Mountain Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Rupesh Poddar's Himalayan Mountain.",
    },
    isActive: true,
  },

  {
    slug: "timeless-piece",
    codePrefix: "RUP2",
    qrId: "HL-124",
    name: "Timeless Piece",
    shortDescription:
      "A timeless piece for collectors who love the mountains, and a little bit of the summit for your wall.",
    tagline: "HANDPAINTED ART",
    locationLabel: "Himalayas",
    heroImage: "/images/Handpainted/Rupesh-Poddar1.png",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/rupesh1.mp3",
    history:
      "A timeless piece for collectors who love the mountains, and a little bit of the summit for your wall.",
    material: "Paint on canvas",
    craft: "Handpainted",
    culturalStory:
      "A collector's Himalayan summit for the wall.",
    artisan: {
      name: "Rupesh Poddar",
      role: "Artist",
      location: "Nepal",
      image: "",
      bio: "Painter of Himalayan landscapes with bold texture and contrasting colour.",
      email: "rupeshpoddar032@gmail.com",
      phone: "9844345566",
      themes: [
        "Himalayas",
        "Mountains",
        "Glaciers",
        "Nature",
        "Texture",
        "Contrast",
        "Majesty",
      ],
      //priceRange: "NPR 10,001-15,000",
    },
    badge: {
      title: "Timeless Piece Explorer",
      image: "/images/badge.jpg",
      description: "Collected from Rupesh Poddar's Timeless Piece.",
    },
    isActive: true,
  },

  {
    slug: "Where the Mountains Meet Home",
    codePrefix: "ROS",
    qrId: "HL-125",
    name: "Where the Mountains Meet Home",
    shortDescription:
      "A peaceful Himalayan village nestled beneath majestic snow-covered peaks, capturing the harmony between nature, spirituality, and everyday mountain life.",
    tagline: "HANDPAINTED ART",
    locationLabel: "Himalayan village",
    heroImage: "/images/Handpainted/Roshan-Cresta.jpeg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/roshan.mp3",
    history:
      "A peaceful Himalayan village nestled beneath majestic snow-covered peaks, capturing the harmony between nature, spirituality, and everyday mountain life.",
    material: "Paint on canvas",
    craft: "Handpainted",
    culturalStory:
      "Village life under snow peaks — nature, spirituality and daily mountain rhythm.",
    artisan: {
      name: "Roshan Yagol Shrestha",
      role: "Artist",
      location: "Nepal",
      image: "",
      bio: "Painter of Himalayan village life and the harmony of nature and spirituality.",
      email: "roshanyagol124@gmail.com",
      phone: "9822520306",
      themes: [
        "Himalayan Life",
        "Village Life",
        "Nature",
        "Spirituality",
        "Harmony",
        "Tradition",
        "Landscape",
      ],
      //priceRange: "NPR 15,001-25,000",
    },
    badge: {
      title: "Himalayan Serenity Explorer",
      image: "/images/badge.jpg",
      description:
        "Collected from Roshan Yagol Shrestha's Himalayan Serenity & Village Life.",
    },
    isActive: true,
  },
    {
    slug: "panch-kumari-dance",
    codePrefix: "BRS",
    qrId: "HL-126",
    name: "Panch Kumari Dance",
    shortDescription:
      "Nepal is a country with deep religious faith and traditions. People follow various customs and practices according to their respective religions. One such tradition is the practice of selecting and worshipping a Kumari, a living goddess. Accordingly, this painting attempts to depict Kumaris established in different places of the Kathmandu Valley gathering in one place, dancing and displaying their divine powers.",
    tagline: "TRADITIONAL ARTWORK",
    locationLabel: "Painting",
    heroImage: "/images/traditionalArt/panch-kumari-dance.jpeg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/bijay.mp3",
    history:
      "Nepal is a country with deep religious faith and traditions. People follow various customs and practices according to their respective religions. One such tradition is the practice of selecting and worshipping a Kumari, a living goddess. Accordingly, this painting attempts to depict Kumaris established in different places of the Kathmandu Valley gathering in one place, dancing and displaying their divine powers.",
    material: "Paint",
    craft: "Traditional",
    culturalStory:
      "The painting depicts Kumaris from different places of the Kathmandu Valley gathering together, dancing, and displaying their divine powers, reflecting Nepal's living goddess tradition and deep religious heritage.",
    artisan: {
      name: "Bijaya Raj Shakya",
      role: "Artist",
      location: "Nepal",
      image: "",
      bio:
        "Artist exploring Nepali religious traditions, cultural heritage, and spiritual subjects through painting.",
      themes: [
        "Kumari",
        "Living Goddess",
        "Kathmandu Valley",
        "Nepali Culture",
        "Religious Tradition",
        "Dance",
        "Spiritual Heritage",
      ],
      // priceRange: "NPR 15,000",
    },
    badge: {
      title: "Panch Kumari Explorer",
      image: "/images/badge.jpg",
      description:
        "Collected from Bijaya Raj Shakya's Panch Kumari Dance.",
    },
    isActive: true,
  },

  {
    slug: "radha-krishna-dance",
    codePrefix: "BRS2",
    qrId: "HL-127",
    name: "Radha Krishna Dance",
    shortDescription:
      "According to Hindu tradition, Lord Krishna and Radha are associated with a romantic story. The painting attempts to portray the feeling of Radha becoming so enchanted by the melody of Lord Krishna's flute that, while dancing, she seems to ascend to heaven. It also depicts the followers of Lord Krishna, becoming completely absorbed in the dance.",
    tagline: "TRADITIONAL ARTWORK",
    locationLabel: "Painting",
    heroImage: "/images/traditionalArt/radha-krishna-dance.jpeg",
    audioTitle: "Heritage Story",
    audioGuide: "/audio/bijay1.mp3",
    history:
      "According to Hindu tradition, Lord Krishna and Radha are associated with a romantic story. The painting attempts to portray the feeling of Radha becoming so enchanted by the melody of Lord Krishna's flute that, while dancing, she seems to ascend to heaven. It also depicts the followers of Lord Krishna, becoming completely absorbed in the dance.",
    material: "Paint",
    craft: "Traditional",
    culturalStory:
      "The artwork portrays Radha becoming enchanted by Krishna's flute while dancing, surrounded by followers absorbed in the devotional dance.",
    artisan: {
      name: "Bijaya Raj Shakya",
      role: "Artist",
      location: "Nepal",
      image: "",
      bio:
        "Artist exploring Nepali and South Asian religious traditions, cultural stories, and spiritual subjects through painting.",
      themes: [
        "Radha",
        "Krishna",
        "Devotional Dance",
        "Hindu Tradition",
        "Spirituality",
        "Music",
        "Cultural Heritage",
      ],
      // priceRange: "NPR 15,000",
    },
    badge: {
      title: "Radha Krishna Explorer",
      image: "/images/badge.jpg",
      description:
        "Collected from Bijaya Raj Shakya's Radha Krishna Dance.",
    },
    isActive: true,
  },
  {
  slug: "mountains",
  codePrefix: "PRAPTI1",
  qrId: "HL-132",
  name: "Mountains",
  shortDescription:
    "A piece of Nature made in canvas roll using acrylic medium.",
  tagline: "MOUNTAIN ARTWORK",
  locationLabel: "Canvas / acrylic",
  heroImage: "/images/Handpainted/Prapti-Bhetawal.jpg",
  audioTitle: "Heritage Story",
  audioGuide: "/audio/prapti1.mp3",
  history:
    "A piece of Nature made in canvas roll using acrylic medium.",
  material: "Canvas roll / acrylic",
  craft: "Canvas painting",
  culturalStory:
    "A nature-inspired artwork portraying the beauty and presence of mountains through acrylic on canvas.",
  artisan: {
    name: "Prapti Bhetawal",
    role: "Artist",
    location: "Nepal",
    image: "",
    bio: "Artist inspired by nature and the beauty of Nepal's landscapes.",
    //price: "3,000",
  },
  badge: {
    title: "Mountains Explorer",
    image: "/images/badge.jpg",
    description: "Collected from Prapti Bhetawal's Mountains.",
  },
  isActive: true,
},
  
];


// ================================================================
// ADD MAKING PROCESS TO EVERY ARTWORK
// ================================================================

const artsWithMakingProcess = arts.map((art) => ({
  ...art,
  makingProcess:
    art.makingProcess && art.makingProcess.length > 0
      ? art.makingProcess
      : getMakingProcess(art.craft, art.material),
}));

// ================================================================
// SEED FUNCTION
// ================================================================

const seedExhibitionArts = async () => {
  try {
    await connectDB();

    console.log("\n========================================");
    console.log("Cleaning ALL old HeritageSite records...");
    console.log("========================================\n");

    // Remove ALL old HeritageSite records.
    // This prevents old QR IDs from conflicting
    // with the new exhibition catalogue.

    const deleteResult = await HeritageSite.deleteMany({});

    console.log(
      `Removed ${deleteResult.deletedCount} old HeritageSite records.`
    );

    console.log("\n========================================");
    console.log("Checking exhibition catalogue...");
    console.log("========================================\n");

    console.log(
      `Total artworks to seed: ${artsWithMakingProcess.length}`
    );

    // ------------------------------------------------------------
    // Check duplicate slugs
    // ------------------------------------------------------------

    const slugs = artsWithMakingProcess.map((art) => art.slug);

    const duplicateSlugs = slugs.filter(
      (slug, index) => slugs.indexOf(slug) !== index
    );

    if (duplicateSlugs.length > 0) {
      throw new Error(
        `Duplicate slug(s) found in seed file: ${[
          ...new Set(duplicateSlugs),
        ].join(", ")}`
      );
    }

    // ------------------------------------------------------------
    // Check duplicate QR IDs
    // ------------------------------------------------------------

    const qrIds = artsWithMakingProcess
      .map((art) => art.qrId)
      .filter(Boolean);

    const duplicateQrIds = qrIds.filter(
      (qrId, index) => qrIds.indexOf(qrId) !== index
    );

    if (duplicateQrIds.length > 0) {
      throw new Error(
        `Duplicate qrId(s) found in seed file: ${[
          ...new Set(duplicateQrIds),
        ].join(", ")}`
      );
    }

    console.log("Catalogue validation passed.");

    console.log("\n========================================");
    console.log("Seeding exhibition artworks...");
    console.log("========================================\n");

    let created = 0;

    for (const art of artsWithMakingProcess) {
      await HeritageSite.create(art);

      created += 1;

      console.log(
        `Created: ${art.slug} | ${art.qrId} | ${art.name}`
      );

      console.log(
        `  Making process steps: ${art.makingProcess.length}`
      );
    }

    console.log("\n========================================");
    console.log("SEED COMPLETE");
    console.log("========================================");

    console.log(`Created: ${created}`);
    console.log(
      `Exhibition artworks: ${artsWithMakingProcess.length}`
    );
    console.log(
      `Old records removed: ${deleteResult.deletedCount}`
    );

    console.log("========================================\n");

    process.exit(0);
  } catch (error) {
    console.error("\nSeed failed:");
    console.error(error);

    process.exit(1);
  }
};

seedExhibitionArts();