import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppDispatch, RootState } from "@/store/store";
import {
  cancelTransactionThunk,
  transactionByIdThunk,
  updateTransactionStatusThunk,
} from "@/store/thunks/transactionThunks";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatDate, formatRupiah } from "@/utils/formatDate";
import { toast } from "react-toastify";
import { clearTransactionMessage } from "@/store/features/transactionSlices";

const DetailTransaction = () => {
  const params = useParams();
  const id = params.id || "";
  const dispatch = useDispatch<AppDispatch>();
  const { selectedTransaction, message } = useSelector(
    (state: RootState) => state.transaction
  );

  const length = selectedTransaction?.transaction_items.length
    ? selectedTransaction.transaction_items.length
    : 0;

  const [selectedStatus, setSelectedStatus] = useState<string | undefined>("");

  const handleChangeStatus = (status: string) => {
    setSelectedStatus(status);
  };

  const handleUpdateTransactionStatus = () => {
    if (!selectedStatus) {
      toast.error("Please choose status!");
      return;
    }

    dispatch(updateTransactionStatusThunk({ id: id, status: selectedStatus }));
  };

  const handleCancelTransaction = () => {
    dispatch(cancelTransactionThunk({ id: id }));
  };

  useEffect(() => {
    dispatch(transactionByIdThunk({ id: id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (message.updateTransactionStatus) {
      toast.success(message.updateTransactionStatus);

      dispatch(clearTransactionMessage({ key: "updateTransactionStatus" }));

      dispatch(transactionByIdThunk({ id: id }));
    }
  }, [message.updateTransactionStatus]);

  useEffect(() => {
    if (message.cancelTransaction) {
      toast.success(message.cancelTransaction);

      dispatch(clearTransactionMessage({ key: "cancelTransaction" }));

      dispatch(transactionByIdThunk({ id: id }));
    }
  }, [message.cancelTransaction]);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Transaction Details" />
        <div className="flex flex-1 flex-col p-6">
          <div className="max-w-4xl w-full mx-auto bg-gray-100 rounded-lg shadow-lg p-6">
            {/* Invoice & Status */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Invoice: {selectedTransaction?.invoiceId || "-"}
              </h2>
              <span className="px-3 py-1 bg-yellow-200 text-yellow-700 text-sm font-semibold rounded-lg uppercase">
                {selectedTransaction?.status || "-"}
              </span>
            </div>

            {/* Detail Pesanan (Dynamic) */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <h3 className="text-lg font-bold mb-2">Detail Pesanan</h3>
              {length > 0 ? (
                selectedTransaction?.transaction_items.map((item, index) => (
                  <div key={index} className="border-b py-2">
                    <p className="text-gray-700 font-semibold">
                      #{index + 1} - {item.title}
                    </p>
                    <p className="text-gray-500">{item.description}</p>
                    <p className="text-gray-600 font-medium">
                      Jumlah: {item.quantity}
                    </p>
                    <p className="text-orange-500 text-lg font-bold">
                      {formatRupiah(item.price)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No order details available</p>
              )}
            </div>

            {/* Informasi Transaksi */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <h3 className="text-lg font-bold">Informasi Transaksi</h3>
              <h5 className="text-base font-semibold">Payment Proof</h5>
              <div className="w-full h-[200px] bg-gray-300 rounded-lg overflow-hidden my-3 flex justify-center items-center">
                {selectedTransaction?.proofPaymentUrl ? (
                  <img
                    src={selectedTransaction.proofPaymentUrl}
                    alt={selectedTransaction.invoiceId}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-gray-500">No proof payment image</p>
                )}
              </div>
              <div className="flex lg:flex-row flex-col items-center justify-between gap-2">
                <p className="text-gray-600 flex items-center lg:flex-row flex-col">
                  <span className="font-semibold text-black mr-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                  </span>
                  <span className="font-semibold text-black mr-2">
                    Order Date :
                  </span>
                  {formatDate(selectedTransaction?.orderDate ?? "")}
                </p>
                <p className="text-gray-600 flex items-center lg:flex-row flex-col">
                  <span className="font-semibold text-black mr-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                  </span>
                  <span className="font-semibold text-black mr-2">
                    Expired Date :
                  </span>
                  {formatDate(selectedTransaction?.expiredDate ?? "")}
                </p>
              </div>
            </div>

            {/* Metode Pembayaran & Ringkasan */}
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold">Metode Pembayaran</h3>
                <img
                  src={selectedTransaction?.payment_method.imageUrl}
                  alt="payment_method_image"
                  className="w-20 h-20"
                />
                <p className="text-gray-700 font-medium">
                  {selectedTransaction?.payment_method?.name || "-"}
                </p>
                <p className="text-gray-600">
                  Nama Akun:{" "}
                  {selectedTransaction?.payment_method?.virtual_account_name ||
                    "-"}
                </p>
                <p className="text-gray-600">
                  Nomor VA:{" "}
                  {selectedTransaction?.payment_method
                    ?.virtual_account_number || "-"}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold">Ringkasan Pembayaran</h3>
                <p className="text-gray-700 font-bold text-base mt-2">
                  <span className="mr-2 font-semibold text-black">
                    Total Pembayaran :
                  </span>
                  {formatRupiah(selectedTransaction?.totalAmount ?? 0)}
                </p>
                {selectedTransaction?.status === "pending" && (
                  <>
                    <div className="my-2">
                      <Select
                        value={selectedStatus}
                        onValueChange={handleChangeStatus}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="success">Success</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="button"
                      className="w-full my-2 cursor-pointer"
                      onClick={handleUpdateTransactionStatus}
                    >
                      Update Status
                    </Button>
                    <Button
                      type="button"
                      className="w-full cursor-pointer"
                      variant="destructive"
                      onClick={handleCancelTransaction}
                    >
                      Batalkan Transaksi
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DetailTransaction;
