import prisma from "@/app/libs/prismadb";

export interface IParams {
    title?: string;
    status?: string;
}

export default async function getDevelopers(params: IParams) {
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

        const developers = await prisma.developer.findMany({
            where: query,
            include: {
                user: true || null,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const safeDevelopers = developers.map((developer) => ({
            ...developer,
            createdAt: developer.createdAt,
        }));

        return safeDevelopers;
    } catch (error: any) {
        throw new Error(error);
    }
}
