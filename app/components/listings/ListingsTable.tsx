"use client";

import useConfirm from "@/app/hooks/useConfirm";
import {
    SafeArea,
    SafeCompound,
    SafeDeveloper,
    SafeProperty,
} from "@/app/types";
import axios from "axios";
import { Checkbox, Table } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import toast from "react-hot-toast";
import Confirm from "@/app/components/Confirm";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

interface TableProps {
    listings: SafeProperty[] & {
        compound: SafeCompound;
        area: SafeArea;
        developer: SafeDeveloper;
    };
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

    const actions = (listing : any) => {
        return (
            <>
                <div
                    onClick={() => {
                        router.push(`/listings/${listing.id}`);
                    }}
                    title="Edit"
                    className=" hover:bg-blue-100 hover:rounded-full
                            cursor-pointer  p-2 rounded-md text-white flex gap-1 justify-center items-center"
                >
                    {/* Edit  */}
                    <FaEdit color="#3b82f6" size={16} />
                </div>
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
            </>
        );
    };

    return (
        <>
            <div className="overflow-x-auto w-full">
                <Confirm
                    isLoading={isLoading}
                    onDelete={() => onDelete(listingId)}
                />

                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell className="">
                            <Checkbox />
                        </Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>Type</Table.HeadCell>
                        <Table.HeadCell>Rooms</Table.HeadCell>
                        <Table.HeadCell>Bathrooms</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y text-lg font-medium">
                        {listings.map((listing: any) => (
                            <Table.Row
                                key={listing.id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="">
                                    <Checkbox />
                                </Table.Cell>
                                <Table.Cell>{listing.title}</Table.Cell>
                                <Table.Cell>{listing.category}</Table.Cell>
                                <Table.Cell>{listing.propertyType}</Table.Cell>
                                <Table.Cell>{listing.roomCount}</Table.Cell>
                                <Table.Cell>{listing.bathroomCount}</Table.Cell>
                                <Table.Cell>{listing.price}</Table.Cell>
                                <Table.Cell>
                                    {StutusColor(listing.status)}
                                </Table.Cell>
                                <Table.Cell>
                                    <Table.Cell className=" flex justify-start items-center gap-3">
                                        {actions(listing)}
                                    </Table.Cell>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </>
    );
};

export default ListingsTable;
