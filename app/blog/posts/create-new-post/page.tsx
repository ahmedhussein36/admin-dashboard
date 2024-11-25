import React from "react";
import Client from "./Client";
import getAreas from "@/app/actions/getAreas";
import getcategories, { IParams } from "@/app/actions/getcategories";
import { getPostsCount } from "@/app/actions/getCounts";
import getTags from "@/app/actions/getTags";

interface PageProps {
    searchParams: IParams;
}

const page = async ({ searchParams }: PageProps) => {
    const categories = await getcategories(searchParams);
    const tags = await getTags();
    const postsCount = await getPostsCount();

    return (
        <Client categories={categories} tags={tags as any} count={postsCount} />
    );
};

export default page;
