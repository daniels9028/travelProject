import { columns } from "@/app/transaction/columns";
import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/Datatable";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppDispatch, RootState } from "@/store/store";
import { allTransactionThunk } from "@/store/thunks/transactionThunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DataTransaction = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { allTransaction } = useSelector(
    (state: RootState) => state.transaction
  );

  useEffect(() => {
    dispatch(allTransactionThunk());
  }, [dispatch]);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Data Transaction" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <DataTable data={data} /> */}
              <div className="px-4">
                <DataTable
                  columns={columns}
                  data={allTransaction}
                  title="Transaction Management"
                  search="invoiceId"
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DataTransaction;
