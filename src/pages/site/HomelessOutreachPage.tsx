import { Link } from "react-router-dom";
import { Home, Users2, HandHeart, ShieldCheck, Compass } from "lucide-react";
import PageHero from "@/components/PageHero.tsx";

// Hero background photo for this page. Replace public/images/homeless-outreach-hero.jpg
// with a real photo (keep the same file name) and it updates here automatically.
const HERO_IMAGE = "/images/homeless-outreach-hero.jpg";

const ethos = [
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
  return (
    <div className="min-h-screen">
      <PageHero
        image={HERO_IMAGE}
        icon={Home}
        eyebrow="Taking support to people"
        title="Homeless Mental Health Support Team"
        subtitle="A lack of housing should not mean a lack of access to mental health support."
      />

      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-[#4a4a4a] mb-3">
              Our Homeless Mental Health Support Team extends The ChatShack's peer-led model beyond the
              traditional community venue.
            </p>
            <div className="bg-[#e8f5ee] border-l-4 border-[#1a7a4a] px-5 py-4 rounded-r-xl mb-10 italic font-bold text-[#1a7a4a]">
              "Take the ChatShack to the people who need it."
            </div>
          </div>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-4 text-center">Our outreach ethos</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 mb-10 max-w-3xl mx-auto lg:max-w-4xl">
            {ethos.map((item) => (
              <div key={item} className="flex items-start gap-2 text-[#3a3a3a] font-medium">
                <HandHeart className="w-4 h-4 text-[#1a7a4a] flex-shrink-0 mt-1" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-[#4a4a4a] mb-10">
              Our team never describes people experiencing homelessness merely by their housing status.
            </p>

            <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">How we approach people</h2>
            <p className="text-[#4a4a4a] mb-3">
              Workers introduce themselves, explain who The ChatShack is and why they're there, ask whether
              someone wishes to talk, and respect a refusal without pressuring disclosure. The person
              remains in control wherever safety permits. Where practicable, outreach involves at least two
              workers, with check-in and emergency arrangements agreed before every deployment.
            </p>

            <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">Advocacy</h2>
            <p className="text-[#4a4a4a] mb-10">
              We may advocate for people who struggle to navigate services, have difficulty communicating
              with professionals, or need help understanding the options available to them — to help people
              have a voice, not to speak over them.
            </p>

            <div className="flex items-center gap-2 text-[#1a7a4a] font-bold mb-10">
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
        </div>
      </section>
    </div>
  );
}
