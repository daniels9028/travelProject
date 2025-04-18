import { promoBackground } from "@/assets/images";
import FooterSection from "@/components/FooterSection";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import SpecialDealCard from "@/components/SpecialDealCard";
import SpecialDealCardSkeleton from "@/components/SpecialDealCardSkeleton";
import { AppDispatch, RootState } from "@/store/store";
import { allPromoThunk } from "@/store/thunks/promoThunks";
import { Map } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SpecialDealsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { promo, loading } = useSelector((state: RootState) => state.promo);

  const [localLoading, setLocalLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(allPromoThunk());
  }, [dispatch]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // When loading starts
    if (loading.allPromo) {
      setLocalLoading(true);
    }

    // When loading ends
    if (!loading.allPromo) {
      timeout = setTimeout(() => {
        setLocalLoading(false);
      }, 1500); // smooth delay before hiding skeletons
    }

    return () => clearTimeout(timeout);
  }, [loading.allPromo]);

  return (
    <>
      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${promoBackground})`,
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <Hero
          title="🎁 Option 2: Friendly & Inviting"
          subtitle="Travel More, Spend Less"
          description="From weekend escapes to bucket-list journeys—explore special deals handpicked to give you the best value without compromise."
          buttonTitle="Explore More Destinations"
          buttonDescription="Didn’t find the perfect deal? Browse more incredible places across the globe."
          backgroundText="More Wonders Await"
          buttonIcon={<Map />}
          link="/discover"
        />
      </div>

      <div className="container mx-auto flex flex-col items-center justify-center px-6 my-12">
        <h6 className="text-center lg:text-[52px] text-[30px] font-extrabold font-manrope">
          Today’s Top Offers
        </h6>
        <p className="text-center font-manrope text-[#737373] lg:text-[25px] text-[16px]">
          Big Savings. Little Effort
        </p>

        <div className="flex flex-col items-center w-full mt-8">
          <input
            type="search"
            placeholder="Search Special Deals For You..."
            className="w-full lg:w-2/3 border border-gray-300 px-4 py-2.5 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center gap-4 mt-8 transition-all duration-500 ease-out opacity-0 animate-fade-in">
          {localLoading
            ? Array(6)
                .fill(null)
                .map((_, index) => <SpecialDealCardSkeleton key={index} />)
            : promo
                ?.slice(0, 6)
                .map((pro, index) => (
                  <SpecialDealCard key={pro.id} item={pro} index={index} />
                ))}
        </div>
      </div>

      <FooterSection />
    </>
  );
};

export default SpecialDealsPage;
