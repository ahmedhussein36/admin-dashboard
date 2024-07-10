import React from "react";
import Image from "next/image";
import { FaRegCopy } from "react-icons/fa";
import { Menu } from "@headlessui/react";
import ActionMenu from "./ActionMenu";
import { MdOutlineFileCopy } from "react-icons/md";

type ImageCardProps = {
    image: {
        public_id: string;
        secure_url: string;
    };
    onClick: () => void;
    onCopy: () => void;
    onDownload: () => void;
    onDelete: () => void;
    onDetails: () => void;
};

const ImageCard: React.FC<ImageCardProps> = ({
    image,
    onClick,
    onCopy,
    onDownload,
    onDelete,
    onDetails,
}) => {
    return (
        <div
            key={image.public_id}
            className="relative w-full h-52 cursor-pointer group overflow-hidden hover:opacity-80 duration-300"
        >
            <Image
                src={image.secure_url}
                alt={image.public_id}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-md group-hover:scale-105 duration-300 ease-in-out"
                onClick={onClick}
            />
            <div className="absolute top-2 right-2 flex space-x-2">
                <button
                    className="bg-gray-800/50 text-white p-2 rounded-full hover:bg-gray-800 transition-all"
                    onClick={onCopy}
                >
                    <FaRegCopy size={14} />
                </button>
                <ActionMenu
                    onCopy={onCopy}
                    onDownload={onDownload}
                    onDelete={onDelete}
                    onDetails={onDetails}
                />
            </div>
        </div>
    );
};

export default ImageCard;
