"use client";

import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

interface CategoryBoxProps {
    label: string;
    icon?: string;
    value?: string;
    selected?: boolean;
    onClick: (value: string) => void;
    isFilter?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    label,
    icon,
    selected,
    value,
    onClick,
    isFilter,
}) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`
        rounded-xl
        border-2
        relative
        p-4
        flex
        justify-center
        ${icon ? "flex-col" : "flex-row"}
        ${icon ? "items-center" : ""}
        gap-3
        hover:shadow-md
        hover:shadow-slate-200
        transition
        cursor-pointer
        ${selected && !isFilter ? "border-blue-500" : "border-slate-300"}
        ${isFilter ? "w-1/2" : ""}
        ${
            selected && isFilter
                ? "bg-slate-500 text-slate-50 border-0"
                : "bg-white"
        }

      `}
        >
            {icon ? (
                <div className="">
                    <Image
                        src={icon}
                        width={75}
                        height={75}
                        alt="category icon"
                    />
                </div>
            ) : (
                ""
            )}
            <div className="font-semibold text-lg">{label}</div>

            {selected && !isFilter ? (
                <div className=" absolute top-2 left-2">
                    {" "}
                    <FaCheckCircle color="blue" />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default CategoryBox;
