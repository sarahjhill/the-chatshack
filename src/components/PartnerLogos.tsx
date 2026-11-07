import { Coffee, ExternalLink } from "lucide-react";
import Marquee from "@/components/Marquee.tsx";

// The partners shown in the sliding logo row (Partners & Resources page and homepage).
// To add a partner: put a square logo in public/images/partners/ and add an entry below.
type Partner = {
  name: string;
  logo?: string;
  url?: string;
  linkLabel?: string;
  intro: string;
};

const PARTNERS: Partner[] = [
  {
    name: "sarahjhill.com",
    logo: "/images/partners/sarahjhill.webp",
    url: "https://sarahjhill.com",
    linkLabel: "sarahjhill.com",
    intro:
      "Websites and digital tools for Cardiff charities, community groups and small businesses. Sarah built The ChatShack's website to help more people find support.",
  },
  {
    name: "Tesco Extra Gabalfa",
    logo: "/images/partners/tesco-extra.svg",
    intro: "Hosts our Tuesday evening groups in the Community Space upstairs. Come along for a coffee, some food and a chat.",
  },
  {
    name: "Behind Every Mask (B.E.M.)",
    logo: "/images/partners/behind-every-mask.webp",
    url: "https://bem-crisis.app/emergency",
    linkLabel: "bem-crisis.app",
    intro:
      "A crisis referral and wellbeing app connecting people of any age, anywhere in the world, with support. Compassion without judgement.",
  },
  {
    name: "Many Downs, Time to Get Up",
    logo: "/images/partners/many-downs.webp",
    url: "https://www.facebook.com/photo/?fbid=749484210552232&set=a.412773190890004",
    linkLabel: "Facebook",
    intro:
      "A Cardiff mental health and suicide prevention community group: tackling stigma, signposting, support and events.",
  },
  {
    name: "People Against Intentional Neglect (P.A.I.N)",
    logo: "/images/partners/pain.webp",
    url: "https://www.peopleagainstintentionalneglect.org",
    linkLabel: "peopleagainstintentionalneglect.org",
    intro:
      "A support and advocacy network standing up for people who've been let down by the systems meant to protect them.",
  },
  {
    name: "Harmony Harbour UK",
    logo: "/images/partners/harmony-harbour.webp",
    url: "https://www.harmonyharbour.co.uk",
    linkLabel: "harmonyharbour.co.uk",
    intro:
      "A suicide prevention and mental health support service, working alongside B.E.M. and P.A.I.N - a safe harbour for brighter tomorrows.",
  },
];

function PartnerCard({ partner, hidden }: { partner: Partner; hidden: boolean }) {
  const body = (
    <>
      <div className="flex items-center gap-3 mb-3">
        {partner.logo ? (
          <img
            src={partner.logo}
            alt={hidden ? "" : `${partner.name} logo`}
            className="w-16 h-16 rounded-xl object-cover bg-white border border-amber-200 flex-shrink-0"
            loading="lazy"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-[#1a7a4a]/10 flex items-center justify-center flex-shrink-0">
            <Coffee className="w-7 h-7 text-[#1a7a4a]" />
          </div>
        )}
        <div className="min-w-0">
          <p className="font-black text-[#1a3a2a] leading-tight">{partner.name}</p>
          {partner.linkLabel && (
            <p className="text-sm font-bold text-[#1a7a4a] inline-flex items-center gap-1 group-hover:underline">
              {partner.linkLabel}
              <ExternalLink className="w-3.5 h-3.5" />
            </p>
          )}
        </div>
      </div>
      <p className="text-sm text-[#4a4a4a] leading-snug whitespace-normal">{partner.intro}</p>
    </>
  );

  const cardClass =
    "group block w-72 h-full bg-white rounded-2xl p-5 shadow-sm border border-amber-200 text-left";

  return partner.url ? (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={hidden ? -1 : undefined}
      className={`${cardClass} hover:border-[#1a7a4a] transition-colors`}
    >
      {body}
    </a>
  ) : (
    <div className={cardClass}>{body}</div>
  );
}

export default function PartnerLogos({ className = "" }: { className?: string }) {
  return (
    <Marquee
      items={PARTNERS}
      getKey={(p) => p.name}
      label="Our partners"
      duration={45}
      repeat={2}
      reverse
      className={className}
      renderItem={(partner, hidden) => <PartnerCard partner={partner} hidden={hidden} />}
    />
  );
}
