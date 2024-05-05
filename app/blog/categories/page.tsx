import Container from "@/app/components/Container";
import EmptyStateAr from "@/app/components/EmptyStateAr";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import Heading from "@/app/components/Heading";
import CategoryClient from "./CategoryClient";
import getDevelopers, { IParams } from "@/app/actions/getDevelopers";
import Search from "@/app/components/Search";
import getAreas from "@/app/actions/getAreas";
import getCompounds from "@/app/actions/getCompounds";
import getProperties from "@/app/actions/getProperties";
import Sorting from "@/app/components/Sorting";

interface DevelopersPageProps {
    searchParams: IParams;
}

const CategoriesPage = async ({ searchParams }: DevelopersPageProps) => {
    const categories = await getDevelopers(searchParams);
    
    return (
        <div>
            <Container>
                <div className="flex gap-4 justify-between items-center my-2 mb-2 w-full">
                    <div>
                        <Heading
                            title={"Categories"}
                            subtitle={`Categories available: ${categories.length}`}
                        />
                    </div>
                </div>
                <div className=" flex justify-between items-center ">
                    <Sorting data={categories} parent="categories" />
                </div>
                <ClientOnly>
                    <CategoryClient
                        categories={categories as any}
                    />
                </ClientOnly>
            </Container>
        </div>
    );
};

export default CategoriesPage;
