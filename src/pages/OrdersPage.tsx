import { orderBackground } from "@/assets/images";
import DetailOrder from "@/components/DetailOrder";
import FooterSection from "@/components/FooterSection";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import { AppDispatch, RootState } from "@/store/store";
import { myTransactionThunk } from "@/store/thunks/transactionThunks";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const statusTabs = ["All", "Pending", "Success", "Cancelled", "Failed"];

const OrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [tabActive, setTabActive] = useState<string>("All");

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { myTransaction } = useSelector(
    (state: RootState) => state.transaction
  );

  const handleChangeTabs = (name: string) => {
    setTabActive(name);
  };

  useEffect(() => {
    dispatch(myTransactionThunk());
  }, [tabActive, dispatch]);

  const filteredData = myTransaction
    ? myTransaction.filter((row) => {
        const matchesTab =
          tabActive.toLowerCase() === "all" ||
          (row.status && row.status.toLowerCase() === tabActive.toLowerCase());

        const matchesSearch = row.invoiceId
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

        return matchesTab && matchesSearch;
      })
    : [];

  return (
    <>
      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${orderBackground})`,
        }}
      >
        <Navbar />

        <Hero
          title="Your Orders"
          subtitle="Everything You've Booked, Right Here"
          description="Easily review, manage, and relive your travel experiences—all your confirmed and past orders in one place."
          buttonTitle=""
          buttonDescription=""
          backgroundText=""
          buttonIcon=""
          link=""
        />
      </div>

      <div className="container mx-auto flex flex-col px-6 my-10 font-manrope gap-8">
        <div className="w-full">
          <div className="flex lg:flex-row flex-col gap-4 justify-between items-center mb-8">
            <div className="flex flex-row lg:gap-4 gap-2 items-center flex-wrap">
              {statusTabs.map((statusTab, index) => (
                <div
                  onClick={() => handleChangeTabs(statusTab)}
                  key={index}
                  className={`text-bold cursor-pointer text-center hover:bg-gray-300 rounded-lg px-4 py-2 ${
                    tabActive === statusTab ? "text-white bg-red-500" : ""
                  }`}
                >
                  {statusTab}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-full lg:max-w-xs bg-white shadow-sm">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full outline-none text-sm text-gray-700 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {filteredData.length > 0 ? (
              filteredData.map((filtered) => (
                <Link
                  key={filtered.id}
                  to={`/orders/${filtered.id}`}
                  className="w-full"
                >
                  <DetailOrder selectedTransaction={filtered} />
                </Link>
              ))
            ) : (
              <div className="w-full text-center py-10 text-gray-500 text-sm">
                No results found.
              </div>
            )}
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
};

export default OrdersPage;
