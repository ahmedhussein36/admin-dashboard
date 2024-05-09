import getUserById from "@/app/actions/getUserById";
import React from "react";
import EditUser from "./EditUser";

interface UserParams {
    userId: string;
}

const UserPage = async ({ params }: { params: UserParams }) => {
    const user = await getUserById(params);

    return (
        <div>
            <EditUser user={user as any} />
        </div>
    );
};

export default UserPage;
