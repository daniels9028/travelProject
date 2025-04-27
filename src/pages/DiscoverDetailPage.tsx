import {
  registerBackground,
  loginBackground,
  heroBackground,
  discoverBackground,
} from "@/assets/images";
import FooterSection from "@/components/FooterSection";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import { AppDispatch, RootState } from "@/store/store";
import { activityByIdThunk } from "@/store/thunks/activityThunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const backgrounds = [
  registerBackground,
  loginBackground,
  heroBackground,
  discoverBackground,
];

const DiscoverDetailPage = () => {
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const selectedId = params.id ?? "";

  const { selectedActivity } = useSelector(
    (state: RootState) => state.activity
  );

  const index = Math.floor(Math.random() * backgrounds.length);

  useEffect(() => {
    if (!selectedId) return;
    dispatch(activityByIdThunk({ id: selectedId }));
  }, [selectedId]);

  console.log(selectedActivity);

  return (
    <>
      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgrounds[index]})`,
        }}
      >
        {/* Navbar */}
        <Navbar />

        <Hero
          title={`🌄 ${selectedActivity?.title}`}
          subtitle={`${selectedActivity?.city}, ${selectedActivity?.province}`}
          description={selectedActivity?.description ?? ""}
          buttonTitle={null}
          buttonDescription={null}
          backgroundText={null}
          buttonIcon={undefined}
          link={null}
        />
      </div>

      <div className="container mx-auto flex flex-col items-center justify-center px-6 my-10">
        <h6 className="text-center lg:text-[52px] text-[30px] font-extrabold font-manrope">
          Top Searched Destinations
        </h6>
        <p className="text-center font-manrope text-[#737373] lg:text-[25px] text-[16px]">
          Favourite destinations of professional tourists
        </p>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center gap-4 mt-8 transition-all duration-500 ease-out opacity-0 animate-fade-in">
          {/* {localLoadingCategory
            ? Array(8)
                .fill(null)
                .map((_, index) => <CategoryCardSkeleton key={index} />)
            : category
                ?.slice(0, 8)
                .map((cat, index) => (
                  <CategoryCard key={cat.id} item={cat} index={index} />
                ))} */}
        </div>

        {/* {!localLoadingCategory && (
          <Link
            to="/discover"
            className="mt-10 font-manrope text-lg font-bold text-white bg-black px-6 py-3 rounded-full flex flex-row items-center gap-4 cursor-pointer transition-all shadow-lg hover:scale-90 duration-300"
          >
            <Grip />
            Load More Destinations
          </Link>
        )} */}
      </div>

      <FooterSection />
    </>
  );
};

export default DiscoverDetailPage;
