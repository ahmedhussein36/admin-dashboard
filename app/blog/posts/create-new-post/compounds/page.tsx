import Container from "@/app/components/Container";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Heading from "@/app/components/Heading";
import getCompounds, { IParams } from "@/app/actions/getCompounds";
import CompoundClient from "./CompoundClient";
import getDevelopers from "@/app/actions/getDevelopers";
import getAreas from "@/app/actions/getAreas";
import getProperties from "@/app/actions/getProperties";
import Sorting from "@/app/components/Sorting";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { redirect } from "next/navigation";
import ClientOnly from "@/app/components/ClientOnly";
import Filter from "@/app/components/home/Filter";

interface DevelopersPageProps {
    searchParams: IParams;
}

const CompoundsPage = async ({ searchParams }: DevelopersPageProps) => {
    const compounds = await getCompounds(searchParams);
    const properties = await getProperties(searchParams);
    const developers = await getDevelopers(searchParams);
    const areas = await getAreas(searchParams);
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect("/login");
    }

    return (
        <div className="">
            <Container>
                <div className=" flex gap-4 justify-between items-center my-2 w-full">
                    <div>
                        <Heading
                            title={"Compounds"}
                            subtitle={`Compounds available: ${compounds.length}`}
                        />
                    </div>
                    <div className="my-1 cursor-pointer">
                        <Link
                            href={"/compounds/create-new-compound"}
                            className="flex gap-2 justify-center items-center py-3 px-5 rounded-md border-2 border-slate-400 bg-slate-100"
                        >
                            <FaPlus size={"14"} color="blue" />{" "}
                            <p>Add new compound</p>
                        </Link>
                    </div>
                </div>
                <div className=" my-2 flex justify-between items-center ">
                    <Sorting data={compounds} parent="compounds" />
                </div>
                <div className="my-2 flex justify-center items-center ">
                    <Filter compounds={compounds} areas={areas} developers={developers} />
                </div>
                <ClientOnly>
                    <CompoundClient
                        listings={properties as any}
                        compounds={compounds as any}
                        areas={areas as any[]}
                        developers={developers as any}
                    />
                </ClientOnly>
            </Container>
        </div>
    );
};

export default CompoundsPage;
