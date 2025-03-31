import { columns } from "@/app/activity/columns";
import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/Datatable";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppDispatch, RootState } from "@/store/store";
import { allActivityThunk } from "@/store/thunks/activityThunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DataActivity = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { activity } = useSelector((state: RootState) => state.activity);

  useEffect(() => {
    dispatch(allActivityThunk());
  }, [dispatch]);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Data Activities" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <DataTable data={data} /> */}
              <div className="px-4">
                <DataTable
                  columns={columns}
                  data={activity}
                  title="Activities Management"
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

export default DataActivity;
