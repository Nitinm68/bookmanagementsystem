// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Notes = () => {
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState("");

//   // Fetch all notes
//   useEffect(() => {
//     axios
//       .get("http://localhost:4004/api/notes")
//       .then((res) => setNotes(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // Add new note
//   const addNote = async () => {
//     if (!newNote.trim()) return;
//     try {
//       const res = await axios.post("http://localhost:4004/api/notes", {
//         title: "Untitled Note",
//         content: newNote,
//       });
//       setNotes([...notes, res.data]);
//       setNewNote("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete note
//   const deleteNote = async (id) => {
//     try {
//       await axios.delete(`http://localhost:4004/api/notes/${id}`);
//       setNotes(notes.filter((note) => note._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="container p-4">
//       <h2>📝 My Notes</h2>

//       <div className="mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Write a note..."
//           value={newNote}
//           onChange={(e) => setNewNote(e.target.value)}
//         />
//         <button onClick={addNote} className="btn btn-primary mt-2">
//           Add Note
//         </button>
//       </div>

//       <ul className="list-group">
//         {notes.map((note) => (
//           <li
//             key={note._id}
//             className="list-group-item d-flex justify-content-between"
//           >
//             {note.text}
//             <button
//               className="btn btn-danger btn-sm"
//               onClick={() => deleteNote(note._id)}
//             >
//               ❌
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notes;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:4004/api/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  // Add a new note
  const addNote = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4004/api/notes", {
        title,
        content,
      });
      setNotes([...notes, res.data]); // update list with new note
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:4004/api/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container my-4">
      <h2>📒 Notes</h2>
      <form onSubmit={addNote} className="mb-3">
        <input
          type="text"
          placeholder="Title"
          className="form-control mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          className="form-control mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          ➕ Add Note
        </button>
      </form>

      <ul className="list-group">
        {notes.map((note) => (
          <li
            key={note._id}
            className="list-group-item d-flex justify-content-between"
          >
            <div>
              <strong>{note.title}</strong>: {note.content}
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteNote(note._id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
