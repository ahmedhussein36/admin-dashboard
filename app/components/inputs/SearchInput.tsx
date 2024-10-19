"use client";

import { IoSearch } from "react-icons/io5";

export type SearchValue = {
    target: any;
    value: string;
};

interface InputProps {
    id?: string;
    isFilter?: boolean;
    label?: string;
    Placeholder?: string;
    disabled?: boolean;
    value?: string;
    className?: string;
    onChange: (value: SearchValue) => void;
    button?: boolean;
    onclick?: () => void;
}

const SearchInput: React.FC<InputProps> = ({
    id,
    label,
    disabled,
    value,
    Placeholder,
    className,
    onChange,
    button,
    onclick,
    isFilter,
}) => {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-1">
            <div
                className={` 
                flex justify-between items-center gap-2 w-full
           `}
            >
                <input
                    type="text"
                    autoComplete="off"
                    id={id}
                    disabled={disabled}
                    value={value}
                    onChange={(value) =>
                        onChange(value as unknown as SearchValue)
                    }
                    placeholder={Placeholder}
                    className={` 
                        border border-gray-500
                        rounded-md p-2
                        transition w-[270px] h-[42px]
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        ${className}
                `}
                />
            </div>
        </div>
    );
};

export default SearchInput;
