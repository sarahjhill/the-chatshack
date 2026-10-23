import { Link } from "react-router-dom";
import { Users, CheckCircle, ShieldCheck, Lightbulb } from "lucide-react";
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

export default function CommunityPage() {
  const content = usePageContent("community");

  const intro = block(content, "intro");
  const howGroupsRun = block(content, "how_groups_run");
  const suggestionsIntro = block(content, "suggestions_intro");

  const photoItems = items(content, "photo_strip");
  const includedItems = items(content, "included");
  const communityItems = includedItems.length ? includedItems.map((i) => i.title) : defaultCommunityItems;

  return (
    <div className="min-h-screen">
      <PageMeta title="Our Community" description="More than a group - groups, Walk & Talk sessions, peer mentoring and community events. See what's on and how our groups run." />
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
              <Link
                to="/get-involved"
                className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
              >
                <Users className="w-4 h-4" />
                JOIN OUR COMMUNITY
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
