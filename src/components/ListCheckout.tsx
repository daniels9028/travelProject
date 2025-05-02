import { registerBackground } from "@/assets/images";
import { AppDispatch } from "@/store/store";
import {
  allCartThunk,
  deleteCartThunk,
  updateCartThunk,
} from "@/store/thunks/cartThunks";
import { formatRupiah } from "@/utils/formatDate";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type SelectedItem = {
  id: string;
  price: number;
  quantity: number;
};

const ListCheckout = ({
  items,
  isItemSelected,
  setSelectedItems,
  setTotalPrice,
}: {
  items: Record<string, any>;
  isItemSelected: (id: string) => boolean;
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItem[]>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleCheckboxChange = () => {
    const isSelected = isItemSelected(items.id);

    if (!isSelected) {
      setSelectedItems((prev) => [
        ...prev,
        {
          id: items.id,
          price: items.activity.price,
          quantity: items.quantity,
        },
      ]);
      setTotalPrice((prev) => prev + items.activity.price * items.quantity);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item.id !== items.id));
      setTotalPrice((prev) => prev - items.activity.price * items.quantity);
    }
  };

  const handleUpdateCart = (quantity: number) => {
    dispatch(updateCartThunk({ id: items.id, quantity: quantity }))
      .unwrap()
      .then((_) => {
        setSelectedItems((prevSelected) => {
          const updated = prevSelected.map((item) =>
            item.id === items.id ? { ...item, quantity } : item
          );

          const updatedTotal = updated.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          setTotalPrice(updatedTotal);
          return updated;
        });

        // Optionally re-fetch cart if needed
        dispatch(allCartThunk());
      });
  };

  const handleDeleteCart = () => {
    if (!items) return;

    MySwal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCartThunk({ id: items.id }))
          .unwrap()
          .then(() => {
            dispatch(allCartThunk());

            // If the item was selected, remove it and update total price
            setSelectedItems((prev) => {
              const wasSelected = prev.find((item) => item.id === items.id);
              if (!wasSelected) return prev;

              const updated = prev.filter((item) => item.id !== items.id);
              const updatedTotal = updated.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );
              setTotalPrice(updatedTotal);
              return updated;
            });
          });
      }
    });
  };

  return (
    <div
      key={items.id}
      className="w-full shadow-md flex lg:flex-row flex-col lg:items-center justify-between lg:gap-0 gap-8 rounded-lg p-4 border mb-4"
    >
      <div
        className="flex flex-row gap-4 items-center cursor-pointer"
        onClick={(e) => {
          if ((e.target as HTMLElement).tagName !== "INPUT") {
            handleCheckboxChange();
          }
        }}
      >
        <input
          type="checkbox"
          checked={isItemSelected(items.id)}
          onChange={handleCheckboxChange}
        />
        <img
          src={registerBackground}
          alt=""
          className="w-24 h-24 object-cover rounded-lg shadow-sm"
        />
        <div className="flex flex-col gap-1">
          <p className="text-lg font-extrabold">{items.activity.title}</p>
          <p className="text-sm font-medium text-gray-500">
            {items.activity.province}
          </p>
          <p className="font-bold text-red-500 text-base">
            {formatRupiah(items.activity.price ?? 0)}
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="lg:hidden block" />
        <div className="flex flex-row items-center justify-between gap-4">
          <button
            className="px-3 py-1 rounded-lg bg-gray-200 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={items.quantity === 1}
            onClick={() => handleUpdateCart(items.quantity - 1)}
          >
            -
          </button>
          <p>{items.quantity}</p>
          <button
            className="px-3 py-1 rounded-lg bg-gray-200 cursor-pointer"
            onClick={() => handleUpdateCart(items.quantity + 1)}
          >
            +
          </button>
          <button
            className="p-1.5 rounded-full cursor-pointer hover:bg-gray-300 transition-colors"
            onClick={handleDeleteCart}
          >
            <Trash2 size={18} color="red" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListCheckout;
