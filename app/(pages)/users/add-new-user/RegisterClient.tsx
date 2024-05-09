"use client";

import axios from "axios";
import { useState } from "react";
import {
    MdOutlinePending,
    MdCheckCircleOutline,
    MdErrorOutline,
} from "react-icons/md";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/customInputs/Input";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import { useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";

const userStatus = ["active", "pending", "inactive"];
const userRoles = ["Admin", "Manager", "Editor", "Auther", "User"];

const RegisterClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: null,
            status: null,
            createAt: new Date(),
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post("/api/register", data)
            .then(() => {
                toast.success("New User has been added successfuly");
            })

            .catch((error) => {
                toast.error(error || "Error : New user can't be added!");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Container>
            <div className="flex flex-1 justify-between items-center">
                <Heading title="Add New User" />
                <div className="p-4 my-4 flex justify-center items-center gap-3 w-[300px]">
                    <Button
                        label={
                            isLoading ? (
                                <div className="flex justify-center items-center gap-2">
                                    <Spinner
                                        aria-label="Spinner button"
                                        size="md"
                                        className=" text-white fill-rose-500"
                                    />
                                    <span className="">Saving</span>
                                </div>
                            ) : (
                                "Save"
                            )
                        }
                        onClick={handleSubmit(onSubmit)}
                    />
                    <Button
                        outline
                        label={"Back"}
                        onClick={() => router.back()}
                    />
                </div>
            </div>

            <div className=" w-full lg:w-1/2 mx-auto">
                <div className="grid grid-cols-2 gap-4 px-2 md:px-5 lg:px-5 xl:px-5">
                    <Input
                        id="name"
                        label="Name"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />

                    <Input
                        id="username"
                        label="Username"
                        type="text"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        max={20}
                        min={4}
                        message="(Required*) ,Special characters aren't allowed"
                    />
                    <Input
                        id="email"
                        label="Email"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        message=" (Required*) , enter valid email"
                        required
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        min={8}
                        max={20}
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        message="Password must be 8 characters or more, up to 20 characters"
                        required
                    />
                    <div className="w-full justify-start flex flex-col gap-2">
                        <label className=" text-zinc-500 font-medium">
                            Choose User Role
                        </label>
                        <select
                            {...register("role")}
                            placeholder="Select"
                            className=" w-full rounded-md py-3"
                        >
                            {userRoles.map((role, i) => (
                                <option key={i} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full justify-start flex flex-col gap-2">
                        <label className=" text-zinc-500 font-medium">
                            Choose User Status
                        </label>
                        <select
                            {...register("status")}
                            placeholder="Select"
                            className=" w-full rounded-md py-3"
                        >
                            {userStatus.map((status, i) => (
                                <option value={status} key={i}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default RegisterClient;
