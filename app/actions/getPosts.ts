import prisma from "@/app/libs/prismadb";
import { Select } from "flowbite-react";

export interface IParams {
    title?: string;
    status?: string;
    categoryId: string;
    tagId: string;
}

export default async function getPosts(params: IParams) {
    try {
        const { title, status, categoryId, tagId } = params;

        let query: any = {};

        if (title) {
            query.title = { contains: title };
        }
        if (status) {
            query.status = status;
        }
        if (categoryId) {
            query.categories = {
                some: {
                    id: categoryId,
                },
            };
        }
        if (tagId) {
            query.tags = {
                some: {
                    id: tagId,
                },
            };
        }

        const posts = await prisma.post.findMany({
            where: query,
            include: {
                tags: true,
                category: true,
                user: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const safePosts = posts.map((post) => ({
            ...post,
            createdAt: post.createdAt.toISOString(),
        }));

        return safePosts;
    } catch (error: any) {
        throw new Error(error);
    }
}
