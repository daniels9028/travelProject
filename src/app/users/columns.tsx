import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { User } from "../../types/user/response";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <div className="line-clamp-1 max-w-[30ch]">{row.getValue("email")}</div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("role")}</div>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "profilePictureUrl",
    header: "Profile Picture",
    cell: ({ row }) => {
      return (
        <img
          className="w-16 h-16 object-cover rounded-full"
          onError={(e) =>
            ((e.target as HTMLImageElement).src =
              "https://static.thenounproject.com/png/1743561-200.png")
          }
          src={
            row.getValue("profilePictureUrl") ||
            "https://static.thenounproject.com/png/1743561-200.png"
          }
        />
      );
    },
  },
];
