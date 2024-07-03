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
            orderBy: {
                createdAt: "asc",
            },
            select: {
                id: true,
                image: true,
                slug: true,
                createdAt: true,
                title: true,
                status: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        const safeDevelopers = developers.map((developer) => ({
            ...developer,
            createdAt: developer.createdAt.toISOString(),
        }));

        return safeDevelopers;
    } catch (error: any) {
        throw new Error(error);
    }
}
