"use client";
import Heading from "@/app/components/Heading";
import ImageUpload from "@/app/components/customInputs/ImageUpload";
import Textarea from "@/app/components/customInputs/Textarea";
import { SelectInput } from "@/app/components/home/SelectInput";
import Input from "@/app/components/customInputs/Input";
import { allTypes } from "@/app/components/data/data";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { SafeArea, SafeDeveloper } from "@/app/types";
import axios from "axios";
import toast from "react-hot-toast";
import RTE from "@/app/components/postForm/RTE";

interface ClientProps {
    developers: SafeDeveloper[];
    areas: SafeArea[];
}

const Client = ({ developers, areas }: ClientProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [allPropertyImages, setAllPropertyImages] = useState<string[]>([]);

    const {
        register,
        control,
        getValues,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            title: "",
            description: "",
            content: "",
            slug: "",
            mainImage: "",
            images: [],
            maxPrice: 0,
            minPrice: 0,
            currency: "ج.م",
            deliveryDate: "",
            downPayment: 0,
            paymentPlans: [],
            seoDetails: {
                metaTitle: "",
                metaDescription: "",
            },
            areaSpace: {
                value: 0,
                unit: "",
            },
            lat: 0,
            long: 0,
            isLaunch: "",
            status: "",
            isFeatured: false,
            isAddHome: false,
            isFooterMenu: false,
            isRecommended: false,
            propertyTypes: [],
            developer: {},
            area: {},
        },
    });

    const city = watch("city");
    const aria = watch("aria");
    const category = watch("category");
    const propertyType = watch("propertyType");
    const developer = watch("developer");
    const area = watch("area");
    const paymentPlan = watch("paymentPlan");
    const saleType = watch("saleType");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const mainImage = watch("mainImage");
    const images = watch("images");
    const price = watch("price");

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
            .post(`/api/compounds`, data)
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

    return (
        <div className="p-8 w-full">
            <div className="py-3 mb-3 border-b-2 flex justify-between items-center">
                <Heading title="Add new compound" />
                <div className=" flex justify-between items-center gap-4 w-1/6">
                    <div className=" w-1/2">
                        <button
                            onClick={handleSubmit(onSubmit)}
                            className=" w-full py-3 px-5 rounded-md bg-lime-500 text-white "
                        >
                            Save
                        </button>
                    </div>
                    <div className=" w-1/2">
                        <button className=" w-full py-3 px-5 rounded-md bg-rose-500 text-white ">
                            Publish
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 px-2 md:px-5 lg:px-5 xl:px-5 w-full lg:w-2/3 xl:w-1/2 mb-8">
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
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <div className=" w-full flex justify-start items-start gap-4">
                    <div className="w-1/2">
                        <SelectInput
                            isSearchable={false}
                            value={developer}
                            onChange={(value) =>
                                setCustomValue("developer", value)
                            }
                            placeholder={"Developer"}
                            options={developers}
                        />
                    </div>

                    <div className="w-1/2">
                        <SelectInput
                            isSearchable={false}
                            value={area}
                            onChange={(value) => setCustomValue("area", value)}
                            placeholder={"Area"}
                            options={areas}
                        />
                    </div>
                </div>
                <div className="my-4 w-full flex justify-start items-center gap-2">
                    <Input
                        id="price"
                        customFormat
                        unit="EGP"
                        label="Starting Price"
                        type="number"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />

                    <Input
                        id="installmentDuration"
                        customFormat
                        unit="Year"
                        label="Installment Duration"
                        type="number"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input
                        id="downPayment"
                        customFormat
                        unit="%"
                        label="Down Payment"
                        type="number"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                </div>
                <div>
                    <h3 className=" text-lg my-4">
                        Select the avilable property types in the compound
                    </h3>
                    <div className="w-full flex justify-between items-center gap-3 flex-wrap">
                        {allTypes.map((type) => (
                            <div
                                key={type.id}
                                className=" flex justify-start items-center gap-3 py-1 w-[32%]"
                            >
                                <input
                                    className=" rounded"
                                    type="checkbox"
                                    {...register(type.label)}
                                    id={type.label}
                                />
                                <label htmlFor={type.label}>{type.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="my-2">Short Description</h3>
                    <Textarea
                        id="description"
                        register={register}
                        errors={errors}
                    />
                </div>

                <div className=" w-full flex justify-between items-center gap-3">
                    <div>
                        <h3 className="my-2">Main Image:</h3>
                        <ImageUpload
                            label="Upload thumbnail Image"
                            thumbnail={true}
                            onChange={(value) => {
                                setCustomValue("mainImage", value);
                                setAllPropertyImages([
                                    ...allPropertyImages,
                                    value,
                                ]);
                                setCustomValue("images", [
                                    ...allPropertyImages,
                                    value,
                                ]);
                            }}
                            value={mainImage}
                            allImages={allPropertyImages}
                        />
                    </div>
                    <div className=" w-full">
                        <h3 className="my-2">Other Images:</h3>
                        <ImageUpload
                            label="Upload compound Images"
                            thumbnail={false}
                            onChange={(value) => {
                                setCustomValue("images", value);
                                setAllPropertyImages([
                                    ...allPropertyImages,
                                    value,
                                ]);
                                setCustomValue("images", [
                                    ...allPropertyImages,
                                    value,
                                ]);
                            }}
                            value={images}
                            allImages={allPropertyImages}
                        />
                    </div>
                </div>
                <h3 className=" text-lg mt-4">Select Launche Status</h3>
                <div className="w-full flex justify-between items-center gap-3 flex-wrap">
                    <div className=" flex justify-start items-center gap-3 py-1 w-[32%]">
                        <input
                            type="radio"
                            value="launched"
                            {...register("isLaunch")}
                            id="launched"
                        />
                        <label htmlFor="launched">Launched</label>
                    </div>
                    <div className=" flex justify-start items-center gap-3 py-1 w-[32%]">
                        <input
                            type="radio"
                            {...register("isLaunch")}
                            id="not-luanched"
                            value="not-luanched"
                        />
                        <label htmlFor="not-luanched">Not Launched</label>
                    </div>
                </div>

                <div className="py-4 mt-4  border-t-2 flex flex-col gap-3">
                    <h3 className=" text-lg mt-4 mb-4">SEO Details</h3>

                    <Input
                        id="metaTitle"
                        label="Meta Title"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input
                        id="metaDescription"
                        label="Meta Description"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
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

export default Client;
