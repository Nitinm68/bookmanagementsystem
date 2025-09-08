import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap"; // Import Spinner from react-bootstrap
import { AuthContext } from "../../context/AuthContext.jsx";

export const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(true); // State to handle loading
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear user from context/session
    navigate("/login"); // redirect to login after logout
  };
  useEffect(() => {
    // Start loading
    setLoading(true);

    // Fetch all books from the API
    axios
      .get("https://bookmanagementsystem-9f70.onrender.com/api/books")
      .then((res) => {
        const booksData = res.data;
        setTotalBooks(booksData.length); // Get the total count
        const recentBooks = booksData.slice(-3).reverse(); // Get the latest 3 books
        setBooks(recentBooks);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        // In a real app, you might set an error state here
      })
      .finally(() => {
        setLoading(false); // Stop loading regardless of success or failure
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">📚 Welcome to EduLib</h1>
        <p className="lead text-muted">
          Explore, Manage, and Grow your library collection with ease!
        </p>
        <Link to="/profile" className="btn btn-secondary btn-lg m-2">
          profile
        </Link>
        {/* <Link to="/logout" className="btn btn-success btn-lg m-2">
          Logout
        </Link> */}

        <button onClick={handleLogout} className="btn btn-success btn-lg m-2">
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row text-center mb-5">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">📘 Total Books</h5>
              <p className="card-text fs-4">{totalBooks}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">👩‍🏫 Authors</h5>
              <p className="card-text fs-4">12+</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">⭐ User Reviews</h5>
              <p className="card-text fs-4">4.8 / 5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Rendering for Loading or No Books */}
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : books.length > 0 ? (
        <>
          {/* Latest Books Preview */}
          <h3 className="mb-3 text-center">📖 Latest Books</h3>
          <div className="row">
            {books.map((book) => (
              <div className="col-md-4 mb-4" key={book._id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{book.book_name}</h5>
                    <p className="card-text">
                      <strong>Author:</strong> {book.book_author}
                      <br />
                      <strong>Edition:</strong> {book.book_edition}
                      <br />
                      <strong>Price:</strong> ₹{book.book_price}
                    </p>
                    <p className="card-text text-truncate">
                      {book.book_description}
                    </p>
                    <Link
                      to={`/book-details/${book._id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-muted fs-5 my-5">
          No books found. Add a new book to get started!
        </p>
      )}
    </div>
  );
};

export default Dashboard;
