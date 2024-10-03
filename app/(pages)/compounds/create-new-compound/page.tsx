import React from "react";
import Client from "./Client";
import getDevelopers, { IParams } from "@/app/actions/getDevelopers";
import getAreas from "@/app/actions/getAreas";
import { getCompoundsCounts } from "@/app/actions/getCounts";
import ClientProider from "@/app/components/compounds/ClientProider";

interface PageProps {
    searchParams: IParams;
}

const page = async ({ searchParams }: PageProps) => {
    const developers = await getDevelopers(searchParams);
    const areas = await getAreas(searchParams);
    const count = await getCompoundsCounts();

    return (
        <ClientProider>
            <Client
                developers={developers as any}
                areas={areas as any}
                count={count}
            />
        </ClientProider>
    );
};

export default page;
