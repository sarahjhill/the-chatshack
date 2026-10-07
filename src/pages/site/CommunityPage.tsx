import { Link } from "react-router-dom";
import { Users, CheckCircle, ShieldCheck, Lightbulb } from "lucide-react";
import PolicyPageHeader from "@/components/PolicyPageHeader.tsx";
import SuggestionForm from "@/components/SuggestionForm.tsx";

// Once you've signed up at https://formspree.io and created a form, paste its
// id here (the part after "/f/" in the URL Formspree gives you), e.g. "xyzabcde".
// Leave blank and the section shows a "coming soon" notice instead.
const FORMSPREE_FORM_ID = "";

const communityItems = [
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

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      <PolicyPageHeader
        icon={Users}
        eyebrow="More than a group"
        title="Our Community"
        subtitle="The ChatShack isn't just about sitting in a room and talking."
      />

      <section className="bg-white py-14">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-[#4a4a4a] mb-6">Our community can include:</p>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-10">
            {communityItems.map((item) => (
              <div key={item} className="flex items-start gap-2 text-[#3a3a3a] font-medium">
                <CheckCircle className="w-5 h-5 text-[#1a7a4a] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#1a2e1a] rounded-2xl p-8 text-white mb-10 text-center">
            <p className="font-black text-2xl md:text-3xl text-amber-400 leading-tight">Real People.</p>
            <p className="font-black text-2xl md:text-3xl text-white leading-tight">Real support.</p>
            <p className="font-black text-2xl md:text-3xl text-amber-400 leading-tight">Real change.</p>
            <p className="text-white/60 mt-4 text-sm italic">"Nobody should have to face difficult times alone."</p>
          </div>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">How our groups run</h2>
          <p className="text-[#4a4a4a] mb-3">
            Every group has a named facilitator, a known venue, a clear attendance process and agreed
            ground rules. We ask everyone to respect others, allow people to speak, avoid discriminatory
            behaviour, and understand that confidentiality is expected — though it can't always be
            guaranteed where there's a safeguarding concern. You're always free to leave a session if
            you're uncomfortable.
          </p>
          <div className="flex items-center gap-2 text-[#1a7a4a] font-bold mb-12">
            <ShieldCheck className="w-5 h-5" />
            <Link to="/safeguarding" className="underline">
              See how we keep people safe
            </Link>
          </div>

          {/* Suggestions */}
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-6 h-6 text-[#1a7a4a]" />
            <h2 className="text-2xl font-black text-[#1a3a2a]">Tell us what's needed</h2>
          </div>
          <p className="text-[#4a4a4a] mb-5">
            This community is shaped by the people in it. If there's a group, activity or type of support
            you'd find helpful — or something about an existing session that isn't working for you — we
            want to hear it. You don't need to give your name.
          </p>
          <div className="mb-12">
            <SuggestionForm formId={FORMSPREE_FORM_ID} />
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
      </section>
    </div>
  );
}
