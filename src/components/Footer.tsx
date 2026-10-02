import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "I Need Support", path: "/support" },
  { label: "Our Community", path: "/community" },
  { label: "Donate", path: "/donate" },
  { label: "Homeless Outreach", path: "/homeless-outreach" },
  { label: "Partners & Resources", path: "/partners" },
  { label: "Get Involved", path: "/get-involved" },
  { label: "Contact", path: "/contact" },
  { label: "Privacy", path: "/privacy" },
  { label: "GDPR", path: "/gdpr" },
  { label: "Safeguarding", path: "/safeguarding" },
  { label: "Code of Conduct", path: "/code-of-conduct" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a2e1a] text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div className="flex-shrink-0">
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

          {/* Links */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-4 text-center text-white/50 text-xs">
          © {new Date().getFullYear()} The Chat Shack C.I.C. Registered in England & Wales. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
