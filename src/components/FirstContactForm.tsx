import { useState } from "react";
import { Send, CheckCircle2, Download } from "lucide-react";
import { API_URL, postToApi } from "@/lib/api";

/**
 * "First Contact & Initial Support Form" on the Support page - entirely
 * optional, nothing here is compulsory. Posts to the Django backend's
 * /api/first-contact/ endpoint (see backend/submissions/). Scott sees
 * every submission in the Django admin and gets emailed when one comes in.
 *
 * The PDF stays downloadable alongside this for anyone who'd rather fill
 * it in offline or bring it along in person.
 */
export default function FirstContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const configured = Boolean(API_URL);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured) return;
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const ok = await postToApi("/api/first-contact/", {
      name: data.get("name") || "",
      email: data.get("email") || "",
      phone: data.get("phone") || "",
      preferred_contact_method: data.get("preferred_contact_method") || "",
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
      <div className="bg-[#e8f5ee] border border-[#1a7a4a]/30 rounded-2xl p-8 text-center max-w-2xl mx-auto mb-14">
        <CheckCircle2 className="w-10 h-10 text-[#1a7a4a] mx-auto mb-3" />
        <p className="font-black text-[#1a3a2a] text-lg">Thank you — we've got it.</p>
        <p className="text-[#4a4a4a] mt-1">
          We'll be in touch using whatever you told us works best for you.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f0e8] border border-amber-200 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto mb-14">
      <h3 className="font-black text-lg text-[#1a3a2a] mb-2 text-center">Want to get a head start?</h3>
      <p className="text-[#4a4a4a] text-sm mb-5 text-center">
        If it helps to gather your thoughts beforehand, you can fill in our First Contact &amp; Initial
        Support Form below. It's entirely optional, nothing here is compulsory to answer, and it's just
        there to make that first step a little easier if you want it.
      </p>

      {configured && (
        <form onSubmit={handleSubmit} className="mb-5">
          <label className="block mb-4">
            <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">Your name (optional)</span>
            <input
              type="text"
              name="name"
              className="w-full rounded-lg border border-amber-300 px-4 py-2.5 text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
            />
          </label>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="block">
              <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">Email (optional)</span>
              <input
                type="email"
                name="email"
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
            <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">
              How would you prefer we get in touch? (optional)
            </span>
            <select
              name="preferred_contact_method"
              defaultValue=""
              className="w-full rounded-lg border border-amber-300 px-4 py-2.5 text-[#1a3a2a] bg-white focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
            >
              <option value="">No preference</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="either">Either</option>
            </select>
          </label>

          <label className="block mb-5">
            <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">
              Anything you'd like to share ahead of first contact? (optional)
            </span>
            <textarea
              name="message"
              rows={4}
              placeholder="Nothing here is compulsory - share as much or as little as you want."
              className="w-full rounded-lg border border-amber-300 px-4 py-2.5 text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
            />
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] disabled:opacity-60 text-white font-bold px-6 py-3 rounded-full transition-colors"
          >
            <Send className="w-4 h-4" />
            {status === "sending" ? "Sending..." : "Send form"}
          </button>

          {status === "error" && (
            <p className="text-red-700 text-sm mt-3 font-medium text-center">
              Something went wrong sending that — please try again, or use the download below instead.
            </p>
          )}
        </form>
      )}

      <div className="text-center">
        <a
          href="/documents/chatshack-first-contact-form.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#1a7a4a] font-bold text-sm underline underline-offset-2"
        >
          <Download className="w-4 h-4" />
          {configured ? "Prefer to fill it in offline? Download the PDF instead" : "DOWNLOAD FIRST CONTACT FORM"}
        </a>
      </div>
    </div>
  );
}
