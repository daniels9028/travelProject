import { discoverBackground } from "@/assets/images";
import DiscoverCard from "@/components/DiscoverCard";
import FooterSection from "@/components/FooterSection";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import { AppDispatch, RootState } from "@/store/store";
import {
  activityByCategoryIdThunk,
  allActivityThunk,
} from "@/store/thunks/activityThunks";
import { allCategoryThunk } from "@/store/thunks/categoryThunks";
import { DiamondPercent } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DiscoverPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { activity, activityByCategory } = useSelector(
    (state: RootState) => state.activity
  );
  const { category } = useSelector((state: RootState) => state.category);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "all"
  );

  const handleChangeSelectedCategory = (name: string) => {
    setSelectedCategory(name);
  };

  useEffect(() => {
    dispatch(allCategoryThunk());
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    if (selectedCategory === "all") {
      dispatch(allActivityThunk());
    } else {
      dispatch(activityByCategoryIdThunk({ id: selectedCategory }));
    }
  }, [dispatch, selectedCategory]);

  const selectedActivity =
    selectedCategory === "all" ? activity : activityByCategory;

  console.log(selectedActivity);
  return (
    <>
      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${discoverBackground})`,
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <Hero
          title="🌄 Adventure Seeker Vibe"
          subtitle="Adventure Awaits Around Every Corner"
          description="Trek through the wild, dive into the unknown, and unlock once-in-a-lifetime experiences curated just for the bold."
          buttonTitle="View Special Deals"
          buttonDescription="Don’t just dream it — do it. Discover limited-time deals on unforgettable getaways."
          backgroundText="Your Dream Trip, for Less"
          buttonIcon={<DiamondPercent />}
          link="/special-deals"
        />
      </div>

      {/* Recommended Discover Section */}
      <div className="container mx-auto flex flex-col items-center justify-center px-6 my-12 font-manrope">
        <h6 className="text-center lg:text-[52px] text-[30px] font-extrabold font-manrope">
          Our Featured Tours
        </h6>
        <p className="text-center font-manrope text-[#737373] lg:text-[25px] text-[16px]">
          Favorite destinations based on customer reviews
        </p>

        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4 mt-8">
          <button
            onClick={() => handleChangeSelectedCategory("all")}
            className={`border px-4 py-2 rounded-full cursor-pointer transition-all font-semibold shadow-sm ${
              "all" === selectedCategory
                ? "text-white bg-black"
                : "hover:bg-gray-300"
            }`}
          >
            All
          </button>
          {category.map((cat) => (
            <button
              onClick={() => handleChangeSelectedCategory(cat.id)}
              key={cat.id}
              className={`border px-4 py-2 rounded-full cursor-pointer transition-all font-semibold shadow-sm ${
                cat.id === selectedCategory
                  ? "text-white bg-black"
                  : "hover:bg-gray-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center gap-4 mt-8 min-h-[200px]">
          {selectedActivity.length > 0 ? (
            selectedActivity.map((item, index) => (
              <DiscoverCard key={item.id} item={item} index={index} />
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center">
              <p className="bg-red-100 text-red-600 px-6 py-3 rounded-lg text-lg font-medium shadow-md">
                No discover destinations found.
              </p>
            </div>
          )}
        </div>
      </div>

      <FooterSection />
    </>
  );
};

export default DiscoverPage;
