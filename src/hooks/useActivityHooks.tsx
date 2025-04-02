import { clearActivityMessage } from "@/store/features/activitySlices";
import { AppDispatch, RootState } from "@/store/store";
import { createActivityThunk } from "@/store/thunks/activityThunks";
import { allCategoryThunk } from "@/store/thunks/categoryThunks";
import { uploadImageThunk } from "@/store/thunks/uploadThunks";
import {
  activityDefaultValues,
  activitySchema,
} from "@/zod/activity/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useActivityHooks = () => {
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

  return {
    form,
    category,
    fileInputs,
    addFileInput,
    handleFileChange,
    removeFileInput,
    onSubmit,
  };
};

export default useActivityHooks;
