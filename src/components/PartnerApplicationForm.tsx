import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, CheckCircle2, Download } from "lucide-react";
import { API_URL, postToApi } from "@/lib/api";

/**
 * Partner & Resources application form - posts to the Django backend's
 * /api/partner-applications/ endpoint (see backend/submissions/). Scott
 * sees every application in the Django admin (where he can mark it
 * in review / approved / declined) and gets emailed when one comes in.
 *
 * The PDF profile form stays downloadable alongside this for anyone who'd
 * rather fill it in offline and send it via the Contact page.
 */
export default function PartnerApplicationForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const configured = Boolean(API_URL);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured) return;
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const ok = await postToApi("/api/partner-applications/", {
      organisation_name: data.get("organisation_name") || "",
      contact_name: data.get("contact_name") || "",
      email: data.get("email") || "",
      phone: data.get("phone") || "",
      services_offered: data.get("services_offered") || "",
      message: data.get("message") || "",
    });
    if (ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-[#e8f5ee] border border-[#1a7a4a]/30 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-10 h-10 text-[#1a7a4a] mx-auto mb-3" />
        <p className="font-black text-[#1a3a2a] text-lg">Thank you — we've got it.</p>
        <p className="text-[#4a4a4a] mt-1">We'll be in touch about next steps.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f0e8] border border-amber-200 rounded-2xl p-6 md:p-8 text-center">
      <h3 className="font-black text-lg text-[#1a3a2a] mb-2">
        Want to offer your services to The ChatShack and our community?
      </h3>
      <p className="text-[#4a4a4a] text-sm mb-5">
        If you're an individual, group or organisation who could offer support, resources or services to
        the people we work with, we'd love to hear from you — fill in the form below, or if you'd rather,
        download and complete our Partner &amp; Resources profile form and send it to us via the{" "}
        <Link to="/contact" className="text-[#1a7a4a] font-bold underline">
          Contact
        </Link>{" "}
        page.
      </p>

      {configured && (
        <form onSubmit={handleSubmit} className="text-left mb-5">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="block">
              <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">Organisation name *</span>
              <input
                type="text"
                name="organisation_name"
                required
                className="w-full rounded-lg border border-amber-300 px-4 py-2.5 text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
              />
            </label>
            <label className="block">
              <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">Contact name *</span>
              <input
                type="text"
                name="contact_name"
                required
                className="w-full rounded-lg border border-amber-300 px-4 py-2.5 text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="block">
              <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">Email *</span>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-lg border border-amber-300 px-4 py-2.5 text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
              />
            </label>
            <label className="block">
              <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">Phone (optional)</span>
              <input
                type="tel"
                name="phone"
                className="w-full rounded-lg border border-amber-300 px-4 py-2.5 text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
              />
            </label>
          </div>

          <label className="block mb-4">
            <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">What support/services are you offering? *</span>
            <textarea
              name="services_offered"
              required
              rows={3}
              className="w-full rounded-lg border border-amber-300 px-4 py-2.5 text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
            />
          </label>

          <label className="block mb-5">
            <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">Anything else you'd like us to know? (optional)</span>
            <textarea
              name="message"
              rows={3}
              className="w-full rounded-lg border border-amber-300 px-4 py-2.5 text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
            />
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] disabled:opacity-60 text-white font-bold px-6 py-3 rounded-full transition-colors"
          >
            <Send className="w-4 h-4" />
            {status === "sending" ? "Sending..." : "Send application"}
          </button>

          {status === "error" && (
            <p className="text-red-700 text-sm mt-3 font-medium">
              Something went wrong sending that — please try again, or use the download below instead.
            </p>
          )}
        </form>
      )}

      <a
        href="/documents/chatshack-partner-profile-form.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={
          configured
            ? "inline-flex items-center gap-2 text-[#1a7a4a] font-bold text-sm underline underline-offset-2"
            : "inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-6 py-3 rounded-full transition-colors"
        }
      >
        <Download className="w-4 h-4" />
        {configured ? "Prefer to fill it in offline? Download the PDF instead" : "DOWNLOAD PARTNER APPLICATION FORM"}
      </a>
    </div>
  );
}
