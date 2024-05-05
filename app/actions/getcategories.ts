import prisma from "@/app/libs/prismadb";

export interface IParams {
    title?: string;
    status?: string;
}

export default async function getcategories(params: IParams) {
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

        const category = await prisma.category.findMany({
            where: query,
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
