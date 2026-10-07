import { FileText, Eye, Share2, AlertTriangle, Archive } from "lucide-react";
import PolicyPageHeader from "@/components/PolicyPageHeader.tsx";

const principles = [
  { icon: FileText, title: "We collect only what we need", desc: "And we explain clearly why we're asking for it." },
  { icon: Eye, title: "Access is restricted", desc: "Only people who need your information for your support can see it." },
  { icon: Share2, title: "Sharing is limited", desc: "We only share with partners under clear, lawful arrangements." },
  { icon: AlertTriangle, title: "Breaches are taken seriously", desc: "Any suspected breach is contained, assessed and reported where required." },
  { icon: Archive, title: "We don't keep data forever", desc: "Information is securely destroyed once it's no longer needed." },
];

export default function GdprPage() {
  return (
    <div className="min-h-screen">
      <PolicyPageHeader
        icon={FileText}
        eyebrow="How we handle your data"
        title="GDPR & Data Protection"
        subtitle="We comply with UK GDPR and the Data Protection Act 2018, with extra care for mental health information."
      />

      <section className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-[#4a4a4a] mb-8">
            The ChatShack complies with applicable UK data protection law, including the UK GDPR and the
            Data Protection Act 2018, as amended. Mental health information is health information, and
            therefore generally special category personal data — we apply enhanced safeguards to it
            accordingly.
          </p>

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

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">Sharing data with partners</h2>
          <p className="text-[#4a4a4a] mb-3">
            Where we work with partner organisations, any arrangement sets out the purpose of sharing,
            each organisation's role, the lawful basis, the categories of information involved, security
            requirements, who's authorised to receive it, how long it's kept, your rights, and how a
            breach would be handled. For our work in Wales, we also consider the Welsh Accord on Sharing
            of Personal Information (WASPI) framework where relevant.
          </p>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">If something goes wrong</h2>
          <p className="text-[#4a4a4a] mb-6">
            A data breach might be something as simple as lost paperwork or a misdirected email, through to
            unauthorised access to an account. If we become aware of a suspected breach, we contain it,
            work out what information and who may be affected, assess the risk, record what happened, take
            corrective action, and decide whether we need to notify the ICO or the people affected — then
            review our procedures so it doesn't happen again.
          </p>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">Your rights</h2>
          <p className="text-[#4a4a4a] mb-3">
            Under UK GDPR, you generally have the right to be informed about how your data is used, to
            access the information we hold about you, to have inaccurate information corrected, to ask for
            your information to be erased or for its use to be restricted, to object to certain processing,
            and to receive your data in a portable format where applicable. You also have the right to
            complain to the Information Commissioner's Office (ICO) if you're unhappy with how your
            information has been handled.
          </p>
          <p className="text-[#4a4a4a]">
            To ask about your data, or to exercise any of these rights, please get in touch via our{" "}
            <a href="https://facebook.com/TheChatShack" target="_blank" rel="noopener noreferrer" className="text-[#1a7a4a] font-bold underline">
              Facebook page
            </a>
            . See also our{" "}
            <a href="/privacy" className="text-[#1a7a4a] font-bold underline">
              Confidentiality &amp; Privacy
            </a>{" "}
            page for how we handle what you tell us directly.
          </p>
        </div>
      </section>
    </div>
  );
}
