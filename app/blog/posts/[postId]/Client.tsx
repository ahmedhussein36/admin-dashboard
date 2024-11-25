"use client";
import Heading from "@/app/components/Heading";
import ImageUpload from "@/app/components/customInputs/ImageUpload";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { Label, Radio, Spinner } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import RTE from "@/app/components/postForm/RTE";
import { Category, Tag } from "@prisma/client";
import { Search } from "lucide-react";
import MultiSelect from "@/app/components/select/MultiSelect";

interface Props {
    post: any;
    categories: Category[];
    tags: Tag[];
}

const Client: FC<Props> = ({ post, categories, tags }) => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [filteredCata, setFilteredCata] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<[]>(
        post.category.map((category: any) => category.id)
    );

    const postCategories = post.category.map((category: any) => category.id);

    const {
        register,
        handleSubmit,
        setValue,
        control,
        getValues,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            title: post?.title || "",
            slug: post.slug,
            description: post?.description || "",
            image: post?.image || "",
            metaTitle: post?.metaTitle || "",
            metaDescription: post?.metaDescription || "",
            status: post.status || "",
            isFeatured: post.isFeatured || false,
            isAddHome: post.isAddHome || false,
            isRecommended: post.isRecommended || false,
            isFooterMenu: post.isFooterMenu || false,
            categories: selectedCategories || [],
            tags: post.tags || [],
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

    useEffect(() => {
        if (title !== "") {
            const data = categories.filter((item: { title: string }) => {
                return item.title.toLocaleLowerCase().includes(title);
            });
            setFilteredCata(data);
        } else {
            setFilteredCata(categories);
        }
    }, [categories, title]);

    useEffect(() => {
        setValue("categories", selectedCategories);
    }, [selectedCategories, setValue]);

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategories((prevSelectedCategories: any) => {
            if (prevSelectedCategories.includes(categoryId)) {
                return prevSelectedCategories.filter(
                    (id: any) => id !== categoryId
                );
            } else {
                return [...prevSelectedCategories, categoryId];
            }
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .put(`/api/posts/${post.id}`, data)
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
        <>
            <div className="w-full mb-8 flex justify-between items-center gap-3 mt-4 p-4">
                <Heading title="Update Post" />

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
                                    <span className="">Updating...</span>
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
                <div className=" flex-grow mt-4 mx-4 flex flex-col justify-start items-start gap-3">
                    <div className=" w-full bg-white p-6 flex flex-col gap-3 justify-between items-start rounded-md border">
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
                    <div className=" w-full">
                        <h3 className="my-2">Main Image:</h3>
                        <ImageUpload
                            label="Upload thumbnail Image"
                            thumbnail={true}
                            onAction={() => {
                                setCustomValue("image", "");
                            }}
                            onChange={(value) => {
                                setCustomValue("image", value);
                            }}
                            value={image}
                            image={image}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2 justify-start items-start h-[400px] rounded-lg bg-white p-4">
                        <div className="font-bold my-2">Select Categories</div>
                        <div className="relative w-full flex justify-between items-center">
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="search"
                                placeholder="Find category"
                                className="w-full h-full p-2 border-2 rounded-md focus:border-gray-400 focus:outline-0"
                            />
                            <div className="absolute right-4">
                                <Search size={15} color="#ddd" />
                            </div>
                        </div>
                        <div className="w-full">
                            <MultiSelect
                                options={filteredCata}
                                inialSelected={postCategories}
                                onSelect={handleCategorySelect}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Client;
