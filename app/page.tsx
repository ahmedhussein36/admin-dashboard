import Container from "@/app/components/Container";
import Heading from "./components/Heading";
import { Analisys, MyListitngs } from "@/app/components/dashboard/Analisys";
import {
    getCompoundsCounts,
    getDeveloperCount,
    getListingsCounts,
} from "./actions/getCounts";
export const metadata = {
    title: "Dashboard : Remax Royal",
    description: "Remax Royal admin dashboard",
};

const Home = async () => {
    const listingsCount = await getListingsCounts();
    const compoundsCount = await getCompoundsCounts();
    const developersCount = await getDeveloperCount();
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
                        listings={listingsCount}
                        compounds={compoundsCount}
                        areas={compoundsCount}
                        developers={developersCount}
                    />
                </div>
            </>
            <>
                <div>
                    <MyListitngs listings={[]} />
                </div>
            </>
        </Container>
    );
};

export default Home;
