import { useState } from "react";
import { MessageSquareHeart, Send, CheckCircle2 } from "lucide-react";
import { API_URL, postToApi } from "@/lib/api";

/**
 * "Tell us how we can improve" box on the Contact Us page - general
 * feedback/reviews about The ChatShack, posted to the Django backend's
 * /api/improvement-feedback/ endpoint (see backend/submissions/). This is
 * separate from the Community page's "what's needed" suggestions box
 * (SuggestionForm.tsx / /api/suggestions/).
 *
 * Until the backend is deployed and VITE_API_URL is set (see .env /
 * .env.production), this shows a friendly "coming soon" notice instead of
 * a form, so nobody fills in something that would silently go nowhere.
 */
export default function ImprovementFeedbackForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const configured = Boolean(API_URL);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured) return;
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const ok = await postToApi("/api/improvement-feedback/", {
      name: data.get("name") || "",
      email: data.get("email") || "",
      message: data.get("message") || "",
    });
    if (ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  if (!configured) {
    return (
      <div className="bg-[#f5f0e8] border border-amber-200 rounded-2xl p-6 text-center">
        <MessageSquareHeart className="w-8 h-8 text-[#1a7a4a] mx-auto mb-2" />
        <p className="font-bold text-[#1a3a2a]">Feedback form coming soon</p>
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
        <p className="font-black text-[#1a3a2a] text-lg">Thank you for the feedback.</p>
        <p className="text-[#4a4a4a] mt-1">We read every one — it genuinely helps us do better.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#f5f0e8] border border-amber-200 rounded-2xl p-6">
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
          How could we improve? What did we do well? *
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us how we can improve, or anything you'd like to share..."
          className="w-full rounded-lg border border-amber-300 px-4 py-2.5 text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] disabled:opacity-60 text-white font-bold px-6 py-3 rounded-full transition-colors"
      >
        <Send className="w-4 h-4" />
        {status === "sending" ? "Sending..." : "Send feedback"}
      </button>

      {status === "error" && (
        <p className="text-red-700 text-sm mt-3 font-medium">
          Something went wrong sending that — please try again, or message us on Facebook instead.
        </p>
      )}
    </form>
  );
}
