import { Link } from "react-router-dom";

const footerGroups: { heading: string; links: { label: string; path: string }[] }[] = [
  {
    heading: "Get Help",
    links: [
      { label: "I Need Support", path: "/support" },
      { label: "Homeless Outreach", path: "/homeless-outreach" },
      { label: "Partners & Resources", path: "/partners" },
    ],
  },
  {
    heading: "About Us",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Our Community", path: "/community" },
      { label: "Get Involved", path: "/get-involved" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    heading: "Policies",
    links: [
      { label: "Safeguarding", path: "/safeguarding" },
      { label: "Privacy", path: "/privacy" },
      { label: "GDPR", path: "/gdpr" },
      { label: "Code of Conduct", path: "/code-of-conduct" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a2e1a] text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="flex-shrink-0 md:max-w-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center overflow-hidden">
                <img src="/images/chatshack-logo.png" alt="The Chat Shack logo" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <div className="font-black text-white text-base leading-tight">THE CHAT SHACK C.I.C.</div>
                <div className="text-xs text-white/70 leading-tight">Peer-led Mental Health Support</div>
                <div className="text-xs text-white/70 leading-tight">Community for 18+</div>
              </div>
            </div>
            <a
              href="https://facebook.com/TheChatShack"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white text-sm mt-2"
            >
              <span className="text-blue-400 font-bold text-sm">f</span>
              @TheChatShack
            </a>
            <p className="text-sm italic text-white/60 mt-2">"You are not alone."</p>
          </div>

          {/* Link groups */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerGroups.map((group) => (
              <div key={group.heading}>
                <h3 className="text-amber-400 font-bold text-xs uppercase tracking-wide mb-3">
                  {group.heading}
                </h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-white/70 hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/20 mt-8 pt-4 text-center text-white/50 text-xs">
          <span>© {new Date().getFullYear()} The Chat Shack C.I.C. Registered in England & Wales. All rights reserved.</span>
          <Link to="/" className="text-white/50 hover:text-white/80 transition-colors">
            Home
          </Link>
        </div>
      </div>
    </footer>
  );
}
