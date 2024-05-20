import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import PropertyClient from "./PropertyClient";
import getPropertyById from "@/app/actions/getPropertyById";
import getCompounds from "@/app/actions/getCompounds";
import getAreas from "@/app/actions/getAreas";
import { IParams } from "@/app/actions/getProperties";
import getDevelopers from "@/app/actions/getDevelopers";

interface PageParams {
    params: IParams;
    searchParams: IParams;
}

const PropertyPage = async ({ params, searchParams }: PageParams) => {
    const listing = await getPropertyById(params as any);
    const compounds = await getCompounds(searchParams);
    const developers = await getDevelopers(searchParams);
    const areas = await getAreas(searchParams);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    return (
        <>
            <PropertyClient
                compounds={compounds as any}
                areas={areas as any}
                developers={developers as any}
                listing={listing as any}
                currentUser={currentUser}
            />
        </>
    );
};

export default PropertyPage;
