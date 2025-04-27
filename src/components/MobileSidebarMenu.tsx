import { logo } from "@/assets/images";
import { RootState } from "@/store/store";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MobileSidebarMenu = ({
  isOpen,
  setIsOpen,
  handleLogout,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}) => {
  const { loggedUser } = useSelector((state: RootState) => state.user);

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

            {/* User Menu or Login */}
            {loggedUser ? (
              <div className="flex flex-col items-center space-y-2">
                <button className="flex items-center gap-3 px-4 py-2">
                  <img
                    src={loggedUser.profilePictureUrl || "/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                  <span className="text-base">{loggedUser?.name}</span>
                </button>
                <div className="w-full bg-white rounded-md shadow-lg text-gray-800 overflow-hidden">
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-red-500 text-[12px] text-white px-6 py-2 rounded-md font-medium hover:bg-red-600 transition w-fit"
              >
                Login
              </Link>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebarMenu;
