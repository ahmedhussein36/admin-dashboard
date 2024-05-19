import prisma from "@/app/libs/prismadb";

export interface IParams {
    title?: string
    developerId?: string
    areaId?: string
    status?: string
}

export default async function getCompounds(params: IParams) {
    try {
        const {
            title, developerId, areaId, status
        } = params;

        let query: any = {};

        if (title) {
            query.title = {
                contains: title,
            }
        }

        if (status) {
            query.status = status
        }
        if (areaId) {
            query.areaId = areaId
        }
        if (developerId) {
            query.developerId = developerId
        }


        const compounds = await prisma.compound.findMany({
            where: query,
            include: {
                developer: true,
                user: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const safecompounds = compounds.map((compound) => ({
            ...compound,
            createdAt: compound.createdAt
        }));

        return safecompounds;
    } catch (error: any) {
        throw new Error(error);
    }
}
