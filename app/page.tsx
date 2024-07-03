import Container from "@/app/components/Container";
import Heading from "./components/Heading";
import { Analisys, MyListitngs } from "@/app/components/dashboard/Analisys";
export const metadata = {
    title: "Dashboard : Remax Royal",
    description: "Remax Royal admin dashboard",
};

const Home = async () => {
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
                        listings={76}
                        compounds={10}
                        areas={10}
                        developers={104}
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
