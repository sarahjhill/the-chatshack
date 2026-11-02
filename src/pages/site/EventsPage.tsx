import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  CalendarHeart,
  Home,
  Users,
  Footprints,
  Tent,
  HandHeart,
  Lightbulb,
  Quote,
} from "lucide-react";
import PageHero from "@/components/PageHero.tsx";
import PageMeta from "@/components/PageMeta.tsx";
import { usePageContent } from "@/lib/pageContent.ts";
import PosterLightbox from "@/components/PosterLightbox.tsx";

// Hero background photo for this page. Replace with a real photo (keep the
// same file name) and it updates here automatically.
const HERO_IMAGE = "/images/events/events-hero.jpg";

type TimelineStop = {
  tag: string;
  title: string;
  icon: typeof Home;
  body: string;
  images: { src: string; alt: string }[];
  link?: { to: string; label: string };
};

const TIMELINE: TimelineStop[] = [
  {
    tag: "Every Monday evening",
    title: "Homeless Mental Health Support Team",
    icon: Home,
    body: "Our outreach team is out in Cardiff city centre every Monday evening, giving advice and support to the most vulnerable. If you'd like to help us out, or feel your own homeless service could use us, get in touch.",
    images: [{ src: "/images/events/homeless-monday-poster.webp", alt: "Homeless Mental Health Support Team - every Monday evening poster" }],
    link: { to: "/homeless-outreach", label: "More about our outreach" },
  },
  {
    tag: "Every Tuesday, 6.30pm – 8.30pm",
    title: "In-person groups — alternating Men's & Women's",
    icon: Users,
    body: "We always try to make the distribution of resources fair to everyone, so our Tuesday groups alternate week to week — a Men's Group one week, a Women's Group the next. This is YOUR group, so every session can look a little different: coloring and quiet chat one week, a structured discussion the next.",
    images: [
      { src: "/images/events/mens-walk-talk-poster.webp", alt: "Men's Walk & Talk event poster — childhood trauma discussion" },
      { src: "/images/events/womens-support-poster.webp", alt: "Women's Support Group poster — We Can Not Heal In The Place That Made Us Sick" },
      { src: "/images/events/mens-meet-greet-poster.webp", alt: "Men's Meet & Greet social networking event poster" },
      { src: "/images/events/ladies-colouring-poster.webp", alt: "Ladies 18+ Mindful Colouring Group poster" },
    ],
  },
  {
    tag: "Other Tuesdays in the month",
    title: "Community Walk & Talk",
    icon: Footprints,
    body: "On any other Tuesday available that month, we bring the whole community together for a Walk & Talk Event. These are priceless — they build more connections than the groups alone, and we invite some of our partners along to explain how they can help you.",
    images: [{ src: "/images/events/community-walk-talk-poster.webp", alt: "Community Walk 'n' Talk event poster — open to all" }],
  },
];

const GALLERY = [
  { src: "/images/events/world-mental-health-day-poster.webp", alt: "World Mental Health Day poster — We are here for you, when you need us" },
  { src: "/images/events/events-group-photo-1.jpg", alt: "Members of The ChatShack community around the table at a group session" },
  { src: "/images/events/events-group-photo-2.webp", alt: "Members chatting together at a ChatShack group session" },
  { src: "/images/events/events-team-photo.jpg", alt: "The ChatShack outreach team" },
];

export default function EventsPage() {
  const content = usePageContent("events");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div className="min-h-screen">
      <PageMeta
        title="Our Groups & Events"
        description="How The Chat Shack's groups work, when they run, and what's coming up — including our Sleep Out to Help Out Christmas event."
      />
      <PageHero
        image={content.hero?.image || HERO_IMAGE}
        icon={CalendarHeart}
        eyebrow={content.hero?.eyebrow || "Activities & calendar"}
        title={content.hero?.title || "Our Groups & Events"}
        subtitle={content.hero?.subtitle || "Real people, real support — every week, in person, no judgement."}
      />

      {/* Intro */}
      <section className="bg-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-[#4a4a4a] text-lg leading-relaxed">
            Here at The ChatShack, we always try to provide as many different types of groups as we
            can, for the men, and for the ladies. It's an absolute impossibility to say exactly what
            we'll be doing 100% of the time between now and Christmas — because every group looks a
            little different, and that's exactly the point. Below is how it all fits together: how the
            groups run, when they're on, and how varied each one can be.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#f5f0e8] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center text-2xl md:text-3xl font-black text-[#1a3a2a] mb-2">
            A Week With The ChatShack
          </h2>
          <p className="text-center text-[#4a4a4a] mb-14">Here's the rhythm — week in, week out.</p>

          <div className="relative">
            {/* The connecting line */}
            <div
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#1a7a4a]/25 -translate-x-1/2"
              aria-hidden="true"
            />
            <div
              className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-[#1a7a4a]/25"
              aria-hidden="true"
            />

            <div className="space-y-12 md:space-y-20">
              {TIMELINE.map((stop, i) => {
                const Icon = stop.icon;
                const reverse = i % 2 === 1;
                return (
                  <motion.div
                    key={stop.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className={`relative md:flex items-start gap-10 ${reverse ? "md:flex-row-reverse" : ""}`}
                  >
                    {/* Node icon */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 w-12 h-12 rounded-full bg-[#1a7a4a] border-4 border-[#f5f0e8] flex items-center justify-center shadow-md z-10">
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Content card */}
                    <div className="pl-20 md:pl-0 md:w-1/2">
                      <div className={`bg-white rounded-2xl p-6 shadow-sm border border-amber-100 ${reverse ? "md:mr-10" : "md:ml-10"}`}>
                        <p className="text-[#1a7a4a] font-bold text-sm uppercase tracking-wide mb-1">
                          {stop.tag}
                        </p>
                        <h3 className="text-xl font-black text-[#1a3a2a] mb-3">{stop.title}</h3>
                        <p className="text-[#4a4a4a] mb-4">{stop.body}</p>

                        {stop.images.length > 0 && (
                          <div className={`grid gap-3 mb-4 ${stop.images.length > 1 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1 max-w-[200px]"}`}>
                            {stop.images.map((img) => (
                              <button
                                key={img.src}
                                type="button"
                                onClick={() => setLightbox(img)}
                                className="rounded-lg overflow-hidden border border-amber-200 hover:border-[#1a7a4a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
                              >
                                <img src={img.src} alt={img.alt} className="w-full h-full object-cover aspect-[2/3]" loading="lazy" />
                              </button>
                            ))}
                          </div>
                        )}

                        {stop.link && (
                          <Link
                            to={stop.link.to}
                            className="inline-flex text-[#1a7a4a] font-bold text-sm underline underline-offset-2 hover:text-[#156039]"
                          >
                            {stop.link.label} →
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sleep Out to Help Out - highlighted */}
      <section className="relative bg-[#0b2a1d] py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/events/sleep-out-poster.jpg)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <button
              type="button"
              onClick={() =>
                setLightbox({ src: "/images/events/sleep-out-poster.jpg", alt: "Sleep Out to Help Out poster — this Christmas, we're sleeping out so others don't have to. Please donate." })
              }
              className="rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400/30 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <img
                src="/images/events/sleep-out-poster.jpg"
                alt="Sleep Out to Help Out poster — this Christmas, we're sleeping out so others don't have to. Please donate."
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Tent className="w-6 h-6 text-amber-400" />
                <p className="text-amber-400 font-bold uppercase tracking-wide text-sm">This Christmas</p>
              </div>
              <h2 className="text-white font-black text-3xl mb-4">Sleep Out to Help Out</h2>
              <p className="text-white/85 mb-5 leading-relaxed">
                This Christmas, we're sleeping out — so others don't have to. It's the one thing
                happening between now and Christmas that we know for certain, and it comes with real
                personal sacrifice.
              </p>

              <div className="bg-white/10 border border-amber-400/30 rounded-xl p-5 mb-6">
                <Quote className="w-6 h-6 text-amber-400 mb-2" />
                <p className="text-white/90 italic leading-relaxed mb-3">
                  "I won't see my kids on Christmas morning. Town will be pretty dead that week —
                  isolation, and being in town, is a massive issue for me personally. I spent years
                  using in town, so it's going to be an uncomfortable week. But that discomfort is the
                  point — so that someone else doesn't have to face it alone."
                </p>
                <p className="text-amber-400 font-bold text-sm">— Scott, Founder, The ChatShack</p>
              </div>

              <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0b2a1d] font-black px-7 py-3.5 rounded-full transition-colors shadow-lg"
              >
                <HandHeart className="w-5 h-5" />
                Please donate
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Variety gallery */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center text-2xl md:text-3xl font-black text-[#1a3a2a] mb-2">
            Every Group Is Different
          </h2>
          <p className="text-center text-[#4a4a4a] mb-10 max-w-2xl mx-auto">
            A flavour of what our sessions and events have looked like — because no two Tuesdays are
            ever quite the same.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {GALLERY.map((img) => (
              <motion.button
                key={img.src}
                type="button"
                onClick={() => setLightbox(img)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4 }}
                className="rounded-xl overflow-hidden border border-amber-200 hover:border-[#1a7a4a] hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]"
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover aspect-square" loading="lazy" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Suggestions CTA */}
      <section className="bg-[#f5f0e8] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Lightbulb className="w-10 h-10 text-[#1a7a4a] mx-auto mb-3" />
          <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">Got an idea for a group?</h2>
          <p className="text-[#4a4a4a] mb-6">
            We're always open to suggestions for group ideas — after all, this is YOUR group. If you
            have an idea, or would like to help run your own group, get in touch and we'll get back to
            you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-7 py-3 rounded-full transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Closing banner */}
      <section className="bg-[#1a3a2a] py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-white/90 leading-relaxed mb-3">
            Remember, The ChatShack IS built on lived experiences, being shared by US, to give YOU the
            best options, to get the best version of YOU possible.
          </p>
          <p className="text-amber-400 font-black text-2xl">You are NOT alone.</p>
          <p className="text-white/60 text-sm mt-4">— The ChatShack</p>
        </div>
      </section>

      {lightbox && (
        <PosterLightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}

    </div>
  );
}
