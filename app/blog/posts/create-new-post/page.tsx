import React from "react";
import Client from "./Client";
import getAreas from "@/app/actions/getAreas";
import getcategories,{IParams} from "@/app/actions/getcategories";

interface PageProps {
    searchParams: IParams;
}

const page = async ({ searchParams }: PageProps) => {
    const categories = await getcategories(searchParams);
    const tags = await getAreas(searchParams);

    return <Client categories={categories} tags={tags as any} />;
};

export default page;
