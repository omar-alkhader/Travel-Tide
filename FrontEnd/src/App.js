import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import ProfileForm from "./components/ProfileForm";
import RatingForm from "./components/RatingForm";
import TripDetailsForm from "./components/TripDetailsForm";
import AboutPage from "./pages/AboutPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import PaymentPage from "./pages/PaymentPage";
import GuidePage from "./pages/GuidePage";
import Home from "./pages/Home";
import PackagePage from "./pages/PackagePage";
import RequestPage from "./pages/RequestPage";
import ChatPage from "./pages/ChatPage";
import FlightsPage from "./components/FlightsPage";
import HotelsPage from "./components/HotelsPage";
import TravelPackagePage from "./components/TravelPackagePage";
import Checkout from "./components/Checkout";
import PackageDetailsPage from "./components/PackageDetailsPage";
import Booking from "./components/Booking";

import ErrorPage from "./components/ErrorPage";
import PreLoader from "./components/PreLoader";
import ReviewPage from "./pages/ReviewPage"; 

import "./styles/global.css";
import "./styles/NavBar.css";
import "./styles/ProfilePage.css";
import "./styles/ReviewPage.css";
import "./styles/TripDetailsPage.css";
import "./styles/PaymentPage.css";
import "./styles/GuidePage.css";
import "./styles/HomePage.css";
import "./styles/PackagePage.css";
import "./styles/RequestPage.css";
import "./styles/preloader.css";
import "./styles/ErrorPage.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CityPage from "./pages/CityPage";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/package" element={<PackagePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route index element={<Home />} />
              <Route path="/guides" element={<GuidePage />} />
              <Route path="/request" element={<RequestPage />} />
              <Route path="/chat/:touristName" element={<ChatPage />} />
              <Route path="/home" element={<ProfileForm />} />
              <Route path="/pay" element={<PaymentPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/trip-details" element={<TripDetailsForm />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/flights" element={<FlightsPage />} />
              <Route path="/hotels" element={<HotelsPage />} />
              <Route path="/packages" element={<TravelPackagePage />} />
              <Route path="/cities" element={<CityPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/p" element={<PackageDetailsPage />} />
              <Route path="/p" element={<PackageDetailsPage />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/booking" element={<Booking />} />
              {/* <Route path="/turkey" element={<Turkey />} />
              <Route path="/egypt" element={<Egypt />} />
              <Route path="/cyprus" element={<Cyprus />} />
              <Route path="/jordan" element={<Jordan />} /> */}
            </Route>
          </Routes>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "blue",
                color: "red",
              },
            }}
          />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

