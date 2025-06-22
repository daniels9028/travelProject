import { LogOut, Menu, Package, ShoppingCart, User } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { cart } = useSelector((state: RootState) => state.cart);

  const { loggedUser } = useSelector((state: RootState) => state.user);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleLogout = async () => {
    const data = await dispatch(logoutUserThunk()).unwrap();

    toast.success(data.message);

    dispatch(clearLoggedUser());
    dispatch(clearAuthMessage({ key: "logout" }));
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
          <div className="relative flex items-center gap-4 sm:gap-6">
            {/* Cart Icon */}
            <div
              className="relative text-white hover:text-red-400 transition cursor-pointer"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute -top-2 -right-2 text-[10px] sm:text-xs bg-red-500 text-white w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            </div>

            {/* Profile Dropdown */}
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 rounded-full">
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                    <AvatarImage
                      src={
                        loggedUser.profilePictureUrl || "/default-avatar.png"
                      }
                      alt="Profile"
                    />
                    <AvatarFallback>
                      {loggedUser.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-44 sm:w-48 mt-2 shadow-lg rounded-md z-50"
                sideOffset={8}
                align="end"
              >
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/orders"
                    className="flex items-center gap-2 w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition"
                  >
                    <Package className="w-4 h-4" />
                    Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
        <MobileSidebarMenu isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Shopping Cart */}
        <ShopCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      </div>
    </nav>
  );
};

export default Navbar;
