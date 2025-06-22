import { EllipsisVertical, LogOut, CircleUser } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logoutUserThunk } from "@/store/thunks/authenticationThunks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultUserValues, userSchema } from "@/zod/user/userSchema";
import React, { useEffect, useState } from "react";
import {
  getLoggedUserThunk,
  updateProfileThunk,
} from "@/store/thunks/userThunks";
import { toast } from "react-toastify";
import { clearLoggedUser, clearUserMessage } from "@/store/features/userSlices";
import { uploadImageThunk } from "@/store/thunks/uploadThunks";
import { clearAuthMessage } from "@/store/features/authenticationSlices";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  const { loggedUser, message } = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: defaultUserValues,
  });

  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState<boolean>(false);

  const [image, setImage] = useState<File | null>(null);

  const [imageUrl, setImageUrl] = useState<string | undefined>("");

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const inputFile = e.target.files[0];

      if (!inputFile.type.startsWith("image/")) {
        toast.info("Only image");
        return;
      }

      if (inputFile.size > 1 * 1024 * 1024) {
        toast.info("Maks 1MB");
        return;
      }

      setImage(e.target.files[0]);

      const { url } = await dispatch(
        uploadImageThunk({ image: inputFile })
      ).unwrap();

      setImageUrl(url);
    }
  };

  const onSubmit = (data: any) => {
    const payload = !imageUrl
      ? { ...data, profilePictureUrl: loggedUser?.profilePictureUrl }
      : { ...data, profilePictureUrl: imageUrl };

    dispatch(updateProfileThunk(payload));
  };

  const handleLogout = async () => {
    const data = await dispatch(logoutUserThunk()).unwrap();

    toast.success(data.message);

    dispatch(clearLoggedUser());
    dispatch(clearAuthMessage({ key: "logout" }));
  };

  useEffect(() => {
    if (message.updateProfile) {
      toast.success(message.updateProfile);

      dispatch(clearUserMessage({ key: "updateProfile" }));

      dispatch(getLoggedUserThunk());

      setOpen(false);
    }
  }, [message.updateProfile]);

  useEffect(() => {
    if (loggedUser) {
      setValue("name", loggedUser.name || "");
      setValue("email", loggedUser.email || "");
      setValue("phoneNumber", loggedUser.phoneNumber || "");
    }
  }, [loggedUser, setValue]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setOpen(true);
                    }}
                  >
                    <CircleUser />
                    Account
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col justify-center items-center w-full gap-4 py-4">
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="preview_profile"
                          className="rounded-full w-30 h-30"
                        />
                      ) : (
                        <img
                          src={loggedUser?.profilePictureUrl}
                          alt={loggedUser?.id}
                          className="rounded-full w-30 h-30"
                        />
                      )}
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row w-full gap-2">
                          <Label htmlFor="name" className="text-right w-40">
                            Name
                          </Label>
                          <Input
                            id="name"
                            className="col-span-3"
                            {...register("name")}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row w-full gap-2">
                          <Label htmlFor="email" className="text-right w-40">
                            Email
                          </Label>
                          <Input
                            id="email"
                            className="col-span-3"
                            type="email"
                            {...register("email")}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row w-full gap-2">
                          <Label
                            htmlFor="phoneNumber"
                            className="text-right w-40"
                          >
                            Phone Number
                          </Label>
                          <Input
                            id="phoneNumber"
                            className="col-span-3"
                            type="number"
                            {...register("phoneNumber")}
                          />
                        </div>
                        {errors.phoneNumber && (
                          <p className="text-red-500">
                            {errors.phoneNumber.message}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row w-full gap-2">
                          <Label htmlFor="image" className="text-right w-40">
                            Image
                          </Label>
                          <Input
                            id="profilePictureUrl"
                            className="col-span-3"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
