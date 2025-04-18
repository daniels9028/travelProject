const DiscoverCardSkeleton = () => {
  return (
    <div className="w-[300px] rounded-2xl overflow-hidden shadow-md bg-white flex flex-col animate-pulse">
      {/* Skeleton Image */}
      <div className="relative w-full bg-gray-200" style={{ height: "240px" }}>
        <div className="absolute top-3 left-3 w-20 h-6 bg-gray-300 rounded-full" />
        <div className="absolute top-3 right-3 w-8 h-8 bg-gray-300 rounded-full" />
      </div>

      {/* Skeleton Content */}
      <div className="p-4 bg-white rounded-t-3xl -mt-5 z-10 relative border border-gray-100">
        {/* Rating badge */}
        <div className="w-32 h-5 bg-gray-200 rounded-full mb-2" />

        {/* Title */}
        <div className="w-48 h-5 bg-gray-200 rounded mb-1" />

        {/* Location */}
        <div className="w-40 h-4 bg-gray-200 rounded mb-4" />

        {/* Price and button */}
        <div className="flex justify-between items-center">
          <div className="w-20 h-6 bg-gray-200 rounded" />
          <div className="w-24 h-8 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default DiscoverCardSkeleton;
