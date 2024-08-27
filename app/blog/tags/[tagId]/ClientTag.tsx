"use client";
import Heading from "@/app/components/Heading";
import ImageUpload from "@/app/components/customInputs/ImageUpload";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { Label, Radio, Spinner } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import RTE from "@/app/components/postForm/RTE";

interface Props {
    tag: any;
}

const ClientTag: FC<Props> = ({ tag }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            title: tag.title,
            description: tag.description,
            slug: tag.slug,
            metaTitle: tag?.metaTitle,
            metaDescription: tag?.metaDescription,
        },
    });

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        console.log({ data });

        axios
            .put(`/api/tags/${tag.id}`, data)
            .then(() => {
                toast.success("item Updated successfully!", {
                    position: "bottom-right",
                });
            })
            .catch(() => {
                toast.error("Error : Can't update current item! ", {
                    position: "bottom-right",
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // const onUpdate : SubmitHandler<FieldValues> = (data) =>{

    //     console.log()
    // }

    return (
        <div className=" p-8 flex flex-col gap-6 px-2 md:px-5 lg:px-5 xl:px-5 ">
            <div className="w-full flex justify-between items-center gap-3 ">
                <Heading title="Update tag" />

                <div className="w-[310px] flex justify-end items-center gap-3">
                    <Button
                        label={"Back"}
                        outline
                        onClick={() => {
                            router.refresh();
                            router.back();
                        }}
                    />
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
                </div>
            </div>
            <div className=" flex justify-start items-start gap-4 ">
                <div className="w-2/3 p-8 flex flex-col gap-6 px-2 md:px-5 lg:px-5 xl:px-5 ">
                    <hr />
                    <div className="w-full xl:w-full lg:w-full flex gap-4">
                        <div className="flex-1 flex flex-col gap-2">
                            <Input
                                id="title"
                                label="Title"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                            />
                            <Input
                                id="slug"
                                label="Slug"
                                disabled
                                register={register}
                                errors={errors}
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-full lg:w-full xl:max-w-[1050px]">
                        <RTE
                            label="Content: "
                            name="description"
                            control={control}
                            defaultValue={getValues("description")}
                        />
                    </div>
                    <div
                        className="w-full md:w-full lg:w-full xl:max-w-[1050px]
flex flex-col justify-start items-start gap-3"
                    >
                        <h3 className=" font-semibold text-lg">SEO Details</h3>
                        <Input
                            id="metaTitle"
                            label="Meta title"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                        <Input
                            id="metaDescription"
                            label="Meta description"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientTag;
