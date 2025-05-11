import { profileBackground } from "@/assets/images";
import FooterSection from "@/components/FooterSection";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppDispatch, RootState } from "@/store/store";
import { userSchema } from "@/zod/user/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Upload } from "lucide-react";
import { useToastMessage } from "@/hooks/useToastMessage";
import { clearUserMessage } from "@/store/features/userSlices";
import {
  getLoggedUserThunk,
  updateProfileThunk,
} from "@/store/thunks/userThunks";
import { useState } from "react";
import { uploadImageThunk } from "@/store/thunks/uploadThunks";
import { resetUploadUrl } from "@/store/features/uploadSlices";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loggedUser, message } = useSelector((state: RootState) => state.user);

  const { url } = useSelector((state: RootState) => state.upload);

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: loggedUser?.name ?? "",
      email: loggedUser?.email ?? "",
      phoneNumber: loggedUser?.phoneNumber ?? "",
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeMB = 1;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      toast.warning("File size must be less than 1MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    dispatch(uploadImageThunk({ image: file }));
  };

  const onSubmit = (data: any) => {
    const updatedData = {
      ...data,
      ...(url ? { profilePictureUrl: url } : {}),
    };

    dispatch(updateProfileThunk(updatedData))
      .unwrap()
      .then(() => dispatch(getLoggedUserThunk()));

    setImagePreview(null);
    dispatch(resetUploadUrl());
  };

  useToastMessage({
    keyName: "updateProfile",
    value: message.updateProfile,
    clearAction: clearUserMessage,
  });

  return (
    <>
      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${profileBackground})`,
        }}
      >
        <Navbar />

        <Hero
          title="Your Profile"
          subtitle="Manage Your Personal Information"
          description="Update your details, review your preferences, and keep your account information secure and up to date."
          buttonTitle=""
          buttonDescription=""
          backgroundText=""
          buttonIcon=""
          link=""
        />
      </div>

      <div className="container mx-auto flex flex-col px-6 my-10 font-manrope gap-8">
        <div className="w-full border shadow-md rounded-xl p-6">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-4">
              <img
                src={loggedUser?.profilePictureUrl}
                alt={loggedUser?.name}
                className="w-20 h-20 object-cover rounded-full"
              />
              <div>
                <h1 className="font-bold text-lg">{loggedUser?.name}</h1>
                <h2 className="font-medium text-slate-500">
                  {loggedUser?.email}
                </h2>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4">
              <label className="bg-blue-500 text-white px-4 py-2 rounded-xl font-medium cursor-pointer flex gap-2 items-center">
                <Upload size={18} />
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-xl border"
                />
              )}
            </div>
          </div>
          <div className="mt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="cursor-pointer">
                  Save Changes
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
};

export default ProfilePage;
