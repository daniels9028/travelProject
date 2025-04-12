import { ArrowRight } from "lucide-react";

const CustomerServiceList = ({ item }: { item: Record<string, any> }) => {
  return (
    <div className="flex flex-row gap-6">
      <div className="rounded-2xl shadow-lg bg-white p-4 h-fit">
        <img src={item.icon} alt={item.title} className="w-10 object-cover" />
      </div>
      <div className="flex flex-col items-start gap-2">
        <h5 className="text-[20px] font-bold">{item.title}</h5>
        <p className="text-[14px] font-medium text-[#737373]">
          {item.subtitle}
        </p>
        <span className="font-medium text-[14px] flex flex-row items-center gap-2 cursor-pointer">
          Learn more <ArrowRight size={14} />
        </span>
      </div>
    </div>
  );
};

export default CustomerServiceList;
