import { promoBackground, registerBackground } from "@/assets/images";
import FooterSection from "@/components/FooterSection";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import { AppDispatch, RootState } from "@/store/store";
import { myTransactionThunk } from "@/store/thunks/transactionThunks";
import { formatDate, formatRupiah } from "@/utils/formatDate";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const statusTabs = ["All", "Pending", "Success", "Cancelled", "Failed"];

const statusColorMap = {
  pending: "bg-yellow-500 text-white",
  success: "bg-emerald-500 text-white",
  cancelled: "bg-gray-500 text-white",
  failed: "bg-red-500 text-white",
};

const OrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [tabActive, setTabActive] = useState<string>("All");

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { loggedUser } = useSelector((state: RootState) => state.user);

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
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${promoBackground})`,
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

      <div className="container mx-auto flex lg:flex-row flex-col px-6 my-10 font-manrope gap-8">
        <div className="lg:w-1/4">
          <div className="rounded-md bg-white shadow-sm border flex flex-col p-6">
            <div className="text-center flex flex-col items-center">
              <img
                src={loggedUser?.profilePictureUrl}
                alt="photo_profile"
                className="w-20 h-20 rounded-full"
              />
              <div className="mt-4">
                <h5 className="font-bold text-xl text-gray-900">
                  {loggedUser?.name}
                </h5>
                <h5 className="font-semibold text-base text-blue-600">
                  {loggedUser?.email ?? "-"}
                </h5>
                <h5 className="font-medium text-sm text-emerald-600">
                  {loggedUser?.phoneNumber ?? "-"}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-3/4">
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
            {filteredData.map((filtered) => (
              <Link
                key={filtered.id}
                to={`/orders/${filtered.id}`}
                className="w-full"
              >
                <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex lg:flex-row flex-col items-center justify-between hover:shadow-lg transition-shadow duration-300 cursor-pointer lg:gap-0 gap-8 relative">
                  <span
                    className={`lg:hidden block absolute right-8 top-8 capitalize px-3 py-1 w-fit rounded-xl ${
                      statusColorMap[filtered.status] ??
                      "bg-slate-300 text-black"
                    }`}
                  >
                    {filtered.status}
                  </span>
                  <div className="flex lg:flex-row flex-col gap-4 lg:items-center">
                    <img
                      src={registerBackground}
                      alt=""
                      className="lg:w-28 lg:h-28 bg-cover rounded-xl border"
                    />
                    <div className="flex flex-col gap-2">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {filtered.invoiceId}
                      </h4>
                      <p className="text-sm font-medium text-gray-500">
                        Order Date: {formatDate(filtered.orderDate)}
                      </p>
                      <p className="text-sm font-medium text-gray-500">
                        Expired Date: {formatDate(filtered.expiredDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2 lg:justify-start justify-between w-full text-right">
                    <span
                      className={`lg:block hidden capitalize px-3 py-1 w-fit rounded-xl ${
                        statusColorMap[filtered.status] ??
                        "bg-slate-300 text-black"
                      }`}
                    >
                      {filtered.status}
                    </span>

                    <img
                      src={filtered.payment_method.imageUrl}
                      alt=""
                      className="w-12 h-12 object-contain"
                    />

                    <p className="text-base lg:text-lg font-bold text-emerald-600">
                      {formatRupiah(filtered.totalAmount)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
};

export default OrdersPage;
