import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Footer } from "./components/footer/Footer";
import { Dashboard } from "./components/dashboard/Dashboard";
import { About } from "./components/about/About";
import Contacts from "./components/contact/Contact.jsx";
import Login from "./components/pages/login.jsx";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile.jsx";
import { Pagenotfound } from "./components/pagenotfound/Pagenotfound";
import { Addbook } from "./components/addbook/Addbook.jsx";
import { Bookdetails } from "./components/bookdetails/Bookdetails";
import { Edit } from "./components/edit/Edit";
import { OnlineBooksPagination } from "./components/pagination/Pagination";
// import Signup from "./components/login/Signup.jsx";
import Catalog from "./components/TODO/Todo.jsx";
import News from "./components/news/News.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
// import { useAuth } from "./context/AuthContext.jsx";
import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";
import MyHeader from "./components/header/MyHeader.jsx";
import Notes from "./components/notes/Notes.jsx"; // Import notes route

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Toggle body class based on dark mode
  useEffect(() => {
    document.body.className = darkMode
      ? "bg-dark text-light"
      : "bg-light text-dark";
  }, [darkMode]);

  // Show back to top button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 🌙 Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="btn btn-sm btn-secondary position-fixed bottom-0 end-0 m-3 z-3"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* 🔝 Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="btn btn-info position-fixed bottom-0 end-0 m-4"
          style={{ zIndex: 999 }}
        >
          🔝
        </button>
      )}

      {/* 🔁 Your App Routing */}
      <BrowserRouter>
        <AuthProvider>
          <MyHeader darkMode={darkMode} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/book-details/:id" element={<Bookdetails />} />
            <Route
              path="/notes"
              element={
                <PrivateRoute>
                  <Notes />
                </PrivateRoute>
              }
            />
            <Route path="/about-us" element={<About />} />
            <Route
              path="/contact-us"
              element={
                <PrivateRoute>
                  <Contacts />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-book"
              element={
                <PrivateRoute>
                  <Addbook />
                </PrivateRoute>
              }
            />

            <Route path="/browse-book" element={<OnlineBooksPagination />} />
            <Route path="/book-details" element={<Bookdetails />} />
            <Route path="/edit/:id" element={<Edit />} />

            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/todo" element={<Catalog />} />
            <Route path="/news" element={<News />} />
            {/* Add more routes as needed */}

            {/* Catch-all route for 404 */}
            <Route path="*" element={<Pagenotfound />} />
          </Routes>

          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
