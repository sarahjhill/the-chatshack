import { Link } from "react-router-dom";
import {
  Users,
  CheckCircle,
  ShieldCheck,
  Lightbulb,
  Mic2,
  Footprints,
  Handshake,
  Banknote,
  Heart,
} from "lucide-react";
import PageHero from "@/components/PageHero.tsx";
import SuggestionForm from "@/components/SuggestionForm.tsx";
import { usePageContent, block, items } from "@/lib/pageContent.ts";
import RichText from "@/components/RichText.tsx";
import PageMeta from "@/components/PageMeta.tsx";

// Hero background photo for this page. Replace public/images/community-hero.webp
// with a real photo (keep the same file name) and it updates here automatically.
// Or upload a new one in admin (Page heroes > Our Community) to override it live.
const HERO_IMAGE = "/images/community-hero.webp";

const defaultCommunityItems = [
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

// Styling for each photo in the scattered strip (position/size/rotation) -
// photos themselves (and their alt text) can be added/removed/replaced in
// admin under Cards & list items > Our Community > photo_strip.
const photoStripStyle = [
  { src: "/images/community-event-3.webp", className: "bg-white p-2 pb-3 rounded-lg shadow-xl rotate-3 w-32 sm:w-44 mt-4 sm:mt-6 hidden sm:block" },
  { src: "/images/community-event-1.webp", className: "bg-white p-2 pb-3 rounded-lg shadow-xl -rotate-6 w-40 sm:w-56" },
  { src: "/images/community-meet-greet.webp", className: "bg-white p-2 pb-3 rounded-lg shadow-xl rotate-3 w-40 sm:w-56 mt-6 sm:mt-10" },
  { src: "/images/community-event-2.webp", className: "bg-white p-2 pb-3 rounded-lg shadow-xl -rotate-2 w-40 sm:w-56" },
  { src: "/images/community-event-4.webp", className: "bg-white p-2 pb-3 rounded-lg shadow-xl -rotate-3 w-32 sm:w-44 mt-4 sm:mt-6 hidden sm:block" },
];

// "Get Involved" section - formerly its own page, now a section at the
// bottom of Our Community. Icons line up with the admin-editable "ways"
// items in order; add more ways in admin and they'll cycle through these
// icons, falling back to Users.
const wayIcons = [Mic2, Users, Footprints, Handshake, Banknote, Heart];
const defaultWays = [
  { title: "Peer supporter or mentor", desc: "Share your own lived experience to support others, one-to-one or in groups." },
  { title: "Group facilitator", desc: "Help run a session, with full training and ongoing supervision." },
  { title: "Outreach volunteer", desc: "Join our Homeless Mental Health Support Team taking support out to where it's needed." },
  { title: "Partner organisation", desc: "Work with us if you're a service, charity or professional in a related field." },
  { title: "Fundraise or donate", desc: "Help fund same-day support for people who can't wait for a referral." },
  { title: "Join in", desc: "Come along to a group, a Walk & Talk session, or a community event." },
];

export default function CommunityPage() {
  const content = usePageContent("community");
  const getInvolvedContent = usePageContent("get_involved");

  const intro = block(content, "intro");
  const howGroupsRun = block(content, "how_groups_run");
  const suggestionsIntro = block(content, "suggestions_intro");

  const photoItems = items(content, "photo_strip");
  const includedItems = items(content, "included");
  const communityItems = includedItems.length ? includedItems.map((i) => i.title) : defaultCommunityItems;

  const saferRecruitment = items(getInvolvedContent, "safer_recruitment")[0] ?? null;
  const wayItems = items(getInvolvedContent, "ways");
  const waysFromApi = wayItems.length > 0;
  const ways = (waysFromApi ? wayItems.map((i) => ({ title: i.title, desc: i.description })) : defaultWays).map(
    (w, idx) => ({ ...w, icon: wayIcons[idx] ?? Users })
  );

  return (
    <div className="min-h-screen">
      <PageMeta title="Our Community" description="More than a group - groups, Walk & Talk sessions, peer mentoring, community events, and the ways you can get involved." />
      <PageHero
        image={content.hero?.image || HERO_IMAGE}
        icon={Users}
        eyebrow={content.hero?.eyebrow || "More than a group"}
        title={content.hero?.title || "Our Community"}
        subtitle={content.hero?.subtitle || "The ChatShack isn't just about sitting in a room and talking."}
      />

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-[#1a3a2a] mb-4 text-center">
            {intro?.heading || "Real people, real events, real community."}
          </h2>
          <div className="flex justify-center items-start gap-3 sm:gap-5 mb-16 flex-wrap">
            {photoStripStyle.map((style, idx) => {
              const apiItem = photoItems[idx];
              const src = apiItem?.image || style.src;
              const alt = apiItem?.description || "The ChatShack community";
              return (
                <div key={idx} className={style.className}>
                  <img src={src} alt={alt} className="w-full aspect-[4/3] object-cover rounded-sm" />
                </div>
              );
            })}
          </div>

          {/* Wide two-column layout: what's included on the left, the feel of it + how groups run on the right */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 mb-14 items-stretch">
            <div>
              <h2 className="text-2xl font-black text-[#1a3a2a] mb-4">Our community can include:</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {communityItems.map((item) => (
                  <div
                    key={item}
                    className="bg-[#f5f0e8] border border-amber-200 rounded-xl p-3 flex items-start gap-2"
                  >
                    <CheckCircle className="w-5 h-5 text-[#1a7a4a] flex-shrink-0 mt-0.5" />
                    <span className="text-[#3a3a3a] font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col h-full">
              <div className="bg-[#e8f5ee] border border-[#1a7a4a]/30 rounded-2xl p-6 h-full flex flex-col justify-center">
                <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">{howGroupsRun?.heading || "How our groups run"}</h2>
                {howGroupsRun?.body ? (
                  <RichText html={howGroupsRun.body} className="text-[#4a4a4a] mb-2" />
                ) : (
                  <p className="text-[#4a4a4a] mb-4">
                    Every group has a named facilitator, a known venue, a clear attendance process and
                    agreed ground rules. We ask everyone to respect others, allow people to speak, avoid
                    discriminatory behaviour, and understand that confidentiality is expected — though it
                    can't always be guaranteed where there's a safeguarding concern. You're always free to
                    leave a session if you're uncomfortable.
                  </p>
                )}
                <div className="flex items-center gap-2 text-[#1a7a4a] font-bold">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  <Link to="/safeguarding" className="underline">
                    {howGroupsRun?.link_text || "See how we keep people safe"}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Suggestions - full width, centered */}
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-6 h-6 text-[#1a7a4a]" />
              <h2 className="text-2xl font-black text-[#1a3a2a]">{suggestionsIntro?.heading || "Tell us what's needed"}</h2>
            </div>
            {suggestionsIntro?.body ? (
              <RichText html={suggestionsIntro.body} className="text-[#4a4a4a] mb-2" />
            ) : (
              <p className="text-[#4a4a4a] mb-5">
                This community is shaped by the people in it. If there's a group, activity or type of
                support you'd find helpful — or something about an existing session that isn't working for
                you — we want to hear it. You don't need to give your name.
              </p>
            )}
            <div className="mb-12">
              <SuggestionForm />
            </div>

            <div className="text-center">
              <a
                href="#get-involved"
                className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
              >
                <Users className="w-4 h-4" />
                JOIN OUR COMMUNITY
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved - formerly its own page, now its own section here */}
      <section id="get-involved" className="bg-[#f5f0e8] py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-[#1a3a2a] mb-3">
              {getInvolvedContent.hero?.title || "Get Involved"}
            </h2>
            <p className="text-[#4a4a4a]">
              {getInvolvedContent.hero?.subtitle ||
                "However much time you have, there's a way to help The ChatShack."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {ways.map((w) => (
              <div key={w.title} className="bg-white rounded-xl p-4 border border-amber-200">
                <div className="w-10 h-10 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center mb-2">
                  <w.icon className="w-5 h-5 text-[#1a7a4a]" />
                </div>
                <p className="font-bold text-[#1a3a2a] mb-1">{w.title}</p>
                {waysFromApi ? (
                  <RichText html={w.desc} className="text-sm text-[#4a4a4a]" />
                ) : (
                  <p className="text-sm text-[#4a4a4a]">{w.desc}</p>
                )}
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-black text-[#1a3a2a] mb-3">{saferRecruitment?.title || "Safer recruitment"}</h3>
            {saferRecruitment?.description ? (
              <RichText html={saferRecruitment.description} className="text-[#4a4a4a] mb-2" />
            ) : (
              <p className="text-[#4a4a4a] mb-3">
                Every role is assessed for its responsibilities and level of contact with the people we
                support, including whatever DBS checks, references, identity verification, safeguarding
                training and experience are appropriate to that role. No one takes on duties beyond what
                they've been trained and approved for.
              </p>
            )}
            <div className="flex items-center gap-2 text-[#1a7a4a] font-bold mb-10">
              <ShieldCheck className="w-5 h-5" />
              <Link to="/code-of-conduct" className="underline">
                Read our Code of Conduct
              </Link>
            </div>

            <div className="text-center">
              <a
                href="https://facebook.com/TheChatShack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
              >
                <Users className="w-4 h-4" />
                GET IN TOUCH TO GET INVOLVED
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
