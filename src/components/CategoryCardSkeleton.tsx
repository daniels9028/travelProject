const CategoryCardSkeleton = () => {
  return (
    <div className="max-w-sm w-[250px] shadow-md font-manrope overflow-hidden rounded-xl border border-gray-200 p-3 flex flex-col gap-4 animate-pulse">
      <div className="w-full h-24 bg-gray-300 rounded-xl" />

      <div className="flex flex-col gap-2">
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        <div className="flex flex-row justify-between items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
            <div className="w-20 h-4 bg-gray-300 rounded" />
          </div>
          <div className="w-6 h-6 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
