"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import {
    SafeArea,
    SafeCompound,
    SafeProperty,
    SafeReservation,
    SafeUser,
} from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
    data: any;
    onAction?: (id: string) => void; 
    disabled?: boolean;
    actionLabel?: any;
    actionId?: string;
    currentUser?: SafeUser | null;
    reservation?: SafeReservation;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser,
}) => {
    const router = useRouter();

    const parent =
        data.category === "للبيع"
            ? "properties-for-sale"
            : "properties-for-rent";

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            } 

            onAction?.(actionId);
        },
        [disabled, onAction, actionId]
    );

    return (
        <div
            onClick={() => router.push(`/${parent}/${data.id}`)}
            className="cursor-pointer group w-full md:w-2/3 lg:w-1/2 "
        >
            <div
                className="w-full relative flex justify-between items-center
                            gap-2 rounded-xl border border-neutral-300  overflow-hidden"
            >
                <div
                    className="
                                overflow-hidden 
                                aspect-square
                                w-1/3
                                h-[150px]
                                relative
                        "
                >
                    <Image
                        fill
                        sizes="100%"
                        className=" 
                                group-hover:scale-110  
                                transition
                            "
                        src={data.mainImage}
                        alt="Listing"
                    />
                    <div
                        className="
                                absolute
                                top-3
                                right-3
                            "
                    >
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-3 p-8">
                    <div className="font-light text-neutral-500">
                        <div>{data.title}</div>
                        <div>
                            {data.propertyType} {data.category} في{" "}
                            {data.compound} - {data.area}
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <div className=" text-lg font-semibold">
                            {data.price}{" "}
                            <span className="text-xs font-light">
                                {data.currency}
                            </span>
                        </div>
                    </div>
                </div>

                {onAction && actionLabel && (
                    <div className=" flex flex-col h-full">
                        <button className="h-1/2 bg-slate-200 py-5 font-medium">
                            تعديل
                        </button>
                        <div className=" h-1/2">
                            <Button
                                disabled={disabled}
                                small
                                label={actionLabel}
                                onClick={handleCancel}
                            />
                        </div>{" "}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListingCard;
