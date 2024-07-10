import Image from "next/image";
import React from "react";
import { BiTrash } from "react-icons/bi";
import { FaRegCopy } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type ImageDrawerProps = {
    image: {
        public_id: string;
        secure_url: string;
        bytes: number;
        format: string;
        width: number;
        height: number;
        created_at: string;
    } | null;
    isOpen: boolean;
    onClose: () => void;
    onCopy: (text: string) => void;
    onDelete: (text: string) => void;
};

const ImageDrawer: React.FC<ImageDrawerProps> = ({
    image,
    isOpen,
    onClose,
    onCopy,
    onDelete,
}) => {
    return (
        <div
            className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl shadow-slate-400/60 transform transition-transform ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="p-6">
                <button
                    className="text-black mb-4 bg-slate-100 p-1 rounded-md"
                    onClick={onClose}
                >
                    <IoClose size={24} />
                </button>
                {image && (
                    <>
                        <div className="relative w-[100%] h-[230px] my-4 bg-slate-100">
                            <Image
                                src={image.secure_url}
                                alt={image.public_id}
                                fill
                                priority={false}
                                className=" object-cover rounded-md"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-start gap-2">
                            <h2 className="text-2xl font-bold mb-2">
                                Image Details
                            </h2>
                            <p className="" title={image.public_id}>
                                <strong>File Name:</strong> ...
                                {image.public_id.slice(0, 30)}
                            </p>
                            <p className="" title={image.public_id}>
                                <strong>Upload date:</strong>{" "}
                                {image.created_at
                                    .replace("T", " ")
                                    .replace("Z", "")}
                            </p>
                            <div className=" text font-semibold w-full flex justify-start items-center gap-4">
                                <p className=" bg-slate-100 border border-gray-400 rounded-md p-2 px-3">
                                    Size: {(image.bytes / 1024).toFixed(2)} KB
                                </p>
                                <p className=" bg-slate-100 border border-gray-400 rounded-md p-2 px-3">
                                    Type: {image.format}
                                </p>
                                <p className=" bg-slate-100 border border-gray-400 rounded-md p-2 px-3">
                                    {image.width} x {image.height} px
                                </p>
                            </div>
                        </div>

                        <div className=" flex justify-between items-center gap-2 w-full">
                            <button
                                className="bg-blue-100 text-blue-800 px-6 py-3 rounded-md my-4 border border-blue-600
                                    text-center hover:bg-blue-200 flex items-center transition-all"
                                onClick={() => onCopy(image.secure_url)}
                            >
                                <FaRegCopy className="mr-2" /> Copy Image URL
                            </button>

                            <button
                                className="bg-rose-50 text-rose-600 px-6 py-3 rounded-md my-4 border border-rose-600
                                    text-center hover:bg-rose-100 flex items-center transition-all"
                                onClick={() => {
                                    onDelete(image.public_id);
                                }}
                            >
                                <BiTrash className="mr-2" /> Delete Image
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageDrawer;
