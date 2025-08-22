import React from "react";

export const About = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            alt="About Us"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-3">Who I Am ? </h2>
          <p style={{ fontSize: "16px" }}>
            Welcome to <strong>EduLib</strong>, your ultimate online book hub!
            I'm a solo developer, passionate about learning and building tools
            that make knowledge accessible to everyone.
          </p>
          <p style={{ fontSize: "16px" }}>
            Whether you're looking for fiction, academic texts, coding guides,
            or random discoveries — I've got you covered with a huge library of
            digital resources.
          </p>
          <p style={{ fontSize: "16px" }}>
            Our mission is simple:{" "}
            <strong>
              “Make learning engaging, digital, and super accessible.”
            </strong>{" "}
            This platform is built using React, Bootstrap, Nodejs, Express,
            MongoDB and a whole lot of &hearts;
          </p>
          {/* <a href="/" className="btn btn-primary mt-3">
            Explore Books
          </a> */}
          <button
            onClick={() => (window.location.href = "/browse-book")}
            className="btn btn-primary mt-3"
          >
            Explore Books
          </button>
        </div>
      </div>
    </div>
  );
};
