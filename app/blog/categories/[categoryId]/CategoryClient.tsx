"use client";
import { SafeArea, SafeDeveloper } from "@/app/types";
import Heading from "@/app/components/Heading";
import ImageUpload from "@/app/components/customInputs/ImageUpload";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useState } from "react";
import { Label, Radio, Spinner, TextInput } from "flowbite-react";
import Textarea from "@/app/components/customInputs/Textarea";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Image from "next/legacy/image";
import de from "date-fns/esm/locale/de/index.js";
import RTE from "@/app/components/postForm/RTE";

interface Props {
    category: SafeDeveloper;
}

const DevClient: FC<Props> = ({ category }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [allPropertyImages, setAllPropertyImages] = useState<string[]>([
        category.image,
    ]);

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
            title: category.title,
            description: category.description,
            content: category.content,
            slug: category.slug,
            image: category.image,
            status: category?.status,
            isFeatured: category?.isFeatured,
            isAddHome: category?.isAddHome,
            isRecommended: category?.isRecommended,
            isFooterMenu: category?.isFooterMenu,
        },
    });

    const image = watch("image");

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
            .put(`/api/developers/${category.id}`, data)
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
                <Heading title="Update Area" />

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
            <hr />
            <div className="w-full md:w-full lg:w-full xl:max-w-[1050px] flex gap-4">
                <div className="w-1/2 flex flex-col gap-2">
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
                        // disabled
                        register={register}
                        errors={errors}
                        required
                    />
                </div>

                <div className=" w-1/3 px-6 bg-white p-3 ml-2 flex flex-col gap-3 justify-between items-start rounded-md border">
                    <div className=" flex flex-col gap-3 justify-start items-start">
                        <strong>Options: </strong>
                        <div className=" flex gap-2 justify-start items-center">
                            <input
                                id="home"
                                {...register("isAddHome")}
                                type="checkbox"
                                className=" focus:ring-0 transition-all rounded"
                            />
                            <label htmlFor="home">Add to home</label>
                        </div>
                        <div className=" flex gap-2 justify-start items-center">
                            <input
                                id="featured"
                                {...register("isFeatured")}
                                type="checkbox"
                                className=" focus:ring-0 transition-all rounded"
                            />
                            <label htmlFor="featured">Featured</label>
                        </div>
                        <div className=" flex gap-2 justify-start items-center">
                            <input
                                id="recommended"
                                {...register("isRecommended")}
                                type="checkbox"
                                className=" focus:ring-0 transition-all rounded"
                            />
                            <label htmlFor="recommended">Recommended</label>
                        </div>
                        <div className=" flex gap-2 justify-start items-center">
                            <input
                                id="footer"
                                type="checkbox"
                                {...register("isFooterMenu")}
                                className=" focus:ring-0 transition-all rounded"
                            />
                            <label htmlFor="footer">Footer menu</label>
                        </div>
                    </div>

                    <div className="w-full flex flex-wrap gap-2  justify-between items-center">
                        <strong>Status: </strong>
                        <div className=" flex gap-2 justify-start items-center">
                            <Radio
                                {...register("status")}
                                id="active"
                                value="active"
                                className=" focus:ring-0 transition-all border-green-400 text-green-400"
                            />
                            <Label htmlFor="active">Active</Label>
                        </div>
                        <div className=" flex gap-2 justify-start items-center">
                            <Radio
                                {...register("status")}
                                value={"pending"}
                                id="pending"
                                className=" focus:ring-0 transition-all  border-orange-200 text-orange-300"
                            />
                            <Label htmlFor="pending">Pending</Label>
                        </div>
                        <div className=" flex gap-2 justify-start items-center">
                            <Radio
                                {...register("status")}
                                value={"inactive"}
                                id="inactive"
                                className=" focus:ring-0 transition-all  border-red-400 text-red-600"
                            />
                            <Label htmlFor="inactive">Inactive</Label>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <ImageUpload
                        label="Update Image"
                        thumbnail={true}
                        onChange={(value) => {
                            setCustomValue("image", value);
                            setAllPropertyImages([...allPropertyImages, value]);
                        }}
                        onAction={() => {
                            setAllPropertyImages([]);
                            setCustomValue("image", "");
                        }}
                        value={image}
                        allImages={allPropertyImages}
                    />
                </div>
            </div>

            <div className="w-full md:w-full lg:w-full xl:max-w-[1050px]">
                <RTE
                    label="Content: "
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
        </div>
    );
};

export default DevClient;
