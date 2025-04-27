import { clearCartMessage } from "@/store/features/cartSlices";
import { AppDispatch, RootState } from "@/store/store";
import { allCartThunk } from "@/store/thunks/cartThunks";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ListCard from "./ListCart";
import { X } from "lucide-react";
import { formatRupiah } from "@/utils/formatDate";

const ShopCart = ({
  isCartOpen,
  setIsCartOpen,
}: {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { cart, message: cartMessage } = useSelector(
    (state: RootState) => state.cart
  );

  const { loggedUser } = useSelector((state: RootState) => state.user);

  const totalPrice = cart.reduce((sum, cartItem) => {
    return sum + cartItem.quantity * cartItem.activity.price;
  }, 0);

  console.log(totalPrice);

  useEffect(() => {
    if (loggedUser) dispatch(allCartThunk());
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
    if (cartMessage.deleteCart) {
      toast.info(cartMessage.deleteCart);

      dispatch(clearCartMessage({ key: "deleteCart" }));
    }
  }, [cartMessage.deleteCart]);

  return (
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
                <ListCard key={item.id} item={item} />
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
  );
};

export default ShopCart;
