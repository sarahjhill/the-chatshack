import { Link } from "react-router-dom";
import { Users, Brain, Stethoscope, Activity, Dumbbell, Home, Banknote, RefreshCw, UsersRound, Download, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero.tsx";

// Hero background photo for this page. Replace public/images/partners-hero.jpg
// with a real photo (keep the same file name) and it updates here automatically.
const HERO_IMAGE = "/images/partners-hero.jpg";

const categories = [
  { icon: Brain, label: "Mental\nHealth" },
  { icon: Stethoscope, label: "Therapy" },
  { icon: Activity, label: "Wellbeing" },
  { icon: Dumbbell, label: "Physical\nHealth" },
  { icon: Home, label: "Housing &\nHomelessness" },
  { icon: Banknote, label: "Financial\nSupport" },
  { icon: RefreshCw, label: "Addiction &\nRecovery" },
  { icon: UsersRound, label: "Community\nGroups" },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        image={HERO_IMAGE}
        icon={Users}
        eyebrow="We don't have to do it all ourselves"
        title="Partners & Resources"
        subtitle="Building a community of like-minded communities."
      />

      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-14">
            <div>
              <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">Support Built Around People</h2>
              <p className="text-[#4a4a4a] mb-3">
                At The ChatShack, we believe that finding the right support should never be another battle
                for someone who is already struggling. That's why we've personally sourced and built
                relationships with our Partners &amp; Resources, taking the time to identify services,
                organisations, professionals and community groups that can make a genuine difference to
                people's lives.
              </p>
              <p className="text-[#4a4a4a]">
                No two people experience life the same way, and no single approach works for everyone &mdash;
                from therapists and talking therapies to outdoor activities, gentle social groups, peer
                support and opportunities to build friendships, we want to offer people a range of pathways
                towards feeling better, rebuilding confidence and finding a sense of belonging. For some, the
                first step might be professional therapy; for others, it might simply be a coffee, a group,
                getting outdoors or learning something new.
              </p>
            </div>

            <div className="bg-[#e8f5ee] border-l-4 border-[#1a7a4a] rounded-r-xl p-6 md:p-8 h-fit flex items-center">
              <p className="text-[#4a4a4a]">
                Our model is built around one simple principle:{" "}
                <span className="font-bold text-[#1a7a4a]">
                  if The ChatShack can't provide the support someone needs directly, we'll do our best to
                  connect them with a partner who can.
                </span>
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-4 text-center">Where we can signpost you</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-14">
            {categories.map((cat) => (
              <div key={cat.label} className="bg-[#f5f0e8] rounded-xl p-3 flex flex-col items-center text-center shadow-sm border border-amber-200">
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
                Our Homeless Support Team &mdash; Taking Support to Those Who Need It Most
              </h2>
              <p className="text-[#4a4a4a]">
                People experiencing homelessness or rough sleeping can face multiple barriers to accessing
                mental health services, practical assistance and opportunities to rebuild their lives.
                Through our Partners &amp; Resources, we're building a joined-up network that recognises
                the whole person, not simply their circumstances &mdash; homelessness charities, outreach
                organisations, accommodation and housing support, mental health professionals, wellbeing
                providers, practical assistance networks and community organisations who can help people
                access the right support at the right time.
              </p>
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

          <div className="grid md:grid-cols-2 gap-12 mb-6 items-start">
            <div>
              <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">How we refer</h2>
              <p className="text-[#4a4a4a] mb-3">
                A referral considers your needs, your preferences where practicable, urgency, how easy a
                service is to reach and access, eligibility, and any safeguarding considerations. Our
                principle is a warm referral rather than a cold hand-off, wherever possible — we try to make
                the first step easier, not harder.
              </p>
              <p className="text-[#4a4a4a]">
                We can also help you understand available services, prepare for appointments, and identify the
                right questions to ask — without ever impersonating a statutory service or making decisions on
                your behalf.
              </p>
            </div>

            <div className="bg-[#f5f0e8] border border-amber-200 rounded-2xl p-6 md:p-8 text-center">
              <h3 className="font-black text-lg text-[#1a3a2a] mb-2">
                Want to offer your services to The ChatShack and our community?
              </h3>
              <p className="text-[#4a4a4a] text-sm mb-5">
                If you're an individual, group or organisation who could offer support, resources or
                services to the people we work with, we'd love to hear from you. Download and complete
                our Partner &amp; Resources profile form, then send it to us via the{" "}
                <Link to="/contact" className="text-[#1a7a4a] font-bold underline">
                  Contact
                </Link>{" "}
                page.
              </p>
              <a
                href="/documents/chatshack-partner-profile-form.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
              >
                <Download className="w-4 h-4" />
                DOWNLOAD PARTNER APPLICATION FORM
              </a>
            </div>
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
