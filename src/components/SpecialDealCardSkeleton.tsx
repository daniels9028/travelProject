const SpecialDealCardSkeleton = () => {
  return (
    <div className="cursor-pointer animate-pulse max-w-sm w-[300px] h-[350px] shadow-md font-manrope overflow-hidden rounded-lg border border-gray-200 p-2 flex flex-col gap-4">
      <div className="relative w-full bg-gray-200 rounded-lg p-2 border h-full">
        <div className="bg-white w-[260px] bottom-4 absolute px-4 py-6 overflow-hidden rounded-lg">
          <div className="flex flex-col gap-2">
            <div className="h-5 w-3/4 bg-gray-300 rounded" />
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full" />
                <div className="w-20 h-4 bg-gray-300 rounded" />
              </div>
              <div className="w-6 h-6 bg-gray-300 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialDealCardSkeleton;
