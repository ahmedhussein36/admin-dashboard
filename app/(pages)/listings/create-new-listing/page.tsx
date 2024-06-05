import React from "react";
import ListingClient from "./ListingClient";
import getDevelopers from "@/app/actions/getDevelopers";
import getAreas from "@/app/actions/getAreas";
import getCompounds from "@/app/actions/getCompounds";
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ClientOnly from "@/app/components/ClientOnly";
import getProperties, { IParams } from "@/app/actions/getProperties";

interface PageProps {
    searchParams: IParams;
}

const page = async ({ searchParams }: PageProps) => {
    const listings = await getProperties(searchParams);
    const developers = await getDevelopers(searchParams);
    const compounds = await getCompounds(searchParams);
    const areas = await getAreas(searchParams);

    return (
        <Container>
            <div className="flex gap-4 justify-between items-center my-2 w-full">
                <div>
                    <Heading title={"Add New Listings"} />
                </div>
            </div>
            <>
                <ListingClient
                    listings={listings as any}
                    compounds={compounds as any}
                    developers={developers as any}
                    areas={areas as any}
                />
            </>
        </Container>
    );
};

export default page;
