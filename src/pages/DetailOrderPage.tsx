import { discoverBackground, no_image } from "@/assets/images";
import DetailOrder from "@/components/DetailOrder";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import { AppDispatch, RootState } from "@/store/store";
import {
  cancelTransactionThunk,
  transactionByIdThunk,
  updateTransactionProofPaymentThunk,
} from "@/store/thunks/transactionThunks";
import { formatRupiah } from "@/utils/formatDate";

import { ArrowLeft, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import { clearTransactionMessage } from "@/store/features/transactionSlices";
import { useToastMessage } from "@/hooks/useToastMessage";
import { uploadImageThunk } from "@/store/thunks/uploadThunks";

const MySwal = withReactContent(Swal);

const DetailOrderPage = () => {
  const params = useParams();

  const id = params.id ?? "";

  const dispatch = useDispatch<AppDispatch>();

  const { selectedTransaction, message } = useSelector(
    (state: RootState) => state.transaction
  );

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { url } = useSelector((state: RootState) => state.upload);

  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      if (fileSizeInMB > 1) {
        toast.warning("File size exceeds 1MB. Please choose a smaller file.");
        return;
      }

      dispatch(uploadImageThunk({ image: selectedFile }));
    }
  };

  const handleUploadPaymentProof = () => {
    if (!selectedTransaction) return;

    if (!url) {
      toast.warning("Please select file first!");
      return;
    }

    dispatch(
      updateTransactionProofPaymentThunk({
        id: selectedTransaction?.id,
        proofPaymentUrl: url,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(transactionByIdThunk({ id: selectedTransaction.id }));
        setDialogOpen(false);
      });
  };

  const handleCancelTransaction = () => {
    if (!selectedTransaction) return;

    MySwal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, Cancel Transaction!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cancelTransactionThunk({ id: selectedTransaction.id }))
          .unwrap()
          .then(() => {
            dispatch(transactionByIdThunk({ id: id }));
          });
      }
    });
  };

  useEffect(() => {
    dispatch(transactionByIdThunk({ id: id }));
  }, [dispatch, id]);

  useToastMessage({
    keyName: "updateTransactionProofPayment",
    value: message.updateTransactionProofPayment,
    clearAction: clearTransactionMessage,
  });

  useToastMessage({
    keyName: "cancelTransaction",
    value: message.cancelTransaction,
    clearAction: clearTransactionMessage,
  });

  if (!selectedTransaction) return;

  const payment = selectedTransaction.payment_method;

  return (
    <>
      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${discoverBackground})`,
        }}
      >
        <Navbar />

        <Hero
          title="Order Detail"
          subtitle="Your Complete Order History"
          description="Access detailed information on every confirmed booking and revisit past travel moments with ease."
          buttonTitle=""
          buttonDescription=""
          backgroundText=""
          buttonIcon=""
          link=""
        />
      </div>

      <div className="container mx-auto flex flex-col px-6 my-10 font-manrope gap-8">
        <div className="flex items-center gap-8">
          <Link to="/orders">
            <button className="rounded-full p-2 hover:bg-gray-200 cursor-pointer">
              <ArrowLeft size={20} />
            </button>
          </Link>
          <h3 className="font-bold text-2xl">Order Detail</h3>
        </div>

        <div className="border rounded-xl shadow-md p-8 bg-white">
          <p className="font-bold text-lg mb-6">Details</p>

          <DetailOrder selectedTransaction={selectedTransaction} />

          <p className="font-bold text-lg my-6">Payment</p>

          <div className="flex flex-col gap-4 border w-full rounded-xl p-6 border-gray-200 shadow-md">
            <div className="flex lg:flex-row flex-col items-center justify-between gap-4 p-4">
              {/* Left: Logo and name */}
              <div className="flex items-center lg:gap-4 gap-8 w-full">
                <img
                  src={payment.imageUrl}
                  alt={payment.name}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-base text-gray-800">
                    {payment.name}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">
                    {payment.virtual_account_name}
                  </p>
                </div>
              </div>

              {/* Right: Virtual account number with copy */}
              <div
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full shadow-sm cursor-pointer"
                onClick={() => handleCopy(payment.virtual_account_number)}
              >
                <p className="text-sm text-gray-800 font-semibold font-mono text-nowrap">
                  {payment.virtual_account_number}
                </p>
                <button
                  onClick={() => handleCopy(payment.virtual_account_number)}
                  className="text-gray-500 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                  title="Copy to clipboard"
                >
                  <Copy size={18} />
                </button>
                {copied && (
                  <span className="ml-2 text-xs text-green-600 transition-opacity duration-300">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="font-bold text-lg my-6">Total Payment</p>

          <div className="flex flex-col gap-4 border w-full rounded-xl p-6 border-gray-200 shadow-md">
            <p className="text-red-500 font-bold text-lg">
              {formatRupiah(selectedTransaction.totalAmount)}
            </p>
          </div>

          <p className="font-bold text-lg my-6">Payment Proof</p>

          <div className="flex flex-col gap-4 border w-full rounded-xl p-6 border-gray-200 shadow-md">
            <img
              src={selectedTransaction.proofPaymentUrl ?? no_image}
              alt="payment-proof"
              onError={(e) => ((e.target as HTMLImageElement).src = no_image)}
              className="w-full h-fit rounded-xl object-cover"
            />
          </div>

          {selectedTransaction.status === "pending" && (
            <div className="my-6 flex flex-col lg:flex-row items-center gap-4 w-full">
              <button
                className="w-full lg:w-1/2 bg-rose-100 hover:bg-rose-200 text-rose-700 font-medium py-2 px-4 rounded-xl shadow-sm transition-all duration-200 cursor-pointer"
                onClick={handleCancelTransaction}
              >
                Cancel Transaction
              </button>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full lg:w-1/2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-xl shadow-sm transition-all duration-200 cursor-pointer">
                    Upload Payment Proof
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Upload Payment Proof</DialogTitle>
                    <DialogDescription>
                      Please upload your payment proof image here.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="flex flex-col gap-4">
                      <Label
                        htmlFor="name"
                        className="text-right text-wrap text-sm"
                      >
                        Payment Proof
                      </Label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100 cursor-pointer"
                      />
                      <p className="text-sm text-slate-500">Max size: 1 MB</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <button
                      className="bg-black text-white px-4 py-2 rounded-lg font-medium text-sm cursor-pointer"
                      onClick={handleUploadPaymentProof}
                    >
                      Upload Payment Proof
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailOrderPage;
