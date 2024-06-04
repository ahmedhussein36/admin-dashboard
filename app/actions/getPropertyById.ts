import prisma from "@/app/libs/prismadb";

export interface IParam {
    propertyId?: string;
}

export default async function getPropertyById(params: IParam) {
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
            // user: {
            //     ...property.user,
            // },
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
