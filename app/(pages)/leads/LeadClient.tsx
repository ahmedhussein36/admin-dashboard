"use client";
import { SafeLead } from "@/app/types";
import ClientOnly from "@/app/components/ClientOnly";
import SearchInput from "@/app/components/inputs/SearchInput";
import { LuSearch } from "react-icons/lu";
import { useEffect, useState } from "react";
import EmptyState from "@/app/components/EmptyState";
import FIlter from "./FIlter";
import ReactCountryFlag from "react-country-flag";

interface Props {
    leads: SafeLead[];
}

const LeadClient: React.FC<Props> = ({ leads }) => {
    const [title, setTitle] = useState("");
    const [filteredData, setFilteredData] = useState<SafeLead[]>(leads);

    useEffect(() => {
        if (title !== "") {
            const data = leads.filter((item) => {
                return item.name.toLocaleLowerCase().includes(title);
            });
            setFilteredData(data);
        } else {
            setFilteredData(leads);
        }
    }, [leads, title]);

    return (
        <>
            <div className=" w-full flex justify-start items-end gap-4 my-8">
                <div className="w-1/4 relative">
                    <SearchInput
                        isFilter={false}
                        value={title}
                        onChange={(e) => setTitle(e.target.value as any)}
                        Placeholder="Search for leads"
                    />
                    <div className=" absolute top-3 right-4">
                        <LuSearch size={20} color="#757575" />
                    </div>
                </div>
                <FIlter leads={leads} />
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
                        <div className="overflow-x-auto w-full bg-white rounded-lg p-6">
                            <table className=" w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="text-start font-medium p-2 text-gray-400">
                                            Name
                                        </th>
                                        <th className="text-start font-medium p-2 text-gray-400">
                                            Country
                                        </th>
                                        <th className="text-start font-medium p-2 text-gray-400">
                                            Dial Code
                                        </th>
                                        <th className="text-start font-medium p-2 text-gray-400">
                                            Phone No.
                                        </th>
                                        <th className="text-start font-medium p-2 text-gray-400">
                                            Email
                                        </th>
                                        <th className="text-start font-medium p-2 text-gray-400">
                                            Project Name
                                        </th>
                                        <th className="text-start font-medium p-2 text-gray-400">
                                            Project Ref.
                                        </th>
                                        <th className="text-start font-medium p-2 text-gray-400">
                                            Unit Ref.
                                        </th>
                                        <th className="text-start font-medium p-2 text-gray-400">
                                            date & time.
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y font-medium text-lg">
                                    {filteredData.map((item: SafeLead) => (
                                        <tr
                                            key={item.id}
                                            className="bg-white p-2 py-4 hover:bg-gray-100 transition-all"
                                        >
                                            <td className="text-start font-medium p-2 py-4 text-black">
                                                {item.name}
                                            </td>
                                            <td className="text-start font-medium p-2 py-4 text-gray-500">
                                                <ReactCountryFlag
                                                    countryCode={
                                                        item.country.flag
                                                    }
                                                    alt={item.country.value}
                                                    svg
                                                    style={{
                                                        marginRight: "8px",
                                                        width: "18px",
                                                        height: "18px",
                                                    }}
                                                />
                                                {item?.country?.name.en}
                                            </td>
                                            <td className="text-start font-medium p-2 py-4 text-gray-500">
                                                {item?.country.dialCode}
                                            </td>
                                            <td className="text-start font-medium p-2 py-4 text-gray-500">
                                                {item?.phone}
                                            </td>
                                            <td className="text-start font-medium p-2 py-4 text-gray-500">
                                                {item?.email}
                                            </td>
                                            <td className="text-start font-medium p-2 py-4 text-gray-500">
                                                {item.compoundName}
                                            </td>
                                            <td className="text-start font-medium p-2 py-4 text-gray-500">
                                                {item.compoundRef}
                                            </td>
                                            <td className="text-start font-medium p-2 py-4 text-gray-500">
                                                {item.unitRef}
                                            </td>
                                            <td className="text-start font-medium p-2 py-4 text-gray-500">
                                                {item.createdAt.toString()}
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
export default LeadClient;
