"use client";

import Link from "next/link";
import React, { FC, useCallback, useState } from "react";
import {
    MdSpaceDashboard,
    MdFeaturedPlayList,
    MdMapsHomeWork,
    MdPieChart,
    MdMoreHoriz,
    MdPermMedia,
} from "react-icons/md";
import { TbArticleFilledFilled, TbCategoryFilled } from "react-icons/tb";
import { RiSettings5Fill } from "react-icons/ri";
import { FaMapLocationDot, FaTag, FaUsers } from "react-icons/fa6";
import { LuNetwork } from "react-icons/lu";
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from "react-icons/io";
import { FaBullhorn, FaComment } from "react-icons/fa";
import { SafeUser } from "@/app/types";
import { PiSidebarBold, PiSidebarThin } from "react-icons/pi";

interface SidebarItemProps {
    href: string;
    icon?: React.ReactNode;
    label: string;
    setActiveLabel: (label: string) => void;
    activeLabel?: string;
    isMore?: boolean;
    onClick?: () => void;
    isOpen?: boolean;
}

export const SidebarItem: FC<
    SidebarItemProps & { setActiveLabel: (label: string) => void }
> = ({ href, icon, label, setActiveLabel, activeLabel, isOpen }) => {
    const isActive = activeLabel === label;

    return (
        <div className="w-full">
            <Link
                onClick={() => {
                    setActiveLabel(label);
                }}
                href={href}
                className={`
                flex transition-all  
                ${isOpen
                        ? "justify-start items-center"
                        : "justify-start items-center"
                    }
                 w-full px-4 duration-300
                gap-3 flex-row
                hover:bg-rose-100 py-2
                ${isActive
                        ? " text-rose-600 font-bold bg-rose-100"
                        : "text-zinc-500"
                    }`}
            >
                <div className=" w-fit">{icon}</div>
                <div
                    className={` 
                     overflow-hidden
                    ${isOpen ? "opacity-100 w-full" : "w-0 opacity-0"
                        } "hidden font-medium duration-300 transition-all"`}
                >
                    {label}
                </div>
            </Link>
        </div>
    );
};

export const SidebarGroup = ({
    children,
    title,
}: {
    children: React.ReactNode;
    title?: string;
}) => {
    return (
        <div className=" flex flex-col gap-3 w-full py-1 border-t border-slate-300 justify-center items-start fixed:top-0">
            <div className=" px-8 font-semibold text-slate-400 ">{title}</div>
            <div className=" w-full flex flex-col justify-between items-start gap-2">
                {children}
            </div>
        </div>
    );
};

export const MoreList = ({
    children,
    color,
}: {
    children: React.ReactNode;
    color: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="flex justify-center items-center w-full">
            <div
                onClick={toggleOpen}
                className={`flex justify-center items-center w-full px-4  duration-300 cursor-pointer
                flex-col gap-1 
                            hover:bg-slate-800 py-2 `}
            >
                <div className="font-medium">
                    <MdMoreHoriz color={color} size={20} />
                </div>
                <div className="w-[20px h-[20px] text-slate-500 font-semibold">
                    More
                </div>
            </div>
            <div
                className={`bg-slate-900 text-slate-500 w-[150px] transition-all 
        absolute left-28 bottom-1 z-[1] rounded-md shadow-md
         ${isOpen ? "block" : "hidden"}`}
            >
                <div className=" flex flex-col gap-4 justify-center items-start py-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export function MainSidebar({ currentUser }: { currentUser: SafeUser }) {
    const role = currentUser.role;

    const [activeLabel, setActiveLabel] = useState("");
    const [isOpen, setIsOpen] = useState(true);
    const iconActive = useCallback(
        (item: string) => {
            let activColor = "red";
            if (activeLabel === item) {
                return activColor;
            } else {
                return "#a1a1aa";
            }
        },
        [activeLabel]
    );

    const S_iconSize: string = "20";
    const L_iconSize: string = "20";

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div
            className={`
             overflow-hidden
            ${isOpen ? "w-[130px]" : "w-[70px]"}
                h-full min-w-[70px] 
                overflow-auto 
                flex transition-all duration-300
                flex-col 
                justify-start 
                items-start py-4
                gap-2               
                bg-white shadow-slate-300 shadow-md
            `}
        >
            <div className=" flex justify-start px-4 items-center w-full mt-1 mb-2">
                <button onClick={toggleOpen}>
                    {isOpen ? (
                        <PiSidebarBold color="gray" size={24} />
                    ) : (
                        <PiSidebarBold color="orange" size={24} />
                    )}
                </button>
            </div>

            <SidebarItem
                isOpen={isOpen}
                href="/"
                icon={
                    <MdSpaceDashboard
                        className=" transition-all duration-300 "
                        size={isOpen ? L_iconSize : S_iconSize}
                        color={iconActive("Dashboard")}
                    />
                }
                label="Dashboard"
                setActiveLabel={setActiveLabel}
                activeLabel={activeLabel}
            />

            <SidebarItem
                isOpen={isOpen}
                label="Launches"
                href="/new-launches"
                icon={
                    <FaBullhorn
                        className=" transition-all duration-300"
                        size={isOpen ? L_iconSize : S_iconSize}
                        color={iconActive("Launches")}
                    />
                }
                setActiveLabel={setActiveLabel}
                activeLabel={activeLabel}
            />

            <SidebarItem
                isOpen={isOpen}
                href="/listings"
                icon={
                    <MdFeaturedPlayList
                        className=" transition-all duration-300"
                        size={isOpen ? L_iconSize : S_iconSize}
                        color={iconActive("Listings")}
                    />
                }
                label="Listings"
                setActiveLabel={setActiveLabel}
                activeLabel={activeLabel}
            />
            <SidebarItem
                isOpen={isOpen}
                href="/compounds"
                icon={
                    <MdMapsHomeWork
                        className=" transition-all duration-300"
                        size={isOpen ? L_iconSize : S_iconSize}
                        color={iconActive("Compounds")}
                    />
                }
                label="Compounds"
                setActiveLabel={setActiveLabel}
                activeLabel={activeLabel}
            />
            <SidebarItem
                isOpen={isOpen}
                href="/developers"
                icon={
                    <MdPieChart
                        className=" transition-all duration-300"
                        size={isOpen ? L_iconSize : S_iconSize}
                        color={iconActive("Developers")}
                    />
                }
                label="Developers"
                setActiveLabel={setActiveLabel}
                activeLabel={activeLabel}
            />

            <SidebarItem
                isOpen={isOpen}
                href="/areas"
                icon={
                    <FaMapLocationDot
                        className=" transition-all duration-300"
                        size={isOpen ? L_iconSize : S_iconSize}
                        color={iconActive("Areas")}
                    />
                }
                label="Areas"
                setActiveLabel={setActiveLabel}
                activeLabel={activeLabel}
            />
            <SidebarGroup>
                <SidebarItem
                    isOpen={isOpen}
                    href="/library"
                    icon={
                        <MdPermMedia
                            className=" transition-all duration-300"
                            size={isOpen ? L_iconSize : S_iconSize}
                            color={iconActive("Library")}
                        />
                    }
                    label="Library"
                    setActiveLabel={setActiveLabel}
                    activeLabel={activeLabel}
                />
            </SidebarGroup>
            <SidebarGroup>
                <SidebarItem
                    isOpen={isOpen}
                    href="/blog/posts"
                    icon={
                        <TbArticleFilledFilled
                            className=" transition-all duration-300"
                            size={isOpen ? L_iconSize : S_iconSize}
                            color={iconActive("Posts")}
                        />
                    }
                    label="Posts"
                    setActiveLabel={setActiveLabel}
                    activeLabel={activeLabel}
                />
                <SidebarItem
                    isOpen={isOpen}
                    href="/blog/categories"
                    icon={
                        <TbCategoryFilled
                            className=" transition-all duration-300"
                            size={isOpen ? L_iconSize : S_iconSize}
                            color={iconActive("Categories")}
                        />
                    }
                    label="Categories"
                    setActiveLabel={setActiveLabel}
                    activeLabel={activeLabel}
                />
                <SidebarItem
                    isOpen={isOpen}
                    href="/"
                    icon={
                        <FaTag
                            className=" transition-all duration-300"
                            size={isOpen ? L_iconSize : S_iconSize}
                            color={iconActive("Tags")}
                        />
                    }
                    label="Tags"
                    setActiveLabel={setActiveLabel}
                    activeLabel={activeLabel}
                />
                <SidebarItem
                    isOpen={isOpen}
                    href="/"
                    icon={
                        <FaComment
                            className=" transition-all duration-300"
                            size={isOpen ? L_iconSize : S_iconSize}
                            color={iconActive("Comments")}
                        />
                    }
                    label="Comments"
                    setActiveLabel={setActiveLabel}
                    activeLabel={activeLabel}
                />
            </SidebarGroup>

            {role?.toLocaleLowerCase() === "admin" && (
                <SidebarGroup>
                    <SidebarItem
                        isOpen={isOpen}
                        href="/users"
                        icon={
                            <FaUsers
                                className=" transition-all duration-300"
                                size={isOpen ? L_iconSize : S_iconSize}
                                color={iconActive("Users")}
                            />
                        }
                        label="Users"
                        setActiveLabel={setActiveLabel}
                        activeLabel={activeLabel}
                    />
                    <SidebarItem
                        isOpen={isOpen}
                        href="/roles"
                        icon={
                            <LuNetwork
                                className=" transition-all duration-300"
                                size={isOpen ? L_iconSize : S_iconSize}
                                color={iconActive("Rules")}
                            />
                        }
                        label="Rules"
                        setActiveLabel={setActiveLabel}
                        activeLabel={activeLabel}
                    />
                </SidebarGroup>
            )}
            <div className=" relative bottom-0">
                <SidebarGroup>
                    <SidebarItem
                        isOpen={isOpen}
                        href="/settings"
                        icon={
                            <RiSettings5Fill
                                className=" transition-all duration-300"
                                size={isOpen ? L_iconSize : S_iconSize}
                                color={iconActive("Settings")}
                            />
                        }
                        label="Settings"
                        setActiveLabel={setActiveLabel}
                        activeLabel={activeLabel}
                    />
                </SidebarGroup>
            </div>
        </div>
    );
}
