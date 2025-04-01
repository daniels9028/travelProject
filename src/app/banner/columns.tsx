import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Banner } from "../../types/banner/response";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const [selectedBanner, setSelectedBanner] = useState<Banner | null>();

      const navigate = useNavigate();

      return (
        <div className="flex lg:flex-row flex-col gap-2 items-center justify-center">
          <Button
            onClick={() => {
              navigate(`/dashboard/banners/${row.original.id}/edit`);
            }}
          >
            <Edit2 />
          </Button>
          <Button variant="destructive">
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
