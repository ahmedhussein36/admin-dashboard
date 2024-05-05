"use client";

import { IconType } from "react-icons";
import Loader from "./Loader";
import { SyncLoader } from "react-spinners";

interface ButtonProps {
    label: any;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    className?: string; // Add className prop
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
    className, // Assign className prop
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
                        ${className} 
                        flex gap-3 justify-center items-center py-2 px-3
                        relative
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        rounded-lg
                        hover:opacity-80 w-full
                        transition
                        ${Icon ? "justify-center" : "justify-center"}
                        ${outline ? "bg-slate-50" : "bg-rose-500"}
                        ${outline ? "border-slate-400" : "border-rose-500"}
                        ${outline ? "text-slate-500" : "text-white"}
                        ${small ? "text-sm" : "text-lg "}
                        ${small ? "py-1" : "py-3"}
                        ${small ? "font-light" : "font-medium"}
                        ${small ? "border-[1px]" : "border-2"}
                      
      `}
        >
            {Icon && (
                <Icon
                    size={24}
                    className="
            
          "
                />
            )}
            {label}

            {/* {!disabled? label :  <SyncLoader color="#ffff" size={8} margin={3} />} */}
        </button>
    );
};

export default Button;
