import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Category } from "../../types/category/response";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCategoryThunk } from "@/store/thunks/categoryThunks";
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

export const columns: ColumnDef<Category>[] = [
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
          onError={(e) =>
            ((e.target as HTMLImageElement).src =
              "https://cdn-icons-png.freepik.com/512/3502/3502688.png")
          }
          src={
            row.getValue("imageUrl") ||
            "https://cdn-icons-png.freepik.com/512/3502/3502688.png"
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

      const [selectedCategory, setSelectedCategory] =
        useState<Category | null>();

      const [open, setOpen] = useState<boolean>(false);

      const navigate = useNavigate();

      const handleDeleteCategory = () => {
        if (!selectedCategory) return;

        dispatch(
          deleteCategoryThunk({
            id: selectedCategory?.id,
          })
        );

        setOpen(false);
      };

      return (
        <div className="flex lg:flex-row flex-col gap-2 items-center justify-center">
          <Button
            className="cursor-pointer"
            onClick={() => {
              navigate(`/dashboard/categories/${row.original.id}/edit`);
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
                  setSelectedCategory(row.original);
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
                  <strong>{selectedCategory?.name}</strong>
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
                  onClick={handleDeleteCategory}
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
