import prisma from "@/app/libs/prismadb";

export interface IParams {
    title?: string;
    status?: string;
}

export default async function getTags(params: IParams) {
    try {
        const { title, status } = params;

        let query: any = {};

        if (title) {
            query.title = {
                contains: title,
            };
        }
        if (status) {
            query.status = status;
        }

        const tag = await prisma.tag.findMany({
            where: query,
            include: {
                posts: true,
                },
            orderBy: {
                createdAt: "desc",
            },
        });

        const safetag = tag.map((tag) => ({
            ...tag,
            createdAt: tag.createdAt,
        }));

        return safetag;
    } catch (error: any) {
        throw new Error(error);
    }
}
