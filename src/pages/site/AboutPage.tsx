import { HeartHandshake, Scale, Compass, Users, Shield, Handshake, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero.tsx";
import FounderVideo from "@/components/FounderVideo.tsx";
import { usePageContent, block, items } from "@/lib/pageContent.ts";
import RichText from "@/components/RichText.tsx";
import PageMeta from "@/components/PageMeta.tsx";

// --- Easy-swap assets --------------------------------------------------
// Hero background photo for this page. Replace public/images/about-hero.jpg
// with your new photo (keep the same file name) and it updates here automatically.
// Or upload a new one in admin (Page heroes > About Us) to override it live.
const HERO_IMAGE = "/images/about-hero.jpg";

// Founder video: paste a YouTube/Vimeo link here once you have one, e.g.
//   "https://www.youtube.com/watch?v=XXXXXXXXXXX"
// Leave blank to show the "coming soon" card.
const FOUNDER_VIDEO_URL = "";
const FOUNDER_VIDEO_POSTER = "/images/founder-video-poster.jpg";

// Community photo strip - replace these three files (same names) with real photos,
// or add/remove photos from admin (Cards & list items > About Us > photo_strip).
const defaultCommunityPhotos = [
  { src: "/images/community-1.jpg", alt: "The ChatShack community" },
  { src: "/images/community-2.jpg", alt: "The ChatShack community" },
  { src: "/images/community-3.jpg", alt: "The ChatShack community" },
];
// -------------------------------------------------------------------------

const defaultPrinciples = [
  { icon: Scale, title: "Dignity", desc: "Every person is entitled to be treated with dignity and respect." },
  { icon: Users, title: "Equality", desc: "No one should be disadvantaged because of who they are or their circumstances." },
  { icon: Compass, title: "Choice", desc: "Where possible, people take part in decisions that affect them." },
  { icon: HeartHandshake, title: "Empowerment", desc: "We support informed choices, rather than creating dependency." },
  { icon: Shield, title: "Safeguarding", desc: "Safety takes priority where there is a serious concern about harm." },
  { icon: Handshake, title: "Partnership", desc: "We work constructively alongside statutory, clinical and community organisations." },
];
const principleIcons = [Scale, Users, Compass, HeartHandshake, Shield, Handshake];

const defaultWhoWeAre = ["We listen.", "We talk.", "We signpost.", "We connect."];
const defaultTags = ["SAFE SPACE", "CONFIDENTIAL", "NON-JUDGEMENTAL", "PEER-LED", "18+", "NO FEE"];

export default function AboutPage() {
  const content = usePageContent("about");

  const whyWeExist = block(content, "why_we_exist");
  const ethos = block(content, "ethos");
  const founderNote = block(content, "founder_note");

  const whoWeAreItems = items(content, "who_we_are");
  const whoWeAre = whoWeAreItems.length ? whoWeAreItems.map((i) => i.title) : defaultWhoWeAre;

  const principleItems = items(content, "principles");
  const principlesFromApi = principleItems.length > 0;
  const principles = principlesFromApi
    ? principleItems.map((i, idx) => ({ icon: principleIcons[idx] ?? Scale, title: i.title, desc: i.description }))
    : defaultPrinciples;

  const tagItems = items(content, "tags");
  const tags = tagItems.length ? tagItems.map((i) => i.title) : defaultTags;

  const photoItems = items(content, "photo_strip");
  const communityPhotos = photoItems.length
    ? photoItems.map((i, idx) => ({
        src: i.image || defaultCommunityPhotos[idx]?.src || defaultCommunityPhotos[0].src,
        alt: i.description || "The ChatShack community",
      }))
    : defaultCommunityPhotos;

  return (
    <div className="min-h-screen">
      <PageMeta title="About Us" description="Who we are and why The Chat Shack exists - a peer-led mental health support community for adults 18+, run by people who understand." />
      <PageHero
        image={content.hero?.image || HERO_IMAGE}
        icon={HeartHandshake}
        eyebrow={content.hero?.eyebrow || "Who we are"}
        title={content.hero?.title || "About The ChatShack"}
        subtitle={content.hero?.subtitle || "People should be treated as people first, not problems to be solved."}
      />

      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          {/* Why we exist - image left, text right */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 mb-16 items-stretch">
            <div className="rounded-2xl overflow-hidden shadow-md min-h-[18rem]">
              <img
                src={whyWeExist?.image || "/images/donate-group-table.webp"}
                alt="A group of ChatShack members supporting each other around the table"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-amber-800 mb-2">Why we exist</p>
              <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">
                {whyWeExist?.heading || "Why The ChatShack exists"}
              </h2>
              {whyWeExist?.body ? (
                <RichText html={whyWeExist.body} className="text-[#4a4a4a]" />
              ) : (
                <>
                  <p className="text-[#4a4a4a] mb-3">
                    There's a real gap in the system — not in treatment that doesn't exist, but in treatment
                    that doesn't come fast enough. Three months' wait isn't help when you need someone today.
                  </p>
                  <p className="text-[#4a4a4a] mb-3">
                    The ChatShack is run by people who've been on the other side of that gap — who've been
                    fobbed off, misunderstood, and left to sit in A&E with nowhere else to go. We know the
                    stumbling blocks because we've hit them ourselves.
                  </p>
                  <p className="text-[#4a4a4a] mb-3">
                    So we're your first point of call. You can ring us, talk to us, and we'll advocate for
                    the help you actually need — not just a plaster on the problem, but real change, built
                    from the bottom up. When everything else has failed, we aim to still be there.
                  </p>
                </>
              )}
              <div className="bg-[#e8f5ee] border-l-4 border-[#1a7a4a] px-5 py-4 rounded-r-xl font-bold text-[#1a7a4a] mb-4">
                You are not alone. And you are worth getting better.
              </div>
              <Link
                to={whyWeExist?.link_url || "/get-involved"}
                className="inline-flex items-center gap-2 text-[#1a7a4a] font-bold underline"
              >
                <Users className="w-4 h-4" />
                {whyWeExist?.link_text || "Get involved"}
              </Link>
            </div>
          </div>

          {/* Our ethos & mission - text left, image right */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 mb-6 items-start">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">{ethos?.heading || "Our ethos & mission"}</h2>
              {ethos?.body ? (
                <RichText html={ethos.body} className="text-[#4a4a4a]" />
              ) : (
                <>
                  <p className="text-[#4a4a4a] mb-3">
                    We're not here to replace the NHS, doctors, therapists or other professional services. We're
                    here to help people find their way through what can often feel like a very complicated system.
                    We're ordinary people supporting ordinary people.
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 mb-4 font-bold text-[#1a7a4a]">
                    {whoWeAre.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </div>
                  <p className="text-[#4a4a4a] mb-4">
                    And when someone needs more specialist support, we work with our{" "}
                    <Link to="/partners" className="text-[#1a7a4a] font-bold underline">
                      Partners &amp; Resources Directory
                    </Link>{" "}
                    to try to connect that person with the right organisation, professional or service.{" "}
                    <span className="font-bold text-[#1a3a2a]">
                      If we can help, we'll help. If we can't, we'll try to find somebody who can.
                    </span>
                  </p>
                  <p className="text-[#4a4a4a]">
                    Our mission is to provide an accessible first point of contact for adults experiencing mental
                    health, wellbeing or related life difficulties — through peer-led support, listening, practical
                    signposting, group and one-to-one support, peer mentoring, wellbeing activities, workshops,
                    partner referrals and advocacy where appropriate.{" "}
                    <span className="italic font-bold text-[#1a3a2a]">
                      "If someone needs help, we want them to know where to start."
                    </span>
                  </p>
                </>
              )}
            </div>
            <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-md aspect-[4/3] md:sticky md:top-24">
              <img
                src={ethos?.image || "/images/donate-safe-space.webp"}
                alt="One of our calm, safe spaces at The ChatShack"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#e8f5ee] text-[#1a7a4a] font-bold text-xs px-4 py-2 rounded-full border border-[#1a7a4a]/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Founder's note (left) + founder video (right) */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 mb-14 items-start">
            <div className="bg-[#f5f0e8] border border-amber-200 rounded-2xl p-6 md:p-8 relative h-full">
              <Quote className="w-9 h-9 text-[#1a7a4a]/30 absolute top-5 left-5" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-800 mb-3">
                  {founderNote?.heading || "A note from Scott, founder of The ChatShack"}
                </p>
                {founderNote?.body ? (
                  <RichText html={founderNote.body} className="text-[#3a3a3a] italic" />
                ) : (
                  <>
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
                      around other people. And importantly — you do NOT have to have a diagnosed mental health
                      issue to use The ChatShack.
                    </p>
                    <p className="text-right font-bold text-[#1a3a2a] mt-5">— Scott, Founder</p>
                  </>
                )}
              </div>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">Watch Scott introduce The ChatShack</h2>
              <p className="text-[#4a4a4a] mb-4">
                A short word from Scott, on why The ChatShack exists and who it's for.
              </p>
              <FounderVideo videoUrl={FOUNDER_VIDEO_URL} poster={FOUNDER_VIDEO_POSTER} />
            </div>
          </div>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-4 text-center">Our core principles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {principles.map((p) => (
              <div key={p.title} className="bg-[#f5f0e8] rounded-xl p-4 border border-amber-200">
                <div className="w-10 h-10 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center mb-2">
                  <p.icon className="w-5 h-5 text-[#1a7a4a]" />
                </div>
                <p className="font-bold text-[#1a3a2a] mb-1">{p.title}</p>
                {principlesFromApi ? (
                  <RichText html={p.desc} className="text-sm text-[#4a4a4a]" />
                ) : (
                  <p className="text-sm text-[#4a4a4a]">{p.desc}</p>
                )}
              </div>
            ))}
          </div>

          {/* Community photo strip */}
          <h2 className="text-2xl font-black text-[#1a3a2a] mb-2 text-center">Our community, in pictures</h2>
          <p className="text-[#4a4a4a] mb-4 text-center">Real people, real connection, real support.</p>
          <div className="grid grid-cols-3 gap-3 mb-12">
            {communityPhotos.map((photo, idx) => (
              <div key={`${photo.src}-${idx}`} className="aspect-square rounded-xl overflow-hidden shadow-md">
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <p className="text-[#4a4a4a]">
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

            <div className="text-center md:text-right">
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
