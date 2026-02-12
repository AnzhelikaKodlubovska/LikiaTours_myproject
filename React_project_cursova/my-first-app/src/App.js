import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import SocialBar from "./components/common/SocialBar";

import HomePage from "./pages/HomePage";
import DestinationsPage from "./pages/DestinationsPage";
import TourDetailsPage from "./pages/TourDetailsPage";
import FAQPage from "./pages/FAQPage";
import Reviews from "./pages/Reviews";
import ContactsPage from "./pages/ContactsPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/common/PrivateRoute";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import AuthPage from "./pages/AuthPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import AdminPage from "./pages/AdminPage";

import "./styles/variables.css";
import "./styles/global.css";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  return (
    <div className="App">
      {!isAuthPage && <Header />}
      {!isAuthPage && <SocialBar />}

      <main>
        <Routes>
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly={true}>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/tour/:id" element={<TourDetailsPage />} />
          <Route path="/faq" element={<FAQPage />} />

          {/* ✅ Головний маршрут для відгуків тепер веде на об'єднаний файл */}
          <Route path="/reviews" element={<Reviews />} />

          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book" element={<Booking />} />

          {/* ❌ Маршрут /review-form видалено, бо форма тепер всередині /reviews */}

          <Route path="/auth" element={<AuthPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
