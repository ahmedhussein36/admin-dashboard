import Container from "@/app/components/Container";
import Link from "next/link";
import React from "react";
import { TbStatusChange } from "react-icons/tb";

const page = () => {
    return (

        <Container>
            <div className=" p-4 grid grid-cols-5">
                <div className=" flex justify-center items-center col-span-1 ">
                    <Link
                        className=" flex flex-col justify-center items-center
                                    p-12 h-full w-full gap-3
                                    rounded-lg border-purple-500 border 
                                    text-center hover:bg-slate-100 
                                    hover:text-purple-700
                                    transition-all duration-300 ease-in-out"
                        href={"/settings/redirect"}>
                        <TbStatusChange color=" black" size={44} />
                        <span className=" font-semibold text-lg">Create Redirect</span> </Link>
                </div>
            </div>
        </Container>
    )

};

export default page;
