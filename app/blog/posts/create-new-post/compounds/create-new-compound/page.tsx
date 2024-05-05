import React from "react";
import Client from "./Client";
import getDevelopers, { IParams } from "@/app/actions/getDevelopers";
import { inflateRaw } from "zlib";
import getAreas from "@/app/actions/getAreas";

interface PageProps {
    searchParams: IParams;
}

const page = async ({ searchParams }: PageProps) => {
    const developers = await getDevelopers(searchParams);
    const areas = await getAreas(searchParams);

    return <Client developers={developers as any} areas={areas as any} />;
};

export default page;
