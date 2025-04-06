import { discoverBackground } from "@/assets/images";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import { DiamondPercent } from "lucide-react";

const DiscoverPage = () => {
  return (
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
  );
};

export default DiscoverPage;
