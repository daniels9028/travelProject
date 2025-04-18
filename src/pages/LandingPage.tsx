import Navbar from "@/components/landing-page/Navbar";
import {
  customerService,
  heroBackground,
  security,
  support,
  policies,
  reputable,
  paymentOne,
  paymentTwo,
  paymentThree,
  paypal,
  stripe,
  visa,
  skrill,
} from "@/assets/images";
import Hero from "@/components/landing-page/Hero";
import { LocateIcon, Grip } from "lucide-react";
import DiscoverCard from "@/components/DiscoverCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { allActivityThunk } from "@/store/thunks/activityThunks";
import { Link } from "react-router-dom";
import { allCategoryThunk } from "@/store/thunks/categoryThunks";
import CategoryCard from "@/components/CategoryCard";
import CustomerServiceList from "@/components/CustomerServiceList";
import SpecialDealCard from "@/components/SpecialDealCard";
import { allPromoThunk } from "@/store/thunks/promoThunks";
import FooterSection from "@/components/FooterSection";
import DiscoverCardSkeleton from "@/components/DiscoverCardSkeleton";
import CategoryCardSkeleton from "@/components/CategoryCardSkeleton";
import SpecialDealCardSkeleton from "@/components/SpecialDealCardSkeleton";

const customerLists = [
  {
    title: "Security Assurance",
    subtitle:
      "Keeping your travel plans safe with strong data protection and secure transactions.",
    icon: security,
  },
  {
    title: "Customer Support",
    subtitle: "Here to help you—anytime, anywhere on your travel journey.",
    icon: support,
  },
  {
    title: "Transparent Policies",
    subtitle:
      "Clear, honest, and easy-to-understand policies for a worry-free experience.",
    icon: policies,
  },
  {
    title: "Reputable Affiliations",
    subtitle: "Partnered with trusted names to ensure quality and reliability.",
    icon: reputable,
  },
];

const paymentMethods = [paypal, stripe, skrill, visa];

const LandingPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { activity, loading: loadingActivity } = useSelector(
    (state: RootState) => state.activity
  );

  const { category, loading: loadingCategory } = useSelector(
    (state: RootState) => state.category
  );

  const { promo, loading: loadingPromo } = useSelector(
    (state: RootState) => state.promo
  );

  useEffect(() => {
    dispatch(allActivityThunk());
    dispatch(allCategoryThunk());
    dispatch(allPromoThunk());
  }, [dispatch]);

  return (
    <>
      <div
        className="relative w-full bg-cover bg-center bg-gray-100"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroBackground})`,
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <Hero
          title="🌍 Explore the World with TravelGo"
          subtitle="Your Next Great Journey Begins Here"
          description="Start your adventure today and discover breathtaking destinations,
          handpicked experiences, and travel deals tailored just for you."
          buttonTitle="Discover Now"
          buttonDescription="Browse 1000+ unforgettable destinations"
          backgroundText="Where Will You Go Next?"
          buttonIcon={<LocateIcon />}
          link="/discover"
        />
      </div>

      {/* Top Searched Destinations */}
      <div className="container mx-auto flex flex-col items-center justify-center px-6 my-10">
        <h6 className="text-center lg:text-[52px] text-[30px] font-extrabold font-manrope">
          Top Searched Destinations
        </h6>
        <p className="text-center font-manrope text-[#737373] lg:text-[25px] text-[16px]">
          Favourite destinations of professional tourists
        </p>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center gap-4 mt-8">
          {loadingCategory.allCategory
            ? Array(8)
                .fill(null)
                .map((_, index) => <CategoryCardSkeleton key={index} />)
            : category
                ?.slice(0, 8)
                .map((cat, index) => (
                  <CategoryCard key={cat.id} item={cat} index={index} />
                ))}
        </div>

        {!loadingCategory.allCategory && (
          <Link
            to="/discover"
            className="mt-10 font-manrope text-lg font-bold text-white bg-black px-6 py-3 rounded-full flex flex-row items-center gap-4 cursor-pointer transition-all shadow-lg hover:scale-90 duration-300"
          >
            <Grip />
            Load More Destinations
          </Link>
        )}
      </div>

      <div className="w-full bg-[#FFF0EC]">
        <div className="container font-manrope mx-auto flex lg:flex-row flex-col items-center justify-center px-6 py-20 gap-10">
          <img
            src={customerService}
            alt="customer_service"
            className="object-cover w-[400px] h-[500px]"
          />
          <div>
            <h3 className="text-[52px] font-extrabold">You will love us</h3>
            <p className="font-medium text-[20px] text-[#737373]">
              Because more than 268 other customers have loved us too
            </p>

            <div className="grid lg:grid-cols-2 grid-cols-1 mt-10 gap-8">
              {customerLists.map((customerList, index) => (
                <CustomerServiceList item={customerList} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Discover Section */}
      <div className="container mx-auto flex flex-col items-center justify-center px-6 my-12">
        <h6 className="text-center lg:text-[52px] text-[30px] font-extrabold font-manrope">
          Recommended For You
        </h6>
        <p className="text-center font-manrope text-[#737373] lg:text-[25px] text-[16px]">
          The best booking platform you can trust
        </p>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center gap-4 mt-8">
          {loadingActivity.allActivity
            ? Array(6)
                .fill(null)
                .map((_, index) => <DiscoverCardSkeleton key={index} />)
            : activity
                ?.slice(0, 6)
                .map((item, index) => (
                  <DiscoverCard key={item.id} item={item} index={index} />
                ))}
        </div>

        {!loadingActivity.allActivity && (
          <Link
            to="/discover"
            className="mt-10 font-manrope text-lg font-bold text-white bg-black px-6 py-2 rounded-full flex flex-row items-center gap-4 cursor-pointer transition-all shadow-lg hover:scale-90 duration-300"
          >
            <Grip />
            Load More Tours
          </Link>
        )}
      </div>

      <div className="w-full bg-[#E3F0FF]">
        <div className="container font-manrope mx-auto flex lg:flex-row flex-col items-center justify-center px-6 py-20 gap-10">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-4">
              <img
                src={paymentOne}
                alt=""
                className="object-cover h-full overflow-hidden rounded-lg"
              />
              <img
                src={paymentTwo}
                alt=""
                className="object-cover h-full overflow-hidden rounded-lg"
              />
            </div>
            <div>
              <img
                src={paymentThree}
                alt=""
                className="object-cover h-full overflow-hidden rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <button className="px-4 py-3 bg-white font-bold text-[14px] w-fit rounded-full">
              Takes You Skyward
            </button>
            <h3 className="text-[36px] font-extrabold">
              Your Premier Destination for Unmatched Flight Experiences
            </h3>
            <p className="font-medium text-[18px]">
              Experience stress-free travel planning with our website where you
              can easily book flights, check in an make changes to your
              itinerary with just a few clicks
            </p>

            <div className="flex flex-row items-center gap-4 mt-8">
              {paymentMethods.map((method, index) => (
                <button
                  className="bg-white rounded-lg px-4 py-3 shadow-md"
                  key={index}
                >
                  <img
                    src={method}
                    alt={`#${index}`}
                    className="h-6 w-20 bg-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*Promo Section */}
      <div className="container mx-auto flex flex-col items-center justify-center px-6 my-12">
        <h6 className="text-center lg:text-[52px] text-[30px] font-extrabold font-manrope">
          Best Offer Deals For You
        </h6>
        <p className="text-center font-manrope text-[#737373] lg:text-[25px] text-[16px]">
          Steals, Deals, and Everything in Between!
        </p>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center gap-4 mt-8">
          {loadingPromo.allPromo
            ? Array(6)
                .fill(null)
                .map((_, index) => <SpecialDealCardSkeleton key={index} />)
            : promo
                ?.slice(0, 6)
                .map((pro, index) => (
                  <SpecialDealCard key={pro.id} item={pro} index={index} />
                ))}
        </div>

        {!loadingPromo.allPromo && (
          <Link
            to="/special-deals"
            className="mt-10 font-manrope text-lg font-bold text-white bg-black px-6 py-3 rounded-full flex flex-row items-center gap-4 cursor-pointer transition-all shadow-lg hover:scale-90 duration-300"
          >
            <Grip />
            Load More Special Deals
          </Link>
        )}
      </div>

      <FooterSection />
    </>
  );
};

export default LandingPage;
