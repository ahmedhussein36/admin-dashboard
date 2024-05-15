"use client";

import React from "react";
import { FaPlus } from "react-icons/fa6";
import EmptyState from "../EmptyState";
import { useRouter } from "next/navigation";

export const Card = ({ label, data, color, onAction }) => {
    return (
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow shadow-zinc-400/10">
            <div className=" flex flex-col gap-3 justify-start items-start">
                <span className=" text-neutral-400 text-xl font-medium">
                    {label}
                </span>
                <p className="font-semibold text-neutral-500 text-xl">{data}</p>
            </div>
            <div
                onClick={onAction}
                className={`cursor-pointer hover:bg-opacity-80 aspect-square p-3 
                rounded-full flex justify-center items-center ${color} transition-all duration-300`}
            >
                <FaPlus color="#fff" size={20} />
            </div>
        </div>
    );
};

export const MyListitngs = ({ listings }) => {
    return (
        <div className="my-8 flex gap-3 flex-col justify-between items-start bg-white p-6 rounded-xl shadow-md shadow-blue-400/10">
            <div className=" w-full border-b border-slate-200">
                <h2 className="w-full my-2 pb-4  text-xl font-medium">
                    My Listitngs ({listings.length || 0})
                </h2>
            </div>
            <div className=" w-full my-2 flex justify-center items-center">
                <EmptyState />
            </div>
        </div>
    );
};

export const Analisys = ({ areas, compounds, developers, listings }) => {
    const router = useRouter();
    return (
        <div className="grid">
            <div className="grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4  gap-6 ">
                <Card
                    onAction={() =>
                        router.push("/listings//create-new-listing")
                    }
                    label="Listings"
                    data={listings.length}
                    color="bg-rose-500"
                />
                <Card
                    onAction={() =>
                        router.push("/compounds//create-new-compound")
                    }
                    label="Compounds"
                    data={compounds.length}
                    color={"bg-blue-500"}
                />
                <Card
                    label="Devlopers"
                    data={developers.length}
                    color={"bg-lime-500"}
                />
                <Card
                    label="New Lounches"
                    data={areas.length}
                    color={"bg-orange-400"}
                />
            </div>
        </div>
    );
};
