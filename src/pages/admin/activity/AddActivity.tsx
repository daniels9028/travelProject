import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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

const AddActivity = () => {
  const {
    form,
    category,
    fileInputs,
    addFileInput,
    handleFileChange,
    removeFileInput,
    onSubmit,
  } = useActivityHooks();

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
                      <CarouselPrevious />
                      <CarouselNext />
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
