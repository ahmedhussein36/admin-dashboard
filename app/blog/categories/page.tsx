import Container from "@/app/components/Container";
import ClientOnly from "@/app/components/ClientOnly";
import Heading from "@/app/components/Heading";
import CategoryClient from "./CategoryClient";
import { IParams } from "@/app/actions/getDevelopers";
import Sorting from "@/app/components/Sorting";
import getcategories from "@/app/actions/getcategories";

interface DevelopersPageProps {
    searchParams: IParams;
}

const CategoriesPage = async ({ searchParams }: DevelopersPageProps) => {
    const categories = await getcategories(searchParams);

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
                    <CategoryClient categories={categories as any} />
                </ClientOnly>
            </Container>
        </div>
    );
};

export default CategoriesPage;
