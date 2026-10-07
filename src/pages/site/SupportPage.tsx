import { Link } from "react-router-dom";
import { MessageCircle, AlertTriangle, ArrowRight, Ear, HeartHandshake, UserCheck, HelpCircle } from "lucide-react";
import PolicyPageHeader from "@/components/PolicyPageHeader.tsx";

const howWeHelp = [
  { icon: Ear, title: "We listen", desc: "No judgement, no pressure to share more than you want to." },
  { icon: HeartHandshake, title: "We support", desc: "Peer support, groups, activities and one-to-one support." },
  { icon: UserCheck, title: "We signpost", desc: "Help finding the right professional service or treatment, where needed." },
];

const faqs = [
  {
    q: "Do I have to have a diagnosed mental health issue to use The ChatShack?",
    a: "No — absolutely not. You don't need a diagnosed mental health condition to attend, and you don't even have to consider yourself to have a mental health problem. Maybe you're feeling lonely, you've had a difficult week, you're going through a stressful period, or you simply want a coffee and a chat. The ChatShack isn't somewhere you have to earn your place — you're welcome.",
  },
  {
    q: "Can I access therapy as soon as possible?",
    a: "Where appropriate, we will always try to help you access the right support as quickly as possible, including through our network of partners and resources. Where funding is available, we also want to help fund same-day therapy sessions when they're needed. We can't promise therapy immediately for everyone — availability, suitability and professional assessment can vary — but we can promise that we'll listen, take you seriously, and try to help you find the right route forward.",
  },
  {
    q: "What if I'm nervous about coming along?",
    a: "That's completely understandable — for some people, walking into a new group is one of the hardest parts. You don't have to tell everybody your life story straight away, and you don't have to speak if you don't want to. You can come along, have a coffee, sit down, listen, meet people and see what we're about, at your own pace. There is no pressure, and if groups aren't for you, talk to us about the other forms of support that may be available.",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen">
      <PolicyPageHeader
        icon={MessageCircle}
        eyebrow="You are not alone"
        title="I Need Support"
        subtitle="The ChatShack aims to be an accessible first point of contact for anyone experiencing mental health, wellbeing or related life difficulties."
      />

      <section className="bg-white py-14">
        <div className="max-w-3xl mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {howWeHelp.map((h) => (
              <div key={h.title} className="bg-[#f5f0e8] rounded-xl p-4 border border-amber-200 text-center">
                <div className="w-10 h-10 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <h.icon className="w-5 h-5 text-[#1a7a4a]" />
                </div>
                <p className="font-bold text-[#1a3a2a] mb-1">{h.title}</p>
                <p className="text-sm text-[#4a4a4a]">{h.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">What to expect</h2>
          <p className="text-[#4a4a4a] mb-3">
            Reaching out can be the hardest part. Where appropriate and where available, we help people
            navigate towards same-day support and treatment. If we can't provide what you need ourselves,
            our{" "}
            <Link to="/partners" className="text-[#1a7a4a] font-bold underline">
              Directory of Partners &amp; Resources
            </Link>{" "}
            helps connect you with organisations who may be able to.
          </p>
          <p className="text-[#4a4a4a] mb-3">
            One-to-one peer support has clear boundaries — a peer supporter is not a therapist,
            psychiatrist, GP, crisis service or emergency responder. They will listen, provide appropriate
            emotional support, signpost you, and encourage professional help where it's needed.
          </p>
          <p className="text-[#4a4a4a] mb-12">
            Our{" "}
            <Link to="/privacy" className="text-[#1a7a4a] font-bold underline">
              confidentiality policy
            </Link>{" "}
            explains what you tell us stays between us, with rare, clearly explained exceptions.
          </p>

          {/* FAQs */}
          <div className="flex items-center gap-2 mb-5">
            <HelpCircle className="w-6 h-6 text-[#1a7a4a]" />
            <h2 className="text-2xl font-black text-[#1a3a2a]">Questions people often ask</h2>
          </div>
          <div className="space-y-4 mb-12">
            {faqs.map((f) => (
              <div key={f.q} className="bg-[#f5f0e8] border border-amber-200 rounded-2xl p-5">
                <p className="font-bold text-[#1a3a2a] mb-2">{f.q}</p>
                <p className="text-[#4a4a4a] text-sm">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="bg-red-600 text-white rounded-xl p-5 flex gap-3 mb-10">
            <AlertTriangle className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <p className="font-black text-lg">IN AN EMERGENCY OR IMMEDIATE DANGER</p>
              <p className="font-bold text-xl">PLEASE CALL 999</p>
              <p className="text-white/90 text-sm mt-1">or go to your nearest A&amp;E department.</p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://facebook.com/TheChatShack"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              REACH OUT TO US
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
