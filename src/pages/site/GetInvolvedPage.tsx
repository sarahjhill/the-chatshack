import { Link } from "react-router-dom";
import { Users, Heart, Mic2, Footprints, Banknote, Handshake, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero.tsx";
import { usePageContent, items } from "@/lib/pageContent.ts";
import RichText from "@/components/RichText.tsx";
import PageMeta from "@/components/PageMeta.tsx";

// Hero background photo for this page. Replace public/images/get-involved-hero.jpg
// with a real photo (keep the same file name) and it updates here automatically.
// Or upload a new one in admin (Page heroes > Get Involved) to override it live.
const HERO_IMAGE = "/images/get-involved-hero.jpg";

const wayIcons = [Mic2, Users, Footprints, Handshake, Banknote, Heart];
const defaultWays = [
  { title: "Peer supporter or mentor", desc: "Share your own lived experience to support others, one-to-one or in groups." },
  { title: "Group facilitator", desc: "Help run a session, with full training and ongoing supervision." },
  { title: "Outreach volunteer", desc: "Join our Homeless Mental Health Support Team taking support out to where it's needed." },
  { title: "Partner organisation", desc: "Work with us if you're a service, charity or professional in a related field." },
  { title: "Fundraise or donate", desc: "Help fund same-day support for people who can't wait for a referral." },
  { title: "Join in", desc: "Come along to a group, a Walk & Talk session, or a community event." },
];

export default function GetInvolvedPage() {
  const content = usePageContent("get_involved");

  const saferRecruitment = items(content, "safer_recruitment")[0] ?? null;
  const wayItems = items(content, "ways");
  const waysFromApi = wayItems.length > 0;
  const ways = (waysFromApi ? wayItems.map((i) => ({ title: i.title, desc: i.description })) : defaultWays).map(
    (w, idx) => ({ ...w, icon: wayIcons[idx] ?? Users })
  );

  return (
    <div className="min-h-screen">
      <PageMeta title="Get Involved" description="Volunteer, fundraise or partner with The Chat Shack - find out the ways you can support our community in Cardiff." />
      <PageHero
        image={content.hero?.image || HERO_IMAGE}
        icon={Users}
        eyebrow={content.hero?.eyebrow || "Join us"}
        title={content.hero?.title || "Get Involved"}
        subtitle={content.hero?.subtitle || "However much time you have, there's a way to help The ChatShack."}
      />

      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {ways.map((w) => (
              <div key={w.title} className="bg-[#f5f0e8] rounded-xl p-4 border border-amber-200">
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
            <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">{saferRecruitment?.title || "Safer recruitment"}</h2>
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
