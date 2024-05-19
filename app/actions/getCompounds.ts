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
                slug: true,
                isLaunch: true,
                status: true,
                title: true,
                createdAt: true,
                developer: {
                    select: {
                        title: true,
                    },
                },
                area: {
                    select: {
                        title: true,
                    },
                },
                user: {
                    select: {
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
            createdAt: compound.createdAt.toISOString(),
        }));
    } catch (error) {
        console.error("Error fetching compounds:", error);
        throw new Error("Could not fetch compounds");
    }
}
