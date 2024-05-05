import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import DevClient from "./DevClient";
import getDeveloperById from "@/app/actions/getDeveloperById";
import getCompounds from "@/app/actions/getCompounds";

interface DevParams {
    developerId: string;
}

const DeveloperPage = async ({ params }: { params: DevParams }) => {
    const developer = await getDeveloperById(params);
    const compounds = await getCompounds({
        developerId: developer?.id,
    });

    return (
        <ClientOnly>
            <DevClient developer={developer as any} />
        </ClientOnly>
    );
};

export default DeveloperPage;
