import ClientTag from "./ClientTag";

interface CategParams {
    categoryId: string;
}

const CategoryPage = async ({ params }: { params: CategParams }) => {
    const tag = await getTagById(params);

    return (
        <>
            <ClientTag tag={tag as any} />
        </>
    );
};

export default CategoryPage;
