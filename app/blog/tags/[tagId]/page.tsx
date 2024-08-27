import getTagById from "@/app/actions/getTagById";
import ClientTag from "./ClientTag";

interface TagParams {
    tagId: string;
}

const CategoryPage = async ({ params }: { params: TagParams }) => {
    const tag = await getTagById(params);

    return (
        <>
            <ClientTag tag={tag as any} />
        </>
    );
};

export default CategoryPage;
