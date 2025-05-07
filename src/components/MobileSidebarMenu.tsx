import { logo } from "@/assets/images";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const MobileSidebarMenu = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Background Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Slide-in Menu */}
          <motion.div
            key="mobileMenu"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed top-0 left-0 w-2/3 h-screen bg-black/90 backdrop-blur-sm flex flex-col space-y-4 text-white font-semibold z-50 md:hidden p-4 items-center"
          >
            {/* Header with Logo and Close */}
            <div className="flex flex-row w-full justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <img src={logo} alt="logo_navbar" className="w-12 h-12" />
                <p className="text-xs font-semibold text-white">TravelGo</p>
              </div>
              <X
                className="w-6 h-6 cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>

            {/* Navigation Links */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-[12px] py-2 px-5 rounded-md transition transform hover:scale-105 hover:bg-white/10 w-full text-center"
            >
              Home
            </Link>
            <Link
              to="/discover"
              onClick={() => setIsOpen(false)}
              className="text-[12px] py-2 px-5 rounded-md transition transform hover:scale-105 hover:bg-white/10 w-full text-center"
            >
              Discover
            </Link>
            <Link
              to="/special-deals"
              onClick={() => setIsOpen(false)}
              className="text-[12px] py-2 px-5 rounded-md transition transform hover:scale-105 hover:bg-white/10 w-full text-center"
            >
              Special Deals
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebarMenu;
