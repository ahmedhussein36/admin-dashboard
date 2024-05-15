import getUserById from "@/app/actions/getUserById";
import React from "react";
import EditUser from "./EditUser";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { SafeUser } from "@/app/types";

interface UserParams {
    userId: string;
}

const UserPage = async ({ params }: { params: UserParams }) => {
    const currentUser = await getCurrentUser();
    const user = await getUserById(params);

    if (!currentUser) {
        redirect("/login");
    }

    if (currentUser?.role?.toLocaleLowerCase() !== "admin") {
        return redirect("/");
    }

    return (
        <div>
            <EditUser user={user as any} />
        </div>
    );
};

export default UserPage;
