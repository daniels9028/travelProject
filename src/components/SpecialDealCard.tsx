import { ClipboardCopy, Info } from "lucide-react";
import {
  categoryOne,
  categoryTwo,
  categoryThree,
  categoryFour,
  categoryFive,
  categorySix,
  categorySeven,
  categoryEight,
  promoBackground,
} from "@/assets/images";
import { formatRupiah } from "@/utils/formatDate";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const categoryImages = [
  categoryOne,
  categoryTwo,
  categoryThree,
  categoryFour,
  categoryFive,
  categorySix,
  categorySeven,
  categoryEight,
];

const SpecialDealCard = ({
  item,
  index,
}: {
  item: Record<string, any>;
  index: number;
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.promo_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-sm w-[300px] h-[350px] shadow-md font-manrope overflow-hidden rounded-lg border border-gray-200 p-2 flex flex-col gap-4">
      <div
        className="relative w-full bg-cover bg-center rounded-lg p-2 border h-full"
        style={{
          backgroundImage: `url(${categoryImages[index]})`,
        }}
      >
        <div className="bg-white w-[260px] bottom-4 absolute px-4 py-6 overflow-hidden rounded-lg">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-[18px] truncate capitalize">
              {item.title}
            </p>
            <div className="flex flex-row justify-between items-center gap-2 text-[#737373] text-[14px]">
              <div className="flex flex-row items-center gap-2 font-medium text-base">
                {formatRupiah(item.promo_discount_price ?? 0)}
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="p-1 bg-black rounded-full w-6 h-6 flex items-center justify-center cursor-pointer">
                    <Info color="white" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto font-manrope">
                  <DialogHeader>
                    <DialogTitle className="capitalize text-xl font-bold">
                      {item.title}
                    </DialogTitle>
                    <DialogDescription>{item.description}</DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col">
                    <img
                      src={
                        item.imageUrl?.startsWith("http")
                          ? item.imageUrl
                          : promoBackground
                      }
                      alt={item.id}
                      className="w-full h-[300px] bg-cover rounded-xl"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src = promoBackground)
                      }
                    />
                    <div className="space-y-4 mt-8">
                      {/* Promo Code */}
                      <div className="flex justify-between items-center bg-slate-100 p-4 rounded-xl border border-slate-200 shadow">
                        <div className="flex flex-col">
                          <span className="text-slate-500 text-sm font-medium">
                            Promo Code
                          </span>
                          <span className="text-slate-800 font-bold text-lg tracking-wide">
                            {item.promo_code}
                          </span>
                        </div>
                        <button
                          onClick={handleCopy}
                          className="flex items-center gap-2 bg-white border border-slate-300 text-slate-600 px-3 py-1 rounded-lg hover:bg-slate-50 transition"
                        >
                          <ClipboardCopy size={18} />
                          <span className="text-sm">
                            {copied ? "Copied!" : "Copy"}
                          </span>
                        </button>
                      </div>

                      {/* Prices */}
                      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200 shadow">
                        <div className="text-slate-600 font-medium">
                          Promo Discount Price
                        </div>
                        <div className="text-rose-500 font-semibold">
                          {formatRupiah(item.promo_discount_price)}
                        </div>
                      </div>

                      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200 shadow">
                        <div className="text-slate-600 font-medium">
                          Minimum Claim Price
                        </div>
                        <div className="text-indigo-500 font-semibold">
                          {formatRupiah(item.minimum_claim_price)}
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow mt-6">
                        <h3 className="text-slate-700 font-semibold text-base mb-2">
                          Terms & Conditions
                        </h3>
                        <p>{item.terms_condition}</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialDealCard;
