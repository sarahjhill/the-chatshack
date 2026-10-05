import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import AppLayout from "./pages/AppLayout.tsx";
import Index from "./pages/Index.tsx";
import DonatePage from "./pages/donate/DonatePage.tsx";
import NotFound from "./pages/NotFound.tsx";
import SafeguardingPage from "./pages/policies/SafeguardingPage.tsx";
import PrivacyPage from "./pages/policies/PrivacyPage.tsx";
import GdprPage from "./pages/policies/GdprPage.tsx";
import CodeOfConductPage from "./pages/policies/CodeOfConductPage.tsx";
import AboutPage from "./pages/site/AboutPage.tsx";
import SupportPage from "./pages/site/SupportPage.tsx";
import CommunityPage from "./pages/site/CommunityPage.tsx";
import HomelessOutreachPage from "./pages/site/HomelessOutreachPage.tsx";
import PartnersPage from "./pages/site/PartnersPage.tsx";
import GetInvolvedPage from "./pages/site/GetInvolvedPage.tsx";
import ContactPage from "./pages/site/ContactPage.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/safeguarding" element={<SafeguardingPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/gdpr" element={<GdprPage />} />
            <Route path="/code-of-conduct" element={<CodeOfConductPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/homeless-outreach" element={<HomelessOutreachPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/get-involved" element={<GetInvolvedPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DefaultProviders>
  );
}
