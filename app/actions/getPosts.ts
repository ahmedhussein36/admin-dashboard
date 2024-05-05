import prisma from "@/app/libs/prismadb";

export interface IParams {
    title?: string;
    status?: string;
}

export default async function getPosts(params: IParams) {
    try {
        const { title, status } = params;

        let query: any = {};

        if (title) {
            query.title = { contains: title };
        }
        if (status) {
            query.status = status;
        }

        const posts = await prisma.post.findMany({
            where: query,
            include: {
                tags: true,
                categories: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const safePosts = posts.map((post) => ({
            ...post,
            createdAt: post.createdAt,
        }));

        return safePosts;
    } catch (error: any) {
        throw new Error(error);
    }
}
