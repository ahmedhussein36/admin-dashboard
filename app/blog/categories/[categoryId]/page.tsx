import CategoryClient from "./CategoryClient";
import getcategoryById from "@/app/actions/getCategoryById";

interface CategParams {
    categoryId: string;
}

const CategoryPage = async ({ params }: { params: CategParams }) => {
    const category = await getcategoryById(params);

    return (
        <>
            <CategoryClient category={category as any} />
        </>
    );
};

export default CategoryPage;
