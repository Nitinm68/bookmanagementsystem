import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const Addbook = () => {
  // State to hold book details
  const [book, setBook] = useState({
    title: "",
    author: "",
    book_page_number: "",
    book_price: "",
    book_edition: "",
    description: "",
    coverImage: "",
  });

  // State to hold the uploaded file
  const [file, setFile] = useState(null);

  // Handler for text input changes
  const handler = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  // Handler for file input changes
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use FormData to correctly send both text fields and the file
      const formData = new FormData();
      formData.append("title", book.title);
      formData.append("author", book.author);
      formData.append("book_page_number", book.book_page_number);
      formData.append("book_price", book.book_price);
      formData.append("book_edition", book.book_edition);
      formData.append("description", book.description);

      // Append the file if it exists
      if (file) {
        formData.append("coverImage", file);
      }

      const response = await axios.post(
        "https://bookmanagementsystem-9f70.onrender.com/api/books",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.statusText === "ok"
      ) {
        toast.success(response.data.message || "Book added successfully!");

        // Reset the form after successful submission
        setBook({
          title: "",
          author: "",
          book_page_number: "",
          book_price: "",
          book_edition: "",
          description: "",
          coverImage: "",
        });
        setFile(null); // Reset the file state as well
      }
    } catch (err) {
      console.error("Full error response:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="container mt-5 p-4 rounded shadow"
      style={{ maxWidth: "600px", backgroundColor: "#f8f9fa" }}
    >
      <h3 className="text-center mb-4">Add New Book</h3>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="book_name" className="form-label">
            Book Name
          </label>
          <input
            type="text"
            className="form-control"
            id="book_name"
            name="title" // ✅ Corrected name attribute
            onChange={handler}
            value={book.title}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="book_author" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="book_author"
            name="author" // ✅ Corrected name attribute
            onChange={handler}
            value={book.author}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="book_page_number" className="form-label">
            Page Number
          </label>
          <input
            type="number"
            className="form-control"
            id="book_page_number"
            name="book_page_number"
            onChange={handler}
            value={book.book_page_number}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="book_price" className="form-label">
            Price (₹)
          </label>
          <input
            type="number"
            className="form-control"
            id="book_price"
            name="book_price"
            onChange={handler}
            value={book.book_price}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="book_edition" className="form-label">
            Edition
          </label>
          <input
            type="text"
            className="form-control"
            id="book_edition"
            name="book_edition"
            onChange={handler}
            value={book.book_edition}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="book_description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="book_description"
            name="description" // ✅ Corrected name attribute
            rows="8"
            onChange={handler}
            value={book.description}
            required
          ></textarea>
        </div>

        {/* File Upload Section */}
        <div className="mb-3">
          <label htmlFor="book_file" className="form-label">
            Upload Book File (PDF/Image)
          </label>
          <input
            type="file"
            className="form-control"
            id="book_file"
            name="coverImage"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>

        <button type="submit" className="btn btn-primary w-30">
          Submit Book
        </button>
      </form>
    </div>
  );
};
