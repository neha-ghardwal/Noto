import React from "react";
import bg from "../../assets/bgg.jpg";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative h-screen w-screen border-none"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar pinned at the top */}
      <div className="absolute top-0 left-0 w-full z-10">
        <Navbar />
      </div>

      {/* Main content center-aligned */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-[#66ff66] flex flex-col justify-center items-center h-full px-4 pt-20"
      >
        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="w-full max-w-4xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.2 }}
            className="text-3xl md:text-7xl font-light mb-2 bg-gradient-to-r from-[#ddffdd] via-[#70e970] to-[#165b16] bg-clip-text text-transparent"
          >
            Access Your Daily <br />
            Orbit of Hidden Wisdom.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.3 }}
            className="text-sm md:text-lg font-light text-[#cbf2cb] mb-4"
          >
            Craft Celestial Notes. Daily. Mindfully.
          </motion.p>

          {/* SVG line */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 100"
            className="mx-auto mt-[-20px] w-[80%] md:w-[60%]"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <motion.path
              d="M10 70 C100 20, 150 120, 240 50 
                 C260 30, 260 10, 240 30 
                 C220 50, 300 90, 480 20"
              stroke="#66ff66"
              strokeOpacity="0.6"
              strokeWidth="1"
              fill="none"
            />
          </motion.svg>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mt-8 flex justify-center flex-row gap-4 z-10"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-4 px-6 py-2.5 bg-white text-[#076907] font-medium text-sm rounded-xl cursor-pointer hover:scale-105 border border-[#2e622e] z-10"
            onClick={() => navigate("/dashboard")}
          >
            Create Note
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-4 px-6 py-2.5 bg-transparent text-[#99ff99] border border-[#66ff66] font-light text-sm cursor-pointer rounded-xl hover:scale-105"
          >
            Learn more
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
