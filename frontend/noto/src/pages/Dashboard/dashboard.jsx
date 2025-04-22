import React from "react";
import SideNavBar from "../../components/sidenav/sidenav";
import NoteCard from "../../components/cards/noteCards";
import { MdAdd } from "react-icons/md";
import AddNotes from "./AddNotes";
import Modal from "react-modal";
import { useState } from "react";

const Dashboard = () => {
  const [openAddNote, setOpenAddNote] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <div
      className={`flex h-[calc(100vh-2.5rem)] overflow-hidden gap-4 m-5 ${
        openAddNote.isShown ? "backdrop-blur-sm" : ""
      }`}
    >
      {/* sidebar */}
      <div className="w-[20%]">
        <SideNavBar />
      </div>

      {/* notes area */}
      <main className="relative w-[80%] bg-[#0e2357] flex flex-col gap-4 p-4 rounded-2xl overflow-hidden flex-1">
        {/* heading */}
        <div className="text-2xl font-bold flex justify-center items-center py-4">
          <h1 className="text-white">Notes</h1>
        </div>

        {/* notes */}
        <div className="flex-1 overflow-auto">
          <div className="w-full h-full bg-gradient-to-br from-[#164b84] to-[#0a2d4d] rounded-2xl p-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <NoteCard
                title="Meeting"
                date="3rd May"
                content="Meeting tomorrow evening"
                tags="#meet"
                isPinned={true}
                onEdit={() => {}}
                onDelete={() => {}}
                onPinNote={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Add Note button */}
        <button
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-900 hover:bg-blue-800 absolute right-10 bottom-10"
          onClick={() => {
            setOpenAddNote({
              isShown: true,
              type: "add",
              data: null,
            });
          }}
        >
          <MdAdd className="text-[32px] text-white" />
        </button>

        {/* Add Note Modal */}
        <Modal
          isOpen={openAddNote.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(10px)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              position: "relative",
              inset: "auto",
              border: "none",
              background: "white",
              overflow: "auto",
              borderRadius: "1rem",
              outline: "none",
              padding: "24px",
              width: "90%",
              maxWidth: "600px",
              maxHeight: "90vh",
            },
          }}
          contentLabel=""
        >
          <AddNotes
            onClose={() => setOpenAddNote({ ...openAddNote, isShown: false })}
          />
        </Modal>
      </main>
    </div>
  );
};

export default Dashboard;
