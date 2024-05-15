import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import Client from "./Client";
import getCompoundById from "@/app/actions/getCompoundById";
import getDeveloperById from "@/app/actions/getDeveloperById";
import { SafeCompound } from "@/app/types";
import AddNewProperty from "@/app/components/add-new-property/AddNewProperty";
import getDevelopers, { IParams } from "@/app/actions/getDevelopers";
import getAreas from "@/app/actions/getAreas";

interface PageProps {
    searchParams: IParams;
    params: IParams;
}

const CompoundPage = async ({ params, searchParams }: PageProps) => {
    const compound = await getCompoundById(params as any);
    const developers = await getDevelopers(searchParams);
    const areas = await getAreas(searchParams);

    if (!compound) {
        return (
            <EmptyState />
        );
    }

    return (
        <>
            <Client
                compound={compound as any}
                developers={developers as any}
                areas={areas as any}
            />
        </>
    );
};

export default CompoundPage;
