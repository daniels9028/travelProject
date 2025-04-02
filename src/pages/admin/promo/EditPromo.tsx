import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppDispatch, RootState } from "@/store/store";
import { promoSchema } from "@/zod/promo/promoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { uploadImageThunk } from "@/store/thunks/uploadThunks";
import { Textarea } from "@/components/ui/textarea";
import { promoByIdThunk, updatePromoThunk } from "@/store/thunks/promoThunks";
import { clearPromoMessage } from "@/store/features/promoSlices";

const EditPromo = () => {
  const params = useParams();

  const id = params.id || "";

  const form = useForm({
    resolver: zodResolver(promoSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      terms_condition: "",
      promo_code: "",
      promo_discount_price: 0,
      minimum_claim_price: 0,
    },
  });

  const { reset } = form;

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { message, selectedPromo } = useSelector(
    (state: RootState) => state.promo
  );

  const [image, setImage] = useState<File | null>(null);

  const onSubmit = (data: any) => {
    dispatch(updatePromoThunk({ ...data, id: id }))
      .unwrap()
      .then((_) => {
        setTimeout(() => {
          navigate("/dashboard/promos");
        }, 1000);
      });
  };

  useEffect(() => {
    dispatch(promoByIdThunk({ id: id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedPromo) {
      reset({
        title: selectedPromo.title,
        description: selectedPromo.description,
        terms_condition: selectedPromo.terms_condition,
        promo_code: selectedPromo.promo_code,
        promo_discount_price: selectedPromo.promo_discount_price,
        minimum_claim_price: selectedPromo.minimum_claim_price,
        imageUrl: selectedPromo.imageUrl,
      });
    }
  }, [selectedPromo, reset]);

  useEffect(() => {
    if (message.updatePromo) {
      toast.success(message.updatePromo);
      dispatch(clearPromoMessage({ key: "updatePromo" }));
    }
  }, [message.updatePromo]);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Edit Promo" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="justify-center items-center flex">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                  >
                    <div className="w-full h-[300px] overflow-hidden rounded-lg border-2 bg-gray-200 flex items-center justify-center">
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="preview_image"
                          className="w-full h-full object-cover"
                        />
                      ) : selectedPromo ? (
                        <img
                          src={selectedPromo.imageUrl}
                          alt="preview_image"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <p className="text-base text-gray-500">Image Preview</p>
                      )}
                    </div>
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
                      name="terms_condition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Terms & Condition</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter promo terms & condition"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="promo_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Promo Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter promo code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="promo_discount_price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Promo Discount Price</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="minimum_claim_price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mininum Claim Price</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
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

export default EditPromo;
