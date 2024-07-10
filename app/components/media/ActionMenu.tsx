import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaEllipsisV } from "react-icons/fa";
import { BiCopy, BiDetail, BiDownload, BiMenu, BiTrash } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";

type ActionMenuProps = {
    onCopy: () => void;
    onDownload: () => void;
    onDelete: () => void;
    onDetails: () => void;
};

const ActionMenu: React.FC<ActionMenuProps> = ({
    onCopy,
    onDownload,
    onDelete,
    onDetails,
}) => {
    const options = [
        {
            name: "Copy Image URL",
            icon: <BiCopy className="size-5 fill-white/60" />,
            onClick: onCopy,
        },
        {
            name: "Download",
            icon: <BiDownload className="size-5 fill-white/60" />,
            onClick: onDownload,
        },
        {
            name: "Details",
            icon: <BiDetail className="size-5 fill-white/60" />,
            onClick: onDetails,
        },
        {
            name: "Delete",
            icon: <BiTrash className="size-5 fill-white/60" />,
            onClick: onDelete,
        },
    ];
    return (
        <div className="">
            <Menu>
                <MenuButton
                    className="inline-flex transition-all
                        items-center gap-2 rounded-full 
                        bg-gray-800/50 p-2 text-sm/6 
                        font-semibold text-white shadow-inner
                        shadow-white/10 focus:outline-none 
                        data-[hover]:bg-gray-700 data-[open]:bg-gray-700 
                        data-[focus]:outline-1 data-[focus]:outline-white"
                >
                    <FaEllipsisV size={14} />
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom end"
                    className="w-52 
                    origin-top-right 
                    rounded-xl 
                    border border-white/5 bg-black/70 p-1 
                    text-sm/6 text-white transition duration-200 
                    ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    {options.map((option, index) => (
                        <MenuItem key={index}>
                            <button
                                className="
                                group text-lg
                                flex w-full 
                                items-center gap-2 
                                rounded-lg py-1.5 px-3 
                                data-[focus]:bg-white/10"
                                onClick={option.onClick}
                            >
                                {option.icon}
                                {option.name}
                            </button>
                        </MenuItem>
                    ))}
                </MenuItems>
            </Menu>
        </div>
    );
};

export default ActionMenu;
