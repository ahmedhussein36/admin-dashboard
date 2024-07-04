"use client";

import { FC, useCallback, useState } from "react";
import qs from "query-string";
import { SelectInput } from "./SelectInput";
import { LuFilter } from "react-icons/lu";
import { SafeArea, SafeCompound, SafeDeveloper } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";
import { allTypes, categories } from "../data/data";

interface FilterProps {
    areas?: SafeArea[] | any;
    compounds?: SafeCompound[] | any;
    developers?: SafeDeveloper[] | any;
}

const ListingFilter: FC<FilterProps> = ({ areas, compounds, developers }) => {
    const [compound, setCompound] = useState<any>("");
    const [category, setCategory] = useState<any>("");
    const [type, setType] = useState<any>("");
    const [developer, setDeveloper] = useState<any>("");
    const [area, setArea] = useState<any>("");

    const router = useRouter();
    const params = useSearchParams();

    const onSubmit = useCallback(async () => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        let updatedQuery: any = {
            ...currentQuery,
            compoundId: compound?.id,
            developerId: developer?.id,
            areaId: area?.id,
            category: category?.name,
            propertyType: type?.name,
        };

        const url = qs.stringifyUrl(
            {
                url: "/listings",
                query: updatedQuery,
            },
            { skipNull: true }
        );

        router.push(url);
    }, [router, compound, params, area, developer, category, type]);

    return (
        <div className=" w-full flex md:flex-wrap md:justify-center lg:flex-nowrap justify-start items-start gap-4">
            <div className=" w-1/3">
                <SelectInput
                    isSearchable={false}
                    value={category}
                    onChange={(value) => setCategory(value)}
                    placeholder={"Category"}
                    options={categories}
                />
            </div>
            <div className=" w-1/3">
                <SelectInput
                    isSearchable={false}
                    value={type}
                    onChange={(value) => setType(value)}
                    placeholder={"Type"}
                    options={allTypes}
                />
            </div>
            <div className=" w-1/3">
                <SelectInput
                    isSearchable={false}
                    value={compound}
                    onChange={(value) => setCompound(value)}
                    placeholder={"Compound"}
                    options={compounds}
                />
            </div>
            <div className=" w-1/3">
                <SelectInput
                    isSearchable={false}
                    value={developer}
                    onChange={(value) => setDeveloper(value as any)}
                    placeholder={"Developer"}
                    options={developers}
                />
            </div>

            <div className=" w-1/3">
                <SelectInput
                    isSearchable={false}
                    value={area}
                    onChange={(value) => setArea(value as any)}
                    placeholder={"Areas"}
                    options={areas}
                />
            </div>
            <div className=" w-1/4 flex gap-4 items-center">
                <button
                    onClick={onSubmit}
                    className=" p-3 px-6 rounded-md bg-slate-700 text-teal-50 flex justify-center items-center gap-2"
                >
                    <LuFilter color="#ffff" /> Filter
                </button>
                {area !== "" ||
                compound !== "" ||
                developer !== "" ||
                type !== "" ||
                category !== "" ? (
                    <div className="justify-start text-red-500 underline font-semibold">
                        <button
                            onClick={() => {
                                router.push("/listings");
                                setDeveloper("");
                                setCompound("");
                                setArea("");
                                setCategory("");
                                setType("");
                            }}
                        >
                            X Clear all
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default ListingFilter;
