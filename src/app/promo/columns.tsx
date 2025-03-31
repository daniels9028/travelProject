import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Promo } from "../../types/promo/response";

export const columns: ColumnDef<Promo>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <div className="font-semibold">{row.getValue("title")}</div>;
    },
  },
  {
    accessorKey: "promoCode",
    header: "Promo Code",
    cell: ({ row }) => {
      const promoDiscountPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      }).format(row.getValue("promo_discount_price"));

      return <div className="font-semibold">{promoDiscountPrice}</div>;
    },
  },
  {
    accessorKey: "promo_discount_price",
    header: "Promo Discount Price",
    cell: ({ row }) => {
      const promoDiscountPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      }).format(row.getValue("promo_discount_price"));

      return <div className="font-medium">{promoDiscountPrice}</div>;
    },
  },
  {
    accessorKey: "minimum_claim_price",
    header: "Minimum Claim Price",
    cell: ({ row }) => {
      const minimumClaimPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      }).format(row.getValue("minimum_claim_price"));

      return <div className="font-medium">{minimumClaimPrice}</div>;
    },
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      return (
        <img
          className="w-30 h-30 object-cover rounded-lg"
          onError={(e) =>
            ((e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJhdmVsfGVufDB8fDB8fHww")
          }
          src={
            row.getValue("imageUrl") ||
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJhdmVsfGVufDB8fDB8fHww"
          }
        />
      );
    },
  },
];
