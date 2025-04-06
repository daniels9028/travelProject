import Navbar from "@/components/landing-page/Navbar";
import { heroBackground } from "@/assets/images";
import Hero from "@/components/landing-page/Hero";
import { LocateIcon } from "lucide-react";

const LandingPage = () => {
  return (
    <>
      <div
        className="relative w-full bg-cover bg-center"
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
    </>
  );
};

export default LandingPage;
