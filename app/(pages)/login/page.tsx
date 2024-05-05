import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "@/app/components/Container";
import Login from "@/app/components/add-new-property/Login";
import Image from "next/legacy/image";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
    const auth = await getCurrentUser();

    if (auth) {
        redirect("/");
    }

    if (!auth)
        return (
            <Container>
                <div className=" w-full flex flex-col justify-center items-start gap-3">
                    <div id="logo">
                        <Image src={"/images/logo.png"} alt="logo" />
                    </div>
                    <div
                        id="content"
                        className="w-full flex justify-between items-center gap-4"
                    >
                        <div
                            id="vector"
                            className=" w-1/2 flex justify-center items-center p-4"
                        >
                            <Image src={"/images/Build your home.gif"} alt="login-images/Build your home"/>
                        </div>
                        <div  id="login" className=" w-1/2 flex justify-center items-center p-4">
                            <Login />
                        </div>
                    </div>
                </div>
            </Container>
        );
};

export default page;
