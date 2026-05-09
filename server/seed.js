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
    reads: 890,
    language: "English",
    url: "https://indiankanoon.org/search/?formInput=digital+personal+data+protection+act",
  },
  {
    category: "Family Law",
    title: "Mutual Consent Divorce: A Step-by-Step Procedure",
    desc: "Navigating a separation is difficult. Understanding the Cooling-off Period and required documentation can make the legal transition smoother.",
    verified: true,
    reads: 2400,
    language: "English",
    url: "https://indiankanoon.org/search/?formInput=mutual+consent+divorce+procedure",
  },
  {
    category: "Corporate Law",
    title: "Startup Equity: Avoiding Common Founder Pitfalls",
    desc: "Early-stage equity distribution can define your company's future. Learn about vesting schedules and why Cliff periods are non-negotiable.",
    verified: false,
    reads: 1200,
    language: "English",
    url: "https://indiankanoon.org/search/?formInput=startup+equity+founder+agreement",
  },
  {
    category: "Property Law",
    title: "New Rental Laws 2024: Tenant Rights Explained",
    desc: "Protecting tenants from unfair eviction and deposit rules. Know your rights before signing any rent agreement.",
    verified: true,
    reads: 3400,
    language: "English",
    url: "https://indiankanoon.org/search/?formInput=tenant+rights+rental+agreement+2024",
  },
  {
    category: "Consumer Law",
    title: "How to File a Consumer Complaint Online",
    desc: "Step by step guide to filing consumer complaints on the National Consumer Helpline portal. Get refunds and justice easily.",
    verified: true,
    reads: 2100,
    language: "English",
    url: "https://consumerhelpline.gov.in",
  },
  {
    category: "Criminal Law",
    title: "Know Your Rights When Arrested by Police",
    desc: "Article 22 of the Constitution guarantees protection against arbitrary arrest. You have the right to be informed of charges, consult a lawyer, and be produced before a magistrate within 24 hours.",
    verified: true,
    reads: 5600,
    language: "English",
    url: "https://indiankanoon.org/search/?formInput=rights+of+arrested+person+article+22",
  },
  {
    category: "Labour Law",
    title: "Wrongful Termination: What Can You Do?",
    desc: "Being fired without cause or due process is illegal under Indian labour laws. Learn about the Industrial Disputes Act and how to file a complaint with the Labour Commissioner.",
    verified: true,
    reads: 3200,
    language: "English",
    url: "https://indiankanoon.org/search/?formInput=wrongful+termination+industrial+disputes+act",
  },
  {
    category: "Property Law",
    title: "RERA: How to File a Complaint Against Your Builder",
    desc: "Delayed possession, poor construction quality, or changed floor plans — RERA gives homebuyers powerful tools to seek compensation from builders.",
    verified: true,
    reads: 4100,
    language: "English",
    url: "https://rera.gov.in",
  },
  {
    category: "Family Law",
    title: "Domestic Violence Act: Protection Orders Explained",
    desc: "The Protection of Women from Domestic Violence Act 2005 provides civil remedies including protection orders, residence orders, and monetary relief.",
    verified: true,
    reads: 2800,
    language: "English",
    url: "https://indiankanoon.org/search/?formInput=domestic+violence+act+protection+order",
  },
  {
    category: "Cyber Law",
    title: "What to Do If You Are a Victim of Online Fraud",
    desc: "File a complaint on cybercrime.gov.in within 24 hours. Freeze your bank account immediately and preserve all transaction evidence for the cyber cell.",
    verified: true,
    reads: 6700,
    language: "English",
    url: "https://cybercrime.gov.in",
  },
  {
    category: "Corporate Law",
    title: "GST for Small Businesses: Common Mistakes to Avoid",
    desc: "Many small business owners face penalties due to incorrect GST filing. Understand the difference between CGST, SGST, and IGST to avoid costly errors.",
    verified: false,
    reads: 1900,
    language: "English",
    url: "https://indiankanoon.org/search/?formInput=GST+small+business+compliance",
  },
  {
    category: "Consumer Law",
    title: "E-Commerce Refund Denied? Here is What the Law Says",
    desc: "Under the Consumer Protection Act 2019, online platforms are liable for defective products and unfair trade practices. Know how to escalate beyond customer support.",
    verified: true,
    reads: 4300,
    language: "English",
    url: "https://indiankanoon.org/search/?formInput=consumer+protection+ecommerce+refund",
  },
  {
    category: "Criminal Law",
    title: "Anticipatory Bail: How to Get Protection Before Arrest",
    desc: "Under Section 438 CrPC, any person who apprehends arrest can apply for anticipatory bail. This protects your freedom while the investigation is ongoing.",
    verified: true,
    reads: 3800,
    language: "English",
    url: "https://indiankanoon.org/search/?formInput=anticipatory+bail+section+438+crpc",
  },
  {
    category: "Labour Law",
    title: "Maternity Benefit Act: Rights Every Working Woman Must Know",
    desc: "26 weeks of paid maternity leave, nursing breaks, and protection from dismissal during pregnancy. These rights apply to every establishment with 10 or more employees.",
    verified: true,
    reads: 2600,
    language: "English",
    url: "https://indiankanoon.org/search/?formInput=maternity+benefit+act+2017",
  },
  {
    category: "Property Law",
    title: "Ancestral Property vs Self-Acquired Property: Key Differences",
    desc: "Ancestral property gives equal rights to all legal heirs including daughters after the 2005 Hindu Succession Act amendment. Self-acquired property can be willed freely.",
    verified: true,
    reads: 5100,
    language: "English",
    url: "https://indiankanoon.org/search/?formInput=ancestral+property+hindu+succession+act",
  },
  {
    category: "Cyber Law",
    title: "Cheating via UPI or Online Banking: Legal Remedies",
    desc: "If money is transferred fraudulently from your account, RBI guidelines mandate that zero liability applies if reported within 3 days. File both a police FIR and bank complaint immediately.",
    verified: true,
    reads: 7200,
    language: "English",
    url: "https://cybercrime.gov.in",
  },
  {
    category: "Family Law",
    title: "Child Custody Laws in India: What Courts Consider",
    desc: "Indian courts prioritize the best interests of the child. Factors like age, preference of child above 9 years, financial stability, and parental conduct all influence custody decisions.",
    verified: false,
    reads: 3300,
    language: "English",
    url: "https://indiankanoon.org/search/?formInput=child+custody+guardianship+act+india",
  },
  {
    category: "Consumer Law",
    title: "Insurance Claim Rejected? Your Rights Under IRDAI",
    desc: "IRDAI mandates that insurers must settle or reject claims within 30 days. An unjust rejection can be challenged at the Insurance Ombudsman — free of cost.",
    verified: true,
    reads: 2900,
    language: "English",
    url: "https://indiankanoon.org/search/?formInput=insurance+claim+rejection+IRDAI+ombudsman",
  },
  {
    category: "Corporate Law",
    title: "Non-Disclosure Agreements: Are They Enforceable in India?",
    desc: "NDAs are governed by the Indian Contract Act 1872. Learn what clauses make an NDA enforceable, what remedies exist for breach, and common pitfalls in startup NDAs.",
    verified: false,
    reads: 1500,
    language: "English",
    url: "https://indiankanoon.org/search/?formInput=non+disclosure+agreement+enforceable+india",
  },
  {
    category: "Criminal Law",
    title: "Section 498A IPC: Cruelty by Husband and In-Laws",
    desc: "Section 498A is a cognizable and non-bailable offence. Understand the legal definition of cruelty, what constitutes an offence, and how to file a complaint.",
    verified: true,
    reads: 4800,
    language: "English",
    url: "https://indiankanoon.org/search/?formInput=section+498A+IPC+cruelty+husband",
  },
];

const lawyerData = [
  { name: "Adv. Rajesh Kumar", specialty: "Family & Divorce Law", category: "Family", languages: ["Hindi", "English"] },
  { name: "Adv. Priya Sharma", specialty: "Corporate & Business Law", category: "Corporate", languages: ["English", "Tamil"] },
  { name: "Adv. Michael D'Souza", specialty: "Criminal Litigation", category: "Criminal", languages: ["English", "Hindi"] },
  { name: "Adv. Sunita Reddy", specialty: "Property & RERA Law", category: "Property", languages: ["Telugu", "English"] },
  { name: "Adv. Amit Verma", specialty: "Cyber Crime & IT Law", category: "Cyber", languages: ["Hindi", "English"] },
  { name: "Adv. Kavitha Nair", specialty: "Consumer Protection", category: "Consumer", languages: ["Malayalam", "English"] },
  { name: "Adv. Rohit Gupta", specialty: "Criminal Defense", category: "Criminal", languages: ["Hindi", "English"] },
  { name: "Adv. Deepa Menon", specialty: "Family & Custody Law", category: "Family", languages: ["Malayalam", "English"] },
  { name: "Adv. Sanjay Patel", specialty: "Corporate Mergers & Acquisitions", category: "Corporate", languages: ["Gujarati", "English"] },
  { name: "Adv. Ananya Singh", specialty: "Property Disputes", category: "Property", languages: ["Hindi", "English"] },
  { name: "Adv. Vikram Mehta", specialty: "Cyber Fraud & Data Privacy", category: "Cyber", languages: ["Hindi", "English"] },
  { name: "Adv. Lakshmi Rao", specialty: "Consumer Court Cases", category: "Consumer", languages: ["Telugu", "English"] },
  { name: "Adv. Arjun Nambiar", specialty: "Criminal Appeals", category: "Criminal", languages: ["Malayalam", "English"] },
  { name: "Adv. Neha Joshi", specialty: "Divorce & Alimony", category: "Family", languages: ["Hindi", "Marathi"] },
  { name: "Adv. Ramesh Iyer", specialty: "RERA & Builder Disputes", category: "Property", languages: ["Tamil", "English"] },
  { name: "Adv. Pooja Agarwal", specialty: "Startup & Venture Law", category: "Corporate", languages: ["Hindi", "English"] },
  { name: "Adv. Suresh Babu", specialty: "Consumer Complaints", category: "Consumer", languages: ["Telugu", "Kannada"] },
  { name: "Adv. Meera Pillai", specialty: "Cyberbullying & Online Crime", category: "Cyber", languages: ["Malayalam", "English"] },
  { name: "Adv. Tarun Saxena", specialty: "Murder & Serious Crime", category: "Criminal", languages: ["Hindi", "English"] },
  { name: "Adv. Divya Krishnan", specialty: "Child Custody & Adoption", category: "Family", languages: ["Tamil", "English"] },
  { name: "Adv. Manish Tiwari", specialty: "Land Acquisition Law", category: "Property", languages: ["Hindi", "English"] },
  { name: "Adv. Shreya Banerjee", specialty: "IPR & Trademark Law", category: "Corporate", languages: ["Bengali", "English"] },
  { name: "Adv. Kiran Desai", specialty: "Online Fraud & Scams", category: "Cyber", languages: ["Gujarati", "English"] },
  { name: "Adv. Harish Nair", specialty: "Medical Negligence", category: "Consumer", languages: ["Malayalam", "English"] },
  { name: "Adv. Preethi Chandran", specialty: "Domestic Violence Cases", category: "Family", languages: ["Tamil", "English"] },
  { name: "Adv. Aakash Malhotra", specialty: "White Collar Crime", category: "Criminal", languages: ["Hindi", "Punjabi"] },
  { name: "Adv. Rekha Varma", specialty: "Tenant Rights & Eviction", category: "Property", languages: ["Hindi", "English"] },
  { name: "Adv. Gaurav Kapoor", specialty: "GST & Tax Law", category: "Corporate", languages: ["Hindi", "English"] },
  { name: "Adv. Sneha Kulkarni", specialty: "E-Commerce Disputes", category: "Cyber", languages: ["Marathi", "English"] },
  { name: "Adv. Balasubramaniam", specialty: "Product Liability", category: "Consumer", languages: ["Tamil", "English"] },
  { name: "Adv. Ritika Sharma", specialty: "Maintenance & Alimony", category: "Family", languages: ["Hindi", "English"] },
  { name: "Adv. Devendra Yadav", specialty: "Bail & Anticipatory Bail", category: "Criminal", languages: ["Hindi", "English"] },
  { name: "Adv. Nandita Bose", specialty: "Real Estate Transactions", category: "Property", languages: ["Bengali", "English"] },
  { name: "Adv. Chirag Shah", specialty: "Mergers & Company Law", category: "Corporate", languages: ["Gujarati", "English"] },
  { name: "Adv. Anitha Suresh", specialty: "Social Media Crime", category: "Cyber", languages: ["Kannada", "English"] },
  { name: "Adv. Manohar Lal", specialty: "Banking & Finance Law", category: "Corporate", languages: ["Hindi", "English"] },
  { name: "Adv. Jayashree Prabhu", specialty: "Insurance Claims", category: "Consumer", languages: ["Kannada", "English"] },
  { name: "Adv. Rahul Pandey", specialty: "Narcotics & Drug Cases", category: "Criminal", languages: ["Hindi", "English"] },
  { name: "Adv. Usha Pillai", specialty: "Inheritance & Will Disputes", category: "Family", languages: ["Malayalam", "English"] },
  { name: "Adv. Subhash Garg", specialty: "Agricultural Land Law", category: "Property", languages: ["Hindi", "Rajasthani"] },
  { name: "Adv. Tanvi Mehrotra", specialty: "Data Protection & GDPR", category: "Cyber", languages: ["Hindi", "English"] },
  { name: "Adv. Prakash Rao", specialty: "Defective Product Claims", category: "Consumer", languages: ["Telugu", "English"] },
  { name: "Adv. Simran Kaur", specialty: "Domestic Violence & Protection", category: "Family", languages: ["Punjabi", "Hindi"] },
  { name: "Adv. Venkatesh Murthy", specialty: "Property Registration", category: "Property", languages: ["Kannada", "English"] },
  { name: "Adv. Neeraj Dubey", specialty: "Cheque Bounce Cases", category: "Criminal", languages: ["Hindi", "English"] },
  { name: "Adv. Archana Pillai", specialty: "Labour & Employment Law", category: "Corporate", languages: ["Malayalam", "English"] },
  { name: "Adv. Faisal Khan", specialty: "Hacking & Cybercrime", category: "Cyber", languages: ["Urdu", "English"] },
  { name: "Adv. Geetha Subramaniam", specialty: "Airline & Travel Disputes", category: "Consumer", languages: ["Tamil", "English"] },
  { name: "Adv. Hardik Trivedi", specialty: "Divorce Mediation", category: "Family", languages: ["Gujarati", "Hindi"] },
  { name: "Adv. Zara Mirza", specialty: "Commercial Property Law", category: "Property", languages: ["Urdu", "English"] },
];

const lawyers = lawyerData.map((l, i) => ({
  ...l,
  experience: `${Math.floor(Math.random() * 20) + 5}+ Years`,
  rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
  reviews: Math.floor(Math.random() * 200) + 20,
  price: `₹${(Math.floor(Math.random() * 8) + 1) * 500 + 1000}`,
  online: Math.random() > 0.5,
  initials: l.name.split(" ").slice(1).map(n => n[0]).join("").slice(0, 2).toUpperCase(),
  image: `https://i.pravatar.cc/150?img=${i + 1}`,
}));

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected!");

    await FeedPost.deleteMany();
    await Lawyer.deleteMany();
    console.log("Old data cleared!");

    await FeedPost.insertMany(feedPosts);
    await Lawyer.insertMany(lawyers);
    console.log(`Seed data inserted! — ${lawyers.length} lawyers, ${feedPosts.length} feed posts`);

    mongoose.connection.close();
    console.log("Done!");
  } catch (err) {
    console.log("Error:", err);
  }
};

seedDB();