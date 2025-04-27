import { registerBackground } from "@/assets/images";
import { formatRupiah } from "@/utils/formatDate";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { allCartThunk, deleteCartThunk } from "@/store/thunks/cartThunks";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ListCart = ({ item }: { item: Record<string, any> }) => {
  const [selectedCartId, setSelectedCartId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteCart = () => {
    if (!selectedCartId) return;

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
        dispatch(deleteCartThunk({ id: selectedCartId }))
          .unwrap()
          .then(() => {
            dispatch(allCartThunk());
          });
      }
    });
  };

  return (
    <>
      <div
        className="flex flex-row justify-between items-center mb-2 shadow-lg p-2 rounded-lg"
        key={item.id}
      >
        <div className="flex flex-row items-center gap-2">
          <img
            src={item.activity.imageUrls[0] ?? registerBackground}
            alt={item.id}
            onError={(e) =>
              ((e.target as HTMLImageElement).src = registerBackground)
            }
            className="w-20 h-20 rounded-lg"
          />
          <div>
            <p className="font-semibold text-[16px]">{item.activity.title}</p>
            <p className="text-[14px] font-medium text-gray-500">
              {formatRupiah(item.activity.price * item.quantity)}
            </p>
          </div>
        </div>
        <button className="p-1.5 rounded-full cursor-pointer hover:bg-gray-300 transition-colors">
          <Trash2
            size={18}
            color="red"
            onClick={() => {
              setSelectedCartId(item.id);
              handleDeleteCart();
            }}
          />
        </button>
      </div>
    </>
  );
};

export default ListCart;
