"use client";
import { SafeProperty } from "@/app/types";
import ListingsTable from "@/app/components/listings/ListingsTable";
import SearchInput from "@/app/components/inputs/SearchInput";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import ClientOnly from "@/app/components/ClientOnly";
import Pagination from "@/app/components/Pagination";

interface ListinClientProps {
    listings: SafeProperty[];
}

const ListinClient: React.FC<ListinClientProps> = ({ listings }) => {
    const [title, setTitle] = useState<string>("");
    const [filteredData, setFilteredData] = useState<SafeProperty[]>(listings);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setperPage] = useState(20);

    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    const currentItems = filteredData.slice(firstIndex, lastIndex);

    useEffect(() => {
        if (title !== "") {
            const data = listings.filter((item) => {
                return item?.title.toLocaleLowerCase().includes(title);
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
                    <ListingsTable listings={currentItems as any} />

                    <Pagination
                        totalItems={filteredData.length}
                        defaultPageSize={perPage}
                        onChangePage={(page: any) => setCurrentPage(page)}
                        onChangeRowsPerPage={(num: number) => {
                            setperPage(num);
                            setCurrentPage(1); // Reset to first page with new number of items per page
                        }}
                    />
                </ClientOnly>
            </div>
        </>
    );
};
export default ListinClient;
