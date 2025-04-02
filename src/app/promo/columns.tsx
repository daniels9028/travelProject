import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Promo } from "../../types/promo/response";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePromoThunk } from "@/store/thunks/promoThunks";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

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
      return <div className="font-semibold">{row.original.promo_code}</div>;
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
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const dispatch = useDispatch<AppDispatch>();

      const [selectedPromo, setSelectedPromo] = useState<Promo | null>();

      const [open, setOpen] = useState<boolean>(false);

      const navigate = useNavigate();

      const handleDeletePromo = () => {
        if (!selectedPromo) return;

        dispatch(
          deletePromoThunk({
            id: selectedPromo?.id,
          })
        );

        setOpen(false);
      };

      return (
        <div className="flex lg:flex-row flex-col gap-2 items-center justify-center">
          <Button
            className="cursor-pointer"
            onClick={() => {
              navigate(`/dashboard/promos/${row.original.id}/edit`);
            }}
          >
            <Edit2 />
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                onClick={() => {
                  setOpen(true);
                  setSelectedPromo(row.original);
                }}
              >
                <Trash2 />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Delete Promo</DialogTitle>
                <DialogDescription>
                  Are you sure to delete this promo :{" "}
                  <strong>{selectedPromo?.title}</strong>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-center">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={handleDeletePromo}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
