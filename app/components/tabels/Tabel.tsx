"use client";

import {
    SafeProperty,
} from "@/app/types";
import { Checkbox, Table } from "flowbite-react";
import { FC } from "react";

import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";


interface TableProps {
    listings: SafeProperty[]
}

const ListingsTable: FC<TableProps> = ({ listings }) => {
    return (
        <div className="overflow-x-auto w-full">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell className="p-4">
                        <Checkbox />
                    </Table.HeadCell>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Type</Table.HeadCell>
                    <Table.HeadCell>Compound</Table.HeadCell>
                    <Table.HeadCell>Area</Table.HeadCell>
                    <Table.HeadCell>Developer</Table.HeadCell>
                    <Table.HeadCell>Rooms</Table.HeadCell>
                    <Table.HeadCell>Bathrooms</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                    <Table.HeadCell>Installment Period</Table.HeadCell>
                    <Table.HeadCell>Down Payment</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="">Action</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {listings.map((listing: SafeProperty | any) => (
                        <Table.Row
                            key={listing.id}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <Table.Cell className="p-4">
                                <Checkbox />
                            </Table.Cell>
                            <Table.Cell>{listing.title}</Table.Cell>
                            <Table.Cell>{listing.propertyType}</Table.Cell>
                            <Table.Cell>{listing.compound}</Table.Cell>
                            <Table.Cell>{listing.area}</Table.Cell>
                            <Table.Cell>{listing.developer}</Table.Cell>
                            <Table.Cell>{listing.roomCount}</Table.Cell>
                            <Table.Cell>{listing.bathroomCount}</Table.Cell>
                            <Table.Cell>{listing.price}</Table.Cell>
                            <Table.Cell>{listing.installmentPeriod}</Table.Cell>
                            <Table.Cell>{listing.downPayment}</Table.Cell>
                            <Table.Cell>
                                <Table.Cell className=" flex justify-start items-start gap-3">
                                    <div
                                        className=" hover:bg-blue-100 hover:rounded-full
                            cursor-pointer  p-2 rounded-md text-white flex gap-1 justify-center items-center"
                                    >
                                        {/* Edit  */}
                                        <FaEdit color="#3b82f6" size={16} />
                                    </div>
                                    <div
                                        className=" hover:bg-red-100 hover:rounded-full
                            cursor-pointer p-2 rounded-md flex gap-1 justify-center items-center"
                                    >
                                        {/* Remove{" "} */}
                                        <FiTrash2 color="#ef4444" size={16} />
                                    </div>
                                </Table.Cell>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                   
                </Table.Body>
            </Table>
        </div>
    );
};

export default ListingsTable;
