"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { ReactNode, useCallback } from "react";
import { FiTrash2 } from "react-icons/fi";

declare global {
    var cloudinary: any;
}

const uploadPreset = "k5acnt7x";

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
    allImages?: string[];
    image?: string;
    label?: string;
    thumbnail?: boolean;
    icon?: ReactNode;
    onAction: (value?: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    label,
    allImages,
    thumbnail,
    image,
    onAction,
    icon,
}) => {
    const handleUpload = useCallback(
        (result: any) => {
            onChange(result.info.secure_url);
        },
        [onChange]
    );

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset={uploadPreset}
            options={{
                maxFiles: 8,
                multiple: true,
            }}
        >
            {({ open }) => {
                return (
                    <div className="w-full relative  justify-start items-start flex flex-col gap-3 ">
                        {thumbnail && image !== "" ? (
                            <div className=" rounded-md overflow-hidden  relative w-[200px] h-[130px]">
                                <Image
                                    src={image || ""}
                                    alt="thumbnail"
                                    objectFit="cover"
                                    fill
                                />
                                <div className="w-full absolute top-2 right-[-170px]">
                                    <button
                                        className=" rounded-full p-1 bg-red-600 hover:bg-red-500 transition-all"
                                        onClick={() => onAction()}
                                    >
                                        <FiTrash2 color="#ffff" size={18} />
                                    </button>
                                </div>
                            </div>
                        ) : allImages?.length ? (
                            <div className=" flex justify-start flex-wrap items-center gap-1">
                                {allImages.map((imagesrc) => (
                                    <>
                                        <div className=" rounded-md overflow-hidden  w-[120px] h-[100px]  relative">
                                            <Image
                                                src={imagesrc}
                                                objectFit="cover"
                                                fill
                                                alt=""
                                            />
                                            <div className="w-full absolute top-[0] left-[0]">
                                                <button
                                                    className=" rounded-full p-1 bg-red-600 hover:bg-red-500 transition-all"
                                                    onClick={() =>
                                                        onAction(imagesrc)
                                                    }
                                                >
                                                    <FiTrash2
                                                        color="#ffff"
                                                        size={18}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        ) : (
                            ""
                        )}
                        <div
                            onClick={() => open?.()}
                            className={`relative bg-white 
                                     w-[200px] 
                                    cursor-pointer
                                    hover:opacity-70
                                    transition
                                    border-dashed rounded-lg
                                    border-2 
                                    p-4
                                    border-neutral-300
                                    flex
                                    justify-center
                                    items-center
                                    gap-3
                                    text-neutral-600`}
                        >
                            {icon || (
                                <Image
                                    src={"/assets/icons/gallery.webp"}
                                    width={26}
                                    height={26}
                                    alt="upload"
                                />
                            )}
                            <div className="font-semibold text-sm">{label}</div>
                        </div>
                    </div>
                );
            }}
        </CldUploadWidget>
    );
};

export default ImageUpload;
