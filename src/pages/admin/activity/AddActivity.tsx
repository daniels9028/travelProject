import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppDispatch, RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { uploadImageThunk } from "@/store/thunks/uploadThunks";
import { Textarea } from "@/components/ui/textarea";
import {
  activityDefaultValues,
  activitySchema,
} from "@/zod/activity/activitySchema";
import { createActivityThunk } from "@/store/thunks/activityThunks";
import { clearActivityMessage } from "@/store/features/activitySlices";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allCategoryThunk } from "@/store/thunks/categoryThunks";
import { Plus, X } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const AddActivity = () => {
  const form = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues: activityDefaultValues,
  });

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { message } = useSelector((state: RootState) => state.activity);

  const { category } = useSelector((state: RootState) => state.category);

  const [fileInputs, setFileInputs] = useState<
    Array<{ id: number; url: string }>
  >([]);

  const addFileInput = () => {
    setFileInputs([...fileInputs, { id: Date.now(), url: "" }]);
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
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

      const { url } = await dispatch(
        uploadImageThunk({ image: inputFile })
      ).unwrap();

      setFileInputs((prevFileInputs) =>
        prevFileInputs.map((file) =>
          file.id === id ? { ...file, url: url } : file
        )
      );
    }
  };

  const removeFileInput = (id: any) => {
    setFileInputs(fileInputs.filter((input) => input.id !== id));
  };

  const onSubmit = (data: any) => {
    if (fileInputs.length === 0) {
      toast.error("Please upload image!");
      return;
    }

    const imageUrls = fileInputs.map((file) => file.url);

    const emptyCount = imageUrls.filter((item) => item === "").length;

    if (emptyCount > 0) {
      toast.error("Image dont accept empty value!");
      return;
    }

    dispatch(createActivityThunk({ ...data, imageUrls: imageUrls }))
      .unwrap()
      .then((_) => {
        setTimeout(() => {
          navigate("/dashboard/activities");
        }, 1000);
      });
  };

  useEffect(() => {
    dispatch(allCategoryThunk());
  }, [dispatch]);

  useEffect(() => {
    if (message.createActivity) {
      toast.success(message.createActivity);
      dispatch(clearActivityMessage({ key: "createActivity" }));
    }
  }, [message.createActivity]);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Add Activity" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="justify-center items-center flex">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                  >
                    <Carousel className="w-full h-[300px]">
                      <CarouselContent>
                        {fileInputs.map((image) => (
                          <CarouselItem key={image.id}>
                            <div className="overflow-hidden border-2 h-[300px] flex justify-center items-center rounded-lg">
                              {image.url !== "" ? (
                                <img
                                  src={image.url}
                                  alt={`#${image.id}`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <p className="text-gray-400 text-base">
                                  No Preview Image
                                </p>
                              )}
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({}) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Controller
                              control={form.control}
                              name="categoryId"
                              render={({ field }) => (
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {category.map((item) => (
                                        <SelectItem
                                          value={item.id}
                                          key={item.id}
                                        >
                                          {item.name}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter promo title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter promo description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price_discount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price Discount</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating</FormLabel>
                          <FormControl>
                            <Input type="number" min={1} max={5} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="total_reviews"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Reviews</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="facilities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facilities</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter activity facilities"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter activity address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="province"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Province</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter activity province"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter activity city"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location_maps"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location Maps</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter activity location maps"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="space-y-4 p-4 border rounded-lg w-full">
                      {fileInputs.map(({ id }) => (
                        <div key={id} className="flex items-center space-x-2">
                          <Input
                            type="file"
                            className="w-full"
                            onChange={(e) => {
                              handleFileChange(e, id);
                            }}
                            accept="image/*"
                          />
                          <Button
                            variant="destructive"
                            type="button"
                            size="icon"
                            onClick={() => removeFileInput(id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={addFileInput}
                        className="w-full flex items-center justify-center space-x-2"
                        type="button"
                      >
                        <Plus className="w-4 h-4" /> <span>Tambah File</span>
                      </Button>
                    </div>
                    <div className="flex flex-row gap-2">
                      <Link to="/dashboard/promos">
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

export default AddActivity;
