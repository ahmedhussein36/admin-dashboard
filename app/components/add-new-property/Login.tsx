"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import Input from "../customInputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import { Spinner } from "flowbite-react";
import Image from "next/legacy/image";
import Container from "../Container";
import RegisterModal from "../modals/RegisterModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const Login = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const RegisterModel = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState(Boolean);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn("credentials", {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success("تم تسجيل الدخول إلى حسابك", {
                    position: "bottom-right",
                });
                router.refresh();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        });
    };

    useEffect(() => {
        if (loginModal.isOpen) {
            setEmail(false);
        }
    }, [loginModal.isOpen]);

    const onToggle = useCallback(() => {
        loginModal.onClose();
        RegisterModel.onOpen();
    }, [RegisterModel, loginModal]);

    const emailLogin = (
        <div className="flex flex-col gap-4 px-5 justify-start items-center">
            <Heading title={"Login To Your Account"} />
                <Input
                    id="email"
                    label="Email"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
        </div>
    );

    return (
        <html>
            <head>
                <title>login</title>
                <meta name="title" content="login page" />
            </head>
            <body>
                <Container>
                    <div className="p-6 w-full flex flex-col justify-center items-start gap-3">
                        <div id="logo">
                            <Image
                                src={"/images/royal-logo.png"}
                                alt="logo"
                                width={120}
                                height={40}
                                loading="eager"
                            />
                        </div>
                        <div
                            id="content"
                            className="w-full flex justify-center items-center gap-4"
                        >
                            <div
                                id="vector"
                                className="hidden w-1/2 md:flex justify-center items-center p-4"
                            >
                                <Image
                                    width={600}
                                    height={600}
                                    priority
                                    loading="eager"
                                    src={"/images/House searching-bro.png"}
                                    alt="login-images/Build your home"
                                />
                            </div>
                            <div
                                id="login"
                                className="w-full hidden text-center md:w-1/2 md:flex flex-col justify-center items-center p-4 "
                            >
                                <h1 className="w-full mb-6 font-medium text-slate-500 text-3xl">
                                    Welcome to Remax Royal Admin
                                </h1>
                                <div className="p-2 md:p-6 relative flex justify-start items-center">
                                    <form 
                                        className="realive flex flex-col gap-2 rounded-lg justify-center
                                            items-start w-[450px] p-8 shadow-lg shadow-zinc-200/80  bg-white"
                                    >
                                        <div className="w-full">
                                            {emailLogin}
                                        </div>
                                        <div className="w-full my-2 px-4">
                                            <Button
                                                label={
                                                    isLoading ? (
                                                        <div className="flex justify-center items-center gap-2">
                                                            <Spinner
                                                                aria-label="Spinner button"
                                                                size="md"
                                                                className=" text-white fill-rose-500"
                                                            />
                                                            <span className="">
                                                                Login...
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        "Login"
                                                    )
                                                }
                                                onClick={handleSubmit(onSubmit)}
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </body>
        </html>
    );
};

export default Login;
