import { Menu, X } from "lucide-react";
import { logo } from "@/assets/images";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logoutUserThunk } from "@/store/thunks/authenticationThunks";
import { toast } from "react-toastify";
import { clearAuthMessage } from "@/store/features/authenticationSlices";
import { clearLoggedUser } from "@/store/features/userSlices";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const { loggedUser } = useSelector((state: RootState) => state.user);

  const { message } = useSelector((state: RootState) => state.authentication);

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (message.logout) {
      toast.success(message.logout);

      dispatch(clearAuthMessage({ key: "logout" }));
      dispatch(clearLoggedUser());
    }
  }, [message.logout]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-workSans ${
        isScrolled ? "backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo_navbar" className="w-12 h-12" />
          <p className="text-xl font-semibold text-white">TravelGo</p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12 text-white font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 font-bold border-b-2 border-red-500"
                : "text-white hover:text-red-400"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/discover"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 font-bold border-b-2 border-red-500"
                : "text-white hover:text-red-400"
            }
          >
            Discover
          </NavLink>
          <NavLink
            to="/special-deals"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 font-bold border-b-2 border-red-500"
                : "text-white hover:text-red-400"
            }
          >
            Special Deals
          </NavLink>
        </div>

        {loggedUser ? (
          <div className="relative group">
            {/* Profile Button */}
            <button className="items-center gap-2 text-white px-6 py-2 rounded-md font-medium transition hidden md:flex cursor-pointer">
              <img
                src={loggedUser.profilePictureUrl || "/default-avatar.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md hidden group-hover:block">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-red-500 text-white px-6 py-2 rounded-md font-medium hover:bg-red-600 transition hidden md:flex"
          >
            Login
          </Link>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-8 h-8" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Menu className="w-8 h-8" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Mobile Fullscreen Slide-in Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobileMenu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed top-0 right-0 w-full h-screen bg-black flex flex-col items-center justify-center space-y-8 text-white font-semibold z-30"
            >
              <Link
                to="/"
                className="text-2xl transition hover:text-red-500 hover:bg-gray-200 py-3 px-6 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/discover"
                className="text-2xl transition hover:text-red-500 hover:bg-gray-200 py-3 px-6 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Discover
              </Link>
              <Link
                to="/special-deals"
                className="text-2xl transition hover:text-red-500 hover:bg-gray-200 py-3 px-6 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Special Deals
              </Link>

              {loggedUser ? (
                <div className="relative group">
                  {/* Profile Button */}
                  <button className="items-center gap-2 text-white px-6 py-2 rounded-md font-medium transition cursor-pointer">
                    <img
                      src={
                        loggedUser.profilePictureUrl || "/default-avatar.png"
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md hidden group-hover:block">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-red-500 text-white px-6 py-2 rounded-md font-medium hover:bg-red-600 transition"
                >
                  Login
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
