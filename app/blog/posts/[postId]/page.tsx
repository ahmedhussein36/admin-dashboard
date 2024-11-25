import EmptyState from "@/app/components/EmptyState";
import Client from "./Client";
import getPostById from "@/app/actions/getPostById";
import getTags from "@/app/actions/getTags";
import getcategories, { IParams } from "@/app/actions/getcategories";

interface PageProps {
    searchParams: IParams;
    params: IParams;
}

const Post = async ({ params, searchParams }: PageProps) => {
    const post = await getPostById(params as any);
    const tags = await getTags();
    const categories = await getcategories(searchParams);

    if (!post) {
        return <EmptyState />;
    }

    return (
        <>
            <Client post={post as any} categories={categories} tags={tags} />
        </>
    );
};

export default Post;
