import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, Send, CheckCircle2, HeartHandshake } from "lucide-react";
import { API_URL, postToApi } from "@/lib/api";

/**
 * "Apply to volunteer" popup, opened from the Get Involved section of the
 * Our Community page. Posts to the Django backend's
 * /api/volunteer-applications/ endpoint (see backend/submissions/). Scott
 * sees every application in the Django admin (where he can mark it in
 * review / approved / declined) and gets emailed when one comes in.
 *
 * Deliberately only asks for what's needed for a first conversation -
 * DBS checks, references and ID are handled later for roles that need them.
 */

// Volunteer roles people can tick - keep in step with the "Ways to get
// involved" cards on the Our Community page.
const ROLES = [
  "Peer supporter or mentor",
  "Group facilitator",
  "Outreach volunteer",
  "Events & fundraising",
  "Not sure yet",
];

const inputClass =
  "w-full rounded-lg border border-amber-300 px-4 py-2.5 text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]";

export default function VolunteerApplicationModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const configured = Boolean(API_URL);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured) return;
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    const ok = await postToApi("/api/volunteer-applications/", {
      name: data.get("name") || "",
      email: data.get("email") || "",
      phone: data.get("phone") || "",
      roles: data.getAll("roles").join(", "),
      availability: data.get("availability") || "",
      about: data.get("about") || "",
      is_over_18: data.get("is_over_18") === "on",
    });
    setStatus(ok ? "sent" : "error");
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="volunteer-modal-title"
      className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-black/5 text-[#4a4a4a] flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "sent" ? (
          <div className="text-center py-4">
            <CheckCircle2 className="w-12 h-12 text-[#1a7a4a] mx-auto mb-3" />
            <p id="volunteer-modal-title" className="font-black text-[#1a3a2a] text-lg mb-1">
              Thank you for applying!
            </p>
            <p className="text-[#4a4a4a]">
              We've got your application and we'll be in touch soon to have a chat about next steps.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2 pr-8">
              <HeartHandshake className="w-6 h-6 text-[#1a7a4a] flex-shrink-0" />
              <h3 id="volunteer-modal-title" className="font-black text-xl text-[#1a3a2a]">
                Apply to volunteer
              </h3>
            </div>
            <p className="text-[#4a4a4a] text-sm mb-5">
              Tell us a little about yourself and we'll be in touch for a friendly chat. If your role needs
              DBS checks or references, we'll talk you through them later — please don't send any
              documents now.
            </p>

            {!configured ? (
              <p className="text-[#4a4a4a] text-sm bg-[#f5f0e8] border border-amber-200 rounded-lg p-4 text-center">
                This form isn't available right now — message us on{" "}
                <a
                  href="https://www.facebook.com/profile.php?id=61589476815747"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a7a4a] font-bold underline"
                >
                  Facebook
                </a>{" "}
                instead and we'll get back to you.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <label className="block mb-4">
                  <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">Your name *</span>
                  <input type="text" name="name" required autoComplete="name" className={inputClass} />
                </label>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <label className="block">
                    <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">Email *</span>
                    <input type="email" name="email" required autoComplete="email" className={inputClass} />
                  </label>
                  <label className="block">
                    <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">Phone (optional)</span>
                    <input type="tel" name="phone" autoComplete="tel" className={inputClass} />
                  </label>
                </div>

                <fieldset className="mb-4">
                  <legend className="block font-bold text-[#1a3a2a] mb-2 text-sm">
                    What would you like to help with? (tick any)
                  </legend>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {ROLES.map((role) => (
                      <label key={role} className="flex items-center gap-2 text-sm text-[#1a3a2a]">
                        <input type="checkbox" name="roles" value={role} className="w-4 h-4 accent-[#1a7a4a]" />
                        {role}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="block mb-4">
                  <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">When are you usually free? (optional)</span>
                  <input
                    type="text"
                    name="availability"
                    placeholder="e.g. Tuesday evenings, weekends"
                    className={inputClass}
                  />
                </label>

                <label className="block mb-4">
                  <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">
                    Tell us a bit about yourself and why you'd like to volunteer *
                  </span>
                  <textarea name="about" required rows={4} className={inputClass} />
                </label>

                <label className="flex items-start gap-2 text-sm text-[#1a3a2a] mb-3">
                  <input type="checkbox" name="is_over_18" required className="w-4 h-4 mt-0.5 accent-[#1a7a4a] flex-shrink-0" />
                  <span>I'm aged 18 or over *</span>
                </label>

                <label className="flex items-start gap-2 text-sm text-[#1a3a2a] mb-5">
                  <input type="checkbox" name="consent" required className="w-4 h-4 mt-0.5 accent-[#1a7a4a] flex-shrink-0" />
                  <span>
                    I'm happy for The ChatShack to keep these details to contact me about volunteering (see our{" "}
                    <Link to="/privacy" onClick={onClose} className="text-[#1a7a4a] font-bold underline">
                      privacy policy
                    </Link>
                    ) *
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] disabled:opacity-60 text-white font-bold px-6 py-3 rounded-full transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {status === "sending" ? "Sending..." : "Send my application"}
                </button>

                {status === "error" && (
                  <p className="text-red-700 text-sm mt-3 font-medium text-center">
                    Something went wrong sending that — please try again, or message us on Facebook instead.
                  </p>
                )}
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
