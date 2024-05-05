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
            {/* {!isFilter && (
                <h2 className="p-4 font-bold text-lg text-slate-700">
                    {label}
                </h2>
            )} */}
            <div
                className={` 
                flex justify-between items-center gap-2 w-full
                ${
                    button
                        ? "border-2 rounded-full overflow-hidden"
                        : "border-none"
                }
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
                    className={` ${className}
                       ${button ? "w-auto" : "w-full"} 
                        
                       
                        ${
                            button
                                ? "rounded-none border-none h-full p-2 bg-none"
                                : " rounded-md  bg-white p-3 "
                        }
                        focus:border-slate-400 focus:ring-0 border-2 border-slate-300
                        rounded-md
                        outline-none
                        transition
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                `}
                />
                {button && (
                    <button
                        onClick={onclick}
                        className=" bg-red-500 p-2 rounded-full m-1 hover:bg-red-600 transition-all duration-300 ease-in-out"
                    >
                        <IoSearch color="#ffff" size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchInput;
