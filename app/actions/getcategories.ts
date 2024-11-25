import prisma from "@/app/libs/prismadb";

export interface IParams {
    title?: string;
}

export default async function getcategories(params: IParams) {
    try {
        const { title } = params;

        let query: any = {};

        if (title) {
            query.title = {
                contains: title,
            };
        }

        const category = await prisma.category.findMany({
            where: query,
            include: {
                posts: true,
                },
            orderBy: {
                createdAt: "desc",
            },
        });

        const safeCategory = category.map((category) => ({
            ...category,
            createdAt: category.createdAt,
        }));

        return safeCategory;
    } catch (error: any) {
        throw new Error(error);
    }
}
