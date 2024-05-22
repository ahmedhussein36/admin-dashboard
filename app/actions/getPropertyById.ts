import prisma from "@/app/libs/prismadb";

interface IParams {
    propertyId?: string;
}

export default async function getPropertyById(params: IParams) {
    try {
        const { propertyId } = params;

        const property = await prisma.property.findUnique({
            where: {
                id: propertyId,
            },
            include: {
                user: true,
                compound: true,
                area: true,
                developer: true,
            },
        });

        if (!property) {
            return null;
        }

        return {
            ...property,
            createdAt: property.createdAt.toString(),
            // user: {
            //     ...property.user,
            // },
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
