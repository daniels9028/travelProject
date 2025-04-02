import { Controller } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const FormSelect = ({
  control,
  name,
  datas,
}: {
  control: any;
  name: string;
  datas: any[];
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({}) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <Controller
              control={control}
              name={name}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {datas.map((item) => (
                        <SelectItem value={item?.id} key={item?.id}>
                          {item?.name}
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
  );
};

export default FormSelect;
