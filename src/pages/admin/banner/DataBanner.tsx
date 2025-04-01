import { columns } from "@/app/banner/columns";
import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/Datatable";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { clearBannerMessage } from "@/store/features/bannerSlices";
import { AppDispatch, RootState } from "@/store/store";
import { allBannerThunk } from "@/store/thunks/bannerThunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DataBanner = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { banner, message } = useSelector((state: RootState) => state.banner);

  const handleAddBanner = () => {
    navigate("/dashboard/banners/add-banner");
  };

  useEffect(() => {
    dispatch(allBannerThunk());
  }, [dispatch]);

  useEffect(() => {
    if (message.deleteBanner) {
      toast.success(message.deleteBanner);
    }

    dispatch(allBannerThunk());
    dispatch(clearBannerMessage({ key: "deleteBanner" }));
  }, [message.deleteBanner]);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Banner Management" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <DataTable data={data} /> */}
              <div className="px-4">
                <DataTable
                  columns={columns}
                  data={banner}
                  add={true}
                  addTitle="Add Banner"
                  handleAdd={handleAddBanner}
                  search="name"
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DataBanner;
