// import React, { useContext, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Navbar, Nav, Container, NavDropdown, Spinner } from "react-bootstrap";
// import { AuthContext } from "../../context/AuthContext";

// export const MyHeader = ({ darkMode }) => {
//   // Now correctly using both user and loading states from AuthContext
//   const { user, logout, loading } = useContext(AuthContext);
//   const location = useLocation();
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <Navbar
//       expand="lg"
//       bg={darkMode ? "dark" : "light"}
//       variant={darkMode ? "dark" : "light"}
//       expanded={expanded}
//       onToggle={(val) => setExpanded(val)}
//       sticky="top"
//       className="shadow-sm"
//     >
//       <Container>
//         {/* Brand */}
//         <Navbar.Brand as={Link} to="/" className="book_management">
//           EduLib System
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="main-navbar" />

//         <Navbar.Collapse id="main-navbar">
//           <Nav className="me-auto">
//             <Nav.Link
//               as={Link}
//               to="/"
//               active={location.pathname === "/"}
//               onClick={() => setExpanded(false)}
//             >
//               Home
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/about-us"
//               active={location.pathname === "/about-us"}
//               onClick={() => setExpanded(false)}
//             >
//               About Us
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/contact-us"
//               active={location.pathname === "/contact-us"}
//               onClick={() => setExpanded(false)}
//             >
//               Contact Us
//             </Nav.Link>
//             <NavDropdown title="Services" id="services-menu">
//               <NavDropdown.Item
//                 as={Link}
//                 to="/add-book"
//                 onClick={() => setExpanded(false)}
//               >
//                 Add Book
//               </NavDropdown.Item>
//               <NavDropdown.Item
//                 as={Link}
//                 to="/book-details"
//                 onClick={() => setExpanded(false)}
//               >
//                 Book Details
//               </NavDropdown.Item>
//               <NavDropdown.Item
//                 as={Link}
//                 to="/browse-book"
//                 onClick={() => setExpanded(false)}
//               >
//                 Online Books
//               </NavDropdown.Item>
//               <NavDropdown.Item
//                 as={Link}
//                 to="/todo"
//                 onClick={() => setExpanded(false)}
//               >
//                 Todo List
//               </NavDropdown.Item>
//               <NavDropdown.Item
//                 as={Link}
//                 to="/news"
//                 onClick={() => setExpanded(false)}
//               >
//                 News
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>

//           {/* This is the corrected and stable rendering logic */}
//           <Nav className="ms-auto">
//             {loading ? (
//               <Spinner animation="border" size="sm" className="ms-2" />
//             ) : user ? (
//               <NavDropdown
//                 title={`Hi, ${
//                   user?.username || user?.name || user?.email || "User"
//                 }`}
//                 id="user-menu"
//                 align="end"
//               >
//                 <NavDropdown.Item
//                   as={Link}
//                   to="/profile"
//                   onClick={() => setExpanded(false)}
//                 >
//                   Profile
//                 </NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item
//                   onClick={() => {
//                     logout();
//                     setExpanded(false);
//                   }}
//                 >
//                   Logout
//                 </NavDropdown.Item>
//               </NavDropdown>
//             ) : (
//               <>
//                 <Nav.Link
//                   as={Link}
//                   to="/login"
//                   active={location.pathname === "/login"}
//                   onClick={() => setExpanded(false)}
//                 >
//                   Login
//                 </Nav.Link>
//                 <Nav.Link
//                   as={Link}
//                   to="/register"
//                   active={location.pathname === "/register"}
//                   className="btn btn-sm btn-primary text-white px-3 ms-2"
//                   onClick={() => setExpanded(false)}
//                 >
//                   Register
//                 </Nav.Link>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default MyHeader;
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const MyHeader = ({ darkMode }) => {
  const { user, logout, loading } = useContext(AuthContext);
  const location = useLocation();

  return (
    <header
      style={{
        background: darkMode ? "#222" : "#f8f9fa",
        color: darkMode ? "#fff" : "#000",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Brand */}
      <h2>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: darkMode ? "#fff" : "#000",
          }}
        >
          EduLib System
        </Link>
      </h2>

      {/* Navigation */}
      <nav>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "15px",
            margin: 0,
            padding: 0,
            alignItems: "center",
          }}
        >
          <li>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color:
                  location.pathname === "/"
                    ? "dodgerblue"
                    : darkMode
                    ? "#fff"
                    : "#000",
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              style={{
                textDecoration: "none",
                color:
                  location.pathname === "/about-us"
                    ? "dodgerblue"
                    : darkMode
                    ? "#fff"
                    : "#000",
              }}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact-us"
              style={{
                textDecoration: "none",
                color:
                  location.pathname === "/contact-us"
                    ? "dodgerblue"
                    : darkMode
                    ? "#fff"
                    : "#000",
              }}
            >
              Contact Us
            </Link>
          </li>
          {/* <li>
            <Link
              to="/book-details"
              style={{
                textDecoration: "none",
                color:
                  location.pathname === "/book-details"
                    ? "dodgerblue"
                    : darkMode
                    ? "#fff"
                    : "#000",
              }}
            >
              BookDetails
            </Link>
          </li>
          <li>
            <Link
              to="/browse-book"
              style={{
                textDecoration: "none",
                color:
                  location.pathname === "/browse-book"
                    ? "dodgerblue"
                    : darkMode
                    ? "#fff"
                    : "#000",
              }}
            >
              Online Books
            </Link>
          </li>
          <li>
            <Link
              to="/todo"
              style={{
                textDecoration: "none",
                color:
                  location.pathname === "/todo"
                    ? "dodgerblue"
                    : darkMode
                    ? "#fff"
                    : "#000",
              }}
            >
              Todo
            </Link>
          </li>
          <li>
            <Link
              to="/news"
              style={{
                textDecoration: "none",
                color:
                  location.pathname === "/news"
                    ? "dodgerblue"
                    : darkMode
                    ? "#fff"
                    : "#000",
              }}
            >
              News
            </Link>
          </li> */}

          {/* Auth Buttons */}
          {loading ? (
            <li>Loading...</li>
          ) : user ? (
            <>
              <li>
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    color: darkMode ? "#fff" : "#000",
                  }}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  style={{
                    border: "none",
                    background: "red",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: darkMode ? "#fff" : "#000",
                  }}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    background: "dodgerblue",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "4px",
                  }}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MyHeader;
