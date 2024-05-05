import Container from "@/app/components/Container";
import ClientOnly from "./components/ClientOnly";
import Heading from "./components/Heading";
import { Analisys, MyListitngs } from '@/app/components/dashboard/Analisys'
import getCompounds from "./actions/getCompounds";
import getDevelopers from "./actions/getDevelopers";
import getAreas from "./actions/getAreas";
import getCurrentUser from "./actions/getCurrentUser";
import getProperties, { IParams } from "./actions/getProperties";
import { Suspense } from "react";

interface PageProps {
    searchParams: IParams;
}


const Home = async ({ searchParams }: PageProps) => {

    const compounds = await getCompounds(searchParams);
    const developers = await getDevelopers(searchParams);
    const areas = await getAreas(searchParams);
    const currentUser = await getCurrentUser();
    const listings = await getProperties(searchParams);

    return (


        <Container>
            <div className="flexgap-4 justify-between items-center my-2 mb-2 w-full">
                <div>
                    <Heading
                        title={"Dashboard"}
                    />
                </div>
            </div>
            <Suspense>
                <div className=" w-full mt-6">
                    <Analisys listings={listings} areas={areas} compounds={compounds} developers={developers} />
                </div>
            </Suspense>
            <Suspense>
                <div>
                    <MyListitngs listings={listings} />
                </div>
            </Suspense>

        </Container>

    );
};

export default Home;
