import { useState } from "react";
import { Lightbulb, Send, CheckCircle2 } from "lucide-react";

/**
 * Community suggestions form, posts to Formspree (https://formspree.io).
 *
 * To make this live:
 *   1. Go to https://formspree.io and sign up free.
 *   2. Create a new form, pointed at the email address you want suggestions to land in.
 *   3. Formspree gives you a form ID that looks like "xyzabcde" (part of a URL like
 *      https://formspree.io/f/xyzabcde).
 *   4. In CommunityPage.tsx, set FORMSPREE_FORM_ID to that id.
 * Until that's set, this shows a friendly "coming soon" notice instead of a form.
 */
export default function SuggestionForm({ formId }: { formId: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const configured = formId.trim().length > 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured) return;
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!configured) {
    return (
      <div className="bg-[#f5f0e8] border border-amber-200 rounded-2xl p-6 text-center">
        <Lightbulb className="w-8 h-8 text-[#1a7a4a] mx-auto mb-2" />
        <p className="font-bold text-[#1a3a2a]">Suggestions form coming soon</p>
        <p className="text-sm text-[#4a4a4a] mt-1">
          In the meantime, message us on{" "}
          <a
            href="https://facebook.com/TheChatShack"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1a7a4a] font-bold underline"
          >
            Facebook
          </a>
          .
        </p>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div className="bg-[#e8f5ee] border border-[#1a7a4a]/30 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-10 h-10 text-[#1a7a4a] mx-auto mb-3" />
        <p className="font-black text-[#1a3a2a] text-lg">Thank you — we've got it.</p>
        <p className="text-[#4a4a4a] mt-1">
          Your suggestion has been sent through. We read every one.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#f5f0e8] border border-amber-200 rounded-2xl p-6">
      {/* Honeypot field to deter simple spam bots; hidden from real visitors */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      <label className="block mb-4">
        <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">Your name (optional)</span>
        <input
          type="text"
          name="name"
          className="w-full rounded-lg border border-amber-300 px-4 py-2.5 text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
        />
      </label>

      <label className="block mb-4">
        <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">
          Your email (optional, only if you'd like a reply)
        </span>
        <input
          type="email"
          name="email"
          className="w-full rounded-lg border border-amber-300 px-4 py-2.5 text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
        />
      </label>

      <label className="block mb-5">
        <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">
          What would help you, or what's missing? *
        </span>
        <textarea
          name="suggestion"
          required
          rows={4}
          placeholder="A new group, an activity, a time that works better, anything at all..."
          className="w-full rounded-lg border border-amber-300 px-4 py-2.5 text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] disabled:opacity-60 text-white font-bold px-6 py-3 rounded-full transition-colors"
      >
        <Send className="w-4 h-4" />
        {status === "sending" ? "Sending..." : "Send suggestion"}
      </button>

      {status === "error" && (
        <p className="text-red-700 text-sm mt-3 font-medium">
          Something went wrong sending that — please try again, or message us on Facebook instead.
        </p>
      )}
    </form>
  );
}
