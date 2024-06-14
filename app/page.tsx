import Container from "@/app/components/Container";
import Heading from "./components/Heading";
import { Analisys, MyListitngs } from "@/app/components/dashboard/Analisys";
import getCompounds from "./actions/getCompounds";
import getDevelopers from "./actions/getDevelopers";
import getAreas from "./actions/getAreas";
import getProperties, { IParams } from "./actions/getProperties";

export const metadata = {
    title: "Dashboard : Remax Royal",
    description: "Remax Royal admin dashboard",
};

interface PageProps {
    searchParams: IParams;
}

const Home = async ({ searchParams }: PageProps) => {
    const compounds = await getCompounds(searchParams);
    const developers = await getDevelopers(searchParams);
    const areas = await getAreas(searchParams);
    const listings = await getProperties(searchParams);

    return (
        <Container>
            <div className="flexgap-4 justify-between items-center my-2 mb-2 w-full">
                <div>
                    <Heading title={"Dashboard"} />
                </div>
            </div>
            <>
                <div className=" w-full mt-6">
                    <Analisys
                        listings={listings}
                        areas={areas}
                        compounds={compounds}
                        developers={developers}
                    />
                </div>
            </>
            <>
                <div>
                    <MyListitngs listings={listings} />
                </div>
            </>
        </Container>
    );
};

export default Home;
