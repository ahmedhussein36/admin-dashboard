"use client";

import Link from "next/link";
import React, { Children, FC, useCallback, useState } from "react";
import {
    MdSpaceDashboard,
    MdFeaturedPlayList,
    MdMapsHomeWork,
    MdPieChart,
    MdOutlineMoreHoriz,
    MdKeyboardArrowRight,
    MdMoreHoriz,
} from "react-icons/md";
import { TbArticleFilledFilled, TbCategoryFilled } from "react-icons/tb";
import { RiSettings5Fill } from "react-icons/ri";
import { FaMapLocationDot, FaTag, FaUsers } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";
import { LuNetwork } from "react-icons/lu";
import { block } from "sharp";

interface SidebarItemProps {
    href: string;
    icon?: React.ReactNode;
    label: string;
    setActiveLabel: (label: string) => void;
    activeLabel?: string;
    isMore?: boolean;
    onClick?: () => void;
}

export const SidebarItem: FC<
    SidebarItemProps & { setActiveLabel: (label: string) => void }
> = ({ href, icon, label, setActiveLabel, activeLabel, isMore, onClick }) => {
    const isActive = activeLabel === label;

    return (
        <div className="w-full">
            <Link
                onClick={() => {
                    setActiveLabel(label);
                }}
                href={href}
                className={`flex justify-start items-center w-full px-4 duration-300
                ${isMore ? "flex-row gap-3" : "flex-col"}
                            gap-1 
                            hover:bg-slate-800 py-2 ${
                                isActive
                                    ? " text-rose-500 font-bold bg-slate-800"
                                    : "text-slate-500"
                            }`}
            >
                <div className="w-[20px h-[20px]">{icon}</div>
                <div className="font-medium">{label}</div>
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
        <div className=" flex flex-col gap-3 w-full py-4 border-t-2 border-slate-700 justify-center items-start fixed:top-0">
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

export function MainSidebar() {
    const [activeLabel, setActiveLabel] = useState("");
    const iconActive = useCallback(
        (item: string) => {
            let activColor = "#f43f5e" || "#38bdf8";
            if (activeLabel === item) {
                return activColor;
            } else {
                return "#64748b";
            }
        },
        [activeLabel]
    );

    return (
        <div
            className=" h-full overflow-auto flex 
        flex-col justify-start items-start gap-1 py-4
         bg-slate-900 shadow-slate-200"
        >
            <SidebarItem
                href="/"
                icon={
                    <MdSpaceDashboard
                        size="20"
                        color={iconActive("Dashboard")}
                    />
                }
                label="Dashboard"
                setActiveLabel={setActiveLabel}
                activeLabel={activeLabel}
            />
            <SidebarItem
                href="/listings"
                icon={
                    <MdFeaturedPlayList
                        size="20"
                        color={iconActive("Listings")}
                    />
                }
                label="Listings"
                setActiveLabel={setActiveLabel}
                activeLabel={activeLabel}
            />
            <SidebarItem
                href="/compounds"
                icon={
                    <MdMapsHomeWork size="20" color={iconActive("Compounds")} />
                }
                label="Compounds"
                setActiveLabel={setActiveLabel}
                activeLabel={activeLabel}
            />
            <SidebarItem
                href="/developers"
                icon={<MdPieChart size="20" color={iconActive("Developers")} />}
                label="Developers"
                setActiveLabel={setActiveLabel}
                activeLabel={activeLabel}
            />

            <SidebarItem
                href="/areas"
                icon={
                    <FaMapLocationDot size="20" color={iconActive("Areas")} />
                }
                label="Areas"
                setActiveLabel={setActiveLabel}
                activeLabel={activeLabel}
            />

            <SidebarGroup>
                <SidebarItem
                    href="/blog/posts"
                    icon={
                        <TbArticleFilledFilled
                            size="20"
                            color={iconActive("Posts")}
                        />
                    }
                    label="Posts"
                    setActiveLabel={setActiveLabel}
                    activeLabel={activeLabel}
                />
                <SidebarItem
                    href="/blog/categories"
                    icon={
                        <TbCategoryFilled
                            size="20"
                            color={iconActive("Categories")}
                        />
                    }
                    label="Categories"
                    setActiveLabel={setActiveLabel}
                    activeLabel={activeLabel}
                />
                <SidebarItem
                    href="/"
                    icon={<FaTag size="20" color={iconActive("Tags")} />}
                    label="Tags"
                    setActiveLabel={setActiveLabel}
                    activeLabel={activeLabel}
                />
            </SidebarGroup>

            <SidebarGroup>
                <MoreList color={iconActive("More")}>
                    <SidebarItem
                        isMore
                        href="/users"
                        icon={<FaUsers size="20" color={iconActive("Users")} />}
                        label="Users"
                        setActiveLabel={setActiveLabel}
                        activeLabel={activeLabel}
                    />
                    <SidebarItem
                        isMore
                        href="/rules"
                        icon={
                            <LuNetwork size="20" color={iconActive("Rules")} />
                        }
                        label="Rules"
                        setActiveLabel={setActiveLabel}
                        activeLabel={activeLabel}
                    />
                    <SidebarItem
                        isMore
                        href="/settings"
                        icon={
                            <RiSettings5Fill
                                size="20"
                                color={iconActive("Settings")}
                            />
                        }
                        label="Settings"
                        setActiveLabel={setActiveLabel}
                        activeLabel={activeLabel}
                    />
                </MoreList>
            </SidebarGroup>
        </div>
    );
}
