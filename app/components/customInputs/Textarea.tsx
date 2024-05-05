"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextareaProps {
    id: string;
    label?: string;
    disabled?: boolean;
    placeholder?: string;
    formatPrice?: boolean;
    message?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Textarea: React.FC<TextareaProps> = ({
    id,
    label,
    disabled,
    placeholder,
    formatPrice,
    register,
    required,
    errors,
    message,
}) => {
    return (
        <div className="w-full flex flex-col gap-1 relative">

            <label
                className={`
        text-md
        duration-150 
        ${formatPrice ? "rtl:right-4 ltr:left-9" : "rtl:right-4 ltr:left-4"}
        ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
            >
                {label}
            </label>

            <textarea
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder={placeholder}
                className={`
        placeholder:text-sm 
          peer
          w-full rounded-lg
          p-4
          h-40
          max-h-40 text-lg
          resize-horizontal
          bg-white 
          border
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? "pl-20" : "pl-4"}
          ${errors[id] ? "border-rose-500" : "border-neutral-400"}
          focus:ring-0 focus:border-black
          `}
            />

            {errors[id] && (
                <div className=" text-rose-500 text-xs mt-1">{message}</div>
            )}
        </div>
    );
};

export default Textarea;
