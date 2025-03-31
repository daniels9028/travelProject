import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Transaction, TransactionStatus } from "@/types/transaction/response";
import { Payment } from "@/types/payment/response";

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
    header: "Payment Method",
    cell: ({ row }) => {
      const status: TransactionStatus = row.getValue("status");

      console.log(status);

      return (
        <p
          className={`py-2 px-4 rounded-lg flex items-center justify-center font-medium text-xs tracking-wider ${
            status === "success"
              ? "text-white bg-blue-500 hover:bg-blue-700"
              : status === "cancelled"
              ? "text-white bg-red-500 hover:bg-red-700"
              : "text-white bg-orange-500 hover:bg-orange-700"
          }`}
        >
          {status === "success"
            ? "SUCCESS"
            : status === "cancelled"
            ? "CANCELLED"
            : "PENDING"}
        </p>
      );
    },
  },
];
