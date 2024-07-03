import Container from "@/app/components/Container";
import ClientOnly from "@/app/components/ClientOnly";
import Heading from "@/app/components/Heading";
import DeveloperClient from "./DeveloperClient";
import getDevelopers , { IParams }from "@/app/actions/getDevelopers";
import Sorting from "@/app/components/Sorting";
import { getUniqueCompounds } from "@/app/utils/getUniqueCompounds";

interface DevelopersPageProps {
    searchParams: IParams;
}

const DevelopersPage = async ({ searchParams }: DevelopersPageProps) => {
    const developers = await getDevelopers(searchParams);
    return (
        <div>
            <Container>
                <div className="flex gap-4 justify-between items-center my-2 mb-2 w-full">
                    <div>
                        <Heading
                            title={"Developers"}
                            subtitle={`Developers available: ${developers.length}`}
                        />
                    </div>
                </div>
                <div className=" flex justify-between items-center ">
                    <Sorting data={developers} parent="developers" />
                </div>
                <ClientOnly>
                    <DeveloperClient
                        developers={developers as any}
                    />
                </ClientOnly>
            </Container>
        </div>
    );
};

export default DevelopersPage;
