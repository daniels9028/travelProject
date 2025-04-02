import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const FormInput = ({
  label,
  name,
  control,
  placeholder,
  tipe,
  number,
}: {
  label: string;
  name: string;
  control: any;
  placeholder?: string;
  tipe: string;
  number?: boolean;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {tipe === "text" ? (
              <Input
                placeholder={placeholder}
                type={number ? "number" : "text"}
                {...field}
              />
            ) : tipe === "textarea" ? (
              <Textarea placeholder={placeholder} {...field} />
            ) : (
              <Textarea placeholder="Enter promo description" {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
