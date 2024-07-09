import prisma from "@/app/libs/prismadb";

export interface IParams {
    title?: string;
    developerId?: string;
    areaId?: string;
    status?: string;
}

export default async function getCompounds(params: IParams) {
    try {
        const { title, developerId, areaId, status } = params;

        const query: any = {};

        if (title) {
            query.title = {
                contains: title,
                mode: "insensitive", // Case-insensitive search
            };
        }

        if (status) {
            query.status = status;
        }

        if (areaId) {
            query.areaId = areaId;
        }

        if (developerId) {
            query.developerId = developerId;
        }

        const compounds = await prisma.compound.findMany({
            where: query,
            select: {
                id: true,
                title: true,
                slug: true,
                isLaunch: true,
                status: true,
                name: true,
                properties: {
                    select: {
                        id: true,
                    },
                },
                developer: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                area: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return compounds.map((compound) => ({
            ...compound,
        }));
    } catch (error) {
        console.error("Error fetching compounds:", error);
        throw new Error("Could not fetch compounds");
    }
}
