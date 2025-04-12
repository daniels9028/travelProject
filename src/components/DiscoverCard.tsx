import { registerBackground } from "@/assets/images";
import { useEffect, useState } from "react";
import { MapPin, Heart } from "lucide-react";
import { formatRupiah } from "@/utils/formatDate";

const DiscoverCard = ({
  item,
  index,
}: {
  item: Record<string, any>;
  index: number;
}) => {
  const types = ["Top Rated", "Best Sale", "25% Off"];
  const type = types[index % types.length];

  const [bgImage, setBgImage] = useState(null);

  useEffect(() => {
    const img = new Image();
    const url = item.imageUrls?.[0];

    img.src = url;
    img.onload = () => setBgImage(url);
    img.onerror = () => setBgImage(registerBackground);
  }, [item.imageUrls]);

  return (
    <div className="w-[300px] rounded-2xl overflow-hidden shadow-md bg-white flex flex-col">
      {/* Background image area */}
      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          height: "240px",
        }}
      >
        {/* Top-left badge */}
        <span className="absolute top-3 left-3 bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {type}
        </span>

        {/* Top-right heart button */}
        <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md">
          <Heart size={12} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 bg-white rounded-t-3xl -mt-5 z-10 relative border border-gray-100">
        {/* Rating badge */}
        <div className="inline-flex items-center bg-white px-2 py-1 rounded-full text-sm text-gray-700 shadow mb-2">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="font-semibold text-gray-800">{item.rating}</span>
          <span className="ml-1 text-gray-500">
            ({item.total_reviews ?? 0} reviews)
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold capitalize text-gray-900 leading-snug">
          {item.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
          <div className="flex items-center gap-2 text-[14px]">
            <MapPin size={12} />
            <span className="capitalize">
              {item.city}, {item.province}
            </span>
          </div>
        </div>

        {/* Price and button */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <span className="text-xl font-bold text-gray-900">
            {formatRupiah(item.price)}
          </span>
          <button className="bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 px-4 py-2 rounded-lg font-bold cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverCard;
