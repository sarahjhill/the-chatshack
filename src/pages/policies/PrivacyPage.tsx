import { Lock } from "lucide-react";
import PolicyPageHeader from "@/components/PolicyPageHeader.tsx";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <PolicyPageHeader
        icon={Lock}
        eyebrow="Your conversations, respected"
        title="Confidentiality & Privacy"
        subtitle="What you tell us stays between us, with the rare exceptions explained below."
      />

      <section className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">Confidentiality</h2>
          <p className="text-[#4a4a4a] mb-4">
            We explain confidentiality clearly from your very first contact with us, because confidentiality
            should never be presented as secrecy.
          </p>
          <div className="bg-[#f5f0e8] border border-amber-200 rounded-xl p-5 mb-6 italic text-[#1a3a2a] font-medium">
            "What you tell us will normally be treated confidentially. However, we cannot promise absolute
            confidentiality where we believe information needs to be shared to protect you or another
            person from serious harm, or where disclosure is otherwise required or permitted by law."
          </div>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">When we may need to share information</h2>
          <p className="text-[#4a4a4a] mb-3">
            We may need to share information where there is immediate danger to life, a serious risk of
            harm, abuse or neglect, a safeguarding concern about someone else, serious criminal activity,
            a legal requirement to disclose, or a genuine emergency.
          </p>
          <p className="text-[#4a4a4a] mb-6">
            Before sharing anything, we think carefully about what the risk actually is, whether sharing is
            necessary and proportionate, the minimum information needed, who genuinely needs to receive it,
            and what lawful basis applies. Wherever it's safe to do so, we will tell you what we are
            sharing and why.
          </p>

          <div className="bg-[#e8f5ee] border-l-4 border-[#1a7a4a] px-5 py-4 rounded-r-xl mb-10 font-bold text-[#1a7a4a] text-center">
            NECESSARY &nbsp;•&nbsp; PROPORTIONATE &nbsp;•&nbsp; LAWFUL &nbsp;•&nbsp; SECURE &nbsp;•&nbsp; NEED TO KNOW
          </div>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">Your personal information</h2>
          <p className="text-[#4a4a4a] mb-3">
            Mental health information is health information, and we treat it as special category personal
            data under UK data protection law. We only collect what we genuinely need, we explain why we
            are collecting it, we keep it secure, we restrict who can access it, and we don't keep it for
            longer than necessary.
          </p>
          <p className="text-[#4a4a4a] mb-3">
            Access to your information is restricted to the people who need it to support you — a group
            facilitator, peer mentor, safeguarding lead or administrator will only see what's relevant to
            their role. No one accesses your information out of curiosity.
          </p>
          <p className="text-[#4a4a4a] mb-6">
            For the full detail of how we handle data under UK GDPR, including your rights as a data
            subject, see our{" "}
            <a href="/gdpr" className="text-[#1a7a4a] font-bold underline">
              GDPR &amp; Data Protection
            </a>{" "}
            page.
          </p>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">Any questions?</h2>
          <p className="text-[#4a4a4a]">
            If you'd like to know more about how we handle confidentiality or your personal information,
            please get in touch via our{" "}
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
