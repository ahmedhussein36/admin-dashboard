import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import getAreas from "@/app/actions/getAreas";
import AreaClient from "./AreaClient";
import getCompounds from "@/app/actions/getCompounds";
import getProperties, { IParams } from "@/app/actions/getProperties";
import Sorting from "@/app/components/Sorting";
import ClientOnly from "@/app/components/ClientOnly";
import { Suspense } from "react";
import Loader from "@/app/components/Loader";

interface AreasPageProps {
    searchParams: IParams;
}

const AreasPage = async ({ searchParams }: AreasPageProps) => {
    const areas = await getAreas(searchParams);
    const compounds = await getCompounds(searchParams);
    const listings = await getProperties(searchParams);

    return (
        <div>
            <Container>
                <div className="flex gap-4 justify-between items-center my-2 mb-2 w-full">
                    <div>
                        <Heading
                            title={"Areas"}
                            subtitle={`Areas available: ${areas.length}`}
                        />
                    </div>
                </div>
                <div className=" flex justify-between items-center ">
                    <Sorting data={areas} parent="areas" />
                </div>

                <Suspense fallback={<Loader />}>

                    < >
                        <AreaClient
                            areas={areas as any}
                            compounds={compounds as any}
                            listings={listings as any}
                        />
                    </>
                </Suspense>

            </Container>
        </div>
    );
};

export default AreasPage;
