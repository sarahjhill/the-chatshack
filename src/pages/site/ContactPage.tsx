import { Link } from "react-router-dom";
import { Mail, AlertTriangle, MessageCircle, LifeBuoy, MessageSquareHeart } from "lucide-react";
import PageHero from "@/components/PageHero.tsx";
import ContactForm from "@/components/ContactForm.tsx";
import ImprovementFeedbackForm from "@/components/ImprovementFeedbackForm.tsx";
import { usePageContent, useSiteSettings } from "@/lib/pageContent.ts";
import PageMeta from "@/components/PageMeta.tsx";

// Hero background photo for this page. Replace public/images/contact-hero.jpg
// with a real photo (keep the same file name) and it updates here automatically.
// Or upload a new one in admin (Page heroes > Contact Us) to override it live.
const HERO_IMAGE = "/images/contact-hero.jpg";

// The ChatShack's WhatsApp group invite link.
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/G5oj1lwMDH036DwoIPiKq7?mode=gi_t";

export default function ContactPage() {
  const content = usePageContent("contact");
  const settings = useSiteSettings();

  const whatsappHref = WHATSAPP_GROUP_URL;
  const facebookHref = settings?.facebook_url || "https://facebook.com/TheChatShack";

  return (
    <div className="min-h-screen">
      <PageMeta title="Contact Us" description="Get in touch with The Chat Shack - how to reach us, find a group, or ask a question." />
      <PageHero
        image={content.hero?.image || HERO_IMAGE}
        icon={Mail}
        eyebrow={content.hero?.eyebrow || "Get in touch"}
        title={content.hero?.title || "Contact Us"}
        subtitle={content.hero?.subtitle || "There's no such thing as a daft question — reach out whenever you're ready."}
      />

      <section className="bg-white py-14">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-center font-bold text-[#1a7a4a] text-lg mb-8">
            It's ok not to be ok. It's not ok to stay there.
          </p>

          {/* Quick links: Facebook / WhatsApp / need help now */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <a
              href={facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f5f0e8] border border-amber-200 rounded-xl p-5 text-center hover:border-[#1a7a4a] transition-colors"
            >
              <div className="w-11 h-11 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-[#1a7a4a] font-black text-lg">f</span>
              </div>
              <p className="font-bold text-[#1a3a2a] text-sm">Follow us on Facebook</p>
              <p className="text-[#4a4a4a] text-xs mt-1">@TheChatShack</p>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f5f0e8] border border-amber-200 rounded-xl p-5 text-center hover:border-[#1a7a4a] transition-colors"
            >
              <MessageCircle className="w-11 h-11 text-[#1a7a4a] bg-[#1a7a4a]/10 rounded-full p-2.5 mx-auto mb-2" />
              <p className="font-bold text-[#1a3a2a] text-sm">Join our WhatsApp group</p>
              <p className="text-[#4a4a4a] text-xs mt-1">Chat with the community</p>
            </a>

            <Link
              to="/support#first-contact"
              className="bg-[#f5f0e8] border border-amber-200 rounded-xl p-5 text-center hover:border-[#1a7a4a] transition-colors"
            >
              <LifeBuoy className="w-11 h-11 text-[#1a7a4a] bg-[#1a7a4a]/10 rounded-full p-2.5 mx-auto mb-2" />
              <p className="font-bold text-[#1a3a2a] text-sm">Need help now?</p>
              <p className="text-[#4a4a4a] text-xs mt-1">First point of contact</p>
            </Link>
          </div>

          <p className="text-[#4a4a4a] mb-3">
            Whether you need support yourself, want to get involved, or represent an organisation
            interested in partnering with us, send us a message and we'll get back to you. What you tell
            us will normally be treated confidentially — see our{" "}
            <Link to="/privacy" className="text-[#1a7a4a] font-bold underline">
              Confidentiality &amp; Privacy
            </Link>{" "}
            page for the detail.
          </p>
          <p className="text-[#4a4a4a] mb-10">
            Not sure where to start?{" "}
            <Link to="/support" className="text-[#1a7a4a] font-bold underline">
              I Need Support
            </Link>{" "}
            and{" "}
            <Link to="/community#get-involved" className="text-[#1a7a4a] font-bold underline">
              Get Involved
            </Link>{" "}
            are good places to look.
          </p>

          {/* Get in touch */}
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-6 h-6 text-[#1a7a4a]" />
            <h2 className="text-2xl font-black text-[#1a3a2a]">Get in touch</h2>
          </div>
          <div className="mb-12">
            <ContactForm />
          </div>

          {/* Tell us how we can improve */}
          <div className="flex items-center gap-2 mb-4">
            <MessageSquareHeart className="w-6 h-6 text-[#1a7a4a]" />
            <h2 className="text-2xl font-black text-[#1a3a2a]">Tell us how we can improve</h2>
          </div>
          <p className="text-[#4a4a4a] mb-4">
            Good or bad, we want to hear it — your feedback helps us make The Chat Shack better.
          </p>
          <div className="mb-12">
            <ImprovementFeedbackForm />
          </div>

          <div className="bg-red-600 text-white rounded-xl p-5 flex gap-3">
            <AlertTriangle className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <p className="font-black text-lg">IN AN EMERGENCY OR IMMEDIATE DANGER</p>
              <p className="font-bold text-xl">PLEASE CALL 999</p>
              <p className="text-white/90 text-sm mt-1">or go to your nearest A&amp;E department.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
