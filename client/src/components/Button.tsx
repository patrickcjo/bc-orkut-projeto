import { useNavigate } from "react-router-dom";

type TTypeClass = "default" | "danger" | "edit";

type ButtonProps = {
  type?: "submit" | "button" | "reset";
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  typeClass?: TTypeClass;
};

export function Button({
  type,
  children,
  to,
  onClick,
  className = "",
  typeClass = "default",
}: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  const configColor: { [key in TTypeClass]: string } = {
    default: "bg-sky-500 hover:bg-sky-400",
    danger:
      "text-[#fff] flex justify-center items-center bg-red-500 h-2 w-28 rounded-md border-2 border-[#222] hover:bg-red-700 hover:text-[#222]",
    edit: "text-[#fff] flex justify-center items-center bg-amber-500 h-2 w-28 rounded-md border-2 border-[#222] hover:bg-amber-700 hover:text-[#222]",
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`rounded-md font-bold text-[#222] py-3 px-3 ${configColor[typeClass]} ${className}`}>
      {children}
    </button>
  );
}
