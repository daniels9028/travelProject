import { logo } from "@/assets/images";
import {
  Phone,
  MapPin,
  Clock4,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react";
import FooterList from "./FooterList";

const followLists = [Instagram, Facebook, Twitter, Youtube];
const footerLists = [
  {
    title: "Support",
    lists: [
      "Forum Support",
      "Help Center",
      "Live Chat",
      "How It Works",
      "Security",
      "Privacy",
      "Charges Logs",
    ],
  },
  {
    title: "Company",
    lists: [
      "About Us",
      "Community Blog",
      "Jobs and Careers",
      "Contact Us",
      "Our Awards",
      "Agencies",
    ],
  },
  {
    title: "Services",
    lists: [
      "Tour Guide",
      "Tour Booking",
      "Hotel Booking",
      "Tiket Booking",
      "Rental Services",
    ],
  },
  {
    title: "Legal",
    lists: [
      "Terms of Service",
      "Privacy Policy",
      "Cookies Policy",
      "Data Processing",
      "Data Policy",
      "Refund Policy",
    ],
  },
];

const FooterSection = () => {
  return (
    <div className="w-full bg-black font-manrope">
      <div className="container mx-auto w-full flex flex-col px-6 py-4">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <img
              src={logo}
              alt="footer-logo"
              className="w-12 h-12 object-cover"
            />
            <p className="text-white font-semibold text-xl">TravelGo</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-center md:text-left">
            <div className="rounded-full border p-1.5 border-[#575756]">
              <Phone size={16} color="#575756" />
            </div>
            <p className="text-white text-[16px] font-medium">
              Need help? Call us
            </p>
            <p className="text-[#F09814] font-extrabold text-[24px]">
              1-800-222-8888
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row lg:items-start items-center gap-12 w-full mt-8 border-y py-12 border-[#575656]/50">
          {/* Contact Us Section */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8 text-center lg:text-left">
            <p className="text-white font-medium text-[18px]">Contact Us</p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-2 justify-center lg:justify-start">
                <MapPin size={20} color="#575756" />
                <p className="font-medium text-[#8E8E8E] text-[16px] leading-[20px] truncate">
                  4517 Washington Ave. Manchester, Kentucky 39495
                </p>
              </div>
              <div className="flex items-start gap-2 justify-center lg:justify-start">
                <Clock4 size={20} color="#575756" />
                <p className="font-medium text-[#8E8E8E] text-[16px] leading-[20px]">
                  Hours: 8:00 - 17:00, Mon - Sat
                </p>
              </div>
              <div className="flex items-start gap-2 justify-center lg:justify-start">
                <Mail size={20} color="#575756" />
                <p className="font-medium text-[#8E8E8E] text-[16px] leading-[20px] break-words">
                  support@travelgo.com
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-[18px] font-bold text-white">Follow Us</p>
              <div className="flex flex-row justify-center lg:justify-start gap-3">
                {followLists.map((Icon, index) => (
                  <div
                    className="rounded-full p-2 border border-[#575756]"
                    key={index}
                  >
                    <Icon color="white" size={16} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links Section */}
          <div className="w-full lg:w-2/3 flex flex-wrap gap-y-10 gap-x-8 justify-center lg:justify-start">
            {footerLists.map((footerList, index) => (
              <div key={index} className="w-[120px] sm:w-[150px]">
                <FooterList items={footerList} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
          <div className="flex flex-row items-center gap-2">
            <p className="text-white font-medium text-[14px]">
              © 2024 Travila Inc. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8 text-center md:text-left text-white">
            <p>Terms</p>
            <p>Privacy Policy</p>
            <p>Legal Notice</p>
            <p>Accessibility</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
