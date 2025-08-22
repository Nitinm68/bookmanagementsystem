import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const actions = [
  {
    title: "Add Book",
    desc: "Add a new book to your collection",
    color: "bg-green-500 hover:bg-green-600",
    route: "/add-book",
  },
  {
    title: "Book Details",
    desc: "View and manage your book details",
    color: "bg-blue-500 hover:bg-blue-600",
    route: "/book-details",
  },
  {
    title: "Online Books",
    desc: "Browse and explore online books",
    color: "bg-purple-500 hover:bg-purple-600",
    route: "/browse-book",
  },
  {
    title: "News",
    desc: "Check the latest book-related news",
    color: "bg-yellow-500 hover:bg-yellow-600",
    route: "/news",
  },
  {
    title: "Your Tasks",
    desc: "Manage your personal to-do list",
    color: "bg-pink-500 hover:bg-pink-600",
    route: "/todo",
  },
  {
    title: "Notes",
    desc: "Create and manage your notes",
    color: "bg-red-500 hover:bg-red-600",
    route: "/notes",
  },
];

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Greeting */}
      <h1 className="text-3xl font-bold mb-8">
        Hello,{" "}
        <span className="text-blue-600">{user?.name || user?.email}</span>
      </h1>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {actions.map((action, index) => (
          <div
            key={index}
            onClick={() => navigate(action.route)}
            className={`cursor-pointer rounded-2xl p-6 shadow-md text-white ${action.color} transform transition duration-300 hover:scale-105 hover:shadow-xl`}
          >
            <h2 className="text-xl font-semibold mb-2">{action.title}</h2>
            <p className="text-sm opacity-90">{action.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
