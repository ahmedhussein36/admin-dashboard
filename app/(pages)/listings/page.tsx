import Container from "@/app/components/Container";
import getProperties, { IParams } from "@/app/actions/getProperties";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Heading from "@/app/components/Heading";
import ListinClient from "./ListinClient";
import EmptyState from "@/app/components/EmptyState";
import Sorting from "@/app/components/Sorting";
import getCompounds from "@/app/actions/getCompounds";
import getDevelopers from "@/app/actions/getDevelopers";
import getAreas from "@/app/actions/getAreas";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import ListingFilter from "@/app/components/home/ListingFilter";
import ClientOnly from "@/app/components/ClientOnly";
import { redirect } from "next/navigation";
import TableSkelton from "@/app/components/TableSkelton";

interface ForRentPageProps {
    searchParams: IParams;
}

const ForRentPage = async ({ searchParams }: ForRentPageProps) => {
    const compounds = await getCompounds(searchParams);
    const developers = await getDevelopers(searchParams);
    const areas = await getAreas(searchParams);
    const currentUser = await getCurrentUser();
    const listings = await getProperties(searchParams);

    return (
        <>
            <Container>
                <div className="flex gap-4 justify-between items-end mb-8 w-full">
                    <Heading
                        title={"Listings"}
                        subtitle={`Listings available: ${listings.length}`}
                    />

                    <div className="my-4">
                        <Link
                            href="/listings/create-new-listing"
                            className=" flex gap-2 justify-center items-center py-3 px-5 rounded-md border-2 border-slate-400 bg-slate-100"
                        >
                            <FaPlus size={"14"} color="blue" />
                            <p>Add new listings</p>
                        </Link>
                    </div>
                </div>
                <Sorting parent="listings" data={listings} />

                <div className=" w-full mt-4">
                    <ListingFilter
                        areas={areas}
                        compounds={compounds}
                        developers={developers}
                    />
                </div>

                <ClientOnly loader={<TableSkelton />}>
                    {listings.length ? (
                        <ListinClient
                            listings={listings as any}
                            currentUser={currentUser}
                        />
                    ) : (
                        <EmptyState />
                    )}
                </ClientOnly>
            </Container>
        </>
    );
};

export default ForRentPage;
