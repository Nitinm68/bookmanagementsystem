// // // src/components/contact/Contact.jsx
// // import React, { useState } from "react";
// // import "./contact.css";
// // import axios from "axios";

// // const Contacts = () => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     message: "",
// //   });

// //   const handleChange = (e) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post(
// //         "http://localhost:4004/api/contact",
// //         formData
// //       );
// //       alert("Message sent successfully! ✅");
// //       setFormData({ name: "", email: "", message: "" });
// //     } catch (err) {
// //       console.error(err);
// //       alert("Something went wrong ❌");
// //     }
// //   };

// //   return (
// //     <div className="contact-container">
// //       <h2>Contact Us</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           name="name"
// //           placeholder="Full Name"
// //           value={formData.fullName}
// //           onChange={handleChange}
// //           required
// //         />
// //         <input
// //           type="email"
// //           name="email"
// //           placeholder="Email Address"
// //           value={formData.email}
// //           onChange={handleChange}
// //           required
// //         />
// //         <textarea
// //           name="message"
// //           placeholder="Your Message"
// //           value={formData.message}
// //           onChange={handleChange}
// //           required
// //         />
// //         <button type="submit">Send</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Contacts;

// // src/components/contact/Contact.jsx
// import React, { useState } from "react";
// import "./contact.css";
// import axios from "axios";
// import { FaTelegramPlane, FaEnvelope } from "react-icons/fa";

// const Contacts = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:4004/api/contact", formData);
//       alert("Message sent successfully! ✅");
//       setFormData({ name: "", email: "", message: "" });
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong ❌");
//     }
//   };

//   return (
//     <div className="contact-container">
//       <h2>Contact Us</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="message"
//           placeholder="Your Message"
//           value={formData.message}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Send</button>
//       </form>

//       {/* --- Contact Options: Telegram & Mail --- */}
//       <div className="contact-icons">
//         <a
//           href="https://t.me/yourusername"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="icon telegram"
//           title="Chat on Telegram"
//         >
//           <FaTelegramPlane size={28} />
//         </a>
//         <a
//           href="mailto:yourmail@example.com"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="icon mail"
//           title="Send Email"
//         >
//           <FaEnvelope size={28} />
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Contacts;

// src/components/contact/Contact.jsx
import React, { useState } from "react";
import "./contact.css";
import axios from "axios";
import { FaTelegramPlane, FaEnvelope } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast"; // ✅ Import Toaster

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4004/api/contact", formData);
      // ✅ Replaced alert() with toast.success()
      toast.success("Message sent successfully! ✅");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      // ✅ Replaced alert() with toast.error()
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="contact-container">
      <Toaster /> {/* ✅ The Toaster component needs to be rendered here */}
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Send</button>
      </form>
      {/* --- Contact Options: Telegram & Mail --- */}
      <div className="contact-icons">
        <a
          href="https://t.me/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="icon telegram"
          title="Chat on Telegram"
        >
          <FaTelegramPlane size={28} />
        </a>
        <a
          href="mailto:yourmail@example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="icon mail"
          title="Send Email"
        >
          <FaEnvelope size={28} />
        </a>
      </div>
    </div>
  );
};

export default Contacts;
