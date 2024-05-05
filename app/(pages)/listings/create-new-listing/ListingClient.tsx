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
    SafeArea,
    SafeCompound,
    SafeDeveloper,
    SafeProperty,
} from "@/app/types";
import { SelectInput } from "@/app/components/home/SelectInput";
import Select from "react-select";
import AddNewProperty from "@/app/components/add-new-property/AddNewProperty";

interface Props {
    compounds: SafeCompound[];
    developers: SafeDeveloper[];
    areas: SafeArea[];
}

const Client: FC<Props> = ({ developers, areas, compounds }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [allPropertyImages, setAllPropertyImages] = useState<string[]>([]);

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
            title: "",
            description: "",
            content: "",
            slug: "",
            mainImage: "",
            seoDetails: {
                metaTitle: "",
                metaDescription: "",
            },
            isLaunch: "",
            area: null,
            developer: null,
            compound: null,
            images: [],
            latLong: 0,
            status: "",
            isFeatured: false,
            isAddHome: false,
            isRecommended: false,
            isFooterMenu: false,
        },
    });

    const mainImage = watch("mainImage");
    const images = watch("images");
    const area = watch("area");
    const developer = watch("developer");
    const compound = watch("compound");

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

        console.log({ data });

        const generatedSlug = slugGeneration(data.title);
        data.slug = generatedSlug; // Set t

        axios
            .post(`/api/compounds`, data)
            .then(() => {
                toast.success("item added successfully!", {
                    position: "bottom-right",
                });

                router.back();
                router.refresh();
                reset();
            })
            .catch(() => {
                toast.error("Error : Can't add new item! ", {
                    position: "bottom-right",
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <AddNewProperty 
                areas={areas} 
                developers={developers} 
                compounds={compounds}
            />

        </>
    );
};
export default Client;
