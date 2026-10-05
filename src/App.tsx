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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DefaultProviders>
  );
}
