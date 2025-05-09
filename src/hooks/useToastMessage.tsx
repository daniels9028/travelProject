import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface Props {
  keyName: string;
  value: string | null | undefined;
  clearAction: (payload: { key: string }) => any;
}

export function useToastMessage({ keyName, value, clearAction }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (value) {
      toast.info(value);
      dispatch(clearAction({ key: keyName }));
    }
  }, [value, keyName, clearAction, dispatch]);
}
