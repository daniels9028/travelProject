import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/landing-page/Navbar";
import ListCheckout from "@/components/ListCheckout";
import { clearCartMessage } from "@/store/features/cartSlices";
import { AppDispatch, RootState } from "@/store/store";
import { allCartThunk } from "@/store/thunks/cartThunks";
import { paymentMethodThunk } from "@/store/thunks/paymentThunks";
import { formatRupiah } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Payment } from "@/types/payment/response";
import ListPayment from "@/components/ListPayment";
import { createTransactionThunk } from "@/store/thunks/transactionThunks";
import { clearTransactionMessage } from "@/store/features/transactionSlices";

type SelectedItem = {
  id: string;
  price: number;
  quantity: number;
};

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/landing-page/Hero";
import { checkoutBackground } from "@/assets/images";

const MySwal = withReactContent(Swal);

const CheckoutPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { cart, message } = useSelector((state: RootState) => state.cart);

  const { loading } = useSelector((state: RootState) => state.transaction);

  const { payment } = useSelector((state: RootState) => state.payment);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const handleCheckout = () => {
    if (!selectedPayment) return;
    if (!selectedItems || selectedItems.length === 0) return;

    const cartIds = selectedItems.map((item) => item.id);

    MySwal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, process it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          createTransactionThunk({
            cartIds: cartIds,
            paymentMethodId: selectedPayment.id,
          })
        )
          .unwrap()
          .then(() => {
            navigate("/orders");
          });
      }
    });
  };

  const handleToggleSelectAll = () => {
    const isSelecting = selectedItems.length !== cart.length;

    if (isSelecting) {
      const allSelected = cart.map((item) => ({
        id: item.id,
        price: item.activity.price,
        quantity: item.quantity,
      }));

      setSelectedItems(allSelected);

      setTotalPrice(
        allSelected.reduce((sum, item) => sum + item.quantity * item.price, 0)
      );
    } else {
      setSelectedItems([]);
      setTotalPrice(0);
    }
  };

  const isItemSelected = (id: string) => {
    return selectedItems.some((item) => item.id === id);
  };

  const isAllSelected = selectedItems.length === cart.length && cart.length > 0;
  const selectAllLabel = isAllSelected ? "Unselect All" : "Select All";

  useEffect(() => {
    dispatch(allCartThunk());
    dispatch(paymentMethodThunk());
  }, []);

  useEffect(() => {
    if (message.updateCart) {
      toast.info(message.updateCart);

      dispatch(clearCartMessage({ key: "updateCart" }));
    }
  }, [message.updateCart]);

  useEffect(() => {
    if (message.createTransaction) {
      toast.info(message.createTransaction);

      dispatch(clearTransactionMessage({ key: "createTransaction" }));
    }
  }, [message.createTransaction]);

  return (
    <>
      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${checkoutBackground})`,
        }}
      >
        <Navbar />

        <Hero
          title="Your Cart"
          subtitle="Review Items Before Checkout"
          description="View and manage the items you've added to your cart. Make changes or proceed to secure checkout when you're ready."
          buttonTitle=""
          buttonDescription=""
          backgroundText=""
          buttonIcon=""
          link=""
        />
      </div>

      <div className="container mx-auto flex lg:flex-row flex-col px-6 my-10 font-manrope gap-4">
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="flex flex-row justify-between items-center mb-4">
            <label
              htmlFor="selectAll"
              className="flex flex-row items-center gap-2 cursor-pointer"
            >
              <input
                id="selectAll"
                type="checkbox"
                onChange={handleToggleSelectAll}
                checked={isAllSelected}
                className="cursor-pointer"
              />
              <p className="cursor-pointer">{selectAllLabel}</p>
            </label>
            <p>{selectedItems.length} item(s) selected</p>
          </div>

          {cart.map((items) => (
            <ListCheckout
              items={items}
              key={items.id}
              isItemSelected={isItemSelected}
              setSelectedItems={setSelectedItems}
              setTotalPrice={setTotalPrice}
            />
          ))}
        </div>
        <div className="lg:w-1/3">
          <div className="rounded-md bg-white shadow-sm border flex flex-col p-6 space-y-8">
            <h3 className="font-bold text-2xl">Payment Information</h3>

            <h5 className="font-semibold text-xl">Pay With</h5>

            <div className="flex flex-col gap-4">
              {payment.map((listPayment) => (
                <ListPayment
                  key={listPayment.id}
                  listPayment={listPayment}
                  selectedPayment={selectedPayment}
                  setSelectedPayment={setSelectedPayment}
                />
              ))}
            </div>

            <div className="flex flex-row items-center justify-between">
              <p className="font-extrabold text-xl">Total</p>
              <p className="text-red-600 font-extrabold text-xl">
                {formatRupiah(totalPrice ?? 0)}
              </p>
            </div>

            <button
              disabled={
                totalPrice === 0 ||
                !selectedPayment ||
                loading.createTransaction
              }
              className="bg-red-500 py-3 px-6 rounded-lg text-white text-sm font-medium hover:bg-red-600 transition-all disabled:bg-red-300 disabled:text-white/70 cursor-pointer disabled:cursor-not-allowed"
              onClick={handleCheckout}
            >
              {loading.createTransaction
                ? "Processing..."
                : totalPrice === 0 || !selectedPayment
                ? "Select items and payment method"
                : "Checkout"}
            </button>
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
};

export default CheckoutPage;
