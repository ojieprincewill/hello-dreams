import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage";
import ServicesPage from "./pages/services-page/servicespage";
import PortfolioPage from "./pages/portfolio-page/portfolio-page";
import AcademyPage from "./pages/academy-page/academy-page";
import AboutPage from "./pages/about-page/about-page";
import BookCallPage from "./pages/book-call-page/book-call-page";
import UiDesignPage from "./pages/ui-design-page/ui-design-page";
import UiConsultationPage from "./pages/ui-consultation-page/ui-consultation-page";
import CvOptimizationPage from "./pages/cv-optimization-page/cv-optimzation-page";
import OptimizeProfilePage from "./pages/optimize-profile-page/optimize-profile-page";
import PrintingPage from "./pages/printing-page/printing-page";
import PrintingConsultationPage from "./pages/printing-consultation-page/printing-consultation-page";
import SocialManagementPage from "./pages/social-management-page/social-management-page";
import SocialConsultationPage from "./pages/social-consultation-page/social-consultation-page";
import GraphicsDesignPage from "./pages/graphics-design-page/graphics-design-page";
import GraphicsConsultationPage from "./pages/graphics-consultation-page/graphics-consultation-page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/ui-design" element={<UiDesignPage />} />
        <Route
          path="/services/ui-design-consultation"
          element={<UiConsultationPage />}
        />
        <Route
          path="/services/cv-optimization"
          element={<CvOptimizationPage />}
        />
        <Route
          path="/services/optimize-profile"
          element={<OptimizeProfilePage />}
        />
        <Route path="/services/printing" element={<PrintingPage />} />
        <Route
          path="/services/printing-consultation"
          element={<PrintingConsultationPage />}
        />
        <Route
          path="/services/social-management"
          element={<SocialManagementPage />}
        />
        <Route
          path="/services/social-consultation"
          element={<SocialConsultationPage />}
        />
        <Route
          path="/services/graphics-design"
          element={<GraphicsDesignPage />}
        />
        <Route
          path="/services/graphics-consultation"
          element={<GraphicsConsultationPage />}
        />

        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/academy" element={<AcademyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/workwithus" element={<BookCallPage />} />
      </Routes>
    </>
  );
}

export default App;
