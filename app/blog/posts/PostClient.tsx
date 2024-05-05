"use client";
import { SafeCompound } from "@/app/types";
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
import Container from "@/app/components/Container";

interface Props {
    posts: [];
}

const PostClient: React.FC<Props> = ({ posts }) => {
    const [title, setTitle] = useState("");
    const [filteredData, setFilteredData] = useState<SafeCompound[]>(posts);
    const [postId, setpostId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const confirm = useConfirm();

    function onDelete(id: string) {
        setIsLoading(true);
        axios
            .delete(`/api/posts/${id}`)
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
            const data = posts.filter((item: any) => {
                return item?.title.includes(title.toLocaleLowerCase());
            });
            setFilteredData(data);
        } else {
            setFilteredData(posts);
        }
    }, [posts, title]);

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
        <Container>
            <Confirm isLoading={isLoading} onDelete={() => onDelete(postId)} />

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
                    <EmptyState />
                </ClientOnly>
            </div>
        </Container>
    );
};
export default PostClient;
