import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import Client from "./Client";
import getPostById from "@/app/actions/getPostById";
import { IParams } from "@/app/actions/getDevelopers";

interface PageProps {
    searchParams: IParams;
    params: IParams;
}

const Post = async ({ params, searchParams }: PageProps) => {
    const post = await getPostById(params as any);
    

    if (!post) {
        return (
            <EmptyState />
        );
    }

    return (
        <ClientOnly>
            <Client
                post={post as any}
            />
        </ClientOnly>
    );
};

export default Post;
