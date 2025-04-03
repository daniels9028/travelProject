import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Transaction, TransactionStatus } from "@/types/transaction/response";
import { Payment } from "@/types/payment/response";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit2, Eye } from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "invoiceId",
    header: "Invoice ID",
    cell: ({ row }) => {
      return <p>{row.getValue("invoiceId")}</p>;
    },
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
    cell: ({ row }) => {
      const paymentMethod: Payment = row.getValue("payment_method");

      return <p>{paymentMethod.name}</p>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Price",
    cell: ({ row }) => {
      const totalAmount = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      }).format(row.getValue("totalAmount"));

      return <p>{totalAmount}</p>;
    },
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("orderDate"));
      const orderDate = new Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
      }).format(date);

      return <div className="capitalize">{orderDate}</div>;
    },
  },
  {
    accessorKey: "expiredDate",
    header: "Expired Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("expiredDate"));
      const expiredDate = new Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
      }).format(date);

      return <div className="capitalize">{expiredDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: TransactionStatus = row.getValue("status");

      const statusColors = {
        pending: "bg-yellow-500 hover:bg-yellow-600 text-black",
        success: "bg-green-500 hover:bg-green-600 text-white",
        failed: "bg-red-500 hover:bg-red-600 text-white",
        cancelled: "bg-gray-500 hover:bg-gray-600 text-white",
      };

      return (
        <p
          className={`cursor-pointer transition-colors p-2 capitalize rounded-lg flex items-center justify-center font-medium text-xs tracking-wider 
          ${statusColors[status] || "bg-gray-400 text-white"}`}
        >
          {status}
        </p>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const navigate = useNavigate();

      return (
        <div className="flex lg:flex-row flex-col gap-2 items-center justify-center">
          <Button
            className="cursor-pointer border border-red-500"
            variant="outline"
            onClick={() => {
              navigate(`/dashboard/transactions/${row.original.id}/detail`);
            }}
          >
            {row.original.status === "pending" ? <Edit2 /> : <Eye />}
          </Button>
        </div>
      );
    },
  },
];
