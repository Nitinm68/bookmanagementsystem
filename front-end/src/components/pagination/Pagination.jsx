// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";

// export const OnlineBooksPagination = () => {
//   const [onlineBooks, setOnlineBooks] = useState([]);
//   const [page, setPage] = useState(0);
//   const [totalItems, setTotalItems] = useState(0);

//   const maxResultsPerPage = 4;

//   // Fetch books from Google Books API
//   const fetchBooks = async () => {
//     const startIndex = page * maxResultsPerPage;
//     const res = await axios.get(
//       `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&startIndex=${startIndex}&maxResults=${maxResultsPerPage}`
//     );
//     setOnlineBooks(res.data.items || []);
//     setTotalItems(res.data.totalItems || 0);
//   };

//   const handlePageClick = (data) => {
//     setPage(data.selected);
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, [page]);

//   return (
//     <div className="container">
//       <div className="row mb-3">
//         <div className="col-md-12">
//           <h2 className="text-center">Latest Online Books</h2>
//         </div>
//       </div>
//       <div className="row">
//         {onlineBooks.map((book, index) => {
//           const info = book.volumeInfo;
//           return (
//             <div className="col-md-3" key={index}>
//               <div className="card m-2" style={{ width: "100%" }}>
//                 <img
//                   src={
//                     info.imageLinks?.thumbnail ||
//                     "https://via.placeholder.com/128x195.png?text=No+Cover"
//                   }
//                   className="card-img-top"
//                   alt="Book Cover"
//                   style={{ height: "195px", objectFit: "cover" }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title" style={{ fontSize: "16px" }}>
//                     {info.title?.substring(0, 40)}
//                   </h5>
//                   <p className="card-text" style={{ fontSize: "13px" }}>
//                     {info.authors ? info.authors.join(", ") : "Unknown Author"}
//                   </p>
//                   <a
//                     href={info.previewLink}
//                     className="btn btn-primary btn-sm"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Read Preview
//                   </a>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <ReactPaginate
//         previousLabel={"Previous"}
//         nextLabel={"Next"}
//         breakLabel={"..."}
//         pageCount={Math.ceil(totalItems / maxResultsPerPage)}
//         marginPagesDisplayed={2}
//         pageRangeDisplayed={4}
//         onPageChange={handlePageClick}
//         containerClassName={"pagination"}
//         pageClassName={"page-item"}
//         pageLinkClassName={"page-link"}
//         previousClassName={"page-item"}
//         previousLinkClassName={"page-link"}
//         nextClassName={"page-item"}
//         nextLinkClassName={"page-link"}
//         breakClassName={"page-item"}
//         breakLinkClassName={"page-link"}
//         activeClassName={"active"}
//       />
//     </div>
//   );
// };

import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export const OnlineBooksPagination = () => {
  const [onlineBooks, setOnlineBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [query, setQuery] = useState("fiction"); // Default search term
  const [searchInput, setSearchInput] = useState("");

  const maxResultsPerPage = 4;

  // Fetch books from Google Books API
  const fetchBooks = async () => {
    const startIndex = page * maxResultsPerPage;
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResultsPerPage}`
    );
    setOnlineBooks(res.data.items || []);
    setTotalItems(res.data.totalItems || 0);
  };

  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchInput || "fiction");
    setPage(0); // Reset to first page
  };

  useEffect(() => {
    fetchBooks();
  }, [page, query]);

  return (
    <div className="container">
      {/* Search Bar */}
      <div className="row my-4">
        <div className="col-md-8 offset-md-2">
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search book by name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Book Cards */}
      <div className="row">
        {onlineBooks.map((book, index) => {
          const info = book.volumeInfo;
          return (
            <div className="col-md-3" key={index}>
              <div className="card m-2" style={{ width: "100%" }}>
                <img
                  src={
                    info.imageLinks?.thumbnail ||
                    "https://via.placeholder.com/128x195.png?text=No+Cover"
                  }
                  className="card-img-top"
                  alt="Book Cover"
                  style={{ height: "195px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: "16px" }}>
                    {info.title?.substring(0, 40)}
                  </h5>
                  <p className="card-text" style={{ fontSize: "13px" }}>
                    {info.authors ? info.authors.join(", ") : "Unknown Author"}
                  </p>
                  <a
                    href={info.previewLink}
                    className="btn btn-primary btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Preview
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(totalItems / maxResultsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={4}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center my-4"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};
