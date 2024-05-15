import React from "react";
import RegisterClient from "./RegisterClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";

const Registerpage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        redirect("/login");
    }

    if (currentUser?.role?.toLocaleLowerCase() !== "admin") {
        return redirect("/");
    }

    return (
        <div className=" w-full">
            <RegisterClient />
        </div>
    );
};

export default Registerpage;
