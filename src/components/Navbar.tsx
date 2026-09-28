import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils.ts";

const WOOD_BG = "https://hercules-cdn.com/file_nZ6cZnPvtWy25wdmcejj9mFG";

type NavItem = {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
};

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  {
    label: "Our Services",
    path: "/support",
    children: [
      { label: "I Need Support", path: "/support" },
      { label: "Homeless Outreach", path: "/homeless-outreach" },
      { label: "Partners & Resources", path: "/partners" },
    ],
  },
  {
    label: "Our Community",
    path: "/community",
    children: [
      { label: "Our Community", path: "/community" },
      { label: "Get Involved", path: "/get-involved" },
      { label: "Contact", path: "/contact" },
    ],
  },
  { label: "Donate", path: "/donate" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  function isActive(item: NavItem) {
    if (location.pathname === item.path) return true;
    return item.children?.some((c) => location.pathname === c.path) ?? false;
  }

  return (
    <header
      className="sticky top-0 z-50 shadow-lg"
      style={{
        backgroundImage: `url(${WOOD_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Lighten to oak shade */}
      <div className="absolute inset-0 bg-amber-100/30" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Main bar */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-2xl">🏠</span>
            </div>
            <div>
              <div className="font-black text-white text-lg leading-tight tracking-tight drop-shadow-md">
                THE CHAT SHACK
              </div>
              <div className="text-xs text-white/80 leading-tight drop-shadow-sm">
                Peer-led Mental Health Support
              </div>
              <div className="text-xs text-white/80 leading-tight drop-shadow-sm">
                Community Group for 18+
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-black/25 rounded-full px-2 py-1">
            {navItems.map((item) =>
              item.children ? (
                <DropdownNav key={item.label} item={item} active={isActive(item)} />
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-3 py-1.5 rounded font-bold text-sm transition-colors",
                    isActive(item)
                      ? "text-amber-300 underline underline-offset-4 decoration-2"
                      : "text-white hover:text-amber-300"
                  )}
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              to="/support"
              className="ml-4 bg-[#1a7a4a] hover:bg-[#156039] text-white font-bold px-5 py-2 rounded-full flex items-center gap-2 text-sm transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              I NEED SUPPORT
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-white/20 pt-3 space-y-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-2 rounded-md font-semibold text-sm transition-colors",
                      isActive(item)
                        ? "bg-white/25 text-white"
                        : "text-white/90 hover:bg-white/15 hover:text-white"
                    )}
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                    }
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        mobileExpanded === item.label && "rotate-180"
                      )}
                    />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={cn(
                            "block px-4 py-1.5 rounded-md text-sm transition-colors",
                            location.pathname === child.path
                              ? "bg-white/25 text-white font-semibold"
                              : "text-white/80 hover:bg-white/15 hover:text-white"
                          )}
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block px-4 py-2 rounded-md font-semibold text-sm transition-colors",
                    location.pathname === item.path
                      ? "bg-white/25 text-white"
                      : "text-white/90 hover:bg-white/15 hover:text-white"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              to="/support"
              className="flex items-center gap-2 bg-[#1a7a4a] text-white font-bold px-4 py-2 rounded-full text-sm mt-2 w-fit"
              onClick={() => setMobileOpen(false)}
            >
              <MessageCircle className="w-4 h-4" />
              I NEED SUPPORT
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

function DropdownNav({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        className={cn(
          "px-3 py-1.5 rounded font-bold text-sm transition-colors flex items-center gap-1",
          active
            ? "text-amber-300 underline underline-offset-4 decoration-2"
            : "text-white hover:text-amber-300"
        )}
        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <ChevronDown
          className={cn("w-3.5 h-3.5 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl border py-1 min-w-[200px]">
          {item.children?.map((child) => (
            <Link
              key={child.path}
              to={child.path}
              className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
