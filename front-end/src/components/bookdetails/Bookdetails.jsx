import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Addbook } from "../addbook/Addbook";
import { Spinner } from "react-bootstrap";

export const Bookdetails = () => {
  const [bookstore, setBookstore] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch all book details from the API
  const getAllBookDetails = async () => {
    try {
      const res = await axios.get(
        "https://bookmanagementsystem-9f70.onrender.com/api/books"
      );
      setBookstore(res.data.books || res.data);
    } catch (err) {
      console.error("Error fetching book details:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle book deletion
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // ✅ Corrected: using 'id' parameter instead of undefined 'bookId'
          const res = await axios.delete(
            `http://localhost:4004/api/books/${id}`
          );
          if (res.status === 200) {
            Swal.fire("Deleted!", "Book has been deleted.", "success");
            // Refresh the book list after successful deletion
            getAllBookDetails();
          }
        } catch (err) {
          Swal.fire("Error!", "Unable to delete book.", "error");
          console.error("Delete failed:", err);
        }
      }
    });
  };

  // The search functionality is now handled by filtering the existing state
  const filteredBooks = bookstore.filter((book) =>
    Object.values(book).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  useEffect(() => {
    getAllBookDetails();
  }, []);

  const renderFile = (fileName) => {
    const fileUrl = `https://bookmanagementsystem-9f70.onrender.com/uploads/${fileName}`;
    if (fileName?.endsWith(".pdf")) {
      return (
        <div>
          <iframe
            src={fileUrl}
            title="PDF Preview"
            width="100"
            height="80"
            style={{ border: "1px solid #ccc" }}
          />
          <br />
          <a
            href={fileUrl}
            download
            className="btn btn-sm btn-outline-primary mt-1"
          >
            Download PDF
          </a>
        </div>
      );
    } else {
      return <img src={fileUrl} alt="Book Cover" width="50" height="50" />;
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">📚 Book List</h3>
      <div className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group shadow-sm">
              <input
                type="text"
                placeholder="🔍 Search book by name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)} // ✅ Corrected search logic
                className="form-control form-control-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <table className="table table-bordered table-hover shadow">
            <thead className="table-dark">
              <tr>
                <th>Id</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Pages</th>
                <th>Price (₹)</th>
                <th>Edition</th>
                <th>Description</th>
                <th>File Preview</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.book_name}</td>
                  <td>{item.book_author}</td>
                  <td>{item.book_page_number}</td>
                  <td>{item.book_price}</td>
                  <td>{item.book_edition}</td>
                  <td>{item.book_description}</td>
                  <td>
                    {item.coverImage ? renderFile(item.coverImage) : "N/A"}
                  </td>
                  <td>
                    <Link to={`/edit/${item._id}`}>
                      <i className="bi bi-pencil-fill"></i>
                    </Link>
                    &nbsp;&nbsp;
                    <a href="#" onClick={() => handleDelete(item._id)}>
                      <i className="bi bi-trash-fill text-danger"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
