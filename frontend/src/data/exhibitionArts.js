/**
 * Exhibition artworks from the provided catalogue images.
 * Used as fallback when the /sites API is unavailable, and mirrors
 * backend/seed/seedExhibitionArts.js so the catalogue stays consistent.
 */
const exhibitionArts = [
  {
    slug: "self-image-self-acceptance-duality",
    qrId: "HL-101",
    name: "Self-Image, Self-Acceptance, Duality",
    shortDescription:
      "My art work is reflective of a tradition acrylic art medium. Acrylic on canvas is a reflection of a personal self love journey, transition, transformation and acceptance.",
    tagline: "HANDPAINTED",
    locationLabel: "Acrylic on canvas",
    heroImage: "/images/gallery.jpg",
    image: "/images/gallery.jpg",
    history:
      "My art work is reflective of a tradition acrylic art medium. Acrylic on canvas is a reflection of a personal self love journey, transition, transformation and acceptance.",
    material: "Acrylic on canvas",
    craft: "Handpainted",
    artisan: { name: "Rikma Thapa", role: "Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "timeless-bloom",
    qrId: "HL-102",
    name: "Timeless Bloom",
    shortDescription:
      "A fine blend of Van Gogh's Irises and Vermeer's Girl with a Pearl Earring, created with one purpose: to show that art is timeless. Even when two distinct periods possess their own artistic styles, they can still come together to create something that transcends time.",
    tagline: "HANDPAINTED",
    locationLabel: "Acrylic / mixed",
    heroImage: "/images/gallery1.jpg",
    image: "/images/gallery1.jpg",
    history:
      "A fine blend of Van Gogh's Irises and Vermeer's Girl with a Pearl Earring, created with one purpose: to show that art is timeless.",
    material: "Paint on canvas",
    craft: "Handpainted",
    artisan: { name: "Mokshada Thapa", role: "Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "the-golden-hour-veil",
    qrId: "HL-103",
    name: "The Golden Hour Veil",
    shortDescription:
      "A fleeting moment where cold stillness is softened by gold. In this piece, the harsh chill of winter recedes beneath the gentle light of the setting sun, captured through reflective paths, delicate branches, and the quiet presence of a solitary red bird high in the trees.",
    tagline: "HANDPAINTED",
    locationLabel: "Nepal",
    heroImage: "/images/gallery.jpg",
    image: "/images/gallery.jpg",
    history:
      "A fleeting moment where cold stillness is softened by gold — winter light, delicate branches, and a solitary red bird.",
    material: "Paint on canvas",
    craft: "Handpainted",
    artisan: { name: "Sonika Giri", role: "Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "the-hidden-sanctuary",
    qrId: "HL-104",
    name: "The Hidden Sanctuary",
    shortDescription:
      "Framed by tall pine trees, this painting captures the quiet beauty of the Nepali mountains. With textured greenery, a flowing waterfall, and snowy peaks, it invites the viewer to step into nature and admire the timeless Himalayas.",
    tagline: "HANDPAINTED",
    locationLabel: "Nepali Himalayas",
    heroImage: "/images/nyatapola.jpg",
    image: "/images/nyatapola.jpg",
    history:
      "Framed by tall pine trees — textured greenery, waterfall and snowy peaks of the timeless Himalayas.",
    material: "Paint on canvas",
    craft: "Handpainted",
    artisan: { name: "Sonika Giri", role: "Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "the-cost-of-air",
    qrId: "HL-105",
    name: "The Cost of Air – Environmental Degradation & Pollution Endurance",
    shortDescription:
      "The Cost of Air explores the consequences of environmental collapse through the image of a meditating monk dependent on oxygen tanks and a gas mask. The blue tubes replacing his hands symbolize humanity's growing dependence on technology for survival.",
    tagline: "DIGITAL ARTWORK",
    locationLabel: "Digital",
    heroImage: "/images/Statue.jpg",
    image: "/images/Statue.jpg",
    history:
      "A meditating monk dependent on oxygen tanks and a gas mask. What does enlightenment mean if we can no longer breathe clean air?",
    material: "Digital",
    craft: "Digital Artwork",
    artisan: { name: "Ronish Prajapati", role: "Digital Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "contemporary-art-monk",
    qrId: "HL-106",
    name: "Contemporary Art",
    shortDescription:
      "The artwork is a photo overlay poster image of a monk worshipping a deity with another photo of a courtyard central deity's face details being painted overlayed on top of his head. The surrounding courtyard area is colored vibrantly.",
    tagline: "DIGITAL ARTWORK",
    locationLabel: "Digital / photo overlay",
    heroImage: "/images/SiddhiLakshmi.jpg",
    image: "/images/SiddhiLakshmi.jpg",
    history:
      "Photo overlay of devotion and vibrant courtyard — self-awareness and existence in contrast to the world around.",
    material: "Digital photo overlay",
    craft: "Digital Artwork",
    artisan: { name: "Rohan Man Shakya", role: "Digital Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "footsteps-of-stillness",
    qrId: "HL-107",
    name: "Footsteps of Stillness",
    shortDescription:
      "Amidst ancient ruins and a vibrant, dew-kissed field, a traveler follows a winding trail of stepping stones. This journey is a deliberate pilgrimage, not an escape from reality, but a purposeful search for equilibrium.",
    tagline: "DIGITAL ARTWORK",
    locationLabel: "Digital",
    heroImage: "/images/gallery.jpg",
    image: "/images/gallery.jpg",
    history:
      "Ancient ruins, dew-kissed field, stepping stones — a pilgrimage toward equilibrium and duality.",
    material: "Digital",
    craft: "Digital Artwork",
    artisan: { name: "Sagun Bishwokarma", role: "Digital Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "mountains-prapti",
    qrId: "HL-108",
    name: "Mountains",
    shortDescription: "A piece of Nature made in canvas roll using acrylic medium.",
    tagline: "HANDCRAFTED ARTWORK",
    locationLabel: "Acrylic on canvas roll",
    heroImage: "/images/nyatapola.jpg",
    image: "/images/nyatapola.jpg",
    history: "A piece of Nature made in canvas roll using acrylic medium.",
    material: "Acrylic on canvas roll",
    craft: "Handcrafted",
    artisan: { name: "Prapti Bhetawal", role: "Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "the-birth-of-divinity",
    qrId: "HL-109",
    name: "The Birth of Divinity",
    shortDescription:
      "Woven in traditional Dhaka handloom, this artwork portrays Nagadaha, the legendary lake from which the Mahachaitaya of Swayambhu is believed to have emerged. A radiant lotus opens to reveal Swayambhunath; five coloured ribbons represent the Pancha Buddha.",
    tagline: "HANDCRAFTED ARTWORK",
    locationLabel: "Dhaka handloom",
    heroImage: "/images/SiddhiLakshmi.jpg",
    image: "/images/SiddhiLakshmi.jpg",
    history:
      "Nagadaha, Swayambhu, radiant lotus and Pancha Buddha ribbons — woven in traditional Dhaka handloom.",
    material: "Traditional Dhaka handloom",
    craft: "Handcrafted / woven",
    artisan: { name: "Chunu Bastola", role: "Textile Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "the-hidden-world-beneath-the-surface",
    qrId: "HL-110",
    name: "The Hidden World Beneath the Surface",
    shortDescription:
      "An expressive oil painting portraying a figure submerged beneath rippling water, blending vibrant red and orange tones with deep blue reflections to create a sense of movement, mystery, and emotional depth.",
    tagline: "HANDCRAFTED ARTWORK",
    locationLabel: "Oil on canvas",
    heroImage: "/images/gallery1.jpg",
    image: "/images/gallery1.jpg",
    history:
      "Figure submerged beneath rippling water — red, orange and deep blue reflections.",
    material: "Oil paint",
    craft: "Handcrafted / oil painting",
    artisan: { name: "Nitika Shrestha", role: "Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "lakhe",
    qrId: "HL-111",
    name: "Lakhe",
    shortDescription:
      "This artwork presents Lakhe as a ferocious, supernatural figure through a highly expressive contemporary style.",
    tagline: "DIGITAL ARTWORK",
    locationLabel: "Digital / contemporary",
    heroImage: "/images/BhupatindraMalla.jpg",
    image: "/images/BhupatindraMalla.jpg",
    history:
      "Lakhe as a ferocious, supernatural figure in highly expressive contemporary style.",
    material: "Digital",
    craft: "Digital Artwork",
    artisan: { name: "Anubhav Pradhan", role: "Digital Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "illustration-goddess",
    qrId: "HL-112",
    name: "Illustration",
    shortDescription:
      "A monochrome illustration of a multiarmed goddess that highlights elements of our traditional artforms through means of centralism, proportion and symbolism. Accompanied by wooden elements of Newari architecture such as the toran, swirl and tudal.",
    tagline: "DIGITAL ARTWORK",
    locationLabel: "Monochrome illustration",
    heroImage: "/images/SiddhiLakshmi.jpg",
    image: "/images/SiddhiLakshmi.jpg",
    history:
      "Multiarmed goddess with Newari architectural elements — toran, swirl and tudal.",
    material: "Digital illustration",
    craft: "Digital Artwork",
    artisan: { name: "Rohan Man Shakya", role: "Illustrator", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "between-water-and-memory",
    qrId: "HL-113",
    name: "Between Water and Memory",
    shortDescription:
      "Atmospheric contemporary illustration combining impressionistic brushwork, digital distortion, and dreamlike natural imagery.",
    tagline: "DIGITAL ARTWORK",
    locationLabel: "Digital illustration",
    heroImage: "/images/gallery.jpg",
    image: "/images/gallery.jpg",
    history:
      "Impressionistic brushwork, digital distortion and dreamlike natural imagery.",
    material: "Digital illustration",
    craft: "Digital Artwork",
    artisan: { name: "Nima Ongel Sherpa", role: "Illustrator", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "home-identity-the-journey-beyond",
    qrId: "HL-114",
    name: "Home, Identity & The Journey Beyond",
    shortDescription:
      "An astronaut carrying the spirit of Nepal into the unknown, symbolizing identity, exploration, and connection to home.",
    tagline: "DIGITAL ARTWORK",
    locationLabel: "Digital",
    heroImage: "/images/image.png",
    image: "/images/image.png",
    history:
      "Astronaut carrying the spirit of Nepal — identity, exploration and connection to home.",
    material: "Digital",
    craft: "Digital Artwork",
    artisan: { name: "Nima Ongel Sherpa", role: "Digital Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "thangka-painting-shakyamuni",
    qrId: "HL-115",
    name: "Thangka Painting",
    shortDescription:
      "This artwork is traditional hand-painted thangka painting depicting Shakyamuni Buddha with bhumisparsha mudra.",
    tagline: "TRADITIONAL ARTWORK",
    locationLabel: "Hand-painted thangka",
    heroImage: "/images/SiddhiLakshmi.jpg",
    image: "/images/SiddhiLakshmi.jpg",
    history:
      "Traditional hand-painted thangka of Shakyamuni Buddha with bhumisparsha mudra.",
    material: "Traditional thangka pigments",
    craft: "Thangka painting",
    artisan: { name: "Shaira Gurung", role: "Thangka Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "love-and-benevolence",
    qrId: "HL-116",
    name: "Love and Benevolence",
    shortDescription:
      "A traditional painting of lord Krishna made using acrylic medium on canvas roll.",
    tagline: "TRADITIONAL ARTWORK",
    locationLabel: "Acrylic on canvas roll",
    heroImage: "/images/BhupatindraMalla.jpg",
    image: "/images/BhupatindraMalla.jpg",
    history: "Traditional painting of lord Krishna in acrylic on canvas roll.",
    material: "Acrylic on canvas roll",
    craft: "Traditional painting",
    artisan: { name: "Prapti Bhetawal", role: "Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "manjushri",
    qrId: "HL-117",
    name: "Manjushri",
    shortDescription:
      "The artwork captures Manjushri, the Bodhisattva of Wisdom, depicted in a tranquil and meditative posture. Seated in the vajra posture, holding the sword of wisdom in his right hand to sever ignorance; the left hand holds the stem of a utpala flower with the Prajnaparamita book above.",
    tagline: "TRADITIONAL ARTWORK",
    locationLabel: "Contemporary traditional",
    heroImage: "/images/SiddhiLakshmi.jpg",
    image: "/images/SiddhiLakshmi.jpg",
    history:
      "Manjushri — Bodhisattva of Wisdom — sword of wisdom and Prajnaparamita in a contemporary reading of the traditional form.",
    material: "Paint",
    craft: "Traditional / contemporary",
    artisan: { name: "Sugat Shakya", role: "Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "portrait-prashanna",
    qrId: "HL-118",
    name: "Portrait",
    shortDescription:
      "It's an old man expressing deep emotion after seeing something. As for what that emotion is or what he saw is up for interpretation.",
    tagline: "CHARCOAL ARTWORK",
    locationLabel: "Charcoal",
    heroImage: "/images/artisan.jpg",
    image: "/images/artisan.jpg",
    history:
      "An old man expressing deep emotion after seeing something — left open to interpretation.",
    material: "Charcoal",
    craft: "Charcoal drawing",
    artisan: { name: "Prashanna Sthapit", role: "Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "transformation-through-loss-and-survival",
    qrId: "HL-119",
    name: "Transformation Through Loss and Survival",
    shortDescription:
      "The skull represents the pieces of ourselves that had to die—the old version of us, lost innocence, people we let go of and beliefs that no longer remain. Yet, from those wounds, something new begins to grow.",
    tagline: "CHARCOAL ARTWORK",
    locationLabel: "Charcoal",
    heroImage: "/images/artisan.jpg",
    image: "/images/artisan.jpg",
    history:
      "The skull as what had to die so that something new can grow — loss, survival, transformation.",
    material: "Charcoal",
    craft: "Charcoal drawing",
    artisan: { name: "Mahika Lakoul", role: "Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "through-his-eyes",
    qrId: "HL-120",
    name: "Through His Eyes",
    shortDescription:
      "A child's eyes often hold more than what they simply see. In his reflection, we see his father working in the field—a quiet reminder of the hard work, sacrifices, and love behind a family's dreams.",
    tagline: "CHARCOAL ARTWORK",
    locationLabel: "Charcoal",
    heroImage: "/images/artisan.jpg",
    image: "/images/artisan.jpg",
    history:
      "A child's gaze reflecting a father's labour — hard work, sacrifice and love behind a family's dreams.",
    material: "Charcoal",
    craft: "Charcoal drawing",
    artisan: { name: "Deepti Agarwal", role: "Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "a-little-hope",
    qrId: "HL-121",
    name: "A Little Hope",
    shortDescription:
      "A quiet reminder to keep reaching for our dreams, even when they seem distant. The girl represents innocence, hope, and curiosity, while the glowing moon symbolizes the dreams that guide us through dark and uncertain moments.",
    tagline: "CHARCOAL ARTWORK",
    locationLabel: "Charcoal / mixed",
    heroImage: "/images/gallery1.jpg",
    image: "/images/gallery1.jpg",
    history:
      "A girl and a glowing moon — innocence, hope, and the courage to reach for distant dreams.",
    material: "Charcoal / mixed media",
    craft: "Charcoal drawing",
    artisan: { name: "Deepti Agarwal", role: "Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "himalayan-mountain",
    qrId: "HL-122",
    name: "Himalayan Mountain",
    shortDescription:
      "A detailed Himalayan mountain painting featuring dramatic rocky peaks, snowy glaciers and created with bold textures and contrasting colours.",
    tagline: "HANDPAINTED ART",
    locationLabel: "Himalayas",
    heroImage: "/images/nyatapola.jpg",
    image: "/images/nyatapola.jpg",
    history:
      "Dramatic rocky peaks, snowy glaciers — bold textures and contrasting colours.",
    material: "Paint on canvas",
    craft: "Handpainted",
    artisan: { name: "Rupesh Poddar", role: "Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "timeless-piece",
    qrId: "HL-123",
    name: "Timeless Piece",
    shortDescription:
      "A timeless piece for collectors who love the mountains, and a little bit of the summit for your wall.",
    tagline: "HANDPAINTED ART",
    locationLabel: "Himalayas",
    heroImage: "/images/nyatapola.jpg",
    image: "/images/nyatapola.jpg",
    history: "A timeless piece for collectors who love the mountains.",
    material: "Paint on canvas",
    craft: "Handpainted",
    artisan: { name: "Rupesh Poddar", role: "Artist", location: "Nepal" },
    isActive: true,
  },
  {
    slug: "himalayan-serenity-village-life",
    qrId: "HL-124",
    name: "Himalayan Serenity & Village Life",
    shortDescription:
      "A peaceful Himalayan village nestled beneath majestic snow-covered peaks, capturing the harmony between nature, spirituality, and everyday mountain life.",
    tagline: "HANDPAINTED ART",
    locationLabel: "Himalayan village",
    heroImage: "/images/nyatapola.jpg",
    image: "/images/nyatapola.jpg",
    history:
      "Peaceful Himalayan village beneath snow peaks — nature, spirituality and everyday mountain life.",
    material: "Paint on canvas",
    craft: "Handpainted",
    artisan: { name: "Roshan Yagol Shrestha", role: "Artist", location: "Nepal" },
    isActive: true,
  },

  {
    slug: "nyatapola",
    qrId: "HL-125",
    name: "Nyatapola Temple",
    shortDescription:
      "The five-storey Nyatapola Temple of Bhaktapur stands as one of Nepal's tallest and most elegant pagoda temples. Built in 1702 by King Bhupatindra Malla, it is dedicated to the tantric goddess Siddhi Lakshmi and remains a living symbol of Newar craftsmanship and devotion.",
    tagline: "HERITAGE TEMPLE",
    locationLabel: "Taumadhi Square, Bhaktapur, Nepal",
    heroImage: "/images/nyatapola.jpg",
    image: "/images/nyatapola.jpg",
    history:
      "Built in 1702 by King Bhupatindra Malla, Nyatapola Temple is the tallest pagoda-style temple in Nepal. Its five tiers rest on a stepped plinth guarded by pairs of stone figures — wrestlers, elephants, lions, griffins, and goddesses — each ten times stronger than the pair below. The temple is dedicated to Siddhi Lakshmi and has survived major earthquakes, including 1934 and 2015, as a testament to traditional Newar engineering.",
    material: "Brick, timber, and terracotta",
    craft: "Newar pagoda architecture",
    culturalStory:
      "Nyatapola means 'five storeys' in Newari. Pilgrims and visitors climb the steep steps past guardian statues into the sacred presence of Siddhi Lakshmi. Festivals, daily worship, and the surrounding Taumadhi Square keep this heritage site alive as both monument and living temple.",
    artisan: {
      name: "Newar Master Builders",
      role: "Traditional architects & craftsmen",
      location: "Bhaktapur, Nepal",
      bio: "Generations of Newar builders, carvers and painters created Nyatapola's soaring form — a collaboration of community, king and craft that still defines Bhaktapur's skyline.",
    },
    gallery: ["/images/nyatapola.jpg", "/images/SiddhiLakshmi.jpg", "/images/BhupatindraMalla.jpg", "/images/gallery.jpg"],
    isActive: true,
  },
];

export default exhibitionArts;

export const getArtBySlug = (slug) =>
  exhibitionArts.find((a) => a.slug === slug) || null;

export const getArtByQrId = (qrId) =>
  exhibitionArts.find(
    (a) => a.qrId && a.qrId.toUpperCase() === String(qrId).toUpperCase()
  ) || null;
