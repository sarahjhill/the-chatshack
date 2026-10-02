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

const approachCards = [
  {
    icon: MessageCircle,
    title: "TALK",
    desc: "Someone to listen without judgement.",
    color: "bg-[#2d8a55]",
  },
  {
    icon: Users,
    title: "CONNECT",
    desc: "Meet people and become part of a community.",
    color: "bg-[#4a7ebf]",
  },
  {
    icon: Heart,
    title: "SUPPORT",
    desc: "Peer support, groups, activities and individual support.",
    color: "bg-[#e07b39]",
  },
  {
    icon: Compass,
    title: "ACCESS",
    desc: "Help finding appropriate professional services and treatment when needed.",
    color: "bg-[#8b5fb8]",
  },
];

const promiseItems = [
  { icon: Shield, label: "SAFE\nSPACE" },
  { icon: Lock, label: "CONFIDENTIAL" },
  { icon: Smile, label: "NON-\nJUDGEMENTAL" },
  { icon: DollarSign, label: "FREE" },
  { icon: User, label: "18+" },
];

const communityItems = [
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
];

const partnerCategories = [
  { icon: Brain, label: "Mental\nHealth" },
  { icon: Stethoscope, label: "Therapy" },
  { icon: Activity, label: "Wellbeing" },
  { icon: Dumbbell, label: "Physical\nHealth" },
  { icon: Home, label: "Housing &\nHomelessness" },
  { icon: Banknote, label: "Financial\nSupport" },
  { icon: RefreshCw, label: "Addiction &\nRecovery" },
  { icon: UsersRound, label: "Community\nGroups" },
];

export default function HomePage() {
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
              YOU ARE NOT ALONE.
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-white font-black text-2xl md:text-3xl mb-3"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
            >
              The ChatShack C.I.C.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-white/90 text-lg font-semibold mb-2"
            >
              A peer-led mental health support community for adults aged 18+.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="text-white/80 mb-4"
            >
              A safe, confidential and non-judgemental place to talk, connect, find support and explore the next step.
            </motion.p>
            <div className="flex gap-3 flex-wrap text-white/80 text-sm font-bold mb-6 tracking-wide">
              <span>FREE</span><span>•</span><span>18+</span><span>•</span>
              <span>PEER-LED</span><span>•</span><span>COMMUNITY BASED</span>
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
                I NEED SUPPORT
              </Link>
              <Link
                to="/about"
                className="bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-colors text-sm border border-white/40"
              >
                FIND OUT ABOUT THE CHATSHACK
              </Link>
            </motion.div>
          </div>
          {/* Corner tagline */}
          <div className="absolute bottom-8 right-8 text-right hidden md:block">
            <p className="text-white/80 italic font-serif text-sm">A safe place to talk...</p>
            <p className="text-white/80 italic font-serif text-sm">A brighter tomorrow...</p>
          </div>
        </div>
      </section>

      {/* WHAT IS THE CHATSHACK + OUR APPROACH */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          {/* What is */}
          <div>
            <h2 className="text-2xl font-black text-[#1a3a2a] mb-1">What is The ChatShack?</h2>
            <h3 className="text-xl font-bold text-[#1a3a2a] mb-3">A place where you can talk.</h3>
            <p className="text-[#4a4a4a] mb-4">
              The ChatShack C.I.C. is a peer-led mental health support community created around a simple belief:
            </p>
            <div className="bg-[#e8f5ee] border-l-4 border-[#1a7a4a] px-5 py-3 rounded-r-xl mb-4 italic font-bold text-[#1a7a4a] text-lg">
              Nobody should have to face difficult times alone.
            </div>
            <p className="text-[#4a4a4a] mb-3">
              We provide a welcoming community where adults can meet others, talk openly, build connections and access appropriate support.
            </p>
            <p className="text-[#4a4a4a] mb-3">
              We are not here to judge you, tell you how you should feel or make assumptions about your circumstances.
            </p>
            <p className="font-bold text-[#1a7a4a]">
              We're here to listen, support and help you find the right next step.
            </p>
          </div>

          {/* Our Approach */}
          <div>
            <h2 className="text-2xl font-black text-[#1a3a2a] mb-4">Our Approach</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {approachCards.map((card) => (
                <motion.div
                  key={card.title}
                  whileHover={{ scale: 1.03 }}
                  className={`${card.color} text-white rounded-xl p-4 flex flex-col items-center text-center cursor-default`}
                >
                  <card.icon className="w-8 h-8 mb-2" />
                  <div className="font-black text-lg">{card.title}</div>
                  <div className="text-white text-xs mt-1">{card.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Our Promise */}
            <div className="bg-[#f5f0e8] rounded-xl p-4 border border-amber-200">
              <h3 className="font-black text-[#1a3a2a] text-center mb-3">Our Promise</h3>
              <div className="flex justify-around flex-wrap gap-2">
                {promiseItems.map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#1a7a4a]" />
                    </div>
                    <span className="text-xs font-bold text-[#1a3a2a] text-center whitespace-pre-line leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs italic text-[#6a6a6a] mt-3">
                You don't have to have all the answers before you come through the door.
              </p>
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
                <span className="text-amber-400">⏰</span> Need help today?
              </h2>
              <p className="text-white font-semibold mb-3">
                The ChatShack aims to provide a 1st Point of Contact for people experiencing mental-health difficulties.
              </p>
              <p className="text-white/80 mb-3">
                Where appropriate and where available, we can help people navigate towards same-day support and treatment.
              </p>
              <p className="text-white/80 mb-5">
                If we can't provide what you need ourselves, our Directory of Partners & Resources helps connect you with organisations that may be able to help.
              </p>
              <Link
                to="/support"
                className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                FIND SUPPORT
              </Link>
            </div>

            <div className="space-y-4">
              {/* Emergency callout */}
              <div className="bg-red-600 text-white rounded-xl p-5 flex gap-3">
                <AlertTriangle className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-black text-lg">IN AN EMERGENCY OR IMMEDIATE DANGER</p>
                  <p className="font-bold text-xl">PLEASE CALL 999</p>
                  <p className="text-white/90 text-sm mt-1">or go to your nearest A&E department.</p>
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
              <h2 className="text-2xl font-black text-[#1a3a2a] mb-1">Our Community</h2>
              <h3 className="text-lg font-bold uppercase tracking-wide text-amber-600 mb-3">MORE THAN A GROUP. A COMMUNITY.</h3>
              <p className="text-[#3a3a3a] mb-4">
                The ChatShack isn't just about sitting in a room and talking. Our community can include:
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6">
                {communityItems.map((item) => (
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
                JOIN OUR COMMUNITY
              </Link>
            </div>
            <div className="bg-[#1a2e1a] rounded-2xl p-8 flex flex-col justify-center text-white min-h-[240px]">
              <p className="font-black text-2xl md:text-3xl text-amber-400 leading-tight">
                Real People.
              </p>
              <p className="font-black text-2xl md:text-3xl text-white leading-tight">
                Real support.
              </p>
              <p className="font-black text-2xl md:text-3xl text-amber-400 leading-tight">
                Real change.
              </p>
              <p className="text-white/60 mt-4 text-sm italic">
                "Nobody should have to face difficult times alone."
              </p>
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
                  <h2 className="text-2xl font-black text-[#1a3a2a]">Partners & Resources</h2>
                  <p className="text-sm font-bold uppercase tracking-wide text-amber-600">WE DON'T HAVE TO DO IT ALL OURSELVES.</p>
                </div>
              </div>
              <p className="text-[#3a3a3a] mb-3">
                The ChatShack is building a Community of Like-Minded Communities. We work bringing together trusted organisations, professionals, community groups and resources across mental health, wellbeing and wider social support.
              </p>
              <p className="text-[#3a3a3a] mb-6">
                If we can't help, one of our partners may be able to.
              </p>
              <Link
                to="/partners"
                className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
              >
                <Users className="w-4 h-4" />
                EXPLORE OUR PARTNERS
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {partnerCategories.map((cat) => (
                <div key={cat.label} className="bg-white rounded-xl p-3 flex flex-col items-center text-center shadow-sm">
                  <div className="w-10 h-10 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center mb-2">
                    <cat.icon className="w-5 h-5 text-[#1a7a4a]" />
                  </div>
                  <span className="text-xs font-bold text-[#1a3a2a] text-center whitespace-pre-line leading-tight">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DONATE CTA */}
      <section className="bg-[#1a7a4a] py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-2">Together we can make a bigger difference.</h2>
          <p className="text-white/80 mb-6">
            Your donation helps us keep our services free and available for everyone who needs them.
          </p>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3 rounded-full transition-colors text-lg"
          >
            <Heart className="w-5 h-5" />
            DONATE TODAY
          </Link>
        </div>
      </section>
    </div>
  );
}
