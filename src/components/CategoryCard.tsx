import { useEffect, useState } from "react";
import { FlagTriangleRight, ArrowRight } from "lucide-react";
import activityServices from "@/api/activityServices";
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

const CategoryCard = ({
  item,
  index,
}: {
  item: Record<string, any>;
  index: number;
}) => {
  const [total, setTotal] = useState<number>(0);

  const handleGetTotalActivitiesByCategoryId = async () => {
    try {
      const response = await activityServices.activityByCategoryIdService({
        id: item.id,
      });

      setTotal(response?.data?.length ?? 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetTotalActivitiesByCategoryId();
  }, [item.id]);

  return (
    <div className="max-w-sm w-[250px] shadow-md font-manrope overflow-hidden rounded-xl border border-gray-200 p-3 flex flex-col gap-4">
      <img
        src={categoryImages[index]}
        alt={item.id}
        className="w-full h-24 object-cover border border-gray-300 rounded-xl"
      />
      <div className="flex flex-col gap-2">
        <p className="font-bold text-[18px]">{item.name}</p>
        <div className="flex flex-row justify-between items-center gap-2 text-[#737373] text-[14px]">
          <div className="flex flex-row items-center gap-2 font-medium">
            <FlagTriangleRight color="gray" size={14} />
            {total} Activities
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
  );
};

export default CategoryCard;
