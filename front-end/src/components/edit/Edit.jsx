import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"; // ✅ Added Link import

export const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    book_name: "",
    book_author: "",
    book_page_number: "",
    book_price: "",
    book_edition: "",
    book_description: "",
  });

  // Function to fetch book data by ID
  const getDataById = async () => {
    try {
      const res = await axios.get(
        "https://bookmanagementsystem-9f70.onrender.com/api/books/" + id
      );
      console.log(res);
      setBook(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle the form submission for editing a book
  const handleEdit = async (e) => {
    try {
      e.preventDefault();
      // ✅ Corrected: The 'book' state object is correctly sent in the PUT request
      const updateRes = await axios.put(
        "https://bookmanagementsystem-9f70.onrender.com/api/books/" + id,
        book
      );
      console.log(updateRes);
      if (updateRes.status === 200 || updateRes.statusText === "OK") {
        navigate("/book-details"); // Redirect after successful update
      }
    } catch (err) {
      // It's a good practice to handle the error here, even if it's just logging
      console.error("Error updating book:", err);
    }
  };

  // Handler for form input changes
  const handler = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  // Fetch book data on component mount
  useEffect(() => {
    window.scrollTo(500, 0);
    getDataById();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="container mt-5">
              <div className="card shadow-lg rounded-4 p-4">
                <h3 className="text-center text-primary mb-4">
                  <i className="bi bi-journal-bookmark-fill me-2" /> Edit Book
                  Details
                </h3>
                <form onSubmit={handleEdit}>
                  {/* Book Name */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Book Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={book.book_name}
                      name="book_name"
                      onChange={handler}
                    />
                  </div>
                  {/* Book Author */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Author</label>
                    <input
                      type="text"
                      className="form-control"
                      value={book.book_author}
                      name="book_author"
                      onChange={handler}
                    />
                  </div>
                  {/* Page Number */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Page Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={book.book_page_number}
                      name="book_page_number"
                      onChange={handler}
                    />
                  </div>
                  {/* Price */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={book.book_price}
                      name="book_price"
                      onChange={handler}
                    />
                  </div>
                  {/* Edition */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Edition</label>
                    <input
                      type="text"
                      className="form-control"
                      value={book.book_edition}
                      name="book_edition"
                      onChange={handler}
                    />
                  </div>
                  {/* Description */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Enter book description"
                      name="book_description"
                      onChange={handler}
                      value={book.book_description} // ✅ Removed defaultValue, using value
                    />
                  </div>
                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-success px-4 rounded-pill"
                    >
                      <i className="bi bi-check-circle-fill me-1" /> Edit Book
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  );
};
