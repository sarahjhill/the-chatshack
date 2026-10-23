import { Link } from "react-router-dom";
import { MessageCircle, AlertTriangle, ArrowRight, Ear, HeartHandshake, UserCheck, Sparkles, HelpCircle } from "lucide-react";
import PageHero from "@/components/PageHero.tsx";
import FirstContactForm from "@/components/FirstContactForm.tsx";
import { usePageContent, block, items } from "@/lib/pageContent.ts";
import RichText from "@/components/RichText.tsx";
import PageMeta from "@/components/PageMeta.tsx";

// Hero background photo for this page. Replace public/images/support-hero.jpg
// with a real photo (keep the same file name) and it updates here automatically.
// Or upload a new one in admin (Page heroes > I Need Support) to override it live.
const HERO_IMAGE = "/images/support-hero.jpg";

const howWeHelpStyle = [
  { icon: Ear, color: "bg-[#2d8a55]" },
  { icon: HeartHandshake, color: "bg-[#4a7ebf]" },
  { icon: UserCheck, color: "bg-[#e07b39]" },
  { icon: Sparkles, color: "bg-[#8b5fb8]" },
];

const defaultHowWeHelp = [
  { title: "We listen", desc: "No judgement, no pressure to share more than you want to." },
  { title: "We support", desc: "Peer support, groups, activities and one-to-one support." },
  { title: "We signpost", desc: "Help finding the right professional service or treatment, where needed." },
  { title: "We don't just help", desc: "We aim to change — not just get you through today, but towards something better." },
];

const defaultFaqs = [
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
  const content = usePageContent("support");

  const whatToExpect = block(content, "what_to_expect");
  const closing = block(content, "closing");

  const helpItems = items(content, "how_we_help");
  const howWeHelpFromApi = helpItems.length > 0;
  const howWeHelpBase = howWeHelpFromApi
    ? helpItems.map((h) => ({ title: h.title, desc: h.description }))
    : defaultHowWeHelp;
  const howWeHelp = howWeHelpBase.map((h, idx) => ({
    ...h,
    ...howWeHelpStyle[idx % howWeHelpStyle.length],
  }));

  const faqItems = items(content, "faqs");
  const faqsFromApi = faqItems.length > 0;
  const faqs = faqsFromApi ? faqItems.map((f) => ({ q: f.title, a: f.description })) : defaultFaqs;

  return (
    <div className="min-h-screen">
      <PageMeta title="I Need Support" description="Reach out for free, confidential peer support - no diagnosis needed. Find out what to expect and how The Chat Shack can help." />
      <PageHero
        image={content.hero?.image || HERO_IMAGE}
        icon={MessageCircle}
        eyebrow={content.hero?.eyebrow || "You are not alone"}
        title={content.hero?.title || "I Need Support"}
        subtitle={
          content.hero?.subtitle ||
          "The ChatShack aims to be an accessible first point of contact for anyone experiencing mental health, wellbeing or related life difficulties."
        }
      />

      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-10 items-start">
            <div>
              <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">{whatToExpect?.heading || "What to expect"}</h2>
              {whatToExpect?.body ? (
                <RichText html={whatToExpect.body} className="text-[#4a4a4a]" />
              ) : (
                <>
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
                  <p className="text-[#4a4a4a]">
                    Our{" "}
                    <Link to="/privacy" className="text-[#1a7a4a] font-bold underline">
                      confidentiality policy
                    </Link>{" "}
                    explains what you tell us stays between us, with rare, clearly explained exceptions.
                  </p>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {howWeHelp.map((h) => (
                <div
                  key={h.title}
                  className={`${h.color} text-white rounded-xl p-4 flex flex-col items-center text-center`}
                >
                  <h.icon className="w-7 h-7 mb-2" />
                  <p className="font-black text-sm">{h.title}</p>
                  {howWeHelpFromApi ? (
                    <RichText html={h.desc} className="text-white/90 text-xs mt-1 [&_a]:text-white" />
                  ) : (
                    <p className="text-white/90 text-xs mt-1">{h.desc}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <FirstContactForm />

          {/* FAQs */}
          <div className="flex items-center gap-2 mb-5 justify-center">
            <HelpCircle className="w-6 h-6 text-[#1a7a4a]" />
            <h2 className="text-2xl font-black text-[#1a3a2a]">Questions people often ask</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {faqs.map((f) => (
              <div key={f.q} className="bg-[#f5f0e8] border border-amber-200 rounded-2xl p-5">
                <p className="font-bold text-[#1a3a2a] mb-2">{f.q}</p>
                {faqsFromApi ? (
                  <RichText html={f.a} className="text-[#4a4a4a] text-sm" />
                ) : (
                  <p className="text-[#4a4a4a] text-sm">{f.a}</p>
                )}
              </div>
            ))}
          </div>

          <div className="bg-[#e8f5ee] border-l-4 border-[#1a7a4a] px-5 py-4 rounded-r-xl mb-6 font-bold text-[#1a7a4a] text-center">
            {closing?.heading || "It's ok not to be ok. It's not ok to stay there."}
          </div>

          <div className="bg-red-600 text-white rounded-xl p-5 flex gap-3 mb-8 max-w-3xl mx-auto">
            <AlertTriangle className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <p className="font-black text-lg">IN AN EMERGENCY OR IMMEDIATE DANGER</p>
              <p className="font-bold text-xl">PLEASE CALL 999</p>
              <p className="text-white/90 text-sm mt-1">or go to your nearest A&amp;E department.</p>
            </div>
          </div>

          <div className="text-center">
            <a
              href={closing?.link_url || "https://facebook.com/TheChatShack"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              {closing?.link_text || "REACH OUT TO US"}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
