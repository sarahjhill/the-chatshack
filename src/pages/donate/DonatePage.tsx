import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Clock,
  Users,
  Home,
  ClipboardList,
  Shield,
  Lock,
  CreditCard,
  FileCheck,
  Building2,
  Landmark,
  Brain,
  Award,
  HeartHandshake,
} from "lucide-react";

// ---- Placeholder content -------------------------------------------------
// Everything below is clearly marked as a placeholder. Swap in real figures,
// sponsor names/logos, and a real payment provider when ready.

const impactItems = [
  {
    icon: Clock,
    color: "bg-[#2d8a55]",
    percentage: 70,
    label: "Same-Day Support",
    text: "Funds urgent, same-day therapy and support sessions for people who can't wait for a referral.",
  },
  {
    icon: Users,
    color: "bg-[#4a7ebf]",
    percentage: 15,
    label: "Peer Groups & Events",
    text: "Runs our peer support groups, walk & talk sessions and community events.",
  },
  {
    icon: Home,
    color: "bg-[#e07b39]",
    percentage: 10,
    label: "Safe Spaces",
    text: "Covers venue hire and running costs for a warm, safe place to meet.",
  },
  {
    icon: ClipboardList,
    color: "bg-[#8b5fb8]",
    percentage: 5,
    label: "Admin & Running Costs",
    text: "Kept deliberately low, so more of your money goes directly to support.",
  },
];

const COUNTER_RAISED = 4820; // [placeholder — replace with real figure]
const COUNTER_GOAL = 10000; // [placeholder — replace with real figure]

const sponsors = [
  { icon: Building2, label: "[Local Business\nSponsor]" },
  { icon: Landmark, label: "[Council\nCommunity Fund]" },
  { icon: Brain, label: "[Mental Health\nWales]" },
  { icon: Award, label: "[Community\nGrant Partner]" },
  { icon: HeartHandshake, label: "[Charity\nPartner]" },
  { icon: Heart, label: "[Local\nSponsor]" },
];

const trustBadges = [
  { icon: Lock, label: "Secure Checkout" },
  { icon: Shield, label: "Your Data Is Protected" },
  { icon: CreditCard, label: "We Never Store Card Details" },
  { icon: FileCheck, label: "Registered C.I.C." },
];

const donationAmounts = [5, 10, 25, 50];

// ---- Count-up hook (respects prefers-reduced-motion) ---------------------
function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }
    const duration = 1600;
    const start = performance.now();
    let frame: number;
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, target]);

  return value;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function ImpactBar({ percentage, active }: { percentage: number; active: boolean }) {
  const width = useCountUp(percentage, active);
  return (
    <div className="w-full h-2.5 bg-white/25 rounded-full overflow-hidden mb-2">
      <div
        className="h-full bg-white rounded-full transition-[width] duration-700 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

function LiveCounter() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const raised = useCountUp(COUNTER_RAISED, inView);
  const barPct = useCountUp(Math.round((COUNTER_RAISED / COUNTER_GOAL) * 100), inView);

  return (
    <div ref={ref} className="bg-white rounded-2xl p-8 md:p-10 max-w-xl mx-auto text-center shadow-lg">
      <div className="font-black text-4xl md:text-5xl text-[#046b7d]">
        £{raised.toLocaleString()}
      </div>
      <div className="text-[#3a3a3a] font-bold text-sm mt-1">
        of £{COUNTER_GOAL.toLocaleString()} goal — raised so far this year
      </div>
      <div className="w-full h-4 bg-[#e7ddc9] rounded-full overflow-hidden my-5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#03849a] to-[#1a7a4a] transition-[width] duration-700 ease-out"
          style={{ width: `${Math.min(100, barPct)}%` }}
        />
      </div>
      <p className="text-xs italic text-[#6a6a6a]">
        Demo figures for now — this will show real, live totals once connected to our donation platform.
      </p>
    </div>
  );
}

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(donationAmounts[0]);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="bg-[#1a2e1a] py-16 text-center text-white">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-amber-400 font-bold text-sm tracking-wide mb-2">
            EVERY POUND HELPS SOMEONE TALK SOONER.
          </p>
          <h1 className="font-black text-3xl md:text-4xl mb-4">Support The ChatShack</h1>
          <p className="text-white/80 mb-8">
            Your donation helps us keep The ChatShack free, confidential and open to anyone who
            needs us — and helps fund same-day support for people who can't wait.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#give"
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-7 py-3 rounded-full flex items-center gap-2 transition-colors"
            >
              <Heart className="w-4 h-4" />
              DONATE NOW
            </a>
            <a
              href="#impact"
              className="bg-white/15 hover:bg-white/25 text-white font-bold px-7 py-3 rounded-full border border-white/40 transition-colors"
            >
              SEE WHERE IT GOES
            </a>
          </div>
        </div>
      </section>

      {/* WHERE YOUR DONATION GOES */}
      <section id="impact" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#046b7d] font-bold text-sm uppercase tracking-wide mb-2">
            Full transparency, always.
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-[#1a3a2a] mb-3">
            Where Your Donation Goes
          </h2>
          <p className="text-[#4a4a4a] max-w-2xl mb-8">
            We know trust matters when it comes to your money. Here's exactly how donations are
            used, and we update these figures every quarter so you can see it for yourself.
          </p>

          <ImpactGrid />

          <p className="text-xs italic text-[#6a6a6a] mt-6">
            [Placeholder figures — real breakdown to be confirmed with the treasurer before publishing.]
          </p>
        </div>
      </section>

      {/* LIVE COUNTER */}
      <section className="bg-gradient-to-b from-[#dcefef] to-[#bfe3e2] py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-[#1a3a2a] mb-8">
            See Our Impact Grow
          </h2>
          <LiveCounter />
        </div>
      </section>

      {/* SPONSORS & PARTNER GROUPS */}
      <section className="bg-[#f5f0e8] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-amber-600 font-bold text-sm uppercase tracking-wide mb-2">
            We couldn't do this alone.
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-[#1a3a2a] mb-3">
            Our Sponsors & Partner Groups
          </h2>
          <p className="text-[#4a4a4a] max-w-2xl mb-8">
            The ChatShack is proudly supported by local businesses, community funds and partner
            organisations across Cardiff.{" "}
            <span className="italic">
              [Placeholder logos/names below — to be replaced with actual sponsors.]
            </span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {sponsors.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-xl p-4 flex flex-col items-center text-center shadow-sm"
              >
                <div className="w-10 h-10 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center mb-2">
                  <s.icon className="w-5 h-5 text-[#1a7a4a]" />
                </div>
                <span className="text-xs font-bold text-[#1a3a2a] whitespace-pre-line leading-tight">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATING SAFELY */}
      <section className="bg-white py-16 border-t border-[#e7ddc9]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-[#1a3a2a] mb-3">Donating Safely</h2>
          <p className="text-[#4a4a4a] max-w-2xl mb-8">
            We take your trust seriously.{" "}
            <span className="italic">
              [This section will describe the real payment provider and safeguards once one is
              chosen — placeholder wording for now.]
            </span>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((b) => (
              <div
                key={b.label}
                className="border border-[#e7ddc9] rounded-xl p-5 text-center flex flex-col items-center gap-2"
              >
                <b.icon className="w-7 h-7 text-[#1a7a4a]" />
                <span className="text-sm font-bold text-[#1a3a2a]">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIVE */}
      <section id="give" className="bg-[#1a7a4a] py-16 text-white text-center">
        <div className="max-w-lg mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black mb-3">Make a Donation</h2>
          <p className="text-white/85 mb-8">
            Choose an amount below, or enter your own.{" "}
            <span className="italic">
              [Donate button is a placeholder — not yet connected to a real payment provider.]
            </span>
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {donationAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setSelectedAmount(amount)}
                className={`font-bold px-6 py-3 rounded-xl border-2 transition-colors ${
                  selectedAmount === amount
                    ? "bg-amber-500 border-amber-500 text-white"
                    : "bg-white/10 border-white/40 text-white hover:border-amber-400"
                }`}
              >
                £{amount}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSelectedAmount("custom")}
              className={`font-bold px-6 py-3 rounded-xl border-2 transition-colors ${
                selectedAmount === "custom"
                  ? "bg-amber-500 border-amber-500 text-white"
                  : "bg-white/10 border-white/40 text-white hover:border-amber-400"
              }`}
            >
              Other
            </button>
          </div>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 bg-amber-500/60 text-white font-bold px-8 py-3.5 rounded-full text-lg cursor-not-allowed"
          >
            <Heart className="w-5 h-5" />
            DONATE NOW
          </button>
          <p className="text-white/70 text-sm italic mt-4">
            Online payments are coming soon — please check back shortly, or get in touch to donate
            another way.
          </p>
        </div>
      </section>
    </div>
  );
}

function ImpactGrid() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {impactItems.map((item) => (
        <div key={item.label} className={`${item.color} text-white rounded-xl p-5`}>
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-3">
            <item.icon className="w-5 h-5" />
          </div>
          <ImpactBar percentage={item.percentage} active={inView} />
          <PercentLabel percentage={item.percentage} active={inView} />
          <h3 className="font-black text-sm mt-2">{item.label}</h3>
          <p className="text-white/90 text-xs mt-1">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

function PercentLabel({ percentage, active }: { percentage: number; active: boolean }) {
  const value = useCountUp(percentage, active);
  return <div className="font-black text-xl">{value}%</div>;
}
