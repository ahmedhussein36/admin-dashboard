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
import {
    lightArea,
    lightDeveloper,
    SafeArea,
    SafeCompound,
    SafeDeveloper,
} from "@/app/types";
import Select from "react-select";

interface Props {
    compound: SafeCompound;
    developers: lightDeveloper[];
    areas: lightArea[];
}

const Client: FC<Props> = ({ compound, developers, areas }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [allPropertyImages, setAllPropertyImages] = useState<string[]>(
        compound.images
    );

    const {
        register,
        handleSubmit,
        setValue,
        control,
        getValues,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            title: compound?.title,
            name: compound?.name || "",
            description: compound?.description,
            content: compound?.content,
            slug: compound?.slug,
            mainImage: compound?.mainImage,
            metaTitle: compound?.seoDetails?.metaTitle,
            metaDescription: compound?.seoDetails?.metaDescription,
            isLaunch: compound.isLaunch,
            area: compound?.area,
            developer: compound?.developer,
            images: compound.images,
            status: compound.status,
            isFeatured: compound.isFeatured,
            isAddHome: compound.isAddHome,
            isRecommended: compound.isRecommended,
            isFooterMenu: compound.isFooterMenu,
        },
    });

    const mainImage = watch("mainImage");
    const images = watch("images");
    const area = watch("area");
    const developer = watch("developer");

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .put(`/api/compounds/${compound.id}`, data)
            .then(() => {
                toast.success("item Updated successfully!", {
                    position: "bottom-right",
                });
                router.refresh();
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

    return (
        <>
            <div className="w-full flex justify-between items-center gap-3 mt-4 mb-2 p-4">
                <Heading title="Update Compound" />

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
                <div className="w-2/3 p-6 flex flex-col gap-6 px-2 md:px-5 lg:px-5 xl:px-5 ">
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

                            <Input
                                id="name"
                                label="name"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                            />
                            <div className="flex gap-2 w-full z-10 my-6">
                                <div className=" w-1/2">
                                    <Select
                                        value={area}
                                        onChange={(value: any) => {
                                            setCustomValue("area", value);
                                        }}
                                        isClearable
                                        isSearchable={false}
                                        options={areas}
                                        placeholder="Select area"
                                        formatOptionLabel={(
                                            areas
                                        ) => <div>{areas.title}</div>}
                                        classNames={{
                                            control: () =>
                                                "p-1 border placeholder:text-slate-400 focus:border-primary-500",
                                            input: () => "text-slate-300",
                                            option: () => "",
                                        }}
                                        theme={(theme) => ({
                                            ...theme,
                                            borderRadius: 8,
                                            colors: {
                                                ...theme.colors,
                                                primary50: "rgb(241 245 249)",
                                                primary25: "rgb(241 245 249)",
                                                primary: "#CBD2E0",
                                            },
                                        })}
                                    />
                                </div>
                                <div className=" w-1/2">
                                    <Select
                                        value={developer}
                                        onChange={(value: any) => {
                                            setCustomValue("developer", value);
                                        }}
                                        isClearable
                                        isSearchable={false}
                                        options={developers}
                                        placeholder="Select developer"
                                        formatOptionLabel={(
                                            developers
                                        ) => <div>{developers.title}</div>}
                                        classNames={{
                                            control: () =>
                                                "p-1 border placeholder:text-slate-400 focus:border-primary-500",
                                            input: () => "text-slate-300",
                                            option: () => "",
                                        }}
                                        theme={(theme) => ({
                                            ...theme,
                                            borderRadius: 8,
                                            colors: {
                                                ...theme.colors,
                                                primary50: "rgb(241 245 249)",
                                                primary25: "rgb(241 245 249)",
                                                primary: "#CBD2E0",
                                            },
                                        })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className=" px-6 bg-white p-3 ml-2 flex flex-col gap-3 justify-between items-start rounded-md border">
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
                                    <label htmlFor="recommended">
                                        Recommended
                                    </label>
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

                            <div className="w-full flex flex-wrap gap-2  justify-between items-center">
                                <strong>Launch: </strong>
                                <div className=" flex gap-2 justify-start items-center">
                                    <Radio
                                        {...register("isLaunch")}
                                        id="launched"
                                        value="Launched"
                                        className=" focus:ring-0 transition-all"
                                    />
                                    <Label htmlFor="active">Launched</Label>
                                </div>
                                <div className=" flex gap-2 justify-start items-center">
                                    <Radio
                                        {...register("isLaunch")}
                                        value={"Not Launched"}
                                        id="notLaunched"
                                        className=" focus:ring-0 transition-all "
                                    />
                                    <Label htmlFor="pending">
                                        Not Launched
                                    </Label>
                                </div>
                            </div>
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

                    <hr className=" bg-slate-300" />

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
                <div className=" w-1/3 mt-4 mx-4 flex flex-col justify-start items-center gap-3">
                    <div className=" w-full">
                        <h3 className="my-2">Main Image:</h3>
                        <ImageUpload
                            label="Upload thumbnail Image"
                            thumbnail={true}
                            onAction={() => {
                                setCustomValue("mainImage", "");
                            }}
                            onChange={(value) => {
                                setCustomValue("mainImage", value);
                            }}
                            value={mainImage}
                            image={mainImage}
                        />
                    </div>
                    <div className=" w-full">
                        <h3 className="my-2">Other Images:</h3>
                        <ImageUpload
                            label="Upload compound Images"
                            thumbnail={false}
                            onAction={(value) => {
                                setCustomValue("images", value);
                                setAllPropertyImages(
                                    allPropertyImages.filter(
                                        (image) => image !== value
                                    )
                                );
                            }}
                            onChange={(value) => {
                                setCustomValue("images", value);
                                setAllPropertyImages([
                                    ...allPropertyImages,
                                    value,
                                ]);
                            }}
                            value={images}
                            allImages={allPropertyImages}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Client;
