import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface InputFieldProps {
  name: string;
  placeholder: string;
  type: string;
  title: string;
  register: any;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  type,
  title,
  register,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col w-full gap-2 mt-3">
      <label
        htmlFor={name}
        className="font-semibold tracking-wide capitalize text-gray-700"
      >
        {title}
      </label>
      <div className="relative">
        <input
          id={name}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          name={name}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full px-4 py-2 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none ${
            isPassword ? "pr-10" : ""
          } transition ease-in-out duration-150`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition ease-in-out duration-150"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
