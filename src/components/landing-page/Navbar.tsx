import { Menu, ShoppingCart, Trash2, X } from "lucide-react";
import { logo, registerBackground } from "@/assets/images";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logoutUserThunk } from "@/store/thunks/authenticationThunks";
import { toast } from "react-toastify";
import { clearAuthMessage } from "@/store/features/authenticationSlices";
import { clearLoggedUser } from "@/store/features/userSlices";
import { motion, AnimatePresence } from "framer-motion";
import { allCartThunk } from "@/store/thunks/cartThunks";
import { formatRupiah } from "@/utils/formatDate";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const { loggedUser } = useSelector((state: RootState) => state.user);

  const { cart } = useSelector((state: RootState) => state.cart);

  const { message } = useSelector((state: RootState) => state.authentication);

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
    dispatch(allCartThunk());
  }, [dispatch]);

  // Disable scrolling on body when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup to reset overflow
    };
  }, [isCartOpen]);

  useEffect(() => {
    if (message.logout) {
      toast.success(message.logout);

      dispatch(clearAuthMessage({ key: "logout" }));
      dispatch(clearLoggedUser());
    }
  }, [message.logout]);

  const totalPrice = cart.reduce((sum, cartItem) => {
    return sum + cartItem.quantity * cartItem.activity.price;
  }, 0);

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
                        src={
                          loggedUser.profilePictureUrl || "/default-avatar.png"
                        }
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

        {/* Mobile Fullscreen Shopping Cart */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              {/* Dark Background Overlay */}
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black z-50"
                onClick={() => setIsCartOpen(false)}
              />

              {/* Slide-in Menu */}
              <motion.div
                key="mobileCartDrawer"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.4 }}
                className="fixed top-0 right-0 md:w-1/2 lg:w-1/4 w-full h-screen bg-white backdrop-blur-sm flex flex-col space-y-4 text-black font-semibold z-50 items-center overflow-hidden"
              >
                <div className="flex flex-row w-full justify-between items-center shadow-sm p-4">
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">My Cart</p>
                    <p className="text-sm font-medium text-gray-500">
                      {cart.length} items
                    </p>
                  </div>
                  <X
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setIsCartOpen(false)}
                  />
                </div>

                {/* Cart Items Area with Scroll */}
                <div className="flex-1 w-full overflow-y-auto px-4 pb-28">
                  {/* Render your cart items here */}
                  {cart.map((item) => (
                    <div
                      className="flex flex-row justify-between items-center mb-2 shadow-lg p-2 rounded-lg"
                      key={item.id}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <img
                          src={item.activity.imageUrls[0]}
                          alt={item.id}
                          onError={(e) =>
                            ((e.target as HTMLImageElement).src =
                              registerBackground)
                          }
                          className="w-20 h-20 rounded-lg"
                        />
                        <div>
                          <p className="font-semibold text-[16px]">
                            {item.activity.title}
                          </p>
                          <p className="text-[14px] font-medium text-gray-500">
                            {formatRupiah(item.activity.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                      <button className="p-1.5 rounded-full cursor-pointer hover:bg-gray-300 transition-colors">
                        <Trash2 size={16} color="red" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="w-full p-4 bg-white sticky bottom-0 shadow-[0_-2px_6px_rgba(0,0,0,0.1)] z-10">
                  <div className="flex flex-row justify-between items-center mb-4">
                    <p className="font-semibold text-[16px]">Total</p>
                    <p className="font-semibold text-[16px]">
                      {formatRupiah(totalPrice)}
                    </p>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-900 transition-all duration-300">
                    Checkout
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
