"use client";

import { FC, useCallback, useState } from "react";
import qs from "query-string";
import { LuFilter } from "react-icons/lu";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterProps {
    userRoles: any[];
}

const UserFilter: FC<FilterProps> = ({ userRoles }) => {
    const [role, setRole] = useState<string>("");

    const handelChange = useCallback((e: any) => {
        if (e.target.value !== "All") setRole(e.target.value);
    }, []);

    const router = useRouter();
    const params = useSearchParams();

    const onSubmit = useCallback(async () => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        let updatedQuery: any = {
            ...currentQuery,
            role: role,
            // status: status,
        };

        const url = qs.stringifyUrl(
            {
                url: "/users",
                query: updatedQuery,
            },
            { skipNull: true }
        );

        router.push(url);
    }, [router, role, params]);

    return (
        <div className=" w-full flex justify-start items-end gap-4">
            <div className="w-full justify-start flex flex-col gap-2">
                <label>Filter by role</label>
                <select
                    // value={role}
                    placeholder="Select"
                    onChange={(e) => handelChange(e)}
                    className=" w-full rounded-md py-2 font-medium text-lg"
                >
                    <option value={"All"}>All</option>
                    {userRoles.map((role, i) => (
                        <option
                            className=" font-medium text-lg my-2"
                            key={i}
                            value={role}
                        >
                            {role}
                        </option>
                    ))}
                </select>
            </div>
            <div className=" w-1/4 flex gap-4 items-center">
                <button
                    onClick={onSubmit}
                    className=" transition-all p-3 px-6 rounded-md bg-slate-700 hover:bg-slate-600 text-teal-50 flex justify-center items-center gap-2"
                >
                    <LuFilter color="#ffff" /> Filter
                </button>
            </div>
            <div className="w-1/3 justify-start text-red-500 underline font-semibold">
                {role !== "All" ? (
                    <button
                        onClick={() => {
                            router.push("/users");
                            setRole("All");
                        }}
                    >
                        X Clear all
                    </button>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default UserFilter;
