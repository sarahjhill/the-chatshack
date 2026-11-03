import { useEffect, useState } from "react";
import { X, Send, CheckCircle2, Tent } from "lucide-react";
import { API_URL, postToApi } from "@/lib/api";

/**
 * "Register your interest" popup for the Sleep Out to Help Out event on
 * the Events page. Just a name and email, posted to the Django backend's
 * /api/sleep-out-interest/ endpoint (see backend/submissions/). Scott
 * sees every submission in the Django admin and can follow up nearer the
 * time with the details.
 */
export default function RegisterInterestModal({ onClose }: { onClose: () => void }) {
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
    const form = e.currentTarget;
    const data = new FormData(form);
    const ok = await postToApi("/api/sleep-out-interest/", {
      name: data.get("name") || "",
      email: data.get("email") || "",
    });
    if (ok) {
      setStatus("sent");
    } else {
      setStatus("error");
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Register your interest in Sleep Out to Help Out"
      className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full relative shadow-2xl"
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
            <p className="font-black text-[#1a3a2a] text-lg mb-1">You're on the list!</p>
            <p className="text-[#4a4a4a]">
              Thanks for registering your interest in Sleep Out to Help Out — we'll be in touch with
              the details nearer the time.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <Tent className="w-6 h-6 text-[#1a7a4a]" />
              <h3 className="font-black text-xl text-[#1a3a2a]">Register your interest</h3>
            </div>
            <p className="text-[#4a4a4a] text-sm mb-5">
              Thinking about taking part in Sleep Out to Help Out? Leave your name and email and we'll
              send you the details as soon as they're confirmed.
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
                instead and we'll add you to the list.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <label className="block mb-4">
                  <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">Your name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full rounded-lg border border-amber-300 px-4 py-2.5 text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
                  />
                </label>

                <label className="block mb-5">
                  <span className="block font-bold text-[#1a3a2a] mb-1 text-sm">Your email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-lg border border-amber-300 px-4 py-2.5 text-[#1a3a2a] focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] disabled:opacity-60 text-white font-bold px-6 py-3 rounded-full transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {status === "sending" ? "Sending..." : "Register my interest"}
                </button>

                {status === "error" && (
                  <p className="text-red-700 text-sm mt-3 font-medium text-center">
                    Something went wrong sending that — please try again, or message us on Facebook
                    instead.
                  </p>
                )}

                <p className="text-[#4a4a4a] text-xs mt-3 text-center">
                  We'll only use this to email you about Sleep Out to Help Out — nothing else.
                </p>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
