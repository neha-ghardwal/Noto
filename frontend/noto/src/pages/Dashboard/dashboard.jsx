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
      className={`flex h-screen overflow-hidden gap-4 p-4 sm:p-6 lg:p-8 bg-[#001a00] ${
        openAddNote.isShown ? "backdrop-blur-sm" : ""
      }`}
    >
      {/* sidebar */}
      <div className="w-[20%]">
        <SideNavBar />
      </div>

      {/* notes area */}
      <main className="relative w-[80%] bg-black flex flex-col gap-4 p-4 rounded-2xl overflow-hidden flex-1 border border-green-500/20 shadow-[0_0_3px_#00ff5580]">
        {/* heading */}
        <div className="text-2xl font-bold flex justify-center items-center py-4">
          <h1 className="text-green-400 text-3xl font-light drop-shadow-[0_0_1px_#00ff55] font-stretch-125%">
            Craft Celestial Notes ✨
          </h1>
        </div>

        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#00ff5533_1px,transparent_1px),linear-gradient(to_bottom,#00ff5533_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* notes */}
        <div className="flex-1 overflow-auto relative z-10">
          <div className="w-full h-full bg-[#0d0d0d] rounded-2xl p-7 border border-green-300/20 shadow-inner shadow-green-500/10">
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
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-green-700 hover:bg-green-600 shadow-[0_0_4px_#00ff55] absolute right-10 bottom-10 transition-all duration-300 ease-in-out z-11"
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
              border: "1px solid rgba(0, 255, 85, 0.2)",
              background: "#0d0d0d",
              boxShadow: "0 0 10px #00ff5580, inset 0 0 12px #00ff5520",
              overflow: "auto",
              borderRadius: "3rem",
              outline: "none",
              padding: "24px",
              width: "90%",
              maxWidth: "600px",
              maxHeight: "90vh",
              color: "#ffffff",
            },
          }}
          contentLabel=""
        >
          <AddNotes
            type={openAddNote.type}
            noteData={openAddNote.data}
            onClose={() =>
              setOpenAddNote({ isShown: false, type: "add", data: null })
            }
          />
        </Modal>
      </main>
    </div>
  );
};

export default Dashboard;
