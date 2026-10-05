import { HeartHandshake, Scale, HandHeart, Users2, ShieldCheck } from "lucide-react";
import PolicyPageHeader from "@/components/PolicyPageHeader.tsx";

const corePrinciples = [
  { title: "Dignity", desc: "Every person is entitled to be treated with dignity and respect." },
  { title: "Equality", desc: "No one should be disadvantaged because of who they are or their circumstances." },
  { title: "Inclusion", desc: "We actively consider accessibility and reasonable adjustments." },
  { title: "Choice", desc: "Where possible, people take part in decisions that affect them." },
  { title: "Empowerment", desc: "We support informed choices, rather than creating dependency." },
  { title: "Accountability", desc: "Concerns are recorded, reported and reviewed, never ignored." },
];

const standard = [
  "I know my role.",
  "I know my boundaries.",
  "I know how to recognise a safeguarding concern.",
  "I know who to report it to.",
  "I know when confidentiality may need to be overridden.",
  "I know how to protect personal information.",
  "I know how to assess changing risk.",
  "I know when something is beyond my competence.",
  "I know how to access additional help.",
  "I know that I am not expected to deal with serious situations alone.",
];

export default function CodeOfConductPage() {
  return (
    <div className="min-h-screen">
      <PolicyPageHeader
        icon={HeartHandshake}
        eyebrow="How we conduct ourselves"
        title="Code of Conduct"
        subtitle="Peer support does not remove the need for professional boundaries."
      />

      <section className="bg-white py-14">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-black text-[#1a3a2a] mb-4">Our core principles</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {corePrinciples.map((p) => (
              <div key={p.title} className="bg-[#f5f0e8] rounded-xl p-4 border border-amber-200">
                <p className="font-bold text-[#1a3a2a] mb-1">{p.title}</p>
                <p className="text-sm text-[#4a4a4a]">{p.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">What everyone representing us commits to</h2>
          <p className="text-[#4a4a4a] mb-3">
            Everyone representing The ChatShack — directors, employees, volunteers, peer supporters, peer
            mentors, group facilitators and outreach workers alike — commits to treating people with
            dignity and respect, maintaining appropriate professional boundaries, protecting confidential
            information, and following our safeguarding and data protection procedures.
          </p>
          <p className="text-[#4a4a4a] mb-3">
            We never discriminate, bully, harass or intimidate; never exploit a member's vulnerability;
            never enter into inappropriate financial relationships with members; never present personal
            opinions as professional or clinical advice; and never promise absolute confidentiality.
          </p>
          <p className="text-[#4a4a4a] mb-8">
            We record significant concerns appropriately, report safeguarding concerns immediately,
            declare conflicts of interest, and follow our lone-working and dynamic risk assessment
            procedures. A breach of this code may result in supervision, additional training, formal
            warning, removal from duties, or — where legally appropriate — a safeguarding, DBS or police
            referral.
          </p>

          <div className="bg-[#1a2e1a] rounded-2xl p-8 text-white mb-10">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-black">Our professional standard</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
              {standard.map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm text-white/85">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3 justify-center text-[#1a3a2a] font-bold text-center">
            <Scale className="w-5 h-5 text-[#1a7a4a]" />
            <HandHeart className="w-5 h-5 text-[#1a7a4a]" />
            <Users2 className="w-5 h-5 text-[#1a7a4a]" />
          </div>
          <p className="text-center text-[#6a6a6a] italic mt-2">
            "Professional enough to be trusted, human enough to be approachable."
          </p>
        </div>
      </section>
    </div>
  );
}
