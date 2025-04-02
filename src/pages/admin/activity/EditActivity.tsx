import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { Plus, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FormInput from "@/components/FormInput";
import useActivityHooks from "@/hooks/useActivityHooks";
import FormSelect from "@/components/FormSelect";
import { useEffect } from "react";
import { activityByIdThunk } from "@/store/thunks/activityThunks";
import { toast } from "react-toastify";
import { clearActivityMessage } from "@/store/features/activitySlices";

const EditActivity = () => {
  const params = useParams();

  const id = params.id || "";

  const {
    form,
    category,
    fileInputs,
    selectedActivity,
    message,
    dispatch,
    addFileInput,
    handleFileChange,
    removeFileInput,
    onSubmit,
    reset,
    setFileInputs,
  } = useActivityHooks({ id: id });

  useEffect(() => {
    if (id) {
      dispatch(
        activityByIdThunk({
          id: id,
        })
      );
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!selectedActivity) return;

    reset({
      categoryId: selectedActivity.categoryId,
      title: selectedActivity.title,
      description: selectedActivity.description,
      price: selectedActivity.price,
      price_discount: selectedActivity.price_discount,
      rating: selectedActivity.rating,
      total_reviews: selectedActivity.total_reviews,
      facilities: selectedActivity.facilities,
      address: selectedActivity.address,
      province: selectedActivity.province,
      city: selectedActivity.city,
      location_maps: selectedActivity.location_maps,
    });

    setFileInputs((prevFileInputs) => {
      if (prevFileInputs.length === selectedActivity.imageUrls.length) {
        return prevFileInputs;
      }
      return selectedActivity.imageUrls.map((itemFile, index) => ({
        id: Date.now() + index,
        url: itemFile,
      }));
    });
  }, [selectedActivity, reset]);

  useEffect(() => {
    if (message.updateActivity) {
      toast.success(message.updateActivity);
      dispatch(clearActivityMessage({ key: "updateActivity" }));
    }
  }, [message.updateActivity]);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Edit Activity" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="justify-center items-center flex">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                  >
                    <Carousel className="w-full h-[300px] bg-gray-200 rounded-lg">
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
                      <CarouselPrevious type="button" />
                      <CarouselNext type="button" />
                    </Carousel>
                    <FormSelect
                      control={form.control}
                      name="categoryId"
                      datas={category}
                    />
                    <FormInput
                      name="title"
                      label="Title"
                      control={form.control}
                      placeholder="Enter activity title"
                      tipe="text"
                    />
                    <FormInput
                      name="description"
                      label="Description"
                      control={form.control}
                      placeholder="Enter activity description"
                      tipe="textarea"
                    />
                    <FormInput
                      name="price"
                      label="Price"
                      control={form.control}
                      number={true}
                      tipe="text"
                    />
                    <FormInput
                      name="price_discount"
                      label="Price Discount"
                      control={form.control}
                      number={true}
                      tipe="text"
                    />
                    <FormInput
                      name="rating"
                      label="Rating"
                      control={form.control}
                      number={true}
                      tipe="text"
                    />
                    <FormInput
                      name="total_reviews"
                      label="Total Reviews"
                      control={form.control}
                      number={true}
                      tipe="text"
                    />
                    <FormInput
                      name="facilities"
                      label="Facilities"
                      control={form.control}
                      placeholder="Enter activity facilities"
                      tipe="textarea"
                    />
                    <FormInput
                      name="address"
                      label="Address"
                      control={form.control}
                      placeholder="Enter activity address"
                      tipe="textarea"
                    />
                    <FormInput
                      name="province"
                      label="Province"
                      control={form.control}
                      placeholder="Enter activity province"
                      tipe="text"
                    />
                    <FormInput
                      name="city"
                      label="City"
                      control={form.control}
                      placeholder="Enter activity city"
                      tipe="text"
                    />
                    <FormInput
                      name="location_maps"
                      label="Location Maps"
                      control={form.control}
                      placeholder="Enter activity location maps"
                      tipe="textarea"
                    />
                    <div className="space-y-4 p-4 border rounded-lg w-full">
                      {fileInputs.map((item) => (
                        <div className="flex flex-col" key={item.id}>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="file"
                              className="w-full"
                              onChange={(e) => {
                                handleFileChange(e, item.id);
                              }}
                              accept="image/*"
                            />
                            <Button
                              variant="destructive"
                              type="button"
                              size="icon"
                              onClick={() => removeFileInput(item.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-sm font-medium mt-1">
                            {item.url
                              ? "Already have image"
                              : "No image upload"}
                          </p>
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
                      <Link to="/dashboard/activities">
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

export default EditActivity;
