import { promoBackground } from "@/assets/images";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import { Map } from "lucide-react";

const SpecialDealsPage = () => {
  return (
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
  );
};

export default SpecialDealsPage;
