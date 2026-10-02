import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  MessageCircle,
  Users,
  Heart,
  Compass,
  Shield,
  Lock,
  Smile,
  DollarSign,
  User,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Brain,
  Stethoscope,
  Activity,
  Dumbbell,
  Home,
  Banknote,
  RefreshCw,
  UsersRound,
} from "lucide-react";

const HERO_IMAGE = "/images/hero-image.jpg";

// Fixed visual metadata (icons/colors) for each list item. These stay in code
// so the CMS only ever edits text, never layout/icons/colors - the look never
// changes. Each is paired with the matching text from content/home.json by
// position.
const approachIcons = [MessageCircle, Users, Heart, Compass];
const approachColors = ["bg-[#2d8a55]", "bg-[#4a7ebf]", "bg-[#e07b39]", "bg-[#8b5fb8]"];
const promiseIcons = [Shield, Lock, Smile, DollarSign, User];
const partnerIcons = [Brain, Stethoscope, Activity, Dumbbell, Home, Banknote, RefreshCw, UsersRound];

// This object is the single source of truth for the page's text, and also
// doubles as the fallback/initial content so the page renders exactly as
// before immediately, with zero flash - it's then replaced (if different) by
// whatever content/home.json (editable via the CMS) contains.
const DEFAULT_CONTENT = {
  hero: {
    eyebrow: "YOU ARE NOT ALONE.",
    title: "The ChatShack C.I.C.",
    lede1: "A peer-led mental health support community for adults aged 18+.",
    lede2:
      "A safe, confidential and non-judgemental place to talk, connect, find support and explore the next step.",
    tags: ["FREE", "18+", "PEER-LED", "COMMUNITY BASED"],
    primaryButtonLabel: "I NEED SUPPORT",
    secondaryButtonLabel: "FIND OUT ABOUT THE CHATSHACK",
    cornerLine1: "A safe place to talk...",
    cornerLine2: "A brighter tomorrow...",
  },
  about: {
    heading: "What is The ChatShack?",
    tagline: "A place where you can talk.",
    intro:
      "The ChatShack C.I.C. is a peer-led mental health support community created around a simple belief:",
    belief: "Nobody should have to face difficult times alone.",
    paragraph1:
      "We provide a welcoming community where adults can meet others, talk openly, build connections and access appropriate support.",
    paragraph2:
      "We are not here to judge you, tell you how you should feel or make assumptions about your circumstances.",
    paragraph3: "We're here to listen, support and help you find the right next step.",
  },
  approach: {
    heading: "Our Approach",
    cards: [
      { title: "TALK", desc: "Someone to listen without judgement." },
      { title: "CONNECT", desc: "Meet people and become part of a community." },
      { title: "SUPPORT", desc: "Peer support, groups, activities and individual support." },
      { title: "ACCESS", desc: "Help finding appropriate professional services and treatment when needed." },
    ],
  },
  promise: {
    heading: "Our Promise",
    items: [
      { label: "SAFE\nSPACE" },
      { label: "CONFIDENTIAL" },
      { label: "NON-\nJUDGEMENTAL" },
      { label: "FREE" },
      { label: "18+" },
    ],
    note: "You don't have to have all the answers before you come through the door.",
  },
  crisis: {
    heading: "Need help today?",
    paragraph1:
      "The ChatShack aims to provide a 1st Point of Contact for people experiencing mental-health difficulties.",
    paragraph2:
      "Where appropriate and where available, we can help people navigate towards same-day support and treatment.",
    paragraph3:
      "If we can't provide what you need ourselves, our Directory of Partners & Resources helps connect you with organisations that may be able to help.",
    buttonLabel: "FIND SUPPORT",
    emergencyTitle: "IN AN EMERGENCY OR IMMEDIATE DANGER",
    emergencyNumber: "PLEASE CALL 999",
    emergencyNote: "or go to your nearest A&E department.",
  },
  community: {
    heading: "Our Community",
    subheading: "MORE THAN A GROUP. A COMMUNITY.",
    paragraph: "The ChatShack isn't just about sitting in a room and talking. Our community can include:",
    items: [
      "Men's groups",
      "Women's groups",
      "Walk & Talk sessions",
      "Peer mentoring",
      "1-to-1 peer support",
      "Wellbeing activities",
      "Stress-relief activities",
      "Community events",
      "Online community connection",
      "Support for people who may find traditional services difficult to access",
    ],
    buttonLabel: "JOIN OUR COMMUNITY",
    quoteLine1: "Real People.",
    quoteLine2: "Real support.",
    quoteLine3: "Real change.",
    quote: "\"Nobody should have to face difficult times alone.\"",
  },
  partners: {
    heading: "Partners & Resources",
    subheading: "WE DON'T HAVE TO DO IT ALL OURSELVES.",
    paragraph1:
      "The ChatShack is building a Community of Like-Minded Communities. We work bringing together trusted organisations, professionals, community groups and resources across mental health, wellbeing and wider social support.",
    paragraph2: "If we can't help, one of our partners may be able to.",
    buttonLabel: "EXPLORE OUR PARTNERS",
    categories: [
      { label: "Mental\nHealth" },
      { label: "Therapy" },
      { label: "Wellbeing" },
      { label: "Physical\nHealth" },
      { label: "Housing &\nHomelessness" },
      { label: "Financial\nSupport" },
      { label: "Addiction &\nRecovery" },
      { label: "Community\nGroups" },
    ],
  },
  donate: {
    heading: "Together we can make a bigger difference.",
    paragraph: "Your donation helps us keep our services free and available for everyone who needs them.",
    buttonLabel: "DONATE TODAY",
  },
};

type HomeContent = typeof DEFAULT_CONTENT;

export default function HomePage() {
  const [content, setContent] = useState<HomeContent>(DEFAULT_CONTENT);

  useEffect(() => {
    let cancelled = false;
    fetch("/content/home.json", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) {
          // Shallow-merge per-section so a partially-filled-in content file
          // (or one missing a brand-new field) never breaks rendering.
          setContent((prev) => {
            const merged = { ...prev } as HomeContent;
            for (const key of Object.keys(prev) as (keyof HomeContent)[]) {
              if (data[key]) merged[key] = { ...prev[key], ...data[key] } as never;
            }
            return merged;
          });
        }
      })
      .catch(() => {
        // Network hiccup or file briefly missing - keep showing defaults.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const { hero, about, approach, promise, crisis, community, partners, donate } = content;

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative min-h-[560px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-white font-black text-4xl md:text-5xl lg:text-6xl leading-tight mb-2"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
            >
              {hero.eyebrow}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-white font-black text-2xl md:text-3xl mb-3"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
            >
              {hero.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-white/90 text-lg font-semibold mb-2"
            >
              {hero.lede1}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="text-white/80 mb-4"
            >
              {hero.lede2}
            </motion.p>
            <div className="flex gap-3 flex-wrap text-white/80 text-sm font-bold mb-6 tracking-wide">
              {hero.tags.map((tag, i) => (
                <span key={tag}>
                  {i > 0 && <span className="mr-3">•</span>}
                  {tag}
                </span>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/support"
                className="bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                {hero.primaryButtonLabel}
              </Link>
              <Link
                to="/about"
                className="bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-colors text-sm border border-white/40"
              >
                {hero.secondaryButtonLabel}
              </Link>
            </motion.div>
          </div>
          {/* Corner tagline */}
          <div className="absolute bottom-8 right-8 text-right hidden md:block">
            <p className="text-white/80 italic font-serif text-sm">{hero.cornerLine1}</p>
            <p className="text-white/80 italic font-serif text-sm">{hero.cornerLine2}</p>
          </div>
        </div>
      </section>

      {/* WHAT IS THE CHATSHACK + OUR APPROACH */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          {/* What is */}
          <div>
            <h2 className="text-2xl font-black text-[#1a3a2a] mb-1">{about.heading}</h2>
            <h3 className="text-xl font-bold text-[#1a3a2a] mb-3">{about.tagline}</h3>
            <p className="text-[#4a4a4a] mb-4">{about.intro}</p>
            <div className="bg-[#e8f5ee] border-l-4 border-[#1a7a4a] px-5 py-3 rounded-r-xl mb-4 italic font-bold text-[#1a7a4a] text-lg">
              {about.belief}
            </div>
            <p className="text-[#4a4a4a] mb-3">{about.paragraph1}</p>
            <p className="text-[#4a4a4a] mb-3">{about.paragraph2}</p>
            <p className="font-bold text-[#1a7a4a]">{about.paragraph3}</p>
          </div>

          {/* Our Approach */}
          <div>
            <h2 className="text-2xl font-black text-[#1a3a2a] mb-4">{approach.heading}</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {approach.cards.map((card, i) => {
                const Icon = approachIcons[i];
                return (
                  <motion.div
                    key={card.title}
                    whileHover={{ scale: 1.03 }}
                    className={`${approachColors[i]} text-white rounded-xl p-4 flex flex-col items-center text-center cursor-default`}
                  >
                    {Icon && <Icon className="w-8 h-8 mb-2" />}
                    <div className="font-black text-lg">{card.title}</div>
                    <div className="text-white text-xs mt-1">{card.desc}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Our Promise */}
            <div className="bg-[#f5f0e8] rounded-xl p-4 border border-amber-200">
              <h3 className="font-black text-[#1a3a2a] text-center mb-3">{promise.heading}</h3>
              <div className="flex justify-around flex-wrap gap-2">
                {promise.items.map((item, i) => {
                  const Icon = promiseIcons[i];
                  return (
                    <div key={item.label} className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center">
                        {Icon && <Icon className="w-5 h-5 text-[#1a7a4a]" />}
                      </div>
                      <span className="text-xs font-bold text-[#1a3a2a] text-center whitespace-pre-line leading-tight">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-center text-xs italic text-[#6a6a6a] mt-3">{promise.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEED HELP TODAY */}
      <section
        className="relative py-14"
        style={{
          backgroundImage: `url(/images/homepage-bg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-black text-white mb-3 flex items-center gap-2">
                <span className="text-amber-400">⏰</span> {crisis.heading}
              </h2>
              <p className="text-white font-semibold mb-3">{crisis.paragraph1}</p>
              <p className="text-white/80 mb-3">{crisis.paragraph2}</p>
              <p className="text-white/80 mb-5">{crisis.paragraph3}</p>
              <Link
                to="/support"
                className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                {crisis.buttonLabel}
              </Link>
            </div>

            <div className="space-y-4">
              {/* Emergency callout */}
              <div className="bg-red-600 text-white rounded-xl p-5 flex gap-3">
                <AlertTriangle className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-black text-lg">{crisis.emergencyTitle}</p>
                  <p className="font-bold text-xl">{crisis.emergencyNumber}</p>
                  <p className="text-white/90 text-sm mt-1">{crisis.emergencyNote}</p>
                </div>
              </div>

              {/* Signpost visual */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <div className="space-y-2">
                  {["Hope", "Support", "Community", "Recovery"].map((word) => (
                    <div key={word} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="font-bold text-primary text-lg">{word}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR COMMUNITY */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-black text-[#1a3a2a] mb-1">{community.heading}</h2>
              <h3 className="text-lg font-bold uppercase tracking-wide text-amber-600 mb-3">
                {community.subheading}
              </h3>
              <p className="text-[#3a3a3a] mb-4">{community.paragraph}</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6">
                {community.items.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-[#3a3a3a] font-medium">
                    <CheckCircle className="w-4 h-4 text-[#1a7a4a] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/community"
                className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
              >
                <Users className="w-4 h-4" />
                {community.buttonLabel}
              </Link>
            </div>
            <div className="bg-[#1a2e1a] rounded-2xl p-8 flex flex-col justify-center text-white min-h-[240px]">
              <p className="font-black text-2xl md:text-3xl text-amber-400 leading-tight">{community.quoteLine1}</p>
              <p className="font-black text-2xl md:text-3xl text-white leading-tight">{community.quoteLine2}</p>
              <p className="font-black text-2xl md:text-3xl text-amber-400 leading-tight">{community.quoteLine3}</p>
              <p className="text-white/60 mt-4 text-sm italic">{community.quote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS & RESOURCES */}
      <section className="bg-[#f5f0e8] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#1a3a2a]">{partners.heading}</h2>
                  <p className="text-sm font-bold uppercase tracking-wide text-amber-600">{partners.subheading}</p>
                </div>
              </div>
              <p className="text-[#3a3a3a] mb-3">{partners.paragraph1}</p>
              <p className="text-[#3a3a3a] mb-6">{partners.paragraph2}</p>
              <Link
                to="/partners"
                className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
              >
                <Users className="w-4 h-4" />
                {partners.buttonLabel}
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {partners.categories.map((cat, i) => {
                const Icon = partnerIcons[i];
                return (
                  <div key={cat.label} className="bg-white rounded-xl p-3 flex flex-col items-center text-center shadow-sm">
                    <div className="w-10 h-10 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center mb-2">
                      {Icon && <Icon className="w-5 h-5 text-[#1a7a4a]" />}
                    </div>
                    <span className="text-xs font-bold text-[#1a3a2a] text-center whitespace-pre-line leading-tight">
                      {cat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* DONATE CTA */}
      <section className="bg-[#1a7a4a] py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-2">{donate.heading}</h2>
          <p className="text-white/80 mb-6">{donate.paragraph}</p>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3 rounded-full transition-colors text-lg"
          >
            <Heart className="w-5 h-5" />
            {donate.buttonLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
