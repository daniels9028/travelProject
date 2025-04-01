import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Banner } from "../../types/banner/response";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
import { deleteBannerThunk } from "@/store/thunks/bannerThunks";

export const columns: ColumnDef<Banner>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const createdAt = new Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
      }).format(date);

      return <div className="capitalize">{createdAt}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      const updatedAt = new Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
      }).format(date);

      return <div className="capitalize">{updatedAt}</div>;
    },
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      return (
        <img
          className="w-30 h-30 object-cover rounded-lg"
          src={row.getValue("imageUrl")}
        />
      );
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const dispatch = useDispatch<AppDispatch>();

      const [selectedBanner, setSelectedBanner] = useState<Banner | null>();

      const [open, setOpen] = useState<boolean>(false);

      const navigate = useNavigate();

      const handleDeleteBanner = () => {
        if (!selectedBanner) return;

        dispatch(
          deleteBannerThunk({
            id: selectedBanner?.id,
          })
        );

        setOpen(false);
      };

      return (
        <div className="flex lg:flex-row flex-col gap-2 items-center justify-center">
          <Button
            className="cursor-pointer"
            onClick={() => {
              navigate(`/dashboard/banners/${row.original.id}/edit`);
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
                  setSelectedBanner(row.original);
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
                  <strong>{selectedBanner?.name}</strong>
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
                  onClick={handleDeleteBanner}
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
