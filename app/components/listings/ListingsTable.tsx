"use client";

import useConfirm from "@/app/hooks/useConfirm";
import { SafeProperty } from "@/app/types";
import axios from "axios";
import { Checkbox, Table } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import toast from "react-hot-toast";
import Confirm from "@/app/components/Confirm";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import Link from "next/link";

interface TableProps {
    listings: SafeProperty[];
}

const ListingsTable: FC<TableProps> = ({ listings }) => {
    const [listingId, setListingId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const confirm = useConfirm();

    function onDelete(id: string) {
        setIsLoading(true);
        axios
            .delete(`/api/properties/${id}`)
            .then(() => {
                confirm.onClose();
                toast.success("Done : item deleted Successfully", {
                    position: "bottom-right",
                });
                router.refresh();
            })
            .catch((error: any) => {
                toast.error(
                    error?.response?.data?.error ||
                    "Error : Can't delete this item",
                    {
                        position: "bottom-right",
                    }
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const StutusColor = useCallback((status: string | null) => {
        if (status === "active")
            return (
                <>
                    <div className="bg-lime-50 text-lime-500 text-center font-normal text-base rounded-full py-1 px-3 w-20">
                        Active
                    </div>
                </>
            );
        if (status === "pending")
            return (
                <>
                    <div className="bg-orange-50 text-orange-400 text-center font-normal text-base rounded-full py-1 px-3 w-20">
                        Pending
                    </div>
                </>
            );
        if (status === "inactive")
            return (
                <>
                    <div className="bg-red-50 text-red-400 text-center text-base font-normal rounded-full py-1 px-3 w-fit">
                        Inactive
                    </div>
                </>
            );
    }, []);

    const actions = (listing: any) => {
        return (
            <div className=" flex justify-center items-center gap-2">
                <Link
                    href={`/listings/${listing.id}`}
                    title="Edit"
                    className=" hover:bg-blue-100 hover:rounded-full
                            cursor-pointer  p-2 rounded-md text-white flex gap-1 justify-center items-center"
                >
                    {/* Edit  */}
                    <FaEdit color="#3b82f6" size={16} />
                </Link>
                <div
                    onClick={() => {
                        setListingId(listing.id);
                        confirm.onOpen();
                    }}
                    title="Delete"
                    className=" hover:bg-red-100 hover:rounded-full
                            cursor-pointer p-2 rounded-md flex gap-1 justify-center items-center"
                >
                    {/* Remove{" "} */}
                    <FiTrash2 color="#ef4444" size={16} />
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="overflow-x-auto w-full">
                <Confirm
                    isLoading={isLoading}
                    onDelete={() => onDelete(listingId)}
                />

                <table className=" overflow-hidden table w-full border-collapse border bg-white rounded-lg">
                    <thead>
                        <tr className=" border p-2">
                            <th className=" px-4 text-left p-2">Title</th>
                            <th className=" px-4 text-left p-2">Ref.</th>
                            <th className=" px-4 text-left p-2">Category</th>
                            <th className=" px-4 text-left p-2">Type</th>
                            <th className=" px-4 text-left p-2">Rooms</th>
                            <th className=" px-4 text-left p-2">Bathrooms</th>
                            <th className=" px-4 text-left p-2">Price</th>
                            <th className=" px-4 text-left p-2">Status</th>
                            <th className=" px-4 text-left p-2">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listings.map((listing: any) => (
                            <tr
                                key={listing.id}
                                className="bg-white border p-2"
                            >
                                <td className=" px-4 text-left p-2">{listing.title}</td>
                                <td className=" px-4 text-left p-2">{listing?.ref || ""}</td>
                                <td className=" px-4 text-left p-2">{listing.category}</td>
                                <td className=" px-4 text-left p-2">{listing.propertyType}</td>
                                <td className=" px-4 text-left p-2">{listing.roomCount}</td>
                                <td className=" px-4 text-left p-2">{listing.bathroomCount}</td>
                                <td className=" px-4 text-left p-2">{listing.price}</td>
                                <td className=" px-4 text-left p-2">{StutusColor(listing.status)} </td>
                                <td className=" px-4 text-left p-2">{actions(listing)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ListingsTable;
