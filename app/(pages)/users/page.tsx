import Container from "@/app/components/Container";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Heading from "@/app/components/Heading";
import UserClient from "./UserClient";
import Sorting from "@/app/components/Sorting";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { redirect } from "next/navigation";
import ClientOnly from "@/app/components/ClientOnly";
import getUsers, { UserParams } from "@/app/actions/getUsers";
import UserFilter from "@/app/components/UserFilter";

interface UsersProps {
    searchParams: UserParams;
}

const UserPage = async ({ searchParams }: UsersProps) => {
    const users = await getUsers(searchParams);
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect("/login");
    }

    return (
        <div className="">
            <Container>
                <div className=" flex gap-4 justify-between items-center my-2 w-full">
                    <div>
                        <Heading
                            title={"Users"}
                            subtitle={`Users available: ${users.length}`}
                        />
                    </div>
                    <div className="my-1 cursor-pointer">
                        <Link
                            href={"/users/add-new-user"}
                            className="flex gap-2 justify-center
                                        items-center py-3 px-5 rounded-md text-white
                                         bg-rose-500 font-medium hover:bg-opacity-90 transition-all"
                        >
                            <FaPlus size={"14"} color="#fff" />
                            <p>Add New User</p>
                        </Link>
                    </div>
                </div>
                <div className=" my-2 flex justify-between items-center ">
                    <Sorting data={users} parent="users" />
                </div>
                <ClientOnly>
                    <UserClient users={users as any} />
                </ClientOnly>
            </Container>
        </div>
    );
};

export default UserPage;
