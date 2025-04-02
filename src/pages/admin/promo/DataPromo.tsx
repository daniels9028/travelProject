import { columns } from "@/app/promo/columns";
import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/Datatable";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { clearPromoMessage } from "@/store/features/promoSlices";
import { AppDispatch, RootState } from "@/store/store";
import { allPromoThunk } from "@/store/thunks/promoThunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DataPromo = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { promo, message } = useSelector((state: RootState) => state.promo);

  const handleAddPromo = () => {
    navigate("/dashboard/promos/add-promo");
  };

  useEffect(() => {
    dispatch(allPromoThunk());
  }, [dispatch]);

  useEffect(() => {
    if (message.deletePromo) {
      toast.success(message.deletePromo);
    }

    dispatch(allPromoThunk());
    dispatch(clearPromoMessage({ key: "deletePromo" }));
  }, [message.deletePromo]);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Promo Management" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <DataTable data={data} /> */}
              <div className="px-4">
                <DataTable
                  columns={columns}
                  data={promo}
                  add={true}
                  addTitle="Add Promo"
                  handleAdd={handleAddPromo}
                  search="title"
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DataPromo;
