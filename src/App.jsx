import { Routes, Route } from "react-router-dom";

import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Toaster } from "./components/admin-dashboard/ui/toaster";
import { Toaster as Sonner } from "./components/admin-dashboard/ui/sonner";
import { TooltipProvider } from "./components/admin-dashboard/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from "./pages/homepage/homepage";
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
import WebDevPage from "./pages/web-dev-page/web-dev-page";
import WebDevConsultationPage from "./pages/web-dev-consultation-page/web-dev-consultation-page";
import CollectionsPage from "./pages/collections-page/collections-page";

import ReferPage from "./pages/refer-page/refer-page";
import CommunityChallengePage from "./pages/community-challenge-page/community-challenge-page";
import JoinCommunityPage from "./pages/join-community-page/join-community-page";
import JobPage from "./pages/job-page/job-page";
import SustainabilityPage from "./pages/sustainability-page/sustainability-page";
import BlogPage from "./pages/sustainability-page/blog-page";
import MentorshipApplicationPage from "./pages/mentorship-application-page/mentorship-application-page";
import PostJobPage from "./pages/post-job-page/post-job-page";
import CartPage from "./pages/cart-page/cart-page";
import CheckoutPage from "./pages/checkout-page/checkout-page";
import AdminDashboardPage from "./pages/admin-dashboard-page/admin-dashboard-page";
import NotFound from "./pages/admin-dashboard-page/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            stacked
            role="alert"
            transition={Zoom}
          />
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<HomePage />} />
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
            <Route
              path="/services/web-and-mobile-dev"
              element={<WebDevPage />}
            />
            <Route
              path="/services/app-dev-consultation"
              element={<WebDevConsultationPage />}
            />
            <Route
              path="/services/our-collection"
              element={<CollectionsPage />}
            />

            <Route
              path="/apply-for-mentorship"
              element={<MentorshipApplicationPage />}
            />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/academy" element={<AcademyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/refer-and-earn" element={<ReferPage />} />
            <Route path="/workwithus" element={<BookCallPage />} />
            <Route
              path="/community-challenge"
              element={<CommunityChallengePage />}
            />
            <Route path="/join-our-community" element={<JoinCommunityPage />} />
            <Route path="/jobs" element={<JobPage />} />
            <Route path="/post-a-job" element={<PostJobPage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            <Route path="/sustainability/:blogId" element={<BlogPage />} />
            <Route path="/cart-summary" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
