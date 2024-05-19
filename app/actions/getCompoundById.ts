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
                developer: true,
                area: true,
                properties: true,
                user: true,
            }
        })

        if (!compound) {
            return null;
        }

        return {
            ...compound,
            createdAat: compound?.createdAt?.toString(),
            developer: {
                ...compound?.developer,
                createdAt: compound?.developer?.createdAt.toString(),
                updatedAt: compound?.developer?.updatedAt.toString(),
            },
            area: {
                ...compound?.area,
                createdAt: compound?.area?.createdAt.toString(),
                updatedAt: compound?.area?.updatedAt.toString(),
            },
            properties: {
                ...compound?.properties,
            }
        }

    } catch (error: any) {
        throw new Error(error);
    }
}
