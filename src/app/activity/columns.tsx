import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Activity } from "../../types/activity/response";
import { Category } from "@/types/category/response";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteActivityThunk } from "@/store/thunks/activityThunks";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
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

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <div className="font-semibold">{row.getValue("title")}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category: Category = row.getValue("category");

      return <div className="font-semibold">{category.name}</div>;
    },
  },
  {
    accessorKey: "province",
    header: "Province",
    cell: ({ row }) => {
      return <div className="font-semibold">{row.getValue("province")}</div>;
    },
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => {
      return <div className="font-semibold">{row.getValue("city")}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      }).format(row.getValue("price"));

      return <div className="font-semibold">{price}</div>;
    },
  },
  {
    accessorKey: "price_discount",
    header: "Price Discount",
    cell: ({ row }) => {
      const priceDiscount = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      }).format(row.getValue("price_discount"));

      return <div className="font-medium">{priceDiscount}</div>;
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

      const [selectedActivity, setSelectedActivity] =
        useState<Activity | null>();

      const [open, setOpen] = useState<boolean>(false);

      const navigate = useNavigate();

      const handleDeleteActivity = () => {
        if (!selectedActivity) return;

        dispatch(
          deleteActivityThunk({
            id: selectedActivity?.id,
          })
        );

        setOpen(false);
      };

      return (
        <div className="flex lg:flex-row flex-col gap-2 items-center justify-center">
          <Button
            className="cursor-pointer"
            onClick={() => {
              navigate(`/dashboard/activities/${row.original.id}/edit`);
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
                  setSelectedActivity(row.original);
                }}
              >
                <Trash2 />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Delete Banner</DialogTitle>
                <DialogDescription>
                  Are you sure to delete this banner :{" "}
                  <strong>{selectedActivity?.title}</strong>
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
                  onClick={handleDeleteActivity}
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
