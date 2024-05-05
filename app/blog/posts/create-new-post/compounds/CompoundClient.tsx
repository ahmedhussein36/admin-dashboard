"use client";
import {
    SafeArea,
    SafeCompound,
    SafeDeveloper,
    SafeProperty,
} from "@/app/types";
import ClientOnly from "@/app/components/ClientOnly";
import { useRouter } from "next/navigation";
import { Checkbox, Table } from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import SearchInput from "@/app/components/inputs/SearchInput";
import { LuSearch } from "react-icons/lu";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Confirm from "@/app/components/Confirm";
import useConfirm from "@/app/hooks/useConfirm";
import EmptyState from "@/app/components/EmptyState";
import Filter from "@/app/components/home/Filter";

interface Props {
    areas: SafeArea[];
    developers: SafeDeveloper[];
    compounds: SafeCompound[] & {
        area: SafeArea;
        developer: SafeDeveloper;
    };
    listings: SafeProperty[];
}

const CompoundClient: React.FC<Props> = ({
    compounds,
    listings,
    areas,
    developers,
}) => {
    const [title, setTitle] = useState("");
    const [filteredData, setFilteredData] = useState<SafeCompound[]>(compounds);
    const [compoundId, setCompoundId] = useState("");
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

    return (
        <>
            <Confirm
                isLoading={isLoading}
                onDelete={() => onDelete(compoundId)}
            />

            <div className=" w-full flex justify-between items-center gap-4 my-8">
                <div className="w-1/4 relative">
                    <SearchInput
                        isFilter={false}
                        value={title}
                        onChange={(e) => setTitle(e.target.value as any)}
                        Placeholder="Search for compound"
                    />
                    <div className=" absolute top-3 right-4">
                        <LuSearch size={20} color="#757575" />
                    </div>
                </div>
               
            </div>

            <div
                className="

                            pt-2
                            mt-2
                           w-full
                            sm:grid-cols-2 
                            md:grid-cols-3 
                            gap-8
                        "
            >
                <ClientOnly>
                    {!filteredData.length ? (
                        <EmptyState />
                    ) : (
                        <div className="overflow-x-auto w-full">
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell className="p-4">
                                        <Checkbox />
                                    </Table.HeadCell>
                                    <Table.HeadCell>Title</Table.HeadCell>
                                    <Table.HeadCell>slug</Table.HeadCell>
                                    <Table.HeadCell>Developer</Table.HeadCell>
                                    <Table.HeadCell>Launch</Table.HeadCell>
                                    <Table.HeadCell>Properties</Table.HeadCell>
                                    <Table.HeadCell>Status</Table.HeadCell>

                                    <Table.HeadCell>
                                        <span className="">Action</span>
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y font-medium text-lg">
                                    {filteredData.map((item : any) => (
                                        <Table.Row
                                            key={item.id}
                                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <Table.Cell className="p-4">
                                                <Checkbox />
                                            </Table.Cell>

                                            <Table.Cell>
                                                {item.title}
                                            </Table.Cell>
                                            <Table.Cell>{item.slug}</Table.Cell>
                                            <Table.Cell>
                                                {item?.developer?.title}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {item.isLaunch}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {
                                                    listings.filter(
                                                        (listing) =>
                                                            listing.compoundId ===
                                                            item.id
                                                    ).length
                                                }
                                            </Table.Cell>
                                            <Table.Cell>
                                                {StutusColor(
                                                    item?.status || ""
                                                )}
                                            </Table.Cell>
                                            <Table.Cell className=" flex justify-start items-center gap-3">
                                                <div
                                                    onClick={() => {
                                                        router.push(
                                                            `/compounds/${item.id}`
                                                        );
                                                    }}
                                                    title="Edit"
                                                    className=" hover:bg-blue-100 hover:rounded-full
                            cursor-pointer  p-2 rounded-md text-white flex gap-1 justify-center items-center"
                                                >
                                                    {/* Edit  */}
                                                    <FaEdit
                                                        color="#3b82f6"
                                                        size={16}
                                                    />
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setCompoundId(item.id);
                                                        confirm.onOpen();
                                                    }}
                                                    title="Delete"
                                                    className=" hover:bg-red-100 hover:rounded-full
                            cursor-pointer p-2 rounded-md flex gap-1 justify-center items-center"
                                                >
                                                    {/* Remove{" "} */}
                                                    <FiTrash2
                                                        color="#ef4444"
                                                        size={16}
                                                    />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                    )}
                </ClientOnly>
            </div>
        </>
    );
};
export default CompoundClient;
