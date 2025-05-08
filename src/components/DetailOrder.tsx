import { registerBackground } from "@/assets/images";
import { Transaction } from "@/types/transaction/response";
import { formatDate, formatRupiah } from "@/utils/formatDate";

const statusColorMap = {
  pending: "bg-yellow-500 text-white",
  success: "bg-emerald-500 text-white",
  cancelled: "bg-gray-500 text-white",
  failed: "bg-red-500 text-white",
};

const DetailOrder = ({
  selectedTransaction,
}: {
  selectedTransaction: Transaction;
}) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex lg:flex-row flex-col items-center justify-between hover:shadow-lg transition-shadow duration-300 cursor-pointer lg:gap-0 gap-8 relative">
      <span
        className={`lg:hidden block absolute right-8 top-8 capitalize px-3 py-1 w-fit rounded-xl ${
          statusColorMap[selectedTransaction.status] ??
          "bg-slate-300 text-black"
        }`}
      >
        {selectedTransaction.status}
      </span>
      <div className="flex lg:flex-row flex-col gap-4 lg:items-center">
        <img
          src={registerBackground}
          alt=""
          className="lg:w-28 lg:h-28 bg-cover rounded-xl border"
        />
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-gray-800 lg:text-nowrap">
            {selectedTransaction.invoiceId}
          </h4>
          <p className="text-sm font-medium text-gray-500 lg:text-nowrap">
            Order Date: {formatDate(selectedTransaction.orderDate)}
          </p>
          <p className="text-sm font-medium text-gray-500 lg:text-nowrap">
            Expired Date: {formatDate(selectedTransaction.expiredDate)}
          </p>
        </div>
      </div>
      <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2 lg:justify-start justify-between w-full text-right">
        <span
          className={`lg:block hidden capitalize px-3 py-1 w-fit rounded-xl ${
            statusColorMap[selectedTransaction.status] ??
            "bg-slate-300 text-black"
          }`}
        >
          {selectedTransaction.status}
        </span>

        <img
          src={selectedTransaction.payment_method.imageUrl}
          alt=""
          className="w-12 h-12 object-contain"
        />

        <p className="text-base lg:text-lg font-bold text-emerald-600">
          {formatRupiah(selectedTransaction.totalAmount)}
        </p>
      </div>
    </div>
  );
};

export default DetailOrder;
