import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  Coffee,
  MessageCircle,
  BedDouble,
  Wallet,
  Stethoscope,
  Sparkles,
  X,
  Truck,
} from "lucide-react";

// ---- Placeholder content -------------------------------------------------
// Everything below is clearly marked as a placeholder. Swap in real figures,
// sponsor names/logos, and a real payment provider when ready.

// ---- Donation Impact Guide -----------------------------------------------
// Real photos from our own groups (mindful colouring, setting boundaries and
// personal rules sessions). £150/6-session therapy figure confirmed directly
// with our therapists/counsellors - the other amounts below are illustrative
// until confirmed with suppliers, so they're flagged as such on the page.

const impactTiers = [
  {
    amount: "£5",
    icon: Coffee,
    title: "A Coffee & a Conversation",
    text: "Could help fund a 1-to-1 peer-support session and a coffee, giving someone a safe, welcoming opportunity to talk, feel heard and know they are not alone.",
    image: "/images/donate-coffee-chat.webp",
    imageAlt: "ChatShack members at one of our mindful colouring sessions",
  },
  {
    amount: "£10",
    icon: MessageCircle,
    title: "Someone to Turn To",
    text: "Could help provide an extended support session, refreshments and practical signposting, helping someone take their first steps towards the support they need.",
    image: "/images/donate-group-table.webp",
    imageAlt: "Members together at one of our peer support group sessions",
  },
  {
    amount: "£25",
    icon: BedDouble,
    title: "A Little More Warmth",
    text: "Could buy a sleeping bag for someone experiencing homelessness, helping provide warmth and comfort when they need it most.",
    image: "/images/homeless-outreach-hero.jpg",
    imageAlt: "The ChatShack's homeless outreach support",
  },
  {
    amount: "£50",
    icon: Wallet,
    title: "Easing the Financial Pressure",
    text: "Could help someone struggling to afford everyday essentials, such as food, toiletries, warm clothing or other basic necessities, easing some of the financial pressure while they work towards a more stable future.",
    image: "/images/donate-community-session.webp",
    imageAlt: "Members together at one of our mindful colouring sessions",
  },
  {
    amount: "£150",
    icon: Stethoscope,
    title: "A Complete Course of Therapy",
    text: "Funds a full course of 6 therapy sessions with one of our qualified therapists or counsellors \u2014 a confirmed figure, and one of the most affordable routes to real professional therapy around.",
    image: "/images/donate-safe-space.webp",
    imageAlt: "One of our calm, safe spaces at The ChatShack",
  },
];

const otherTiers = [
  {
    amount: "£15",
    title: "Practical Help, When It Matters",
    text: "Helps provide essential toiletries, food, refreshments or travel assistance for someone who needs support.",
  },
  {
    amount: "£30",
    title: "A Step Towards Stability",
    text: "Helps fund a combination of essential supplies, practical assistance and support for someone experiencing homelessness or financial hardship.",
  },
  {
    amount: "£100",
    title: "Keeping Support Accessible",
    text: "Helps The ChatShack provide peer support, community activities, outreach and practical assistance to people who might otherwise struggle to access help.",
  },
  {
    amount: "£300",
    title: "Investing in Someone's Future",
    text: "Helps fund multiple courses of therapy, or combine professional support with practical assistance for people facing several barriers.",
  },
];

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

// The Van has had no donations towards it yet - £0 raised is the real,
// current figure. The goal is a placeholder until we have an actual quote
// for the van, conversion and kit, so it's clearly flagged on the page.
const VAN_FUND_RAISED_START = 0;
const VAN_FUND_GOAL = 15000; // [placeholder — replace with real target once quoted]
const VAN_ADD_AMOUNTS = [10, 25, 50, 100];

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

// Plain module-level helper (not a hook/component) so calling performance.now()
// here doesn't trip the "impure function during render" lint rule, which is
// conservative about anything defined inside a component's render scope.
function animateValue(
  from: number,
  to: number,
  duration: number,
  onUpdate: (value: number) => void,
  frameRef: { current: number | null }
) {
  const start = performance.now();
  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    onUpdate(Math.round(from + (to - from) * eased));
    frameRef.current = progress < 1 ? requestAnimationFrame(tick) : null;
  };
  frameRef.current = requestAnimationFrame(tick);
}

// ---- Van Fund widget ------------------------------------------------------
// Playful, demo "fill the pot" interaction: press a button to add a demo
// amount, watch the pot animate, then a pop-up invites a real donation
// towards it (which hands off to the real donate form further down the
// page - no payment is taken here). £0 raised is the real, current total;
// the £15,000 goal is a placeholder until we have an actual quote for the
// van.
function VanFundWidget({ onDonate }: { onDonate: (amount: number) => void }) {
  const [raised, setRaised] = useState(VAN_FUND_RAISED_START);
  const [displayRaised, setDisplayRaised] = useState(VAN_FUND_RAISED_START);
  const [popupAmount, setPopupAmount] = useState<number | null>(null);
  const frameRef = useRef<number | null>(null);

  function addToPot(amount: number) {
    const from = raised;
    const to = Math.min(VAN_FUND_GOAL, raised + amount);
    setRaised(to);

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplayRaised(to);
    } else {
      animateValue(from, to, 900, setDisplayRaised, frameRef);
    }

    setPopupAmount(amount);
  }

  useEffect(() => () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  }, []);

  const pct = Math.min(100, Math.round((displayRaised / VAN_FUND_GOAL) * 100));

  return (
    <div className="bg-[#1a2e1a] rounded-2xl overflow-hidden grid md:grid-cols-2 mb-10">
      <img
        src="/images/donate-the-van.jpg"
        alt="The ChatShack's Mobile Safe Space on Wheels"
        className="w-full h-56 md:h-full object-cover"
      />
      <div className="p-8 flex flex-col justify-center text-center md:text-left">
        <p className="text-amber-400 font-bold text-xs uppercase tracking-wide mb-2">
          What we're building towards
        </p>
        <h3 className="text-white font-black text-xl mb-3">The Van</h3>
        <p className="text-white/80 text-sm mb-5">
          The Van is the dream &mdash; taking access to those who need it, when they need it.
        </p>

        <div className="w-full h-4 bg-white/15 rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-[#1a7a4a] transition-[width] duration-200 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-baseline justify-center md:justify-start gap-2 mb-1">
          <span className="font-black text-2xl text-white">£{displayRaised.toLocaleString()}</span>
          <span className="text-white/60 text-sm">raised of £{VAN_FUND_GOAL.toLocaleString()} goal</span>
        </div>
        <p className="text-xs italic text-white/50 mb-5">
          £0 raised so far is the real total &mdash; nobody's donated towards the van yet. Try the
          buttons below to see how it'd fill up, then make it real.
        </p>

        <p className="text-white/70 text-xs font-bold uppercase tracking-wide mb-2">
          Add to the pot (demo)
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {VAN_ADD_AMOUNTS.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => addToPot(amount)}
              className="bg-white/10 hover:bg-amber-700 border border-white/30 hover:border-amber-700 text-white font-bold px-4 py-2 rounded-full text-sm transition-colors"
            >
              + £{amount}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {popupAmount !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setPopupAmount(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ type: "spring", duration: 0.35, bounce: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-7 max-w-sm w-full text-center relative shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setPopupAmount(null)}
                aria-label="Close"
                className="absolute top-3 right-3 text-[#6a6a6a] hover:text-[#1a3a2a]"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-[#1a7a4a]" />
              </div>
              <h4 className="font-black text-lg text-[#1a3a2a] mb-2">Love it, don't you?</h4>
              <p className="text-[#4a4a4a] text-sm mb-5">
                That was just a preview. Fancy making a real £{popupAmount} donation towards getting
                The Van on the road?
              </p>
              <button
                type="button"
                onClick={() => {
                  const amount = popupAmount;
                  setPopupAmount(null);
                  if (amount !== null) onDonate(amount);
                }}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold px-6 py-3 rounded-full transition-colors mb-2"
              >
                DONATE £{popupAmount} TOWARDS THE VAN
              </button>
              <button
                type="button"
                onClick={() => setPopupAmount(null)}
                className="text-sm text-[#6a6a6a] underline"
              >
                Maybe later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
              className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-7 py-3 rounded-full flex items-center gap-2 transition-colors"
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

      {/* DONATION IMPACT GUIDE */}
      <section className="bg-[#f5f0e8] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-amber-800 font-bold text-sm uppercase tracking-wide mb-2 text-center">
            Your Donation, Their Difference
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-[#1a3a2a] mb-3 text-center">
            Every Pound Helps Us Provide Support, Restore Hope &amp; Make Access Easier
          </h2>
          <p className="text-[#4a4a4a] max-w-2xl mx-auto mb-10 text-center">
            From a coffee and a conversation right through to a complete course of therapy, here's a
            real sense of what your donation could help us provide.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
            {impactTiers.map((tier) => (
              <div
                key={tier.amount}
                className="bg-white rounded-2xl overflow-hidden border border-amber-200 flex flex-col"
              >
                <img src={tier.image} alt={tier.imageAlt} className="w-full h-36 object-cover" />
                <div className="p-5 flex flex-col flex-1">
                  <div className="w-9 h-9 bg-[#1a7a4a]/10 rounded-full flex items-center justify-center mb-3">
                    <tier.icon className="w-4 h-4 text-[#1a7a4a]" />
                  </div>
                  <div className="font-black text-xl text-[#1a7a4a] mb-1">{tier.amount}</div>
                  <h3 className="font-black text-sm text-[#1a3a2a] mb-2">{tier.title}</h3>
                  <p className="text-xs text-[#4a4a4a] flex-1">{tier.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs italic text-[#6a6a6a] mb-12 text-center max-w-2xl mx-auto">
            Donation amounts are illustrative of the support your contribution could fund — actual
            costs depend on supplier prices and individual circumstances, with one exception: our
            £150 therapy figure is confirmed directly with our therapists and counsellors for a full
            course of 6 sessions. Donations may also be pooled to meet the most urgent needs, giving
            us the flexibility to help where it's needed most, even when a single donation doesn't
            cover an entire item or service.
          </p>

          <h3 className="font-black text-lg text-[#1a3a2a] mb-2 text-center">
            Other Donation Levels
          </h3>
          <p className="text-sm text-[#4a4a4a] max-w-xl mx-auto mb-6 text-center">
            A few more ways to contribute — without making smaller donations feel any less valuable.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {otherTiers.map((tier) => (
              <div key={tier.amount} className="bg-white rounded-xl border border-amber-200 p-5">
                <div className="font-black text-lg text-[#1a7a4a] mb-1">{tier.amount}</div>
                <h4 className="font-black text-sm text-[#1a3a2a] mb-2">{tier.title}</h4>
                <p className="text-xs text-[#4a4a4a]">{tier.text}</p>
              </div>
            ))}
          </div>

          {/* THE VAN */}
          <VanFundWidget
            onDonate={(amount) => {
              setSelectedAmount(amount);
              document.getElementById("give")?.scrollIntoView({ behavior: "smooth" });
            }}
          />

          {/* CLOSING MESSAGE */}
          <div className="bg-[#1a7a4a] rounded-2xl p-8 md:p-10 text-center text-white">
            <h3 className="font-black text-xl md:text-2xl mb-1">We don't just ask, "What's wrong?"</h3>
            <h3 className="font-black text-xl md:text-2xl mb-5">We ask, "What do you need?"</h3>
            <p className="text-white/90 max-w-2xl mx-auto mb-3 text-sm">
              At The ChatShack, we believe that nobody should be denied support because they cannot
              afford it, and nobody should have to face life's difficulties alone.
            </p>
            <p className="text-white/90 max-w-2xl mx-auto mb-3 text-sm">
              Your donation could help us provide a listening ear, a warm sleeping bag, essential
              everyday items or access to professional therapy when it matters.
            </p>
            <p className="font-bold mb-5">
              You don't have to change the whole world. Sometimes, changing one person's world is
              enough.
            </p>
            <p className="text-amber-300 font-black">Because you are NOT alone.</p>
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
          <p className="text-amber-800 font-bold text-sm uppercase tracking-wide mb-2">
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
                    ? "bg-amber-700 border-amber-700 text-white"
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
                  ? "bg-amber-700 border-amber-700 text-white"
                  : "bg-white/10 border-white/40 text-white hover:border-amber-400"
              }`}
            >
              Other
            </button>
          </div>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 bg-amber-700/60 text-white font-bold px-8 py-3.5 rounded-full text-lg cursor-not-allowed"
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
