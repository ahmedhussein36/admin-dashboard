"use client";

import { FaCheckCircle } from "react-icons/fa";

interface CategorySelectProps {
    label: string;
    value: any[];
    selected?: boolean;
    onClick: (value: any) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
    label,
    value,
    selected,
    onClick,
}) => {
    return (
        <div
            onClick={() => onClick(value)}
            className={`
        rounded-md py-2 px-4 w-full
        relative
        flex border
        justify-between items-center
        gap-3
        hover:bg-slate-100
        transition
        cursor-pointer
        ${selected ? "border-purple-500 " : "border-0"}
        ${selected
                    ? "bg-slate-50 text-slate-700"
                    : "bg-white text-slate-500"
                }
      `}
        >
            <div className="w-[25px]">
                {selected ? <FaCheckCircle color="#a855f7" size={16} /> : ""}
            </div>
            <div className="">{label}</div>
        </div>
    );
};

export default CategorySelect;
