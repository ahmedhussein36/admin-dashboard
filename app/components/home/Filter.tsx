"use client";

import { FC, useCallback, useState } from "react";
import qs from "query-string";
import { SelectInput } from "./SelectInput";
import { LuFilter } from "react-icons/lu";
import { SafeArea, SafeCompound, SafeDeveloper } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterProps {
    areas?: SafeArea[] | any;
    compounds?: SafeCompound[] | any;
    developers?: SafeDeveloper[] | any;
}

const Filter: FC<FilterProps> = ({ areas, compounds, developers }) => {
    const [compound, setCompound] = useState<any>();
    const [developer, setDeveloper] = useState<any>();
    const [area, setArea] = useState<any>();

    const router = useRouter();
    const params = useSearchParams();

    const onSubmit = useCallback(async () => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        let updatedQuery: any = {
            ...currentQuery,
            title: compound?.title,
            developerId: developer?.id,
            areaId: area?.id,
        };

        const url = qs.stringifyUrl(
            {
                url: "/compounds",
                query: updatedQuery,
            },
            { skipNull: true }
        );

        router.push(url);
    }, [router, compound, params, area, developer]);

    return (
        <div className=" w-full flex justify-start items-start gap-4">
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
                    className=" transition-all p-3 px-6 rounded-md bg-slate-700 hover:bg-slate-600 text-teal-50 flex justify-center items-center gap-2"
                >
                    <LuFilter color="#ffff" /> Filter
                </button>

                {!area || !compound || !developer ? (
                    <div className="justify-start text-red-500 underline font-semibold">
                        <button
                            onClick={() => {
                                router.push("/compounds");
                                setDeveloper("");
                                setCompound("");
                                setArea("");
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

export default Filter;
