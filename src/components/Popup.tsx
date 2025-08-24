import React from "react";
import { motion } from "framer-motion";

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 md:bg-transparent md:inset-auto md:bottom-4 md:right-4 md:w-auto md:h-auto"
    >
      <div className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-80">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-gray-700 hover:text-red-500 text-xl font-bold z-10"
        >
          ✕
        </button>

        {/* Video Ad */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-lg"
        >
          <source src="/promo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </motion.div>
  );
};

export default Popup;
