/* eslint-disable @next/next/no-img-element */
import React from "react";
import plan from "@/public/assets/icons/plan.svg";

interface Props {
    onClick?: () => void;
}

const MasterPlan = ({ onClick }: Props) => {
    return (
        <>
            <button
                onClick={onClick}
                className=" group flex gap-2 
                justify-center items-center p-3 bg-blue-600 text-white
                rounded-md"            >
                <img
                    src={"/assets/icons/plan.svg"}
                    alt="plan"
                    className="w-10 h-10"
                />
                <span>Upload Master plan</span>
                
            </button>
        </>
    );
};

export default MasterPlan;
