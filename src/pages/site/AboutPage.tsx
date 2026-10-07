import { HeartHandshake, Scale, Compass, Users, Shield, Handshake, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero.tsx";
import FounderVideo from "@/components/FounderVideo.tsx";

// --- Easy-swap assets --------------------------------------------------
// Hero background photo for this page. Replace public/images/about-hero.jpg
// with your new photo (keep the same file name) and it updates here automatically.
const HERO_IMAGE = "/images/about-hero.jpg";

// Founder video: paste a YouTube/Vimeo link here once you have one, e.g.
//   "https://www.youtube.com/watch?v=XXXXXXXXXXX"
// Leave blank to show the "coming soon" card.
const FOUNDER_VIDEO_URL = "";
const FOUNDER_VIDEO_POSTER = "/images/founder-video-poster.jpg";

// Community photo strip - replace these three files (same names) with real photos.
const communityPhotos = [
  { src: "/images/community-1.jpg", alt: "The ChatShack community" },
  { src: "/images/community-2.jpg", alt: "The ChatShack community" },
  { src: "/images/community-3.jpg", alt: "The ChatShack community" },
];
// -------------------------------------------------------------------------

const principles = [
  { icon: Scale, title: "Dignity", desc: "Every person is entitled to be treated with dignity and respect." },
  { icon: Users, title: "Equality", desc: "No one should be disadvantaged because of who they are or their circumstances." },
  { icon: Compass, title: "Choice", desc: "Where possible, people take part in decisions that affect them." },
  { icon: HeartHandshake, title: "Empowerment", desc: "We support informed choices, rather than creating dependency." },
  { icon: Shield, title: "Safeguarding", desc: "Safety takes priority where there is a serious concern about harm." },
  { icon: Handshake, title: "Partnership", desc: "We work constructively alongside statutory, clinical and community organisations." },
];

const whoWeAre = ["We listen.", "We talk.", "We signpost.", "We connect."];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        image={HERO_IMAGE}
        icon={HeartHandshake}
        eyebrow="Who we are"
        title="About The ChatShack"
        subtitle="People should be treated as people first, not problems to be solved."
      />

      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* A note from the founder */}
            <div className="bg-[#f5f0e8] border border-amber-200 rounded-2xl p-6 md:p-8 mb-12 relative">
              <Quote className="w-9 h-9 text-[#1a7a4a]/30 absolute top-5 left-5" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-600 mb-3">
                  A note from Scott, founder of The ChatShack
                </p>
                <p className="text-[#3a3a3a] italic mb-3">
                  "When I first thought about what The ChatShack could become, I wanted to create something
                  simple — a place where people could come and talk, without judgement, without feeling like
                  they had to explain themselves, and without being made to feel like a number."
                </p>
                <p className="text-[#3a3a3a] mb-3">
                  The ChatShack has grown from that simple idea into a peer-led mental health support
                  community for people aged 18+, built around one very important principle:
                </p>
                <p className="font-black text-[#1a7a4a] text-lg mb-3">
                  You don't have to wait until things become a crisis before asking for support.
                </p>
                <p className="text-[#3a3a3a] mb-1">
                  We want The ChatShack to be a <strong>1st Point of Contact</strong> for anyone who needs
                  somebody to talk to, some guidance, a little bit of support, or simply a safe place to be
                  around other people.
                </p>
                <p className="text-[#3a3a3a] font-bold">
                  And importantly — you do NOT have to have a diagnosed mental health issue to use The
                  ChatShack.
                </p>
                <p className="text-right font-bold text-[#1a3a2a] mt-5">— Scott, Founder</p>
              </div>
            </div>

            <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">Our ethos</h2>
            <p className="text-[#4a4a4a] mb-3">
              We're not here to replace the NHS, doctors, therapists or other professional services. We're
              here to help people find their way through what can often feel like a very complicated system.
              We're ordinary people supporting ordinary people.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 mb-3 font-bold text-[#1a7a4a]">
              {whoWeAre.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
            <p className="text-[#4a4a4a] mb-3">
              And when someone needs more specialist support, we work with our{" "}
              <Link to="/partners" className="text-[#1a7a4a] font-bold underline">
                Partners &amp; Resources Directory
              </Link>{" "}
              to try to connect that person with the right organisation, professional or service.
            </p>
            <div className="bg-[#e8f5ee] border-l-4 border-[#1a7a4a] px-5 py-4 rounded-r-xl mb-3 font-bold text-[#1a7a4a] text-center">
              If we can help, we'll help. If we can't, we'll try to find somebody who can.
            </div>
            <p className="text-[#4a4a4a] mb-3">
              We provide a safe environment where adults can talk without judgement; be listened to; meet
              people with shared experiences; develop supportive relationships; access information;
              understand available services; receive appropriate signposting; develop confidence;
              participate in activities; access peer support; and be supported to access professional
              treatment where required.
            </p>
            <div className="bg-[#e8f5ee] border-l-4 border-[#1a7a4a] px-5 py-4 rounded-r-xl mb-3 font-bold text-[#1a7a4a] text-center">
              SAFE SPACE &nbsp;•&nbsp; CONFIDENTIAL &nbsp;•&nbsp; NON-JUDGEMENTAL &nbsp;•&nbsp; PEER-LED &nbsp;•&nbsp; 18+ &nbsp;•&nbsp; NO FEE
            </div>
            <p className="text-[#4a4a4a] mb-12">The ChatShack seeks to remain human at all times.</p>

            {/* Founder video */}
            <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">Watch Scott introduce The ChatShack</h2>
            <p className="text-[#4a4a4a] mb-4">
              A short word from Scott, on why The ChatShack exists and who it's for.
            </p>
            <div className="mb-12">
              <FounderVideo videoUrl={FOUNDER_VIDEO_URL} poster={FOUNDER_VIDEO_POSTER} />
            </div>

            <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">Our mission</h2>
            <p className="text-[#4a4a4a] mb-3">
              Our mission is to provide an accessible first point of contact for adults experiencing mental
              health, wellbeing or related life difficulties. We aim to reduce barriers between people and
              appropriate support through peer-led support, listening, practical signposting, group support,
              one-to-one peer support, peer mentoring, wellbeing activities, community activities, workshops,
              partner referrals and advocacy where appropriate.
            </p>
            <p className="text-[#4a4a4a] mb-10 italic font-bold text-[#1a3a2a]">
              "If someone needs help, we want them to know where to start."
            </p>
          </div>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-4 text-center">Our core principles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            {principles.map((p) => (
              <div key={p.title} className="bg-[#f5f0e8] rounded-xl p-4 border border-amber-200">
                <div className="w-10 h-10 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center mb-2">
                  <p.icon className="w-5 h-5 text-[#1a7a4a]" />
                </div>
                <p className="font-bold text-[#1a3a2a] mb-1">{p.title}</p>
                <p className="text-sm text-[#4a4a4a]">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Community photo strip */}
          <h2 className="text-2xl font-black text-[#1a3a2a] mb-2 text-center">Our community, in pictures</h2>
          <p className="text-[#4a4a4a] mb-4 text-center">Real people, real connection, real support.</p>
          <div className="grid grid-cols-3 gap-3 mb-12">
            {communityPhotos.map((photo) => (
              <div key={photo.src} className="aspect-square rounded-xl overflow-hidden shadow-md">
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-[#4a4a4a] mb-6">
              The ChatShack is working to develop a community of like-minded communities — working
              collaboratively rather than competitively. Read more about{" "}
              <Link to="/community" className="text-[#1a7a4a] font-bold underline">
                Our Community
              </Link>
              , our{" "}
              <Link to="/partners" className="text-[#1a7a4a] font-bold underline">
                Partners &amp; Resources
              </Link>
              , or how we keep people{" "}
              <Link to="/safeguarding" className="text-[#1a7a4a] font-bold underline">
                safe
              </Link>
              .
            </p>

            <div className="text-center">
              <Link
                to="/get-involved"
                className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
              >
                <Users className="w-4 h-4" />
                GET INVOLVED
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
