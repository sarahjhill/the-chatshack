import { Link } from "react-router-dom";
import { Mail, AlertTriangle } from "lucide-react";
import PolicyPageHeader from "@/components/PolicyPageHeader.tsx";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <PolicyPageHeader
        icon={Mail}
        eyebrow="Get in touch"
        title="Contact Us"
        subtitle="There's no such thing as a daft question — reach out whenever you're ready."
      />

      <section className="bg-white py-14">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-[#f5f0e8] rounded-xl p-6 border border-amber-200 mb-10 text-center">
            <div className="w-12 h-12 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-[#1a7a4a] font-black text-xl">f</span>
            </div>
            <p className="font-bold text-[#1a3a2a] mb-2">The easiest way to reach us is Facebook</p>
            <a
              href="https://facebook.com/TheChatShack"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
            >
              @TheChatShack
            </a>
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
            <Link to="/get-involved" className="text-[#1a7a4a] font-bold underline">
              Get Involved
            </Link>{" "}
            are good places to look.
          </p>

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
