import { MouseEventHandler } from "react";

interface ButtonProps {
  name: string;
  className: string | null;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  loading: boolean;
}

const Button: React.FC<ButtonProps> = ({
  name,
  className,
  onClick,
  loading,
}) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer transition-colors py-2 mt-8 flex justify-center items-center gap-2 text-center text-white rounded-md ${className}`}
      disabled={loading}
    >
      {loading ? "Loading..." : name}
    </button>
  );
};

export default Button;
