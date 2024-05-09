"use client";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/customInputs/Input";
import { SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";
import { Dropdown } from "primereact/dropdown";

const userStatus = ["Active", "Pending", "Inactive"];
const userRoles = ["Admin", "Manager", "Editor", "Auther", "User"];

interface EditProps {
    user: SafeUser;
}

const EditUser: FC<EditProps> = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(false);
    const router = useRouter();

    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: user?.name || "",
            email: user.email || "",
            username: user.username || "",
            role: user.role || "User",
            status: user.status || "Pending",
            updateAt: new Date(),
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .put(`/api/register/${user.id}`, data)
            .then(() => {
                toast.success("User has been updated successfuly", {
                    position: "bottom-right",
                });
            })

            .catch((error) => {
                toast.error(error || "Error : New user can't be update!", {
                    position: "bottom-right",
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Container>
            <div className="flex flex-1 justify-between items-center">
                <Heading title="Update User" />
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
                                    <span className="">Updating</span>
                                </div>
                            ) : (
                                "Update"
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
                    {/* <Input
                        id="password"
                        label="Password"
                        type="password"
                        min={8}
                        max={20}
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        message="Password must be 8 characters or more, up to 20 characters"
                    /> */}
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
                            className=" w-full rounded-md py-3 font-medium text-lg"
                        >
                            {userStatus.map((status, i) => (
                                <option 
                                className=" font-medium text-lg hover:bg-slate-100 py-8"
                                value={status} 
                                key={i}>
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

export default EditUser;
