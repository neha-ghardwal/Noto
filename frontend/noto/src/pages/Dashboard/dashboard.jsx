import React, { useEffect } from "react";
import SideNavBar from "../../components/sidenav/sidenav";
import NoteCard from "../../components/cards/noteCards";
import { MdAdd } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import AddNotes from "./AddNotes";
import Modal from "react-modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import Toast from "@/components/ToastMessage/toast";
import EmptyCard from "@/components/EmptyCard/EmptyCard";
import addnote from "../../assets/add.svg";
import empty from "../../assets/empty.svg";

const Dashboard = () => {
  const [openAddNote, setOpenAddNote] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  //toast state
  const [showToast, setShowToast] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  // State to store user info
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //search state
  const [isSearch, setIsSearch] = useState(false);

  //function to edit note
  const handleEdit = (noteDetails) => {
    setOpenAddNote({
      isShown: true,
      type: "edit",
      data: noteDetails,
    });
  };

  const showToastMessage = (message, type) => {
    setShowToast({
      isShown: true,
      message,
      type,
    });
  };
  //function to close toast
  const handleCloseToast = () => {
    setShowToast({
      isShown: false,
      message: "",
    });
  };

  //get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  //delete note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note deleted successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occurred. Please try again");
      }
    }
  };

  //search note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //pin note
  const updatePinNote = async (noteData) => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteId,
        {
          isPinned: !noteData.isPinned,
        }
      );
      if (!response.data.error) {
        // re-fetch everything so UI updates
        await getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    setAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <div
      className={`flex h-screen overflow-hidden gap-4 p-2 md:p-4 lg:p-6 xl:p-8 bg-[#001a00] ${
        openAddNote.isShown ? "backdrop-blur-sm" : ""
      }`}
    >
      {/* Mobile menu button - more prominent */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#001a00]/90 backdrop-blur-sm border-b border-green-500/20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-lg bg-green-600/90 text-white shadow-lg shadow-green-900/50"
            >
              <MdMenu size={24} />
            </button>
            <h2 className="text-green-400 text-lg font-medium">My Notes</h2>
          </div>
        </div>
      )}

      {/* Sidebar */}
      {(isMobileSidebarOpen || !isMobile) && (
        <div
          className={`${
            isMobile ? "fixed inset-0 z-40 mt-14" : "w-[20%] min-w-[250px]"
          }`}
        >
          <SideNavBar
            userInfo={userInfo}
            onSearchNote={onSearchNote}
            handleClearSearch={handleClearSearch}
            isMobile={isMobile}
            toggleSidebar={() => setIsMobileSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main content area */}
      <main
        className={`relative ${
          isMobile ? "w-full mt-16" : "w-[80%]"
        } bg-black flex flex-col gap-2 md:gap-4 p-2 md:p-4 rounded-xl md:rounded-2xl overflow-hidden flex-1 border border-green-500/20 shadow-[0_0_3px_#00ff5580]`}
      >
        {/* Heading - only shown on desktop now */}
        {!isMobile && (
          <div className="text-center py-3 md:py-4">
            <h1 className="text-green-400 text-2xl md:text-3xl font-medium drop-shadow-[0_0_2px_#00ff55]">
              Craft Celestial Notes{" "}
              <span className="text-xl md:text-2xl">✨</span>
            </h1>
            {allNotes.length === 0 && !isSearch && (
              <p className="text-green-300/80 text-sm mt-1 md:text-base">
                Your creative space awaits
              </p>
            )}
          </div>
        )}

        {/* Background pattern - slightly more subtle on mobile */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#00ff5522_1px,transparent_1px),linear-gradient(to_bottom,#00ff5522_1px,transparent_1px)] bg-[size:12px_20px] md:bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Notes container */}
        <div className="flex-1 overflow-auto relative z-10">
          {allNotes.length > 0 ? (
            <div
              className={`grid grid-cols-1 ${
                isMobile
                  ? "gap-2"
                  : "sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 bg-[#0d0d0d] rounded-xl md:rounded-2xl p-3 md:p-6 border border-green-300/20 shadow-inner shadow-green-500/10"
              }`}
            >
              {allNotes.map((item) => (
                <NoteCard
                  key={item._id}
                  title={item.title}
                  date={item.createdOn}
                  content={item.content}
                  tags={item.tags}
                  isPinned={item.isPinned}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => deleteNote(item)}
                  onPinNote={() => updatePinNote(item)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
              <EmptyCard
                imgSrc={isSearch ? empty : addnote}
                message={
                  isSearch ? `No matching notes found` : `Start your first note`
                }
                subMessage={!isSearch && "Tap the + button below to begin"}
              />
            </div>
          )}
        </div>

        {/* Add Note button - better mobile positioning and size */}
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

        {/* Modal remains unchanged */}
        <Modal
          isOpen={openAddNote.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(12px)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              position: "relative",
              inset: "auto",
              border: "1px solid rgba(0, 255, 85, 0.3)",
              background: "#0d0d0d",
              boxShadow: "0 0 15px #00ff5590, inset 0 0 15px #00ff5530",
              overflow: "auto",
              borderRadius: "2rem",
              outline: "none",
              padding: "20px",
              width: "95%",
              maxWidth: "500px",
              maxHeight: "85vh",
              color: "#ffffff",
            },
          }}
          contentLabel="Add Note"
        >
          <AddNotes
            type={openAddNote.type}
            noteData={openAddNote.data}
            onClose={() =>
              setOpenAddNote({ isShown: false, type: "add", data: null })
            }
            getAllNotes={getAllNotes}
            showToastMessage={showToastMessage}
          />
        </Modal>
      </main>

      {/* Toast Message */}
      <Toast
        isShown={showToast.isShown}
        message={showToast.message}
        type={showToast.type}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default Dashboard;
