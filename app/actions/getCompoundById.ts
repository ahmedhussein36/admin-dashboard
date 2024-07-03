import prisma from "@/app/libs/prismadb";

interface IParams {
    id?: string;
}

export default async function getCompoundById(params: IParams) {
    try {
        const { id } = params;

        const compound = await prisma.compound.findUnique({
            where: {
                id: id,
            },
            include: {
                developer: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                area: {
                    select: {
                        title: true,
                        id: true,
                    },
                },
                user: true,
            },
        });

        if (!compound) {
            return null;
        }

        return {
            ...compound,
            createdAat: compound?.createdAt?.toString(),
            developer: {
                ...compound?.developer,
            },
            area: {
                ...compound?.area,
            },
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
