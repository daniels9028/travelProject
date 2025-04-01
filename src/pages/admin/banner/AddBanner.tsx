import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bannerSchema } from "@/zod/banner/bannerSchema";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { uploadImageThunk } from "@/store/thunks/uploadThunks";
import { createBannerThunk } from "@/store/thunks/bannerThunks";
import { clearBannerMessage } from "@/store/features/bannerSlices";

const AddBanner = () => {
  const form = useForm({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const { message } = useSelector((state: RootState) => state.banner);

  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);

  const onSubmit = (data: any) => {
    if (!data) return;

    dispatch(
      createBannerThunk({
        name: data.name,
        imageUrl: data.imageUrl,
      })
    )
      .unwrap()
      .then((_) => {
        setTimeout(() => {
          navigate("/dashboard/banners");
        }, 1000);
      });
  };

  useEffect(() => {
    if (message.createBanner) {
      toast.success(message.createBanner);
      dispatch(clearBannerMessage({ key: "createBanner" }));
    }
  }, [message.createBanner]);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Add Banner" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="justify-center items-center flex">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                  >
                    <div className="w-full h-[300px] overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="preview_image"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <p className="text-base text-gray-500">Image Preview</p>
                      )}
                    </div>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter banner name" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your banner name
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
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

                                  field.onChange(url);
                                }
                              }}
                            />
                          </FormControl>
                          <FormDescription>Max size: 2MB</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-row gap-2">
                      <Link to="/dashboard/banners">
                        <Button
                          variant="destructive"
                          type="button"
                          className="cursor-pointer"
                        >
                          Cancel
                        </Button>
                      </Link>
                      <Button
                        type="submit"
                        variant="default"
                        className="cursor-pointer"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AddBanner;
