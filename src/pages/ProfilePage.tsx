import { profileBackground } from "@/assets/images";
import FooterSection from "@/components/FooterSection";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";

const ProfilePage = () => {
  return (
    <>
      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${profileBackground})`,
        }}
      >
        <Navbar />

        <Hero
          title="Your Profile"
          subtitle="Manage Your Personal Information"
          description="Update your details, review your preferences, and keep your account information secure and up to date."
          buttonTitle=""
          buttonDescription=""
          backgroundText=""
          buttonIcon=""
          link=""
        />
      </div>

      <FooterSection />
    </>
  );
};

export default ProfilePage;
