import { Shield, Heart, Ear, FileCheck, Phone, RefreshCw } from "lucide-react";
import PolicyPageHeader from "@/components/PolicyPageHeader.tsx";

const responseSteps = [
  { icon: Ear, title: "Listen", desc: "We listen calmly, without interrogating, and we never promise secrecy." },
  { icon: Shield, title: "Establish safety", desc: "We check whether you, or anyone else, is safe right now." },
  { icon: FileCheck, title: "Report & record", desc: "Concerns are reported to our designated safeguarding lead and recorded accurately." },
  { icon: Phone, title: "Refer", desc: "Where needed, we refer to the right local authority, police, NHS or statutory service." },
  { icon: RefreshCw, title: "Review", desc: "Our safeguarding lead reviews every concern to make sure follow-up happens." },
];

export default function SafeguardingPage() {
  return (
    <div className="min-h-screen">
      <PolicyPageHeader
        icon={Shield}
        eyebrow="Keeping you safe"
        title="Safeguarding Policy"
        subtitle="Protecting people from abuse, neglect, exploitation and avoidable harm is at the heart of everything we do."
      />

      <section className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">Our commitment</h2>
          <p className="text-[#4a4a4a] mb-3">
            The ChatShack exists on the belief that people should be treated as people first, not problems
            to be solved. Safeguarding means protecting the people we support from abuse, neglect,
            exploitation and avoidable harm, whoever they are and wherever they come into contact with us —
            in our community sessions or through our Homeless Mental Health Support Team's outreach work.
          </p>
          <p className="text-[#4a4a4a] mb-6">
            Safety takes priority where there is a serious concern about abuse, neglect or significant harm.
            Every director, employee, volunteer, peer supporter, mentor, facilitator and outreach worker
            representing The ChatShack is expected to recognise a safeguarding concern and know how to
            report it.
          </p>

          <div className="bg-[#e8f5ee] border-l-4 border-[#1a7a4a] px-5 py-4 rounded-r-xl mb-10 italic font-bold text-[#1a7a4a]">
            Safeguarding concerns can include physical, emotional, sexual, financial or discriminatory
            abuse, domestic abuse, coercive control, neglect, self-neglect, exploitation, modern slavery
            and homelessness-related vulnerability.
          </div>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-4">What happens if a concern is raised</h2>
          <div className="space-y-4 mb-10">
            {responseSteps.map((step, i) => (
              <div key={step.title} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#1a7a4a]/10 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-[#1a7a4a]" />
                </div>
                <div>
                  <p className="font-bold text-[#1a3a2a]">
                    {i + 1}. {step.title}
                  </p>
                  <p className="text-[#4a4a4a] text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">Working safely in Wales</h2>
          <p className="text-[#4a4a4a] mb-3">
            For our Cardiff-based community and our Homeless Mental Health Support Team's outreach work,
            we follow the Social Services and Well-being (Wales) Act 2014 and the Wales Safeguarding
            Procedures — not the English Care Act framework, which does not apply here. Information is
            only ever shared where it is necessary, proportionate, relevant, secure, lawful and properly
            recorded.
          </p>
          <p className="text-[#4a4a4a] mb-3">
            We will normally seek consent before sharing information, but consent is not an absolute
            barrier where there is a serious safeguarding or emergency concern. We never use someone's
            homelessness, vulnerability or dependence on our services as a reason to disregard their
            autonomy.
          </p>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3 mt-10">Raising a concern</h2>
          <p className="text-[#4a4a4a]">
            If you are worried about your own safety or someone else's, please tell a member of The
            ChatShack team straight away, or contact the emergency services directly if anyone is in
            immediate danger. You can also reach us via our{" "}
            <a href="https://facebook.com/TheChatShack" target="_blank" rel="noopener noreferrer" className="text-[#1a7a4a] font-bold underline">
              Facebook page
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
