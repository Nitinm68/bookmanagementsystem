import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // ✅ Import Toaster and toast

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4004/api/auth/register", formData);
      // ✅ Replaced alert() with toast.success()
      toast.success("🎉 Registered Successfully! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      // ✅ Replaced alert() with toast.error()
      toast.error("❌ Registration failed");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <Toaster /> {/* ✅ Add the Toaster component */}
      <h2 className="text-xl font-bold mb-4">📝 Register for EduLib</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border p-2"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={handleChange}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
