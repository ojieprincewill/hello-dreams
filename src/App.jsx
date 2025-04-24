import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage";
import ServicesPage from "./pages/services-page/servicespage";
import PortfolioPage from "./pages/portfolio-page/portfolio-page";
import AcademyPage from "./pages/academy-page/academy-page";
import AboutPage from "./pages/about-page/about-page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/academy" element={<AcademyPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
