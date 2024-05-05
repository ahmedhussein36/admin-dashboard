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
import Select from "react-select";
import EmptyState from "@/app/components/EmptyState";

interface Props {
    post: any;
}

const Client: FC<Props> = ({ post }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [allPropertyImages, setAllPropertyImages] = useState<string[]>(
        post.images
    );

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
            content: post?.content || "",
            slug: post?.slug || "",
            mainImage: post?.mainImage || "",
            metaTitle: post?.metaTitle || "",
            metaDescription: post?.metaDescription || "",
            status: post.status || "",
            isFeatured: post.isFeatured || false,
            isAddHome: post.isAddHome || false,
            isRecommended: post.isRecommended || false,
            isFooterMenu: post.isFooterMenu || false,
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

    const slugGeneration = (title: string) => {
        const slug = title.toLowerCase().replace(/\s+/g, "-");
        return slug;
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
           <EmptyState />
        </>
    );
};
export default Client;
