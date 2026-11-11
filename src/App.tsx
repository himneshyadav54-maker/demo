/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Star,
  Compass,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Send,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
  Camera,
  Trees,
  Utensils,
  BedDouble,
  PartyPopper,
  ExternalLink,
  Instagram,
  ArrowRight,
  Info,
  ShieldCheck
} from 'lucide-react';
import {
  sanitizePhoneForWhatsApp,
  buildWhatsAppUrl,
  formatPackageEnquiryMessage,
  formatEnquiryMessage,
  validateEnquiryForm,
  type EnquiryData,
} from './utils/booking';

/* ==========================================================================
   RESORT CONFIGURATION OBJECT
   All business details, contact information, and editable placeholders
   are centralized here for easy updates by the owner.
   ========================================================================== */
export const RESORT_CONFIG = {
  name: "Shree Balaji Jungle Resorts",
  tagline: "Escape the City. Breathe in Nature.",
  city: "Indore, Madhya Pradesh, India",
  phone: "+91 72477 88888",
  whatsappNumber: "+91 72477 88888",
  googleRating: 4.2,
  reviewCount: "40+",
  // Editable Address & Location Placeholders
  address: "[Full address, to be confirmed]",
  landmarks: "[Nearby landmark 1], [Nearby landmark 2]",
  // Operating Hours Placeholders
  openingHours: "[Opening hours, to be confirmed]",
  closedNote: "Closed on Tuesdays (confirm with owner)",
  instagram: "@shreebalajijungleresorts",
  instagramUrl: "https://instagram.com/shreebalajijungleresorts",
  mapQuery: "Shree Balaji Jungle Resorts Indore",
  creditText: "Demo preview by Yadav Digital Studio",
};

/* ==========================================================================
   FACILITY CARDS PLACEHOLDER DATA
   Note for Resort Owner: Replace these 6 generic placeholders with your
   actual confirmed amenities (e.g. Swimming Pool, Rain Dance, Indoor Games).
   ========================================================================== */
const FACILITIES = [
  {
    id: 'stay',
    title: 'Comfortable Stay',
    description: 'Cozy and serene accommodations designed for restful nights surrounded by natural tranquility.',
    icon: BedDouble,
  },
  {
    id: 'food',
    title: 'Delicious Food',
    description: 'Freshly prepared, flavorful dishes that delight both family groups and weekend visitors.',
    icon: Utensils,
  },
  {
    id: 'greenery',
    title: 'Open Green Spaces',
    description: 'Sprawling lush lawns and open foliage perfect for walking, relaxing, and children to play.',
    icon: Trees,
  },
  {
    id: 'outings',
    title: 'Family & Group Outings',
    description: 'Dedicated picnic spaces and day gathering zones for memorable family reunions and friends get-togethers.',
    icon: Users,
  },
  {
    id: 'celebrations',
    title: 'Celebrations & Events',
    description: 'Natural outdoor ambiance for birthdays, intimate parties, anniversaries, and group milestones.',
    icon: PartyPopper,
  },
  {
    id: 'nature',
    title: 'Peaceful Nature Setting',
    description: 'Calm, refreshing jungle retreat far from Indore city noise and vehicle traffic.',
    icon: Compass,
  },
];

/* ==========================================================================
   EXPERIENCES PLACEHOLDER DATA & IMAGES (Unsplash Placeholders)
   Note for Resort Owner: Replace Unsplash URLs with your real photos.
   ========================================================================== */
const EXPERIENCES = [
  {
    title: "Nature Stay",
    badge: "Overnight Retreat",
    description: "Unwind in peaceful room accommodations nestled amidst green flora, waking up to birdsong and fresh forest air.",
    /* Placeholder image: replace with real cottage/room photo */
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    features: ["Calm forest surroundings", "Comfortable bedding", "Peaceful getaway"],
  },
  {
    title: "Delicious Dining",
    badge: "Fresh & Tasty",
    description: "Savor tasty regional and multi-course meals prepared with care, served in airy outdoor and indoor dining spaces.",
    /* Placeholder image: replace with real dining/food photo */
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    features: ["Tasty family-style meals", "Outdoor seating", "Fresh local flavors"],
  },
  {
    title: "Day Outings",
    badge: "Picnics & Relaxation",
    description: "Spend a revitalizing day trip away from Indore with your favorite people, enjoying open gardens and leisurely tea.",
    /* Placeholder image: replace with real day picnic photo */
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    features: ["Ideal for friends & families", "Wide garden area", "Full-day rejuvenation"],
  },
  {
    title: "Celebrations & Events",
    badge: "Gatherings & Parties",
    description: "Host memorable birthday celebrations, anniversaries, and reunions under open skies with customizable lawn setups.",
    /* Placeholder image: replace with real celebration photo */
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    features: ["Open lawn party space", "Group dining arrangement", "Scenic photo backdrops"],
  },
];

/* ==========================================================================
   GALLERY IMAGES (Unsplash Placeholders)
   Note for Resort Owner: Replace Unsplash URLs with your real resort gallery photos.
   ========================================================================== */
const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Lush Resort Lawns",
    category: "Nature & Grounds",
    /* Placeholder image: replace with real photo */
    url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Peaceful Cottages & Greenery",
    category: "Accommodations",
    /* Placeholder image: replace with real photo */
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Tasty Food Spread",
    category: "Dining",
    /* Placeholder image: replace with real photo */
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Relaxed Outdoor Seating",
    category: "Outdoors",
    /* Placeholder image: replace with real photo */
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Evening Atmosphere",
    category: "Ambiance",
    /* Placeholder image: replace with real photo */
    url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Calm Nature Walkways",
    category: "Surroundings",
    /* Placeholder image: replace with real photo */
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
  },
];

/* ==========================================================================
   PACKAGES DATA (Strictly using ₹ XXXX placeholders as instructed)
   ========================================================================== */
const PACKAGES = [
  {
    name: "Day Outing Package",
    popular: false,
    pricePlaceholder: "₹ XXXX",
    unit: "per person (approx / to be confirmed)",
    description: "Designed for day-trippers seeking peaceful nature relaxation, delicious meals, and garden access.",
    highlights: [
      "Access to open green lawns & spaces",
      "Welcome beverage & lunch (confirm details)",
      "Evening tea with light snacks",
      "Perfect for group & family day picnics"
    ],
  },
  {
    name: "Overnight Stay Package",
    popular: true,
    pricePlaceholder: "₹ XXXX",
    unit: "per room / night (to be confirmed)",
    description: "An immersive jungle night away from Indore city lights, with serene surroundings and hearty meals.",
    highlights: [
      "Comfortable room / cottage stay",
      "Dinner & morning breakfast included",
      "Serene sunrise & quiet nature vibes",
      "Spacious grounds for evening walks"
    ],
  },
  {
    name: "Party & Celebration Package",
    popular: false,
    pricePlaceholder: "₹ XXXX",
    unit: "custom group quote (to be confirmed)",
    description: "Exclusive celebration package for family reunions, birthdays, anniversaries, and corporate group outings.",
    highlights: [
      "Dedicated lawn / dining section",
      "Customizable group meal menus",
      "Assistance for music & light decor setup",
      "Group seating and outdoor photography"
    ],
  },
];

/* ==========================================================================
   WHY CHOOSE US (Strictly based on guest feedback)
   ========================================================================== */
const WHY_CHOOSE_US = [
  {
    number: "01",
    title: "Peaceful Setting Away from the City",
    description: "Escape the bustling traffic and fast pace of Indore. Enjoy tranquil greenery where you can truly unwind and recharge.",
  },
  {
    number: "02",
    title: "Delicious, Tasty Food",
    description: "Guests love our flavorsome meals. Every dish is cooked fresh to ensure comforting, mouth-watering dining for all ages.",
  },
  {
    number: "03",
    title: "Ideal for Families, Friends & Groups",
    description: "With spacious seating, open grounds, and a welcoming environment, it is the go-to spot for memorable group gatherings.",
  },
  {
    number: "04",
    title: "Nature-Immersed Open Spaces",
    description: "Wide green lawns and fresh tree foliage provide ample breathing space, natural photo backgrounds, and leisure spots.",
  },
];

/* ==========================================================================
   TESTIMONIALS PLACEHOLDERS
   Note for Resort Owner: Clearly marked "Replace with real guest reviews".
   ========================================================================== */
const PLACEHOLDER_TESTIMONIALS = [
  {
    id: 1,
    reviewer: "Verified Google Visitor (Replace with real guest review)",
    rating: 5,
    tag: "Family Weekend Outing",
    quote: "Very peaceful and calm place just a short drive from Indore city. The food was really tasty and freshly prepared. Our entire family had a wonderful time in the green lawn.",
  },
  {
    id: 2,
    reviewer: "Group Outing Guest (Replace with real guest review)",
    rating: 4,
    tag: "Friends Get-together",
    quote: "A great relaxing spot for a weekend picnic with friends. The open nature setting is very refreshing. Be sure to follow the location directions properly before heading out!",
  },
  {
    id: 3,
    reviewer: "Nature Lover & Visitor (Replace with real guest review)",
    rating: 5,
    tag: "Day Outing & Dining",
    quote: "Delicious food, friendly atmosphere, and away from all the city chaos. Loved relaxing in the open green space. Would definitely recommend for group outings.",
  },
];

/* ==========================================================================
   FAQ ITEMS (5 questions with placeholder answers)
   ========================================================================== */
const FAQ_ITEMS = [
  {
    question: "What are the resort check-in, check-out, and visiting hours?",
    answer: `Operating timings are currently [Opening hours, to be confirmed]. Please note we are closed on Tuesdays (confirm with owner). For overnight stays, standard check-in and check-out times will be confirmed upon reservation.`,
  },
  {
    question: "How do I book an outing or stay at Shree Balaji Jungle Resorts?",
    answer: "You can easily book by clicking the 'Enquire on WhatsApp' button or calling us directly at +91 72477 88888. Our team will verify date availability, discuss meal preferences, and finalize your booking.",
  },
  {
    question: "What kind of food and dining options are provided?",
    answer: "Guests consistently praise our tasty and wholesome food. We offer delicious vegetarian and multi-course dining options prepared fresh on order. Specific meal packages can be tailored for groups.",
  },
  {
    question: "Do you cater to large group outings, birthdays, and family gatherings?",
    answer: "Yes! Our open lawns and peaceful setting make the resort popular for group outings, family celebrations, and reunions. Please reach out in advance so we can organize tailored seating and menu arrangements.",
  },
  {
    question: "How do we reach the resort and is vehicle parking available?",
    answer: "We are located near Indore, Madhya Pradesh. Some visitors find the exact turn hard to spot, so we provide landmark guidance ([Nearby landmark 1], [Nearby landmark 2]) and recommend calling our team at +91 72477 88888 before you depart so we can guide you smoothly.",
  },
];

export default function App() {
  // Mobile navigation drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Gallery Lightbox modal state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Testimonials Carousel state
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // FAQ Accordion open index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Booking Enquiry Form state
  const [formData, setFormData] = useState<EnquiryData>({
    name: '',
    phone: '',
    guests: '4',
    date: '',
    type: 'Day Outing',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Testimonials auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % PLACEHOLDER_TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Handle Enquiry Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEnquiryForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    setFormSubmitted(true);

    const message = formatEnquiryMessage(formData, RESORT_CONFIG.name);
    const whatsappUrl = buildWhatsAppUrl(RESORT_CONFIG.whatsappNumber, message);

    // Open WhatsApp in new tab / app
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Helper for quick package WhatsApp link
  const handlePackageEnquire = (packageName: string) => {
    const message = formatPackageEnquiryMessage(packageName, RESORT_CONFIG.name);
    const url = buildWhatsAppUrl(RESORT_CONFIG.whatsappNumber, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Helper for general WhatsApp enquire
  const handleGeneralWhatsApp = () => {
    const message = `Hello ${RESORT_CONFIG.name}! I would like to enquire about visiting the resort, availability, and packages.`;
    const url = buildWhatsAppUrl(RESORT_CONFIG.whatsappNumber, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C2B22] font-sans antialiased selection:bg-[#1D3D2C] selection:text-[#FAF7F2]">
      
      {/* ====================================================================
          1. STICKY NAVBAR
          ==================================================================== */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D4] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#27523B] rounded-lg p-1">
              <div className="w-10 h-10 rounded-full bg-[#1D3D2C] text-[#FAF7F2] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Trees className="w-5 h-5 text-[#C9A55C]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg sm:text-xl tracking-wider text-[#132A1E] uppercase leading-tight">
                  {RESORT_CONFIG.name}
                </span>
                <span className="text-[11px] font-medium tracking-widest text-[#786C5B] uppercase">
                  Indore &bull; Nature Retreat
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#384A3E]">
              <a href="#about" className="hover:text-[#132A1E] transition-colors">About</a>
              <a href="#facilities" className="hover:text-[#132A1E] transition-colors">Facilities</a>
              <a href="#experiences" className="hover:text-[#132A1E] transition-colors">Experiences</a>
              <a href="#gallery" className="hover:text-[#132A1E] transition-colors">Gallery</a>
              <a href="#packages" className="hover:text-[#132A1E] transition-colors">Packages</a>
              <a href="#why-us" className="hover:text-[#132A1E] transition-colors">Why Choose Us</a>
              <a href="#how-to-reach" className="hover:text-[#132A1E] transition-colors">How to Reach</a>
              <a href="#faq" className="hover:text-[#132A1E] transition-colors">FAQ</a>
            </nav>

            {/* Header Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${sanitizePhoneForWhatsApp(RESORT_CONFIG.phone)}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-[#1D3D2C] hover:bg-[#F3EFE6] rounded-full border border-[#D5CDBC] transition-all"
                title="Call resort directly"
              >
                <Phone className="w-4 h-4 text-[#C9A55C]" />
                <span>Call</span>
              </a>
              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#1D3D2C] hover:bg-[#132A1E] rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <span>Book / Enquire</span>
                <ArrowRight className="w-4 h-4 text-[#C9A55C]" />
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href="#enquiry"
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#1D3D2C] text-white"
              >
                Enquire
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#132A1E] hover:bg-[#F3EFE6] focus:outline-none focus:ring-2 focus:ring-[#27523B]"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8E2D4] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#132A1E] hover:bg-[#F3EFE6]"
            >
              About the Resort
            </a>
            <a
              href="#facilities"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#132A1E] hover:bg-[#F3EFE6]"
            >
              Facilities
            </a>
            <a
              href="#experiences"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#132A1E] hover:bg-[#F3EFE6]"
            >
              Experiences (Stay, Dining, Outings)
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#132A1E] hover:bg-[#F3EFE6]"
            >
              Photo Gallery
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#132A1E] hover:bg-[#F3EFE6]"
            >
              Packages & Pricing
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#132A1E] hover:bg-[#F3EFE6]"
            >
              Why Choose Us
            </a>
            <a
              href="#how-to-reach"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#132A1E] hover:bg-[#F3EFE6]"
            >
              How to Reach (Location & Map)
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#132A1E] hover:bg-[#F3EFE6]"
            >
              Frequently Asked Questions
            </a>
            <a
              href="#enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-[#132A1E] bg-[#E8E2D4]/50 hover:bg-[#E8E2D4]"
            >
              Book / Enquire Online
            </a>
            <div className="pt-3 border-t border-[#E8E2D4] grid grid-cols-2 gap-2">
              <a
                href={`tel:${sanitizePhoneForWhatsApp(RESORT_CONFIG.phone)}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-full border border-[#D5CDBC] text-[#132A1E] font-medium text-sm"
              >
                <Phone className="w-4 h-4 text-[#C9A55C]" />
                Call Now
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGeneralWhatsApp();
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#1D3D2C] text-white font-medium text-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#C9A55C]" />
                WhatsApp
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          2. HERO SECTION
          ==================================================================== */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#132A1E] text-white">
        {/* Background Image with Warm Earthy Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Nature and resort placeholder image from Unsplash: lush jungle resort grounds */}
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=85"
            alt="Shree Balaji Jungle Resorts lush landscape"
            className="w-full h-full object-cover object-center scale-105 motion-safe:animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A12] via-[#132A1E]/80 to-[#0C1A12]/45" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#132A1E]/30 to-[#0C1A12]/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          
          {/* Subtle Location & Trust Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-xs sm:text-sm font-medium mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#C9A55C] animate-pulse"></span>
            <span>Jungle Resort in {RESORT_CONFIG.city}</span>
            <span className="text-[#C9A55C] font-semibold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#C9A55C]" /> 4.2 Rating
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#FAF7F2] max-w-4xl mx-auto leading-[1.15] mb-6 drop-shadow-md">
            Escape the City.<br />
            <span className="italic text-[#E8E2D4] font-normal">Breathe in Nature.</span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#E8E2D4]/90 font-normal leading-relaxed mb-10 drop-shadow">
            Experience peaceful stays, tasty food, and unforgettable group outings nestled in a relaxing natural setting away from the Indore city rush.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={handleGeneralWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-[#132A1E] bg-[#C9A55C] hover:bg-[#DFBE74] rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-5 h-5 text-[#132A1E]" />
              <span>Enquire on WhatsApp</span>
            </button>
            <a
              href={`tel:${sanitizePhoneForWhatsApp(RESORT_CONFIG.phone)}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-[#FAF7F2] bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-full border border-white/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="w-5 h-5 text-[#C9A55C]" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Quick Notice Tag */}
          <p className="mt-8 text-xs text-[#FAF7F2]/70 flex items-center justify-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#C9A55C]" />
            <span>Direct booking assistance on WhatsApp &bull; Fast response</span>
          </p>
        </div>

        {/* Bottom subtle curve divider */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#FAF7F2] to-transparent"></div>
      </section>

      {/* ====================================================================
          3. TRUST BAR
          ==================================================================== */}
      <section className="relative z-20 -mt-6 sm:-mt-8 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-[#E8E2D4] p-5 sm:p-7 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E2D4]/70">
          
          {/* Trust Item 1 */}
          <div className="flex items-center gap-3.5 sm:justify-center">
            <div className="w-12 h-12 rounded-2xl bg-[#F3EFE6] flex items-center justify-center text-[#C9A55C] shrink-0">
              <Star className="w-6 h-6 fill-[#C9A55C]" />
            </div>
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold text-[#132A1E] flex items-center gap-1">
                4.2 <span className="text-amber-500 text-sm">★</span>
              </div>
              <div className="text-xs sm:text-sm text-[#5B6D60] font-medium">Google Rating</div>
            </div>
          </div>

          {/* Trust Item 2 */}
          <div className="flex items-center gap-3.5 sm:justify-center pt-4 sm:pt-0">
            <div className="w-12 h-12 rounded-2xl bg-[#F3EFE6] flex items-center justify-center text-[#1D3D2C] shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold text-[#132A1E]">40+</div>
              <div className="text-xs sm:text-sm text-[#5B6D60] font-medium">Guest Reviews</div>
            </div>
          </div>

          {/* Trust Item 3 */}
          <div className="flex items-center gap-3.5 sm:justify-center pt-4 sm:pt-0">
            <div className="w-12 h-12 rounded-2xl bg-[#F3EFE6] flex items-center justify-center text-[#C9A55C] shrink-0">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold text-[#132A1E]">Tasty Food</div>
              <div className="text-xs sm:text-sm text-[#5B6D60] font-medium">Fresh & Delicious</div>
            </div>
          </div>

          {/* Trust Item 4 */}
          <div className="flex items-center gap-3.5 sm:justify-center pt-4 sm:pt-0">
            <div className="w-12 h-12 rounded-2xl bg-[#F3EFE6] flex items-center justify-center text-[#1D3D2C] shrink-0">
              <Trees className="w-6 h-6" />
            </div>
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold text-[#132A1E]">Peaceful Setting</div>
              <div className="text-xs sm:text-sm text-[#5B6D60] font-medium">Pure Nature Retreat</div>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          4. ABOUT SECTION
          ==================================================================== */}
      <section id="about" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Side */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main About Photo (Placeholder from Unsplash) */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                  alt="Relaxing resort grounds and greenery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#132A1E]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xs uppercase tracking-widest text-[#DFBE74] font-semibold mb-1">
                    Indore Getaway
                  </div>
                  <div className="font-serif text-xl font-semibold">
                    Recharge in Open Nature
                  </div>
                </div>
              </div>

              {/* Decorative Floating Badge */}
              <div className="absolute -bottom-6 -right-6 sm:bottom-8 sm:-right-8 bg-[#1D3D2C] text-[#FAF7F2] p-5 rounded-2xl shadow-xl border border-[#27523B] max-w-[220px] hidden sm:block">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-5 h-5 text-[#C9A55C]" />
                  <span className="font-serif font-bold text-base">Pure Serenity</span>
                </div>
                <p className="text-xs text-[#E8E2D4] leading-relaxed">
                  Away from city pollution & rush, crafted for slow, joyful days.
                </p>
              </div>
            </div>
          </div>

          {/* Text Side (2 short paragraphs about relaxing getaway close to Indore for families & friends) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#27523B] bg-[#E8E2D4]/60 px-3.5 py-1.5 rounded-full mb-4">
              <Compass className="w-4 h-4 text-[#C9A55C]" />
              <span>About {RESORT_CONFIG.name}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#132A1E] leading-tight mb-6">
              A Peaceful Nature Getaway Just Outside Indore
            </h2>

            {/* Paragraph 1 */}
            <p className="text-base sm:text-lg text-[#384A3E] leading-relaxed mb-5">
              Tucked away from the noise and busy pace of the city, {RESORT_CONFIG.name} offers families, friends, and travel groups a calm sanctuary surrounded by refreshing greenery. Whether you are planning a relaxed weekend stay, a vibrant family picnic, or a celebratory gathering, our natural jungle ambiance invites you to breathe deeply, slow down, and reconnect with your loved ones.
            </p>

            {/* Paragraph 2 */}
            <p className="text-base sm:text-lg text-[#384A3E] leading-relaxed mb-8">
              Guests especially value our warm hospitality, open garden spaces for leisure walks, and freshly prepared, tasty food that makes every meal a pleasure. Easily reachable for a quick day outing or an overnight escape close to Indore, we provide the ideal setting to leave the routine behind and savor peaceful moments in nature.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E8E2D4]">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white border border-[#E8E2D4] text-[#1D3D2C] mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A55C]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#132A1E] text-sm">Close to Indore</h4>
                  <p className="text-xs text-[#5B6D60]">Convenient drive for weekenders & day trippers</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white border border-[#E8E2D4] text-[#1D3D2C] mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A55C]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#132A1E] text-sm">Family & Friends Focused</h4>
                  <p className="text-xs text-[#5B6D60]">Safe, relaxed open spaces for all generations</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#how-to-reach"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1D3D2C] text-white font-medium text-sm hover:bg-[#132A1E] transition-colors"
              >
                <span>View How to Reach</span>
                <MapPin className="w-4 h-4 text-[#C9A55C]" />
              </a>
              <button
                type="button"
                onClick={handleGeneralWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#D5CDBC] text-[#132A1E] font-medium text-sm hover:bg-[#F3EFE6] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#C9A55C]" />
                <span>Chat with Reception</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          5. FACILITIES SECTION (Generic 6 facilities with owner comment)
          ==================================================================== */}
      {/* 
        ========================================================================
        FACILITIES COMMENT FOR RESORT OWNER:
        Do not invent facilities. These 6 cards show generic titles:
        1. Comfortable Stay
        2. Delicious Food
        3. Open Green Spaces
        4. Family & Group Outings
        5. Celebrations & Events
        6. Peaceful Nature Setting
        Please replace these placeholders with your actual confirmed amenities
        (e.g., swimming pool, indoor games, bonfire, etc.).
        ========================================================================
      */}
      <section id="facilities" className="py-20 bg-[#F3EFE6]/60 border-y border-[#E8E2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#27523B] bg-white px-3.5 py-1.5 rounded-full mb-3 shadow-xs border border-[#E8E2D4]">
              <Trees className="w-4 h-4 text-[#C9A55C]" />
              <span>Resort Amenities & Offerings</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#132A1E] mb-4">
              Designed for Comfort & Relaxation
            </h2>
            <p className="text-[#5B6D60] text-base sm:text-lg">
              Explore the key spaces and experiences that make every visit to {RESORT_CONFIG.name} pleasant and peaceful.
            </p>
          </div>

          {/* 6 Generic Facility Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FACILITIES.map((facility) => {
              const IconComp = facility.icon;
              return (
                <div
                  key={facility.id}
                  className="bg-white rounded-2xl p-7 shadow-xs hover:shadow-xl transition-all duration-300 border border-[#E8E2D4] hover:-translate-y-1 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#F3EFE6] text-[#1D3D2C] flex items-center justify-center mb-6 group-hover:bg-[#1D3D2C] group-hover:text-[#FAF7F2] transition-colors duration-300">
                    <IconComp className="w-7 h-7 text-[#C9A55C]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#132A1E] mb-2.5">
                    {facility.title}
                  </h3>
                  <p className="text-sm text-[#5B6D60] leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-[#786C5B] italic">
              * Note: Facility details and specific activity schedules can be confirmed directly with resort management via WhatsApp.
            </p>
          </div>

        </div>
      </section>

      {/* ====================================================================
          6. EXPERIENCES SECTION
          ==================================================================== */}
      <section id="experiences" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#27523B] bg-[#E8E2D4]/60 px-3.5 py-1.5 rounded-full mb-3">
              <Sparkles className="w-4 h-4 text-[#C9A55C]" />
              <span>Memorable Moments</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#132A1E]">
              Curated Experiences in Nature
            </h2>
          </div>
          <p className="text-[#5B6D60] text-sm sm:text-base max-w-md">
            Whether you seek peaceful solitude, hearty dining, or an energetic celebration with loved ones, find your ideal getaway experience.
          </p>
        </div>

        {/* 4 Cards: Stay, Dining, Day Outings, Celebrations & Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8E2D4] shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Photo Area */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#132A1E]/85 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                    {exp.badge}
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#132A1E] mb-2.5">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-[#5B6D60] leading-relaxed mb-5">
                    {exp.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {exp.features.map((item, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs font-medium text-[#384A3E]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A55C]"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handlePackageEnquire(exp.title)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#D5CDBC] text-xs font-semibold text-[#132A1E] hover:bg-[#1D3D2C] hover:text-white hover:border-[#1D3D2C] transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#C9A55C]" />
                  <span>Enquire for {exp.title}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          7. GALLERY SECTION (Photo grid with interactive Lightbox)
          ==================================================================== */}
      <section id="gallery" className="py-20 bg-[#F3EFE6]/60 border-y border-[#E8E2D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#27523B] bg-white px-3.5 py-1.5 rounded-full mb-3 border border-[#E8E2D4]">
              <Camera className="w-4 h-4 text-[#C9A55C]" />
              <span>Resort Highlights</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#132A1E] mb-4">
              Glimpses of the Jungle Retreat
            </h2>
            <p className="text-[#5B6D60] text-sm sm:text-base">
              Click on any photograph to view in full size. (Resort photos placeholder — can be replaced with real shots).
            </p>
          </div>

          {/* Responsive Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-200 text-left focus:outline-none focus:ring-4 focus:ring-[#27523B] shadow-sm hover:shadow-xl transition-all"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#132A1E]/80 via-[#132A1E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DFBE74]">
                    {item.category}
                  </span>
                  <div className="font-serif text-base font-bold flex items-center justify-between">
                    <span>{item.title}</span>
                    <Camera className="w-4 h-4 text-[#DFBE74]" />
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Photo Lightbox"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 text-white hover:text-[#C9A55C] bg-white/10 hover:bg-white/20 p-2.5 rounded-full z-10 transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev button */}
            <button
              type="button"
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : 0))}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#C9A55C] bg-white/10 hover:bg-white/20 p-3 rounded-full z-10 transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#C9A55C] bg-white/10 hover:bg-white/20 p-3 rounded-full z-10 transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Image & Caption */}
            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
              <img
                src={GALLERY_ITEMS[lightboxIndex].url}
                alt={GALLERY_ITEMS[lightboxIndex].title}
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl"
              />
              <div className="text-center mt-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A55C]">
                  {GALLERY_ITEMS[lightboxIndex].category}
                </p>
                <h3 className="font-serif text-lg sm:text-xl font-bold">
                  {GALLERY_ITEMS[lightboxIndex].title}
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  Photo {lightboxIndex + 1} of {GALLERY_ITEMS.length} &bull; (Replace with real resort photo)
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ====================================================================
          8. PACKAGES SECTION
          (3 cards: Day Outing, Overnight Stay, Party / Celebration with ₹ XXXX)
          ==================================================================== */}
      <section id="packages" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#27523B] bg-[#E8E2D4]/60 px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-4 h-4 text-[#C9A55C]" />
            <span>Transparent Enquiry Packages</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#132A1E] mb-4">
            Choose Your Ideal Resort Plan
          </h2>
          <p className="text-[#5B6D60] text-sm sm:text-base">
            Select a package below to enquire directly on WhatsApp. Pricing is customized based on group size and dates.
          </p>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular
                  ? 'bg-[#1D3D2C] text-[#FAF7F2] shadow-2xl scale-100 lg:-translate-y-2 border-2 border-[#C9A55C]'
                  : 'bg-white text-[#132A1E] border border-[#E8E2D4] shadow-md hover:shadow-xl'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#C9A55C] text-[#132A1E] text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-sm">
                    Most Popular Choice
                  </span>
                </div>
              )}

              <div>
                <h3 className={`font-serif text-2xl font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-[#132A1E]'}`}>
                  {pkg.name}
                </h3>
                <p className={`text-xs mb-6 ${pkg.popular ? 'text-[#E8E2D4]' : 'text-[#5B6D60]'}`}>
                  {pkg.description}
                </p>

                {/* Price Display: strictly placeholder ₹ XXXX */}
                <div className="mb-6 pb-6 border-b border-[#E8E2D4]/40">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#C9A55C]">
                      {pkg.pricePlaceholder}
                    </span>
                  </div>
                  <span className={`text-xs block mt-1 ${pkg.popular ? 'text-[#E8E2D4]/80' : 'text-[#786C5B]'}`}>
                    {pkg.unit}
                  </span>
                </div>

                {/* Package Highlights */}
                <div className="space-y-3.5 mb-8">
                  <span className={`text-xs font-bold uppercase tracking-wider block ${pkg.popular ? 'text-[#C9A55C]' : 'text-[#27523B]'}`}>
                    Package Highlights:
                  </span>
                  {pkg.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.popular ? 'text-[#C9A55C]' : 'text-[#27523B]'}`} />
                      <span className={`text-xs sm:text-sm ${pkg.popular ? 'text-[#FAF7F2]' : 'text-[#384A3E]'}`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enquire Button opens pre-filled WhatsApp message */}
              <button
                type="button"
                onClick={() => handlePackageEnquire(pkg.name)}
                className={`w-full py-3.5 px-6 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                  pkg.popular
                    ? 'bg-[#C9A55C] hover:bg-[#DFBE74] text-[#132A1E] font-bold shadow-md'
                    : 'bg-[#1D3D2C] hover:bg-[#132A1E] text-white'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs text-[#786C5B]">
            * Note: All prices are shown as placeholders. Real rates will be shared upon confirming group headcount and specific dates.
          </p>
        </div>
      </section>

      {/* ====================================================================
          9. WHY CHOOSE US (Strictly based on guest feedback)
          ==================================================================== */}
      <section id="why-us" className="py-20 bg-[#132A1E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FAF7F2] bg-white/10 px-3.5 py-1.5 rounded-full mb-3 border border-white/20">
              <ShieldCheck className="w-4 h-4 text-[#C9A55C]" />
              <span>Guest-Praised Strengths</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF7F2] mb-4">
              Why Guests Recommend Our Resort
            </h2>
            <p className="text-[#E8E2D4] text-sm sm:text-base">
              Rooted exclusively in the genuine feedback shared by visitors who have experienced our property.
            </p>
          </div>

          {/* 4 Points based only on guest feedback */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((point) => (
              <div
                key={point.number}
                className="bg-white/5 backdrop-blur-xs rounded-2xl p-7 border border-white/10 hover:border-[#C9A55C]/50 transition-all duration-300"
              >
                <span className="font-serif text-3xl font-bold text-[#C9A55C] block mb-3">
                  {point.number}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#FAF7F2] mb-2.5">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#E8E2D4]/80 leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ====================================================================
          10. TESTIMONIALS SECTION (Carousel with 3 placeholder testimonials)
          ==================================================================== */}
      <section className="py-20 bg-[#F3EFE6]/60 border-b border-[#E8E2D4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#27523B] bg-white px-3.5 py-1.5 rounded-full mb-3 border border-[#E8E2D4]">
              <Star className="w-4 h-4 text-[#C9A55C] fill-[#C9A55C]" />
              <span>4.2 ★ from 40+ Google Reviews</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#132A1E]">
              What Visitors Say
            </h2>
            <p className="text-xs text-[#786C5B] mt-1 italic">
              [Note for Owner: Replace with real guest reviews]
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#E8E2D4] relative">
            <div className="flex items-center gap-1 mb-6 text-[#C9A55C]">
              {[...Array(PLACEHOLDER_TESTIMONIALS[testimonialIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#C9A55C]" />
              ))}
            </div>

            <blockquote className="font-serif text-lg sm:text-2xl text-[#132A1E] leading-relaxed italic mb-8">
              &ldquo;{PLACEHOLDER_TESTIMONIALS[testimonialIndex].quote}&rdquo;
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#E8E2D4]">
              <div>
                <div className="font-bold text-sm text-[#132A1E]">
                  {PLACEHOLDER_TESTIMONIALS[testimonialIndex].reviewer}
                </div>
                <div className="text-xs text-[#786C5B]">
                  {PLACEHOLDER_TESTIMONIALS[testimonialIndex].tag}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTestimonialIndex((prev) => (prev - 1 + PLACEHOLDER_TESTIMONIALS.length) % PLACEHOLDER_TESTIMONIALS.length)}
                  className="p-2.5 rounded-full border border-[#D5CDBC] text-[#132A1E] hover:bg-[#F3EFE6] transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="text-xs text-[#786C5B] px-2 font-medium">
                  {testimonialIndex + 1} / {PLACEHOLDER_TESTIMONIALS.length}
                </div>
                <button
                  type="button"
                  onClick={() => setTestimonialIndex((prev) => (prev + 1) % PLACEHOLDER_TESTIMONIALS.length)}
                  className="p-2.5 rounded-full border border-[#D5CDBC] text-[#132A1E] hover:bg-[#F3EFE6] transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          11. HOW TO REACH SECTION (Clear directions, address, landmarks & map)
          ==================================================================== */}
      <section id="how-to-reach" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#27523B] bg-[#E8E2D4]/60 px-3.5 py-1.5 rounded-full mb-3">
            <Compass className="w-4 h-4 text-[#C9A55C]" />
            <span>Finding The Resort</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#132A1E] mb-4">
            How to Reach Us
          </h2>
          <p className="text-sm sm:text-base text-[#5B6D60]">
            Because we are nestled in a peaceful, quiet jungle setting away from Indore, some guests have noted the turn can be easy to miss. Follow our guide below for a smooth trip.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Clear directions, address, landmarks */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Box */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E2D4] shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F3EFE6] text-[#1D3D2C] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#C9A55C]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#132A1E] mb-1">
                    Resort Address
                  </h3>
                  <p className="text-sm text-[#384A3E] font-medium">
                    {RESORT_CONFIG.address}
                  </p>
                  <p className="text-xs text-[#786C5B] mt-1">
                    {RESORT_CONFIG.city}
                  </p>
                </div>
              </div>
            </div>

            {/* Landmarks Box */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E2D4] shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F3EFE6] text-[#1D3D2C] flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-[#C9A55C]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#132A1E] mb-1">
                    Key Landmarks for Navigation
                  </h3>
                  <p className="text-sm text-[#384A3E]">
                    {RESORT_CONFIG.landmarks}
                  </p>
                  <p className="text-xs text-[#786C5B] mt-1">
                    (Look for resort signage near the designated landmarks)
                  </p>
                </div>
              </div>
            </div>

            {/* Helpful Visitor Navigation Tip */}
            <div className="bg-[#1D3D2C] text-[#FAF7F2] rounded-2xl p-6 border border-[#27523B] shadow-md">
              <div className="flex items-center gap-2 text-[#C9A55C] font-semibold text-sm mb-2">
                <Info className="w-4 h-4" />
                <span>Travel Tip for First-Time Visitors</span>
              </div>
              <p className="text-xs sm:text-sm text-[#E8E2D4] leading-relaxed mb-4">
                We strongly advise giving our reception team a quick phone call at <strong className="text-white">{RESORT_CONFIG.phone}</strong> when you begin your drive from Indore so we can send live pin guidance or assist with the exact turn.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={`tel:${sanitizePhoneForWhatsApp(RESORT_CONFIG.phone)}`}
                  className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A55C]" />
                  <span>Call Reception for Directions</span>
                </a>
              </div>
            </div>

            {/* Get Directions Button */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESORT_CONFIG.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#C9A55C] hover:bg-[#DFBE74] text-[#132A1E] font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <ExternalLink className="w-4 h-4 text-[#132A1E]" />
              <span>Get Directions on Google Maps</span>
            </a>

          </div>

          {/* Right Column: Embedded Google Map (No API Key needed) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-3 border border-[#E8E2D4] shadow-md">
            <div className="w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden relative">
              <iframe
                title="Shree Balaji Jungle Resorts Indore Location Map"
                src="https://maps.google.com/maps?q=Shree+Balaji+Jungle+Resorts+Indore&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          12. FAQ SECTION (Accordion with 5 questions)
          ==================================================================== */}
      <section id="faq" className="py-20 bg-[#F3EFE6]/60 border-y border-[#E8E2D4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#27523B] bg-white px-3.5 py-1.5 rounded-full mb-3 border border-[#E8E2D4]">
              <Info className="w-4 h-4 text-[#C9A55C]" />
              <span>Got Questions?</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#132A1E] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#5B6D60]">
              Everything you need to know before visiting {RESORT_CONFIG.name}.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E8E2D4] overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#27523B]"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#132A1E]">
                      {item.question}
                    </span>
                    <span className="p-1 rounded-full bg-[#F3EFE6] text-[#1D3D2C] shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#5B6D60] leading-relaxed border-t border-[#F3EFE6]">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-[#5B6D60] mb-3">
              Have another question not answered here?
            </p>
            <button
              type="button"
              onClick={handleGeneralWhatsApp}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D3D2C] hover:text-[#C9A55C] underline underline-offset-4"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask us directly on WhatsApp</span>
            </button>
          </div>

        </div>
      </section>

      {/* ====================================================================
          13. ENQUIRY FORM SECTION
          (Name, phone, guests, date, type. On submit -> opens prefilled WhatsApp)
          ==================================================================== */}
      <section id="enquiry" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#E8E2D4] shadow-xl">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#27523B] bg-[#E8E2D4]/60 px-3.5 py-1.5 rounded-full mb-3">
              <Calendar className="w-4 h-4 text-[#C9A55C]" />
              <span>Reserve & Plan Your Visit</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#132A1E] mb-3">
              Book / Enquire on WhatsApp
            </h2>
            <p className="text-sm sm:text-base text-[#5B6D60]">
              Fill out your details below and we will automatically format a ready-to-send WhatsApp message to our reservations team.
            </p>
          </div>

          {formSubmitted && (
            <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Your message has been pre-filled in WhatsApp! Click send in the WhatsApp window to connect with our staff.</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} noValidate className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#132A1E] mb-2">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Rajesh Sharma"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.name ? 'border-red-400 bg-red-50/30' : 'border-[#D5CDBC] bg-[#FAF7F2]'
                  } text-[#132A1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#27523B]`}
                  required
                />
                {formErrors.name && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">{formErrors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#132A1E] mb-2">
                  Contact Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.phone ? 'border-red-400 bg-red-50/30' : 'border-[#D5CDBC] bg-[#FAF7F2]'
                  } text-[#132A1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#27523B]`}
                  required
                />
                {formErrors.phone && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">{formErrors.phone}</p>
                )}
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Number of Guests */}
              <div>
                <label htmlFor="guests" className="block text-xs font-bold uppercase tracking-wider text-[#132A1E] mb-2">
                  Number of Guests <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="guests"
                    type="number"
                    min="1"
                    max="500"
                    placeholder="e.g. 6"
                    value={formData.guests}
                    onChange={(e) => {
                      setFormData({ ...formData, guests: e.target.value });
                      if (formErrors.guests) setFormErrors({ ...formErrors, guests: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      formErrors.guests ? 'border-red-400 bg-red-50/30' : 'border-[#D5CDBC] bg-[#FAF7F2]'
                    } text-[#132A1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#27523B]`}
                    required
                  />
                  <Users className="w-4 h-4 text-[#786C5B] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {formErrors.guests && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">{formErrors.guests}</p>
                )}
              </div>

              {/* Preferred Date */}
              <div>
                <label htmlFor="date" className="block text-xs font-bold uppercase tracking-wider text-[#132A1E] mb-2">
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => {
                      setFormData({ ...formData, date: e.target.value });
                      if (formErrors.date) setFormErrors({ ...formErrors, date: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      formErrors.date ? 'border-red-400 bg-red-50/30' : 'border-[#D5CDBC] bg-[#FAF7F2]'
                    } text-[#132A1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#27523B]`}
                    required
                  />
                </div>
                {formErrors.date && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">{formErrors.date}</p>
                )}
              </div>

              {/* Experience Type */}
              <div>
                <label htmlFor="type" className="block text-xs font-bold uppercase tracking-wider text-[#132A1E] mb-2">
                  Experience Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => {
                    setFormData({ ...formData, type: e.target.value });
                    if (formErrors.type) setFormErrors({ ...formErrors, type: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.type ? 'border-red-400 bg-red-50/30' : 'border-[#D5CDBC] bg-[#FAF7F2]'
                  } text-[#132A1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#27523B]`}
                  required
                >
                  <option value="Day Outing">Day Outing</option>
                  <option value="Overnight Stay">Overnight Stay</option>
                  <option value="Party / Celebration">Party / Celebration</option>
                  <option value="General Enquiry">General Enquiry</option>
                </select>
                {formErrors.type && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">{formErrors.type}</p>
                )}
              </div>

            </div>

            {/* Optional Special Requests */}
            <div>
              <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-[#132A1E] mb-2">
                Special Requests or Dietary Preferences (Optional)
              </label>
              <textarea
                id="notes"
                rows={3}
                placeholder="e.g. Vegetarian lunch preferences, celebration arrangements, arrival time..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#D5CDBC] bg-[#FAF7F2] text-[#132A1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#27523B]"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-8 rounded-full bg-[#1D3D2C] hover:bg-[#132A1E] text-white font-bold text-base flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-[#C9A55C]" />
                <span>Submit & Open in WhatsApp</span>
              </button>
              <p className="text-center text-xs text-[#786C5B] mt-3">
                No payment or signup needed. Submitting instantly prepares your enquiry in WhatsApp.
              </p>
            </div>

          </form>

        </div>
      </section>

      {/* ====================================================================
          14. FOOTER
          (Address, hours, phone, Instagram, and "Demo preview by Yadav Digital Studio")
          ==================================================================== */}
      <footer className="bg-[#0C1A12] text-[#E8E2D4] pt-16 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            
            {/* Col 1: Brand & Bio */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-[#1D3D2C] text-[#FAF7F2] flex items-center justify-center border border-[#C9A55C]/40">
                  <Trees className="w-4 h-4 text-[#C9A55C]" />
                </div>
                <span className="font-serif font-bold text-lg text-white uppercase tracking-wider">
                  {RESORT_CONFIG.name}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#E8E2D4]/80 leading-relaxed mb-6">
                Your peaceful jungle escape near Indore, MP. Relax in open green lawns, enjoy tasty food, and make unforgettable memories with family & friends.
              </p>
              
              <div className="flex items-center gap-2 text-xs text-[#C9A55C]">
                <Star className="w-4 h-4 fill-[#C9A55C]" />
                <span>Google Rating: <strong>4.2 Stars</strong> (40+ Reviews)</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="font-serif font-bold text-white text-base mb-4">
                Explore
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#facilities" className="hover:text-white transition-colors">Facilities</a></li>
                <li><a href="#experiences" className="hover:text-white transition-colors">Experiences</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Photo Gallery</a></li>
                <li><a href="#packages" className="hover:text-white transition-colors">Packages & Rates</a></li>
                <li><a href="#how-to-reach" className="hover:text-white transition-colors">How to Reach Us</a></li>
              </ul>
            </div>

            {/* Col 3: Hours & Timing */}
            <div>
              <h4 className="font-serif font-bold text-white text-base mb-4">
                Hours & Days
              </h4>
              <div className="space-y-3 text-xs sm:text-sm text-[#E8E2D4]/90">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#C9A55C] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium text-white">Opening Hours:</span>
                    <span>{RESORT_CONFIG.openingHours}</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#C9A55C]">
                  <strong>Notice:</strong> {RESORT_CONFIG.closedNote}
                </div>
              </div>
            </div>

            {/* Col 4: Contact & Social */}
            <div>
              <h4 className="font-serif font-bold text-white text-base mb-4">
                Contact & Address
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C9A55C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white block font-medium">Address:</span>
                    <span>{RESORT_CONFIG.address}</span>
                    <span className="block text-white/60">{RESORT_CONFIG.city}</span>
                  </div>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#C9A55C] shrink-0" />
                  <a href={`tel:${sanitizePhoneForWhatsApp(RESORT_CONFIG.phone)}`} className="hover:text-white transition-colors">
                    {RESORT_CONFIG.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Instagram className="w-4 h-4 text-[#C9A55C] shrink-0" />
                  <a
                    href={RESORT_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {RESORT_CONFIG.instagram}
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar with mandatory Demo Preview credit */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
            <p>
              &copy; {new Date().getFullYear()} {RESORT_CONFIG.name}. All rights reserved.
            </p>
            <p className="font-medium text-[#C9A55C]/90">
              {RESORT_CONFIG.creditText}
            </p>
          </div>

        </div>
      </footer>

      {/* ====================================================================
          15. FLOATING BUTTONS
          - Floating WhatsApp button on all screens
          - Floating "Call Now" button on mobile screens
          ==================================================================== */}
      
      {/* Floating WhatsApp Button (all screens) */}
      <aside aria-label="Quick contact" className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40 flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={handleGeneralWhatsApp}
          className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="hidden sm:inline font-semibold text-sm">
            Chat on WhatsApp
          </span>
        </button>
      </aside>

      {/* Floating Call Now Button on mobile (bottom bar) */}
      <aside aria-label="Mobile phone call" className="fixed bottom-6 left-5 z-40 sm:hidden">
        <a
          href={`tel:${sanitizePhoneForWhatsApp(RESORT_CONFIG.phone)}`}
          className="flex items-center gap-2 bg-[#132A1E] hover:bg-[#0C1A12] text-[#FAF7F2] p-3.5 rounded-full shadow-2xl border border-[#C9A55C]/50 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#C9A55C]"
          aria-label="Call resort directly"
        >
          <Phone className="w-5 h-5 text-[#C9A55C]" />
          <span className="font-semibold text-xs pr-1">Call Now</span>
        </a>
      </aside>

    </div>
  );
}
