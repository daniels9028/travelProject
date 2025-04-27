import { Menu, ShoppingCart } from "lucide-react";
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
import ShopCart from "../ShopCart";
import MobileSidebarMenu from "../MobileSidebarMenu";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { cart } = useSelector((state: RootState) => state.cart);

  const { loggedUser } = useSelector((state: RootState) => state.user);

  const { message } = useSelector((state: RootState) => state.authentication);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  useEffect(() => {
    // Check scroll position from sessionStorage on mount
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition)); // Restore scroll position
      setIsScrolled(parseInt(savedScrollPosition) > 50); // Update scroll state
    }

    // Event listener for scroll events
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        sessionStorage.setItem("scrollPosition", window.scrollY.toString()); // Save scroll position
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
        isScrolled ? "bg-black shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-6">
        {/* Mobile Menu Button */}
        <div className="flex flex-row gap-2">
          <button
            className="md:hidden text-white z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Menu className="w-8 h-8 cursor-pointer" />
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo_navbar" className="w-12 h-12" />
            <p className="text-xl font-semibold text-white">TravelGo</p>
          </div>
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
          <div className="relative flex items-center space-x-4">
            {/* Cart Icon */}
            <div
              className="text-white hover:text-red-400 transition relative cursor-pointer"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart />
              {/* Optional: Cart count badge */}
              <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-white px-4 py-2 rounded-md font-medium transition md:flex cursor-pointer">
                <img
                  src={loggedUser.profilePictureUrl || "/default-avatar.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </button>

              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
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

        {/* Mobile Fullscreen Slide-in Menu */}
        <MobileSidebarMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleLogout={handleLogout}
        />

        {/* Shopping Cart */}
        <ShopCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      </div>
    </nav>
  );
};

export default Navbar;
