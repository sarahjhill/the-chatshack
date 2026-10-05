import { Link } from "react-router-dom";
import { Users, Brain, Stethoscope, Activity, Dumbbell, Home, Banknote, RefreshCw, UsersRound } from "lucide-react";
import PolicyPageHeader from "@/components/PolicyPageHeader.tsx";

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
      <PolicyPageHeader
        icon={Users}
        eyebrow="We don't have to do it all ourselves"
        title="Partners & Resources"
        subtitle="Building a community of like-minded communities."
      />

      <section className="bg-white py-14">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-[#4a4a4a] mb-3">
            The ChatShack works to bring together trusted organisations, professionals, community groups
            and resources across mental health, wellbeing and wider social support. If we can't help, one
            of our partners may be able to.
          </p>
          <p className="text-[#4a4a4a] mb-10">
            We seek relationships with appropriate NHS services, GPs, mental health organisations, local
            authorities, housing organisations, homelessness services, financial support organisations,
            domestic abuse services, advocacy organisations, community groups, charities, CICs and
            wellbeing organisations. Partners are assessed before being formally represented as a
            ChatShack partner.
          </p>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-4">Where we can signpost you</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {categories.map((cat) => (
              <div key={cat.label} className="bg-[#f5f0e8] rounded-xl p-3 flex flex-col items-center text-center shadow-sm border border-amber-200">
                <div className="w-10 h-10 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center mb-2">
                  <cat.icon className="w-5 h-5 text-[#1a7a4a]" />
                </div>
                <span className="text-xs font-bold text-[#1a3a2a] text-center whitespace-pre-line leading-tight">{cat.label}</span>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">How we refer</h2>
          <p className="text-[#4a4a4a] mb-3">
            A referral considers your needs, your preferences where practicable, urgency, how easy a
            service is to reach and access, eligibility, and any safeguarding considerations. Our
            principle is a warm referral rather than a cold hand-off, wherever possible — we try to make
            the first step easier, not harder.
          </p>
          <p className="text-[#4a4a4a] mb-10">
            We can also help you understand available services, prepare for appointments, and identify the
            right questions to ask — without ever impersonating a statutory service or making decisions on
            your behalf.
          </p>

          <div className="text-center">
            <a
              href="https://facebook.com/TheChatShack"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
            >
              <Users className="w-4 h-4" />
              BECOME A PARTNER
            </a>
          </div>
          <p className="text-center text-sm text-[#6a6a6a] mt-3">
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
