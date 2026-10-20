import { Link } from "react-router-dom";
import { Home, Users2, HandHeart, ShieldCheck, Compass } from "lucide-react";
import PageHero from "@/components/PageHero.tsx";
import { usePageContent, block, items } from "@/lib/pageContent.ts";
import RichText from "@/components/RichText.tsx";

// Hero background photo for this page. Replace public/images/homeless-outreach-hero.jpg
// with a real photo (keep the same file name) and it updates here automatically.
// Or upload a new one in admin (Page heroes > Homeless Outreach) to override it live.
const HERO_IMAGE = "/images/about-hero.jpg";

const defaultEthos = [
  "Treat people as human beings",
  "Avoid judgement",
  "Respect autonomy",
  "Recognise trauma and barriers to accessing services",
  "Provide listening and peer support",
  "Provide appropriate signposting",
  "Support access to treatment",
  "Advocate where appropriate",
  "Work alongside specialist homelessness organisations",
  "Build trust gradually",
];

export default function HomelessOutreachPage() {
  const content = usePageContent("homeless_outreach");

  const intro = block(content, "intro");
  const howWeApproach = block(content, "how_we_approach");
  const advocacy = block(content, "advocacy");
  const theVan = block(content, "the_van");

  const ethosItems = items(content, "ethos");
  const ethos = ethosItems.length ? ethosItems.map((i) => i.title) : defaultEthos;

  return (
    <div className="min-h-screen">
      <PageHero
        image={content.hero?.image || HERO_IMAGE}
        icon={Home}
        eyebrow={content.hero?.eyebrow || "Taking support to people"}
        title={content.hero?.title || "Homeless Mental Health Support Team"}
        subtitle={content.hero?.subtitle || "A lack of housing should not mean a lack of access to mental health support."}
      />

      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-14 items-center">
            {intro?.body ? (
              <RichText html={intro.body} className="text-[#4a4a4a]" />
            ) : (
              <p className="text-[#4a4a4a]">
                Our Homeless Mental Health Support Team extends The ChatShack's peer-led model beyond the
                traditional community venue. Our team never describes people experiencing homelessness
                merely by their housing status.
              </p>
            )}
            <div className="bg-[#e8f5ee] border-l-4 border-[#1a7a4a] px-5 py-4 rounded-r-xl italic font-bold text-[#1a7a4a]">
              "Take the ChatShack to the people who need it."
            </div>
          </div>

          {/* Scattered photo collage - breaks up the page. These are
              illustrative AI-generated images (not actual photos of our team
              or real service users) - replace with genuine outreach photos
              at public/images/outreach-photo-1/2/3.webp when available. */}
          <div className="relative h-72 sm:h-80 md:h-96 mb-10 md:mb-14 max-w-3xl mx-auto">
            <div className="absolute left-[2%] sm:left-[6%] top-2 w-[58%] sm:w-[48%] -rotate-6 z-10">
              <div className="bg-white p-2 pb-4 rounded-lg shadow-xl">
                <img
                  src="/images/outreach-photo-2.webp"
                  alt="Illustrative image representing outreach support"
                  className="w-full aspect-[4/3] object-cover rounded-sm"
                />
              </div>
            </div>
            <div className="absolute right-[2%] sm:right-[8%] top-0 w-[56%] sm:w-[46%] rotate-3 z-20">
              <div className="bg-white p-2 pb-4 rounded-lg shadow-xl">
                <img
                  src="/images/outreach-photo-1.webp"
                  alt="Illustrative image representing outreach support"
                  className="w-full aspect-[4/3] object-cover rounded-sm"
                />
              </div>
            </div>
            <div className="absolute left-[18%] sm:left-[26%] bottom-0 w-[54%] sm:w-[42%] -rotate-2 z-30">
              <div className="bg-white p-2 pb-4 rounded-lg shadow-2xl">
                <img
                  src="/images/outreach-photo-3.webp"
                  alt="Illustrative image representing outreach support"
                  className="w-full aspect-[4/3] object-cover rounded-sm"
                />
                <p className="text-center text-[#1a3a2a] font-bold text-sm mt-1">
                  Taking The ChatShack directly to where people are.
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-[#4a4a4a]/70 text-center mb-14">Illustrative images</p>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-2 text-center">Our outreach ethos</h2>
          <p className="text-[#4a4a4a] mb-6 text-center max-w-2xl mx-auto">
            Ten principles that shape how our Homeless Mental Health Support Team works, every time.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {ethos.map((item) => (
              <div
                key={item}
                className="bg-[#f5f0e8] border border-amber-200 rounded-xl p-4 flex items-start gap-3"
              >
                <div className="w-8 h-8 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <HandHeart className="w-4 h-4 text-[#1a7a4a]" />
                </div>
                <span className="text-[#3a3a3a] font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-12 mb-10 items-stretch">
            <div>
              <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">{howWeApproach?.heading || "How we approach people"}</h2>
              {howWeApproach?.body ? (
                <RichText html={howWeApproach.body} className="text-[#4a4a4a] mb-2" />
              ) : (
                <p className="text-[#4a4a4a] mb-4">
                  Workers introduce themselves, explain who The ChatShack is and why they're there, ask
                  whether someone wishes to talk, and respect a refusal without pressuring disclosure. The
                  person remains in control wherever safety permits. Where practicable, outreach involves at
                  least two workers, with check-in and emergency arrangements agreed before every
                  deployment.
                </p>
              )}
              <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">{advocacy?.heading || "Advocacy"}</h2>
              {advocacy?.body ? (
                <RichText html={advocacy.body} className="text-[#4a4a4a]" />
              ) : (
                <p className="text-[#4a4a4a]">
                  We may advocate for people who struggle to navigate services, have difficulty
                  communicating with professionals, or need help understanding the options available to
                  them — to help people have a voice, not to speak over them.
                </p>
              )}
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md flex flex-col h-full">
              <img
                src={theVan?.image || "/images/donate-the-van.jpg"}
                alt="The ChatShack's Mobile Safe Space on Wheels"
                className="w-full flex-1 min-h-[12rem] object-cover"
              />
              <div className="bg-[#f5f0e8] border border-t-0 border-amber-200 rounded-b-2xl p-4 text-center">
                {theVan?.body ? (
                  <RichText html={theVan.body} className="text-sm text-[#4a4a4a] mb-2" />
                ) : (
                  <p className="text-sm text-[#4a4a4a] mb-2">
                    The Van is the dream — taking access to those who need it, when they need it.
                  </p>
                )}
                <Link
                  to="/donate"
                  className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-5 py-2 rounded-full text-sm transition-colors"
                >
                  {theVan?.link_text || "HELP US FUND THE VAN"}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#1a7a4a] font-bold mb-10 justify-center">
            <ShieldCheck className="w-5 h-5" />
            <Link to="/safeguarding" className="underline">
              Read about safeguarding on outreach
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/partners"
              className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
            >
              <Compass className="w-4 h-4" />
              PARTNERS &amp; RESOURCES
            </Link>
            <Link
              to="/get-involved"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-[#1a7a4a] text-[#1a7a4a] font-bold px-6 py-3 rounded-full transition-colors"
            >
              <Users2 className="w-4 h-4" />
              SUPPORT THIS WORK
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
