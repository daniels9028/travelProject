import { ColumnDef } from "@tanstack/react-table";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { User } from "../../types/user/response";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { updateUserRoleThunk } from "@/store/thunks/userThunks";

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
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const dispatch = useDispatch<AppDispatch>();

      const [open, setOpen] = useState<boolean>(false);

      const [selectedUser, setSelectedUser] = useState<User | null>(null);
      const [selectedRole, setSelectedRole] = useState<string | undefined>(
        row?.original?.role
      );

      const handleRoleChange = (role: string) => {
        setSelectedRole(role);
      };

      const handleUpdateRole = () => {
        if (!selectedUser || !selectedRole) return;

        dispatch(
          updateUserRoleThunk({
            id: selectedUser.id,
            role: selectedRole,
          })
        );

        setOpen(false);
      };

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="default"
              onClick={() => {
                setOpen(true);
                setSelectedUser(row.original);
                setSelectedRole(row.original.role);
              }}
            >
              <Pencil />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update User Role</DialogTitle>
              <DialogDescription>
                Are you sure to update <strong>{selectedUser?.name}</strong>'s
                role from <strong>{selectedUser?.role}</strong> to:
              </DialogDescription>
            </DialogHeader>
            <Select value={selectedRole} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
            <DialogFooter className="sm:justify-start">
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
                onClick={handleUpdateRole}
              >
                Update Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
