import { columns } from "@/app/transaction/columns";
import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/Datatable";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppDispatch, RootState } from "@/store/store";
import { allTransactionThunk } from "@/store/thunks/transactionThunks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DataTransaction = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { allTransaction } = useSelector(
    (state: RootState) => state.transaction
  );

  const [tabActive, setTabActive] = useState<string>("Pending");

  const handleChangeTabs = (name: string) => {
    setTabActive(name);
  };

  const filteredData = allTransaction
    ? allTransaction.filter((row) => {
        return (
          row.status && row.status.toLowerCase() === tabActive.toLowerCase()
        );
      })
    : allTransaction;

  useEffect(() => {
    dispatch(allTransactionThunk());
  }, [dispatch, tabActive]);

  const statusTabs = ["Pending", "Success", "Cancelled", "Failed"];

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Transactions Management" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4">
                <div className="flex lg:flex-row items-center flex-col gap-2">
                  {statusTabs.map((item) => (
                    <div
                      onClick={() => handleChangeTabs(item)}
                      className={`border py-2 px-4 font-medium rounded-full cursor-pointer transition-all hover:bg-red-500 hover:text-white ${
                        tabActive === item ? "text-white bg-red-500" : ""
                      }`}
                      key={item}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <DataTable
                  columns={columns}
                  data={filteredData}
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
