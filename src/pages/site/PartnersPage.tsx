import { Link } from "react-router-dom";
import { Users, Brain, Stethoscope, Activity, Dumbbell, Home, Banknote, RefreshCw, UsersRound, ShieldCheck } from "lucide-react";
import PartnerApplicationForm from "@/components/PartnerApplicationForm.tsx";
import PageHero from "@/components/PageHero.tsx";
import { usePageContent, block, items } from "@/lib/pageContent.ts";
import RichText from "@/components/RichText.tsx";
import PageMeta from "@/components/PageMeta.tsx";

// Hero background photo for this page. Replace public/images/partners-hero.jpg
// with a real photo (keep the same file name) and it updates here automatically.
// Or upload a new one in admin (Page heroes > Partners & Resources) to override it live.
const HERO_IMAGE = "/images/partners-hero.jpg";

const categoryIcons = [Brain, Stethoscope, Activity, Dumbbell, Home, Banknote, RefreshCw, UsersRound];
const defaultCategories = [
  "Mental\nHealth", "Therapy", "Wellbeing", "Physical\nHealth",
  "Housing &\nHomelessness", "Financial\nSupport", "Addiction &\nRecovery", "Community\nGroups",
];

export default function PartnersPage() {
  const content = usePageContent("partners");

  const intro = block(content, "intro");
  const principle = block(content, "principle");
  const homelessSupport = block(content, "homeless_support");
  const howWeRefer = block(content, "how_we_refer");

  const categoryItems = items(content, "categories");
  const categories = (categoryItems.length ? categoryItems.map((i) => i.title) : defaultCategories).map(
    (label, idx) => ({ icon: categoryIcons[idx] ?? Brain, label })
  );

  return (
    <div className="min-h-screen">
      <PageMeta title="Partners & Resources" description="The Chat Shack's directory of trusted partners and resources - signposting to mental health, wellbeing and wider support services." />
      <PageHero
        image={content.hero?.image || HERO_IMAGE}
        icon={Users}
        eyebrow={content.hero?.eyebrow || "We don't have to do it all ourselves"}
        title={content.hero?.title || "Partners & Resources"}
        subtitle={content.hero?.subtitle || "Building a community of like-minded communities."}
      />

      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-14">
            <div>
              <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">{intro?.heading || "Support Built Around People"}</h2>
              {intro?.body ? (
                <RichText html={intro.body} className="text-[#4a4a4a] mb-2" />
              ) : (
                <>
                  <p className="text-[#4a4a4a] mb-3">
                    At The ChatShack, we believe that finding the right support should never be another
                    battle for someone who is already struggling. That's why we've personally sourced and
                    built relationships with our Partners &amp; Resources, taking the time to identify
                    services, organisations, professionals and community groups that can make a genuine
                    difference to people's lives.
                  </p>
                  <p className="text-[#4a4a4a] mb-3">
                    No two people experience life the same way, and no single approach works for everyone —
                    from therapists and talking therapies to outdoor activities, gentle social groups, peer
                    support and opportunities to build friendships, we want to offer people a range of
                    pathways towards feeling better, rebuilding confidence and finding a sense of belonging.
                    For some, the first step might be professional therapy; for others, it might simply be a
                    coffee, a group, getting outdoors or learning something new.
                  </p>
                </>
              )}
            </div>

            <div className="bg-[#e8f5ee] border-l-4 border-[#1a7a4a] rounded-r-xl p-6 md:p-8 h-fit flex items-center">
              {principle?.body ? (
                <RichText html={principle.body} className="text-[#4a4a4a]" />
              ) : (
                <p className="text-[#4a4a4a]">
                  Our model is built around one simple principle:{" "}
                  <span className="font-bold text-[#1a7a4a]">
                    if The ChatShack can't provide the support someone needs directly, we'll do our best to
                    connect them with a partner who can.
                  </span>
                </p>
              )}
            </div>
          </div>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-4 text-center">Where we can signpost you</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-14">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-[#f5f0e8] rounded-xl p-3 flex flex-col items-center text-center shadow-sm border border-amber-200">
                <div className="w-10 h-10 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center mb-2">
                  <cat.icon className="w-5 h-5 text-[#1a7a4a]" />
                </div>
                <span className="text-xs font-bold text-[#1a3a2a] text-center whitespace-pre-line leading-tight">{cat.label}</span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-14 items-center">
            <div>
              <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">
                {homelessSupport?.heading || "Our Homeless Support Team — Taking Support to Those Who Need It Most"}
              </h2>
              {homelessSupport?.body ? (
                <RichText html={homelessSupport.body} className="text-[#4a4a4a]" />
              ) : (
                <p className="text-[#4a4a4a]">
                  People experiencing homelessness or rough sleeping can face multiple barriers to accessing
                  mental health services, practical assistance and opportunities to rebuild their lives.
                  Through our Partners &amp; Resources, we're building a joined-up network that recognises
                  the whole person, not simply their circumstances — homelessness charities, outreach
                  organisations, accommodation and housing support, mental health professionals, wellbeing
                  providers, practical assistance networks and community organisations who can help people
                  access the right support at the right time.
                </p>
              )}
            </div>

            <p className="text-[#4a4a4a]">
              Working alongside organisations such as our partners{" "}
              <span className="font-bold text-[#1a3a2a]">Many Downs</span> and{" "}
              <span className="font-bold text-[#1a3a2a]">Time to Get Up</span>, we want to help ensure
              that people who may feel forgotten, unheard or disconnected from society have someone
              willing to listen, advocate for them and help them navigate the support available. A lack of
              a home should never mean a lack of support, and nobody should have to face their
              circumstances alone.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">{howWeRefer?.heading || "How we refer"}</h2>
            {howWeRefer?.body ? (
              <RichText html={howWeRefer.body} className="text-[#4a4a4a] mb-2" />
            ) : (
              <>
                <p className="text-[#4a4a4a] mb-3">
                  A referral considers your needs, your preferences where practicable, urgency, how easy a
                  service is to reach and access, eligibility, and any safeguarding considerations. Our
                  principle is a warm referral rather than a cold hand-off, wherever possible — we try to
                  make the first step easier, not harder.
                </p>
                <p className="text-[#4a4a4a] mb-6">
                  We can also help you understand available services, prepare for appointments, and
                  identify the right questions to ask — without ever impersonating a statutory service or
                  making decisions on your behalf.
                </p>
              </>
            )}

            <PartnerApplicationForm />
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-[#6a6a6a] mb-3">
            <ShieldCheck className="w-4 h-4 text-[#1a7a4a]" />
            <a
              href="/documents/chatshack-employers-liability-certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a7a4a] font-bold underline"
            >
              View our Employers' Liability Certificate
            </a>
          </div>

          <p className="text-center text-sm text-[#6a6a6a]">
            Looking for support yourself?{" "}
            <Link to="/support" className="text-[#1a7a4a] font-bold underline">
              Visit I Need Support
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
