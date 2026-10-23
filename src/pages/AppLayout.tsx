import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";

export default function AppLayout() {
  const location = useLocation();

  // React Router doesn't scroll for us on navigation. Without this, clicking
  // a link to another page (e.g. "/partners#partner-application" from far
  // down the Donate page) leaves the browser at the same scroll position it
  // was at before - which can land partway down the new page, or even past
  // the thing you were trying to reach. This scrolls to the target section
  // when there's a #hash in the link, or back to the top otherwise.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (!el) return false;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      };
      if (!scrollToTarget()) {
        // The target section may not have painted yet on first render.
        const timer = setTimeout(scrollToTarget, 80);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
