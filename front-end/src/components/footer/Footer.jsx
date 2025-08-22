import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export const Footer = ({ News }) => {
  return (
    <footer
      style={{
        marginTop: "5%",
        backgroundColor: "#111",
        color: "#f1f1f1",
        padding: "40px 0 20px",
        fontFamily: "sans-serif",
      }}
    >
      <div className="container-fluid px-4">
        <div className="row text-start text-md-left justify-content-center">
          {/* About Section */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">About EduLib</h5>
            <p>
              EduLib is a solo-built book hub 📚 to explore, learn, and manage
              your favorite reads. Built with 💖 and caffeine ☕ by Nitin ji.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              {[
                { name: "Home", to: "/" },
                { name: "TODO", to: "/todo" },
                { name: "Profile", to: "/profile" },
                { name: "Contact", to: "/contact-us" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-white text-decoration-none d-block py-1"
                    style={{ transition: "0.3s" }}
                    onMouseOver={(e) => (e.target.style.color = "#0dcaf0")}
                    onMouseOut={(e) => (e.target.style.color = "#fff")}
                  >
                    ➤ {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info + Socials */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Connect With Me</h5>
            <p>
              <strong>Email:</strong> nitincreationofficial@gmail.com <br />
              <strong>Phone:</strong> +91 9876543210 <br />
              <strong>Location:</strong> BBD University, Lucknow 📍
            </p>
            <div className="d-flex gap-3 mt-2">
              <a
                href="https://www.linkedin.com/in/nitin-modanwal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/Nitinm68"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="mailto:nitin@edulib.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
        </div>

        <hr className="text-white" />
        <div className="text-center mt-3">
          <p className="mb-0">
            Made with{" "}
            <span style={{ color: "red", animation: "pulse 1s infinite" }}>
              ♥
            </span>{" "}
            by Nitin | © 2025 EduLib.
          </p>
        </div>
      </div>

      {/* Heart animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </footer>
  );
};
