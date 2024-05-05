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
import { FC, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

interface TableProps {
    compounds: SafeCompound[] & {
        area: SafeArea;
        developer: SafeDeveloper;
    };
    properties: SafeProperty[];
}

const CompoundTable: FC<TableProps> = ({ compounds, properties }) => {
    const [title, setTitle] = useState("");
    const [filteredData, setFilteredData] = useState<SafeCompound[]>(compounds);
    const [compoundId, setCompoundsId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const confirm = useConfirm();

    function onDelete(id: string) {
        setIsLoading(true);
        axios
            .delete(`/api/compounds/${id}`)
            .then(() => {
                confirm.onClose();
                toast.success("Done : item deleted Successfully", {
                    position: "bottom-right",
                });
                router.refresh();
            })
            .catch((error) => {
                toast.error(
                    error?.response?.data?.error ||
                        "Error : Can't delete this item"
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if (title !== "") {
            const data = compounds.filter((item) => {
                return item.title.includes(title.toLocaleLowerCase());
            });
            setFilteredData(data);
        } else {
            setFilteredData(compounds);
        }
    }, [compounds, title]);

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

    const listings = useCallback(
        (compoundId: string) => {
            let data = properties.filter(
                (Property) => Property.compoundId === compoundId
            );
            return data;
        },
        [properties]
    );

    return (
        <div className="overflow-x-auto w-full">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell className="p-4">
                        <Checkbox />
                    </Table.HeadCell>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Slug</Table.HeadCell>
                    <Table.HeadCell>Area</Table.HeadCell>
                    <Table.HeadCell>Developer</Table.HeadCell>
                    <Table.HeadCell>Properties</Table.HeadCell>
                    {/* <Table.HeadCell>Delivery Date</Table.HeadCell>
                    <Table.HeadCell>property Types</Table.HeadCell>
                    <Table.HeadCell>properties</Table.HeadCell>
                    <Table.HeadCell>Min Price</Table.HeadCell>
                    <Table.HeadCell>Max price</Table.HeadCell>
                    <Table.HeadCell>Min. Downpayment</Table.HeadCell>
                    <Table.HeadCell>Max. Downpayment</Table.HeadCell>
                    <Table.HeadCell>Min. installment Period</Table.HeadCell>
                    <Table.HeadCell>Max. installment Period</Table.HeadCell> */}
                    <Table.HeadCell>
                        <span className="">Action</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y text-lg font-medium">
                    {filteredData.map((compound: any) => (
                        <Table.Row
                            key={compound.id}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <Table.Cell className="">
                                <Checkbox />
                            </Table.Cell>
                            <Table.Cell>{compound.title}</Table.Cell>
                            <Table.Cell>{compound?.slug}</Table.Cell>
                            <Table.Cell>{compound?.area?.title}</Table.Cell>

                            <Table.Cell>
                                {compound?.developer?.title}
                            </Table.Cell>

                            <Table.Cell>
                                {listings(compound.id).length}
                            </Table.Cell>

                            <Table.Cell>
                                <Table.Cell className=" flex justify-start items-center gap-3">
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

export default CompoundTable;
