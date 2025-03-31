import { columns } from "@/app/users/columns";
import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/Datatable";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppDispatch, RootState } from "@/store/store";
import { getAllUserThunk } from "@/store/thunks/userThunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DataUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { allUsers } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getAllUserThunk());
  }, [dispatch]);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Data User" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <DataTable data={data} /> */}
              <div className="px-4">
                <DataTable
                  columns={columns}
                  data={allUsers}
                  title="User Management"
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

export default DataUser;
