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
                Area: true,
                Developer: true,
            },
        });

        if (!property) {
            return null;
        }

        return {
            ...property,
            createdAt: property.createdAt.toString(),
            user: {
                ...property.user,
                createdAt: property.user.createdAt.toString(),
                updatedAt: property.user.updatedAt.toString(),
                emailVerified: property.user.emailVerified?.toString() || null,
            },
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
