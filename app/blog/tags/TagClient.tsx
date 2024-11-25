"use client";
import ClientOnly from "@/app/components/ClientOnly";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import SearchInput from "@/app/components/inputs/SearchInput";
import { LuSearch } from "react-icons/lu";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Confirm from "@/app/components/Confirm";
import useConfirm from "@/app/hooks/useConfirm";
import EmptyState from "@/app/components/EmptyState";
import TagModal from "@/app/components/modals/TagModal";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";
import useTagModal from "@/app/hooks/useTagModal";

interface Props {
    tags: any[];
}

const TagClient: React.FC<Props> = ({ tags }) => {
    const [name, setname] = useState("");
    const [filteredData, setFilteredData] = useState(tags);
    const [categoryId, setCategoryId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const tagModal = useTagModal();
    const confirm = useConfirm();

    function onDelete(id: string) {
        setIsLoading(true);
        axios
            .delete(`/api/tags/${id}`)
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
        if (name !== "") {
            const data = tags.filter((item) => {
                return item.name.includes(name.toLocaleLowerCase());
            });
            setFilteredData(data);
        } else {
            setFilteredData(tags);
        }
    }, [tags, name]);

    return (
        <>
            <TagModal />
            <Confirm
                isLoading={isLoading}
                onDelete={() => onDelete(categoryId)}
            />

            <div className=" w-full flex justify-between items-center my-4">
                <div className="w-2/6 relative">
                    <SearchInput
                        isFilter={false}
                        value={name}
                        onChange={(e) => setname(e.target.value as any)}
                        Placeholder="Search for tags"
                    />
                    <div className=" absolute top-3 right-4">
                        <LuSearch size={20} color="#757575" />
                    </div>
                </div>
                <div className="my-1 cursor-pointer">
                    <button
                        onClick={tagModal.onOpen}
                        className="flex gap-2 justify-center items-center 
                        py-3 px-5 rounded-md border-2 border-slate-400 bg-slate-100"
                    >
                        <FaPlus size={"14"} color="blue" /> <p>Add new Tag</p>
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
                    {!filteredData.length ? (
                        <EmptyState />
                    ) : (
                        <div className="overflow-x-auto w-full">
                            <table className=" overflow-hidden table w-full border-collapse border bg-white rounded-lg">
                                <thead>
                                    <tr className=" border p-2">
                                        <th className=" px-4 text-left p-2">
                                            name
                                        </th>
                                        <th className=" px-4 text-left p-2">
                                            Posts
                                        </th>
                                        <th className=" px-4 text-left p-2">
                                            Author
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item: any) => (
                                        <tr
                                            key={item.id}
                                            className="bg-white border border-spacing-1"
                                        >
                                            <td className=" px-4 text-left p-2">
                                                {item.name}
                                            </td>
                                            <td className=" px-4 text-left p-2">
                                                <Link
                                                    href={`/blog/posts?tagId=${item.id}`}
                                                    className="text-zinc-500 hover:text-blue-700 hover:underline"
                                                >
                                                    {item.posts.length}
                                                </Link>
                                            </td>
                                            <td className=" px-4 text-left p-2">
                                                {item?.user?.name}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </ClientOnly>
            </div>
        </>
    );
};
export default TagClient;
