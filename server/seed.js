const mongoose = require("mongoose");
require("dotenv").config();

const FeedPost = require("./models/FeedPost");
const Lawyer = require("./models/Lawyer");

const feedPosts = [
  {
    category: "Cyber Law",
    title: "Digital Personal Data Protection Act: What You Need to Know",
    desc: "The new DPDP act fundamentally changes how Indian corporations handle user data. From consent mechanisms to heavy penalties for breaches.",
    verified: false,
    reads: 0,
    language: "English",
  },
  {
    category: "Family Law",
    title: "Mutual Consent Divorce: A Step-by-Step Procedure",
    desc: "Navigating a separation is difficult. Understanding the Cooling-off Period and required documentation can make the legal transition smoother.",
    verified: true,
    reads: 0,
    language: "English",
  },
  {
    category: "Corporate Law",
    title: "Startup Equity: Avoiding Common Founder Pitfalls",
    desc: "Early-stage equity distribution can define your company's future. Learn about vesting schedules and why Cliff periods are non-negotiable.",
    verified: false,
    reads: 1200,
    language: "English",
  },
  {
    category: "Property Law",
    title: "New Rental Laws 2024: Tenant Rights Explained",
    desc: "Protecting tenants from unfair eviction and deposit rules. Know your rights before signing any rent agreement.",
    verified: true,
    reads: 3400,
    language: "English",
  },
  {
    category: "Consumer Law",
    title: "How to File a Consumer Complaint Online",
    desc: "Step by step guide to filing consumer complaints on the National Consumer Helpline portal. Get refunds and justice easily.",
    verified: true,
    reads: 2100,
    language: "English",
  },
];

const lawyers = [
  {
    name: "Adv. Rajesh Kumar",
    specialty: "Family & Divorce Law",
    experience: "15+ Years",
    rating: 4.5,
    reviews: 120,
    price: "₹2,500",
    online: true,
    initials: "RK",
    category: "Family",
    languages: ["Hindi", "English"],
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Adv. Priya Sharma",
    specialty: "Corporate & Business Law",
    experience: "10+ Years",
    rating: 4.8,
    reviews: 85,
    price: "₹5,000",
    online: false,
    initials: "PS",
    category: "Corporate",
    languages: ["English", "Tamil"],
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Adv. Michael D'Souza",
    specialty: "Criminal Litigation",
    experience: "25+ Years",
    rating: 4.9,
    reviews: 200,
    price: "₹7,500",
    online: false,
    initials: "MD",
    category: "Criminal",
    languages: ["English", "Hindi"],
    image: "https://i.pravatar.cc/150?img=33",
  },
  {
    name: "Adv. Sunita Reddy",
    specialty: "Property & RERA Law",
    experience: "12+ Years",
    rating: 4.6,
    reviews: 95,
    price: "₹3,500",
    online: true,
    initials: "SR",
    category: "Property",
    languages: ["Telugu", "English"],
    image: "https://i.pravatar.cc/150?img=48",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected!");

    await FeedPost.deleteMany();
    await Lawyer.deleteMany();
    console.log("Old data cleared!");

    await FeedPost.insertMany(feedPosts);
    await Lawyer.insertMany(lawyers);
    console.log("Seed data inserted!");

    mongoose.connection.close();
    console.log("Done!");
  } catch (err) {
    console.log("Error:", err);
  }
};

seedDB();