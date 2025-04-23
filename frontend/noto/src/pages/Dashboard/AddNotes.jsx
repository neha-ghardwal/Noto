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
    <div className="relative bg-[#0d0d0d] text-green-300 rounded-xl p-6 max-w-xl mx-auto">
      {/* Close Button */}
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center absolute top-3 right-3 hover:bg-green-700 transition"
        onClick={onClose}
      >
        <MdClose className="text-xl text-green-300" />
      </button>

      {/* Title */}
      <div className="flex flex-col gap-2 mt-2">
        <label className="text-green-200 font-light">Title</label>
        <input
          type="text"
          placeholder="Gym at 6pm"
          className="text-xl text-green-100 bg-[#1a2b1a] border border-green-500 rounded p-3 outline-none focus:ring-green-400 focus:bg-[#224422] transition-colors"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-green-200 font-light">Content</label>
        <textarea
          className="text-sm text-green-100 bg-[#1a2b1a] border border-green-500 rounded p-3 outline-none focus:ring-green-400 focus:bg-[#224422] transition-colors"
          placeholder="Content"
          rows={8}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      {/* Tags */}
      <div className="mt-4">
        <label className="text-green-200 font-light">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      {/* Add Button */}
      <button
        className="w-full bg-green-500 text-black rounded-xl cursor-pointer hover:bg-green-400 font-semibold mt-6 p-3 transition"
        onClick={handleAddNote}
      >
        Add
      </button>
    </div>
  );
};

export default AddNotes;
