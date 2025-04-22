import { Tag } from "lucide-react";
import React from "react";
import TagInput from "../../components/Input/TagInput";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const AddNotes = ({ noteData, type, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [error, setError] = useState(null);

  const handleAddNote = () => {
    //add note
    const addNewNote = async () => {};

    //edit note
    const editNote = async () => {};

    setError(null);
    if (!title) {
      setError("Title is required");
      return;
    }
    if (!content) {
      setError("Content is required");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative bg-white rounded-xl p-6 max-w-xl mx-auto shadow-lg">
      {/* Close Button */}
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center absolute top-3 right-3 hover:bg-slate-200 transition"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-500" />
      </button>

      {/* Title */}
      <div className="flex flex-col gap-2 mt-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          placeholder="Gym at 6pm"
          className="text-2xl text-gray-900 bg-gray-100 rounded p-3 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:bg-gray-50 transition-colors"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea
          className="text-sm text-gray-900 bg-gray-100 rounded p-3 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:bg-gray-50 transition-colors"
          placeholder="Content"
          rows={8}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      {/* Tags */}
      <div className="mt-4">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      {/* Add Button */}
      <button
        className="w-full bg-blue-700 text-white rounded-xl cursor-pointer hover:bg-blue-600 font-medium mt-6 p-3 transition"
        onClick={handleAddNote}
      >
        ADD
      </button>
    </div>
  );
};

export default AddNotes;
