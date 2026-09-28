// Run: cd backend
// Then: node seed/seedSites.js

const dotenv= require("dotenv");
const connectDB = require("../config/db");
const HeritageSite = require("../models/HeritageSite");

dotenv.config();

const sites = [
    {
        slug: "bagh-bhairav",
        codePrefix: "BB",
        name: "Bagh Bhairav Temple",
        shortDescription: "The Tiger Sentinel of Kirtipur",
        tagline: "The Tiger Sentinel",
        locationLabel: "Kirtipur,Nepal",
        heroImage:"/images/baghbhairavtemple.png",
        history:
            "Standing as a silent guardian of Kirtipur for centuries, this ancient fortress temple preserve the spirit of Newar warriors and the divine protection of Bhairav",
        hiddenStory:
            "Some stories are not written in books. They live in the voices of those who protect Nepal's heritage. Unlock exclusive legends, forgotten rituals, hidden temple secrests, sacred belifs, and fascinating stories surrounding Bagh Bhairav Temple that very few visitors ever get to hear.",
        audioTitle: "The Legend of the Tongue-Less Deity",
        audioGuide: "/audio/baghbhairav.mp3",
        video: "/videos/baghbhairav.mp4",
        gallery: [
            "/images/baghbhairavtemple.png",
            "/images/gallery.jpg",
            "/images/gallery1.jpg",
            "/images/image.png",
            
        ],
        chapters:[
            {
                title: "Chapter 1",
                heading: "The Birth of the Guardian",
                content:
                    "Long before kirtipur became the historic town we know today, the people the people believed a powerful guardian protected the valley. Bagh Bhairav was worshipped as the fearless protector of the community, symbolizing courage, justice, and strength.",
            },
            {
                title: "Chapter 2",
                heading: "The Great Battle",
                content:
                "Throughout history, the people of Kirtipur prayed to Bagh Bhairav during difficult times. The deity became a symbol of resilience, inspiring generations to defend their culture and traditions.",
            },
            {
                title: "Chapter 3",
                heading: "Living Heritage",
                content:
                "Today, Bagh Bhairav Temple remains one of Nepal's most important heritage sites. Festivals, rituals, and traditional Newar culture continue to keep its legacy alive for future generations.",
            },
            {
               title:"Chapter 4",
               heading: "Timeline of Preservation",
               timeline:[
                {
                    year: "1515 A.D.", 
                    title: "Resdidence of Byaghrevara"
                },
                {
                    year: "1587 A.D.",
                    title: "Golden Kalasha Added"
                },
                {
                    year: "1703 A.D.",
                    title: "Gold-plated Copper Entrance"
                },
                {
                    year:"1717 A.D.",
                    title:"Hanuman Stone Figures Installed"
                },
                {
                    year: "1803 A.D.",
                    title: "70.5 kg temple Bell Insttalled"
                },
                {
                    year: "1936 A.D.",
                    title: "Major Temple Decoration"
                },
                {
                    year: "1867 A.D.",
                    title: "Godavari Marble Installed"
                },
               ],
            },
        ],
        artisan:{
            name: "RajBhai Tandukar",
            role: "Master Wood Carver",
            location: "Balambu, Chandagiri",
            image: "/images/artisan.jpg",
            bio:
            "With over 25 years of experience, RajBhai Tandukar continues the tional Newar art of wood carving. Every HeritageLink souvenir is handcrafted with dedication and respect for Nepal's cultural heritage.",
            // Dedicated artisan interview video for the premium
            // "Meet the Artisan" section (Page 2 of the QR experience).
            video: "/videos/baghbhairav.mp4",
        },
        material: "Hand-carved wood",
        craft: "Traditional Newar wood carving",
        culturalStory:
            "Bagh Bhairav has stood as Kirtipur's protector for centuries, and every carved reproduction carries that same watchfulness — a small piece of the temple's living heritage, shaped by hands trained in the same tradition as the original artisans.",
        makingProcess: [
            { title: "Selecting the Material", description: "Seasoned local wood is chosen for its grain and durability." },
            { title: "Preparing the Material", description: "The wood is cut and smoothed into a rough working block." },
            { title: "Designing & Sketching", description: "The Bagh Bhairav form is sketched onto the block, following traditional Newar proportions." },
            { title: "Hand Carving", description: "The artisan carves the figure by hand using traditional chisels." },
            { title: "Detailing", description: "Fine details — the tiger features, ornamentation, and expression — are carved in." },
            { title: "Finishing", description: "The surface is sanded and treated to protect and enrich the wood." },
            { title: "Final Artwork", description: "The finished piece is inspected, sealed, and paired with its HeritageLink QR code." },
        ],
        badge:{
            title:"Bagh bhairav Explorer",
            image: "/images/badge.jpg",
            description:
            "Awarded for completing the Bagh Bhairav Temple heritage journey.",
        },
        latitude: 27.6788,
        longitude: 85.2777,
        isActive: true,
          translations: {
            ne: {
                name: "बाघ भैरव मन्दिर",
                tagline: "बाघ संरक्षक",
                shortDescription: "कीर्तिपुरको बाघ संरक्षक",
                locationLabel: "कीर्तिपुर, नेपाल",
                history: "शताब्दियौंदेखि कीर्तिपुरको मौन संरक्षकको रूपमा उभिएको यो पुरानो किल्लाकार मन्दिरले नेवार योद्धाहरूको भावना र भैरवको दैवी सुरक्षालाई संरक्षण गर्दछ।",
                hiddenStory: "केही कथाहरू किताबहरूमा लेखिएका हुँदैनन्। तिनीहरू नेपालको सम्पदा संरक्षण गर्नेहरूको आवाजमा बाँच्छन्। बाघ भैरव मन्दिरको वरिपरि रहेका विशेष किंवदन्तीहरू, बिर्सिएका अनुष्ठानहरू, लुकेका मन्दिर रहस्यहरू अनलक गर्नुहोस्।",
                audioTitle: "जिब्रो नभएको देवताको किंवदन्ती",
                artisan: {
                    role: "मुख्य काठ शिल्पकार",
                    location: "बालम्बु, चन्द्रागिरी",
                    bio: "२५ वर्षभन्दा बढी अनुभवका साथ, राजभाइ तान्दुकारले पारम्परिक नेवार काठ शिल्पकलालाई निरन्तरता दिइरहेका छन्। प्रत्येक हेरिटेजलिंक स्मृति चिन्ह नेपालको सांस्कृतिक सम्पदाको सम्मानमा हातले बनाइएको हुन्छ।",
                },
                badge: {
                    title: "बाघ भैरव अन्वेषक",
                    description: "बाघ भैरव मन्दिर सम्पदा यात्रा पूरा गरेकोमा प्रदान गरिएको।",
                },
            },
            new: {
                name: "बाघ भैरव देगः",
                tagline: "बाघ रक्षक",
                shortDescription: "कीर्तिपुरयागु बाघ रक्षक",
                locationLabel: "कीर्तिपुर, नेपाल",
                history: "छगू शताब्दी दयेकुनु कीर्तिपुरयागु रक्षकयागु रूपय् दुगु थ्व देगःयेन नेवाः योद्धापिनिगु भावना व भैरवयागु रक्षा तयातःगु दु।",
                hiddenStory: "छुं कथा पुस्तकय् मदु। थ्व कथापिं नेपालयागु सम्पदा रक्षा यायेगु मनूतयगु स्वरय् दु। बाघ भैरव देगःया वरिपरि दुगु किंवदन्ती व तयेकः रहस्य खुलेका।",
                audioTitle: "मे मदुगु देवयागु किंवदन्ती",
                artisan: {
                    role: "मू सिकः शिल्पकार",
                    location: "बालम्बु, चन्द्रागिरी",
                    bio: "२५ दं हे यक्व अनुभव दुगु राजभाइ तान्दुकारं नेवाः सिकः शिल्पकला थ्यंकातःगु दु। हेरिटेजलिंकयागु सुम्ति चिं नेपालयागु सम्पदा हे सम्मानय् तयातःगु दु।",
                },
                badge: {
                    title: "बाघ भैरव अन्वेषक",
                    description: "बाघ भैरव देगःयागु सम्पदा यात्रा थ्यंकातःगु ला।",
                },
            },
        },
    },
    {
        slug: "nyatapola",
        codePrefix: "NT",
        name: "Nyatapola Temple",
        shortDescription: "The Five-Storey Wonder of Bhaktapur",
        tagline: "The Five-Storey Wonder",
        locationLabel: "Bhaktapur, Nepal",
        heroImage: "/images/nyatapola.jpg",
        history:
            "Rising five stories above Taumadhi Square, Nyatapola is Nepal's tallest pagoda temple, its stairway guarded by pairs of stone figures said to each be ten times stronger than the one below.",
        hiddenStory:
            "Legend says the temple's guardians grow stronger with every step — wrestlers, elephants, lions, griffins, and finally the goddesses Baghini and Singhini themselves, each pair ten times mightier than the last.",
        audioTitle: "The Legend of the Five Guardians",
        audioGuide: "/audio/baghbhairav.mp3",
        video: "/videos/baghbhairav.mp4",
          gallery: [
            "/images/nytapola.jpg",
            "/images/BhupatindraMalla.jpg",
            "/images/Statue.jpg",
            "/images/SiddhiLakshmi.jpg",
            
        ],
      chapters: [
    {
        title: "Chapter 1",
        heading: "The Rise of Nyatapola",
        content:
            "Built in 1702 A.D. during the reign of King Bhupatindra Malla, Nyatapola Temple stands as the tallest pagoda-style temple in Nepal. Dedicated to the powerful goddess Siddhi Lakshmi, the temple was designed to symbolize strength, balance, and divine protection.",
    },
    {
        title: "Chapter 2",
        heading: "A Temple of Strength",
        content:
            "Nyatapola is famous for its remarkable engineering and resilience. Despite experiencing several major earthquakes over the centuries, including the devastating 2015 earthquake, the temple remained standing with only minor damage, showcasing the brilliance of traditional Newar architecture.",
    },
    {
        title: "Chapter 3",
        heading: "Living Heritage",
        content:
            "Today, Nyatapola Temple is one of Bhaktapur's most treasured landmarks and an important part of Nepal's cultural heritage. Thousands of visitors admire its five-tiered structure, while local festivals and Newar traditions continue to keep its spiritual and cultural significance alive.",
    },
    {
        title: "Chapter 4",
        heading: "Timeline of Preservation",
        timeline: [
            {
                year: "1702 A.D.",
                title: "Temple Constructed by King Bhupatindra Malla"
            },
            {
                year: "18th Century",
                title: "Five-Tier Pagoda Completed"
            },
            {
                year: "1934 A.D.",
                title: "Survived the Great Nepal Earthquake"
            },
            {
                year: "1979 A.D.",
                title: "Bhaktapur Durbar Square Listed as UNESCO World Heritage Site"
            },
            {
                year: "2015 A.D.",
                title: "Withstood the Gorkha Earthquake with Minor Damage"
            },
            {
                year: "2016 A.D.",
                title: "Conservation and Structural Inspections Completed"
            },
            {
                year: "Present",
                title: "Ongoing Heritage Preservation and Cultural Celebrations"
            },
        ],
    },
],
         artisan:{
            name: "RajBhai Tandukar",
            role: "Master Wood Carver",
            location: "Balambu, Chandagiri",
            image: "/images/artisan.jpg",
            bio:
            "With over 25 years of experience, RajBhai Tandukar continues the tional Newar art of wood carving. Every HeritageLink souvenir is handcrafted with dedication and respect for Nepal's cultural heritage.",
        },
        badge: {
            title: "Nyatapola Explorer",
            image: "/images/badge.jpg",
            description: "Awarded for completing the Nyatapola Temple heritage journey.",
        },
        latitude: 27.671,
        longitude: 85.4298,
        isActive: true,
        translations: {
            ne: {
    name: "न्यातपोल मन्दिर",
    tagline: "पाँच तले आश्चर्य",
    shortDescription: "भक्तपुरको पाँच तले आश्चर्य",
    locationLabel: "भक्तपुर, नेपाल",
    history:
        "टौमढी चोकमा पाँच तलामाथि ठडिएको, न्यातपोल नेपालको सबैभन्दा अग्लो पगोडा शैलीको मन्दिर हो। यसको सिँढीमा जोडिएका ढुंगाका मूर्तिहरू प्रत्येक तल्लो तहभन्दा दश गुणा बढी बलिया मानिन्छन्।",
    hiddenStory:
        "किंवदन्ती अनुसार मन्दिरका संरक्षकहरू प्रत्येक सिँढीसँगै बलियो हुँदै जान्छन् — पहलमानहरू, हात्तीहरू, सिंहहरू, शार्दूलहरू र अन्त्यमा देवी बाघिनी र सिंहिनी, जहाँ प्रत्येक जोडी मुनिको भन्दा दश गुणा शक्तिशाली मानिन्छ।",
    audioTitle: "पाँच संरक्षकहरूको किंवदन्ती",
    chapters: [
        {
            title: "अध्याय १",
            heading: "न्यातपोलको निर्माण",
            content:
                "इस्वी संवत् १७०२ मा राजा भूपतीन्द्र मल्लको शासनकालमा निर्माण गरिएको न्यातपोल मन्दिर नेपालकै सबैभन्दा अग्लो पगोडा शैलीको मन्दिर हो। शक्तिशाली देवी सिद्धि लक्ष्मीलाई समर्पित यो मन्दिर शक्ति, सन्तुलन र दिव्य सुरक्षाको प्रतीकको रूपमा डिजाइन गरिएको थियो।",
        },
        {
            title: "अध्याय २",
            heading: "शक्तिको मन्दिर",
            content:
                "न्यातपोल आफ्नो अद्भुत वास्तुकला र भूकम्पीय प्रतिरोध क्षमताका लागि प्रसिद्ध छ। शताब्दीयौंदेखि विसं १९९० र २०७२ (सन् २०१५) को विनाशकारी भूकम्प लगायत धेरै ठूला भूकम्पहरू भोगे पनि, यो मन्दिर परम्परागत नेवार वास्तुकलाको उत्कृष्ट उदाहरण प्रस्तुत गर्दै सामान्य क्षतिसहित सुरक्षित उभिरह्यो।",
        },
        {
            title: "अध्याय ३",
            heading: "जीवन्त सम्पदा",
            content:
                "आज न्यातपोल मन्दिर भक्तपुरको सबैभन्दा बहुमूल्य पहिचान र नेपालको सांस्कृतिक सम्पदाको एक महत्त्वपूर्ण अंग हो। हजारौं आगन्तुकहरू यसको पाँच तले संरचनाको प्रशंसा गर्छन्, भने स्थानीय जात्रा-पर्व र नेवारी परम्पराहरूले यसको धार्मिक तथा सांस्कृतिक महत्त्वलाई जीवन्त राखिरहेका छन्।",
        },
        {
            title: "अध्याय ४",
            heading: "संरक्षणको समयरेखा",
            timeline: [
                {
                    year: "सन् १७०२",
                    title: "राजा भूपतीन्द्र मल्लद्वारा मन्दिर निर्माण"
                },
                {
                    year: "१८ औं शताब्दी",
                    title: "पाँच तले पगोडाको पूर्ण निर्माण"
                },
                {
                    year: "सन् १९३४ (वि.सं. १९९०)",
                    title: "महाभूकम्पमा पनि सुरक्षित रहन सफल"
                },
                {
                    year: "सन् १९७९",
                    title: "भक्तपुर दरबार क्षेत्र युनेस्को विश्व सम्पदा सूचीमा सूचीकृत"
                },
                {
                    year: "सन् २०१५ (वि.सं. २०७२)",
                    title: "गोर्खा भूकम्पमा सामान्य क्षतिसहित सुरक्षित"
                },
                {
                    year: "सन् २०१६",
                    title: "संरक्षण र संरचनात्मक निरीक्षण सम्पन्न"
                },
                {
                    year: "वर्तमान",
                    title: "निरन्तर सम्पदा संरक्षण तथा सांस्कृतिक उत्सवहरू"
                },
            ],
        },
    ],
    artisan: {
        name: "राजभाइ तण्डुकार",
        role: "मास्टर काष्ठकलाकार",
        location: "बलम्बु, चन्द्रागिरि",
        bio:
            "२५ वर्षभन्दा बढीको अनुभवका साथ, राजभाइ तण्डुकार काष्ठकलाको परम्परागत नेवारी कलालाई निरन्तरता दिँदै हुनुहुन्छ। हेरिटेजलिङ्कका (HeritageLink) प्रत्येक चिनो नेपालको सांस्कृतिक सम्पदाप्रतिको समर्पण र सम्मानका साथ हातैले तयार पारिएका हुन्।",
    },
    badge: {
        title: "न्यातपोल अन्वेषक",
        description: "न्यातपोल मन्दिर सम्पदा यात्रा पूरा गरेकोमा प्रदान गरिएको।",
    },
},
           new: {
    name: "न्यातपोल देगः",
    tagline: "ङ्यातँ जाःगु आश्चर्य",
    shortDescription: "ख्वपया ङ्यातँ जाःगु आश्चर्य",
    locationLabel: "ख्वप, नेपाल",
    history:
        "तौमढी डबलीइ ङ्यातँ च्वये थहाँ वंगु, न्यातपोल नेपालया दक्ले तःजाःगु पगोडा शैलीया देगः खः। थुकिया स्वानेया जव-खवः च्वंपिं ल्होंया मूर्तिपिं छगू स्वया मेगु १० गुणा अप्वः शक्तियाःपिं खः धैगु विश्वास दु।",
    hiddenStory:
        "किंवदन्ती कथं देगःया रक्षा यानाच्वंपिं छगू स्वाने स्वया मेगु स्वाने वनेबिले अप्वः शक्तिशाली जुया वनि — पहलवानपिं, किसिपिं, सिंहपिं, शार्दूलपिं, व अन्त्यय् देवी बाघिनी व सिंहिनी, गनकि प्रत्येक जोडी मुनिका स्वया १० गुणा अप्वः शक्ति स्वाःगु दु।",
    audioTitle: "न्याम्ह रक्षकया बाखँ",
    chapters: [
        {
            title: "अध्याय १",
            heading: "न्यातपोलया देकेज्या",
            content:
                "इस्वी संवत् १७०२ य् जुजु भूपतीन्द्र मल्लया शासनकालय् दयेकूगु न्यातपोल देगः नेपालया दक्ले तःजाःगु पगोडा देगः खः। शक्तिशाली देवी सिद्धि लक्ष्मीयात समर्पित थ्व देगः शक्ति, सन्तुलन व दिव्य रक्षाया प्रतीकया रूपय् दयेकातःगु खः।",
        },
        {
            title: "अध्याय २",
            heading: "शक्तिया देगः",
            content:
                "न्यातपोल थगु अद्भूत शिल्प व भुखाःयात सह यायेफुगु क्षमताया लागिं नांजाः। सदियौंदेखि १९९० व २०७२ (सन् २०१५) या तःधँगु भुखाः सह यानाः नं, थ्व देगः परम्परागत नेवाः वास्तुकलाया उत्कृष्ट दसु जुयाः म्हो क्षतिया निसें सुरक्षित दनाच्वंगु दु।",
        },
        {
            title: "अध्याय ३",
            heading: "म्वाःगु सम्पदा",
            content:
                "थौंकन्हय् न्यातपोल देगः ख्वपया दक्ले महत्त्वपूर्ण म्हसीका व नेपालया सांस्कृतिक सम्पदाया छगू मू अंग खः। द्वलँद्वः मनूत थुकिया ङ्यातँ जाःगु देगः स्वयेत वै, धाःसा स्थानीय जात्रा-पर्व व नेवाः परम्परांश थुकिया धार्मिक व सांस्कृतिक महत्त्वयात म्वाकाः तयाच्वंगु दु।",
        },
        {
            title: "अध्याय ४",
            heading: "संरक्षणया समयरेखा",
            timeline: [
                {
                    year: "सन् १७०२",
                    title: "जुजु भूपतीन्द्र मल्लद्वारा देगः दयेकादीगु"
                },
                {
                    year: "१८ औं शताब्दी",
                    title: "ङ्यातँ जाःगु देगः पूर्ण रूपं सिधःगु"
                },
                {
                    year: "सन् १९३४ (वि.सं. १९९०)",
                    title: "तःधँगु भुखाः निसें नं सुरक्षित च्वनेफूगु"
                },
                {
                    year: "सन् १९७९",
                    title: "ख्वप लायकू क्षेत्र युनेस्को विश्व सम्पदा धलखय् सूचीकृत"
                },
                {
                    year: "सन् २०१५ (वि.सं. २०७२)",
                    title: "गोर्खा भुखाः निसें म्हो क्षतिया निसें बचेजूगु"
                },
                {
                    year: "सन् २०१६",
                    title: "संरक्षण व संरचनात्मक निरीक्षण क्वचाःगु"
                },
                {
                    year: "वर्तमान",
                    title: "निरन्तर सम्पदा संरक्षण व सांस्कृतिक नखः-चखःत"
                },
            ],
        },
    ],
    artisan: {
        name: "राजभाइ तण्डुकार",
        role: "मास्टर काष्ठकलाकार",
        location: "बलम्बु, चन्द्रागिरि",
        bio:
            "२५ दूँ स्वया अप्वःया अनुभव नापं, राजभाइ तण्डुकारं परम्परागत नेवाः सिँया कलायात निरन्तरता बियाच्वनादीगु दु। हेरिटेजलिङ्कया (HeritageLink) प्रत्येक स्वाँमन्दः नेपालया सांस्कृतिक सम्पदाप्रतिय निष्ठा व सम्मान नापं ल्हातं दयेकातःगु खः।",
    },
    badge: {
        title: "न्यातपोल अन्वेषक",
        description: "न्यातपोल देगःया सम्पदा यात्रा सिधेकूगुलिं बियातःगु।",
    },
},
        },
    },
];


const run = async () => {
  await connectDB();

  for (const siteData of sites) {
    const result = await HeritageSite.findOneAndUpdate(
      { slug: siteData.slug },
      siteData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`Seeded: ${result.name} (${result.slug})`);
  }

  console.log("Done.");
  process.exit(0);
};

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});