import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import CategoryClient from "./CategoryClient";
import getDeveloperById from "@/app/actions/getDeveloperById";
import getCompounds from "@/app/actions/getCompounds";
import getcategoryById from "@/app/actions/getCategoryById";

interface CategParams {
    categoryId: string;
}

const CategoryPage = async ({ params }: { params: CategParams }) => {
    const category = await getcategoryById(params);

    return (
        <ClientOnly>
            <CategoryClient category={category as any} />
        </ClientOnly>
    );
};

export default CategoryPage;
