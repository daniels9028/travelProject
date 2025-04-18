import { registerBackground } from "@/assets/images";
import FooterSection from "@/components/FooterSection";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import { AppDispatch, RootState } from "@/store/store";
import { activityByIdThunk } from "@/store/thunks/activityThunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DiscoverDetailPage = () => {
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const selectedId = params.id ?? "";

  const { selectedActivity } = useSelector(
    (state: RootState) => state.activity
  );

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
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${registerBackground})`,
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

      <FooterSection />
    </>
  );
};

export default DiscoverDetailPage;
