import { HeartHandshake, Scale, Compass, Users, Shield, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import PolicyPageHeader from "@/components/PolicyPageHeader.tsx";

const principles = [
  { icon: Scale, title: "Dignity", desc: "Every person is entitled to be treated with dignity and respect." },
  { icon: Users, title: "Equality", desc: "No one should be disadvantaged because of who they are or their circumstances." },
  { icon: Compass, title: "Choice", desc: "Where possible, people take part in decisions that affect them." },
  { icon: HeartHandshake, title: "Empowerment", desc: "We support informed choices, rather than creating dependency." },
  { icon: Shield, title: "Safeguarding", desc: "Safety takes priority where there is a serious concern about harm." },
  { icon: Handshake, title: "Partnership", desc: "We work constructively alongside statutory, clinical and community organisations." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PolicyPageHeader
        icon={HeartHandshake}
        eyebrow="Who we are"
        title="About The ChatShack"
        subtitle="People should be treated as people first, not problems to be solved."
      />

      <section className="bg-white py-14">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">Our ethos</h2>
          <p className="text-[#4a4a4a] mb-3">
            We provide a safe environment where adults can talk without judgement; be listened to; meet
            people with shared experiences; develop supportive relationships; access information;
            understand available services; receive appropriate signposting; develop confidence;
            participate in activities; access peer support; and be supported to access professional
            treatment where required.
          </p>
          <div className="bg-[#e8f5ee] border-l-4 border-[#1a7a4a] px-5 py-4 rounded-r-xl mb-3 font-bold text-[#1a7a4a] text-center">
            SAFE SPACE &nbsp;•&nbsp; CONFIDENTIAL &nbsp;•&nbsp; NON-JUDGEMENTAL &nbsp;•&nbsp; PEER-LED &nbsp;•&nbsp; 18+ &nbsp;•&nbsp; NO FEE
          </div>
          <p className="text-[#4a4a4a] mb-10">The ChatShack seeks to remain human at all times.</p>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">Our mission</h2>
          <p className="text-[#4a4a4a] mb-3">
            Our mission is to provide an accessible first point of contact for adults experiencing mental
            health, wellbeing or related life difficulties. We aim to reduce barriers between people and
            appropriate support through peer-led support, listening, practical signposting, group support,
            one-to-one peer support, peer mentoring, wellbeing activities, community activities, workshops,
            partner referrals and advocacy where appropriate.
          </p>
          <p className="text-[#4a4a4a] mb-10 italic font-bold text-[#1a3a2a]">
            "If someone needs help, we want them to know where to start."
          </p>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-4">Our core principles</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {principles.map((p) => (
              <div key={p.title} className="bg-[#f5f0e8] rounded-xl p-4 border border-amber-200">
                <div className="w-10 h-10 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center mb-2">
                  <p.icon className="w-5 h-5 text-[#1a7a4a]" />
                </div>
                <p className="font-bold text-[#1a3a2a] mb-1">{p.title}</p>
                <p className="text-sm text-[#4a4a4a]">{p.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-[#4a4a4a] mb-6">
            The ChatShack is working to develop a community of like-minded communities — working
            collaboratively rather than competitively. Read more about{" "}
            <Link to="/community" className="text-[#1a7a4a] font-bold underline">
              Our Community
            </Link>
            , our{" "}
            <Link to="/partners" className="text-[#1a7a4a] font-bold underline">
              Partners &amp; Resources
            </Link>
            , or how we keep people{" "}
            <Link to="/safeguarding" className="text-[#1a7a4a] font-bold underline">
              safe
            </Link>
            .
          </p>

          <div className="text-center">
            <Link
              to="/get-involved"
              className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
            >
              <Users className="w-4 h-4" />
              GET INVOLVED
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
