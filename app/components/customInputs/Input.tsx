"use client";

import { on } from "events";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    message?: string;
    label: string;
    max?: number;
    min?: number;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    customFormat?: boolean;
    unit?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
    id,
    message,
    label,
    max,
    min,
    type = "text",
    placeholder,
    disabled,
    customFormat,
    unit,
    register,
    required,
    errors,
}) => {
    return (
        <div className="w-full flex flex-col gap-1 items-start relative">  
        
        <label
                htmlFor={id}
                className={`
                text-lg text-slate-500 font-medium
                duration-150  origin-top-right
                ${
                    customFormat
                        ? "rtl:right-4 ltr:left-9"
                        : "rtl:right-4 ltr:left-4"
                }
                ${
                    errors[id]
                        ? "text-rose-500"
                        : "text-zinc-500"
                }
    `}
            >
                {label}
            </label>
            {customFormat && (
                <div className=" 
                                text-slate-400   
                                absolute transform translate-y-9   left-2      
                
                
                ">
                    {unit}
                </div>
            )}
            <input
                id={id}
                max={type === "number" ? max : undefined}
                min={type === "number" ? min : undefined}
                disabled={disabled}
                {...register(id, { required, min, max })}
                type={type}
                placeholder={placeholder}
                className={`
                    placeholder:text-lg
                    placeholder:text-slate-400
                    peer
                    w-full
                    p-3
                    font-medium text-lg 
                    bg-white 
                    border
                    rounded-md
                    outline-none
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${customFormat ? "pl-16" : "pl-4"}
                    ${errors[id] ? "border-rose-500" : "border-neutral-400"}
                    ${
                        errors[id]
                            ? "focus:border-rose-500"
                            : "focus:border-black"
                    }
        `}
            />
          

            {errors[id] && (
                <div className=" text-rose-500 text-xs mt-1">{message}</div>
            )}
        </div>
    );
};

export default Input;
