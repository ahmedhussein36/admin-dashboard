"use client";
import { SafeArea, SafeCompound, SafeProperty, SafeUser } from "@/app/types";
import ListingsTable from "@/app/components/listings/ListingsTable";
import SearchInput from "@/app/components/inputs/SearchInput";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import ClientOnly from "@/app/components/ClientOnly";
import TableSkelton from "@/app/components/TableSkelton";

interface ListinClientProps {
    listings: SafeProperty[]
    //  & {
    //     user: SafeUser;
    //     compound: SafeCompound;
    //     area: SafeArea;
    // };
    // currentUser?: SafeUser | null;
}

const ListinClient: React.FC<ListinClientProps> = ({
    listings,
    // currentUser,
}) => {
    const [title, setTitle] = useState<string>("");
    const [filteredData, setFilteredData] = useState<SafeProperty[]>(listings);

    useEffect(() => {
        if (title !== "") {
            const data = listings.filter((item) => {
                return item.title.toLocaleLowerCase().includes(title)
            });
            setFilteredData(data);
        } else {
            setFilteredData(listings);
        }
    }, [listings, title]);

    return (
        <>
            <div className=" w-full sm:grid-cols-2  md:grid-cols-3  gap-8 ">
                <div className="w-1/4 relative my-6">
                    <SearchInput
                        isFilter={false}
                        value={title}
                        onChange={(e) => setTitle(e.target.value as any)}
                        Placeholder="Search for listings"
                    />
                    <div className=" absolute top-3 right-4">
                        <LuSearch size={20} color="#757575" />
                    </div>
                </div>
                <ClientOnly>
                    <ListingsTable 
                    listings={filteredData as any} />
                </ClientOnly>
            </div>
        </>
    );
};
export default ListinClient;
