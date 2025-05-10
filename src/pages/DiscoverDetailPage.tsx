import {
  registerBackground,
  loginBackground,
  heroBackground,
  discoverBackground,
  randomDiscover1,
  randomDiscover2,
  randomDiscover3,
  randomDiscover4,
  randomDiscover5,
} from "@/assets/images";
import FooterSection from "@/components/FooterSection";
import { Star, Flag, MapPin } from "lucide-react";
import Navbar from "@/components/landing-page/Navbar";
import { AppDispatch, RootState } from "@/store/store";
import { activityByIdThunk } from "@/store/thunks/activityThunks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { formatRupiah } from "@/utils/formatDate";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addCartThunk, allCartThunk } from "@/store/thunks/cartThunks";
import { toast } from "react-toastify";
import { clearCartMessage } from "@/store/features/cartSlices";
import Hero from "@/components/landing-page/Hero";

const MySwal = withReactContent(Swal);

const randomDiscover: Record<string, string> = {
  randomDiscover1,
  randomDiscover2,
  randomDiscover3,
  randomDiscover4,
  randomDiscover5,
};

const DiscoverDetailPage = () => {
  const params = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const selectedId = params.id ?? "";

  const { loggedUser } = useSelector((state: RootState) => state.user);

  const { selectedActivity } = useSelector(
    (state: RootState) => state.activity
  );

  const { message } = useSelector((state: RootState) => state.cart);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleBookNow = () => {
    if (!selectedActivity) return;

    if (!loggedUser) {
      MySwal.fire({
        title: "You need to be logged in",
        text: "Please log in to proceed with booking.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#aaa",
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page
          navigate("/login");
        }
      });
      return;
    }

    dispatch(addCartThunk({ activityId: selectedActivity.id }))
      .unwrap()
      .then((_) => {
        setTimeout(() => {
          navigate("/cart");
        }, 1000);
      });
  };

  const handleAddCart = () => {
    if (!selectedActivity) return;

    if (!loggedUser) {
      MySwal.fire({
        title: "You need to be logged in",
        text: "Please log in to proceed with add to cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#aaa",
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page
          navigate("/login");
        }
      });
      return;
    }

    dispatch(addCartThunk({ activityId: selectedActivity.id }))
      .unwrap()
      .then((_) => {
        dispatch(allCartThunk());
      });
  };

  useEffect(() => {
    const keys = Object.keys(randomDiscover);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setSelectedImage(randomDiscover[randomKey]);
  }, []);

  useEffect(() => {
    if (!selectedId) return;

    dispatch(activityByIdThunk({ id: selectedId }));
  }, [selectedId, dispatch]);

  useEffect(() => {
    if (message.addCart) {
      toast.info(message.addCart);

      dispatch(clearCartMessage({ key: "addCart" }));
    }
  }, [message.addCart]);

  return (
    <>
      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${selectedImage})`,
        }}
      >
        <Navbar />

        <Hero
          title="Discover Details"
          subtitle="Explore Deeper Before You Decide"
          description="Uncover in-depth information, unique highlights, and key features to help you make the right choice before booking or purchasing."
          buttonTitle=""
          buttonDescription=""
          backgroundText=""
          buttonIcon=""
          link=""
        />
      </div>

      <div className="container mx-auto flex flex-col px-6 my-10 font-manrope">
        <div className="flex flex-row items-center gap-4 mb-4">
          <span className="bg-green-100 text-green-600 lg:text-lg text-base font-semibold px-6 py-1 rounded-full shadow-sm w-fit">
            Best Sale
          </span>
          <span className="bg-gray-200 text-black lg:text-lg text-base font-semibold px-6 py-1 rounded-full shadow-sm w-fit">
            Top Rated
          </span>
        </div>
        <h6 className="lg:text-[52px] text-[30px] font-extrabold mb-4">
          {selectedActivity?.title}
        </h6>
        <div className="flex lg:flex-row flex-col lg:items-center lg:gap-8 gap-2">
          <div className="flex flex-row items-center gap-2 lg:text-lg">
            <Star size={18} />
            {selectedActivity?.rating}/5.0{" "}
            <span className="font-semibold text-gray-500 text-nowrap">
              ({selectedActivity?.total_reviews}+ Reviews)
            </span>
          </div>
          <p className="flex flex-row items-center gap-2 text-lg">
            <MapPin size={18} />
            {selectedActivity?.city}, {selectedActivity?.province}
          </p>
          <p className="flex flex-row items-center gap-2 text-lg">
            <Flag size={18} />
            {selectedActivity?.category.name}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 mb-10">
        <div className="flex flex-wrap gap-2">
          {/* Left side - Big Photo */}
          <div className="flex-1 lg:w-1/2 lg:h-[410px] w-full">
            <img
              src={loginBackground}
              alt="Big Beach"
              className="w-full h-full object-cover rounded-lg shadow-md border"
            />
          </div>

          {/* Right side - Three Small Photos */}
          <div className="flex flex-col gap-2 lg:w-1/2 w-full">
            <div className="lg:h-[200px]">
              <img
                src={registerBackground}
                alt="Small Beach 1"
                className="w-full h-full object-cover rounded-lg shadow-md border"
              />
            </div>
            <div className="lg:h-[200px] flex gap-2">
              <div className="flex-1">
                <img
                  src={heroBackground}
                  alt="Small Beach 2"
                  className="w-full h-full object-cover rounded-lg shadow-md border"
                />
              </div>
              <div className="flex-1">
                <img
                  src={discoverBackground}
                  alt="Small Windmill"
                  className="w-full h-full object-cover rounded-lg shadow-md border"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container flex lg:flex-row flex-col mx-auto px-6 mb-10 font-manrope gap-4">
        <div className="lg:w-2/3 w-full">
          <h6 className="lg:text-[52px] text-[30px] font-extrabold mb-2">
            Tour Overview
          </h6>
          <p className="font-manrope text-[#737373] lg:text-[20px] text-[14px]">
            {selectedActivity?.description ?? "-"}
          </p>

          <hr className="border my-10" />

          <h6 className="lg:text-[52px] text-[30px] font-extrabold mb-2">
            What's Included
          </h6>
          <p className="font-manrope text-[#737373] lg:text-[20px] text-[14px]">
            {selectedActivity?.facilities}
          </p>

          <hr className="border my-10" />

          <h6 className="lg:text-[52px] text-[30px] font-extrabold mb-2">
            Tour Map
          </h6>
          <div className="flex items-start gap-2 font-manrope text-[#737373] lg:text-[20px] text-[14px]">
            <MapPin size={30} className="mt-0.5" />
            <p className="m-0">{selectedActivity?.address}</p>
          </div>

          <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-md mt-4"></div>
        </div>

        <div className="lg:w-1/3 border rounded-lg sticky shadow-md h-fit border-gray-200 p-6 flex flex-col">
          <p className="text-2xl font-bold mb-4">Best Price</p>

          <p className="font-bold text-xl mb-4">
            {formatRupiah(selectedActivity?.price ?? 0)}
          </p>

          <button
            className="px-6 py-3 bg-black rounded-lg mb-2 text-white font-semibold cursor-pointer transition-all"
            onClick={handleBookNow}
          >
            Book Now
          </button>
          <button
            className="px-6 py-3 bg-white border border-black rounded-lg mb-2 text-black font-semibold cursor-pointer hover:bg-slate-200 transition-all"
            onClick={handleAddCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <FooterSection />
    </>
  );
};

export default DiscoverDetailPage;
