import prisma from "@/app/libs/prismadb";

interface IParams {
    postId: string;
}

export default async function getPostById(params: IParams) {
    try {
        const { postId } = params;

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });

        if (!post) {
            return null;
        }

        const safePost = {
            ...post,
            createdAat: post?.createdAt?.toString(),
        };

        return safePost;
    } catch (error: any) {
        throw new Error(error);
    }
}
