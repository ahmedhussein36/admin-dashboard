"use client";
import { SafeDeveloper } from "@/app/types";
import ClientOnly from "@/app/components/ClientOnly";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import { Checkbox, Table } from "flowbite-react";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import Image from "next/legacy/image";
import SearchInput from "@/app/components/inputs/SearchInput";
import { LuSearch } from "react-icons/lu";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Confirm from "@/app/components/Confirm";
import useConfirm from "@/app/hooks/useConfirm";
import useDeveloperModal from "@/app/hooks/useDeveloperModal";
import DeveloperModal from "@/app/components/modals/DeveloperModal";
import Link from "next/link";
import Pagination from "@/app/components/Pagination";

const BASE_URL = "https://remaxroyal.net";

interface Props {
    developers: SafeDeveloper[];
}

const DeveloperClient: React.FC<Props> = ({ developers }) => {
    const [title, setTitle] = useState("");
    const [filteredData, setFilteredData] = useState(developers);
    const [developerId, setDeveloperId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setperPage] = useState(20);

    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    const currentItems = filteredData.slice(firstIndex, lastIndex);

    const router = useRouter();
    const newDeveloperModal = useDeveloperModal();
    const confirm = useConfirm();

    function onDelete(id: string) {
        setIsLoading(true);
        axios
            .delete(`/api/developers/${id}`)
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
                        "Error : Can't delete this item",
                    { position: "bottom-right" }
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if (title !== "") {
            const data = developers.filter((item) => {
                return item.title.toLocaleLowerCase().includes(title);
            });
            setFilteredData(data);
        } else {
            setFilteredData(developers);
        }
    }, [developers, title]);

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
            <DeveloperModal />
            <Confirm
                isLoading={isLoading}
                onDelete={() => onDelete(developerId)}
            />

            <div className=" w-full flex justify-between items-center my-4">
                <div className="w-2/6 relative">
                    <SearchInput
                        isFilter={false}
                        value={title}
                        onChange={(e) => setTitle(e.target.value as any)}
                        Placeholder="Search for developers"
                    />
                    <div className=" absolute top-3 right-4">
                        <LuSearch size={20} color="#757575" />
                    </div>
                </div>
                <div className="my-1 cursor-pointer">
                    <button
                        onClick={() => newDeveloperModal.onOpen()}
                        className="flex gap-2 justify-center items-center 
                        py-3 px-5 rounded-md border-2 border-slate-400 bg-slate-100"
                    >
                        <FaPlus size={"14"} color="blue" />{" "}
                        <p>Add new developer</p>
                    </button>
                </div>
            </div>

            <div className=" w-full my-4"></div>

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
                    <div className="overflow-x-auto w-full">
                        <table className=" overflow-hidden table w-full border-collapse border bg-white rounded-lg">
                            <thead>
                                <tr className=" border p-2">
                                    <th className=" px-4 text-left p-2">
                                        Image
                                    </th>
                                    <th className=" px-4 text-left p-2">
                                        Title
                                    </th>
                                    <th className=" px-4 text-left p-2">
                                        Author
                                    </th>
                                    <th className=" px-4 text-left p-2">
                                        Compounds
                                    </th>
                                    <th className=" px-4 text-left p-2">
                                        Properties
                                    </th>
                                    <th className=" px-4 text-left p-2">
                                        Status
                                    </th>
                                    <th className=" px-4 text-left p-2">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item) => (
                                    <tr
                                        key={item.id}
                                         className="bg-white border border-spacing-1"
                                    >
                                        <td className=" px-4 text-left p-2">
                                            <Image
                                                width={35}
                                                height={35}
                                                src={item.image}
                                                alt={item.title}
                                                className="rounded-full"
                                            />
                                        </td>
                                        <td className=" px-4 text-left p-2">
                                            {item.title}
                                        </td>
                                        <td className=" px-4 text-left p-2">
                                            {item?.user?.name}
                                        </td>
                                        <td className=" px-4 text-left p-2">
                                            <Link
                                                href={`/compounds?developerId=${item.id}`}
                                                className=" hover:text-blue-500 hover:underline"
                                            >
                                                {0}
                                            </Link>
                                        </td>
                                        <td className=" px-4 text-left p-2">
                                            <Link
                                                href={`/listings?developerId=${item.id}`}
                                                className=" hover:text-blue-500 hover:underline"
                                            >
                                                {0}
                                            </Link>
                                        </td>
                                        <td className=" px-4 text-left p-2">
                                            {StutusColor(item.status)}
                                        </td>
                                        <td className=" flex justify-start items-center gap-3">
                                            <Link
                                                href={`/developers/${item.id}`}
                                                title="Edit"
                                                className=" hover:bg-blue-100 hover:rounded-full
                            cursor-pointer  p-2 rounded-md text-white flex gap-1 justify-center items-center"
                                            >
                                                {/* Edit  */}
                                                <FaEdit
                                                    color="#3b82f6"
                                                    size={16}
                                                />
                                            </Link>
                                            <Link
                                                href={`${BASE_URL}/developers/${item.slug}`}
                                                title="Preview"
                                                className=" hover:bg-red-100 hover:rounded-full
                            cursor-pointer p-2 rounded-md flex gap-1 justify-center items-center"
                                            >
                                                {/* Remove{" "} */}
                                                <FaRegEye
                                                    color="gray"
                                                    size={16}
                                                />
                                            </Link>
                                            <div
                                                onClick={() => {
                                                    setDeveloperId(item.id);
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
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        totalItems={filteredData.length}
                        defaultPageSize={perPage}
                        onChangePage={(page) => setCurrentPage(page)}
                        onChangeRowsPerPage={(num) => {
                            setperPage(num);
                            setCurrentPage(1); // Reset to first page with new number of items per page
                        }}
                    />
                </ClientOnly>
            </div>
        </>
    );
};
export default DeveloperClient;
