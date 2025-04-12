import { ArrowRight, CircleDollarSign } from "lucide-react";
import {
  categoryOne,
  categoryTwo,
  categoryThree,
  categoryFour,
  categoryFive,
  categorySix,
  categorySeven,
  categoryEight,
} from "@/assets/images";
import { Link } from "react-router-dom";
import { formatRupiah } from "@/utils/formatDate";

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
            <p className="font-bold text-[18px] truncate">{item.title}</p>
            <div className="flex flex-row justify-between items-center gap-2 text-[#737373] text-[14px]">
              <div className="flex flex-row items-center gap-2 font-medium text-base">
                <CircleDollarSign color="gray" size={16} />
                {formatRupiah(item.promo_discount_price ?? 0)}
              </div>
              <Link
                to="/discover"
                className="p-1 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
              >
                <ArrowRight color="black" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialDealCard;
