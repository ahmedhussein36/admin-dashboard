import prisma from "@/app/libs/prismadb";

export interface IParams {
    userId?: string;
    areaId?: string;
    developerId?: string;
    title?: string;
    compoundId?: string;
    category?: string;
    propertyType?: string;
    status: string;
}

export default async function getProperties(params: IParams) {
    try {
        const {
            userId,
            areaId,
            category,
            propertyType,
            status,
            developerId,
            compoundId,
            title,
        } = params;

        let query: any = {};

        if (title) {
            query.title = { contains: title };
        }

        if (userId) {
            query.userId = userId;
        }
        if (category) {
            query.category = category;
        }

        if (status) {
            query.status = status;
        }

        if (propertyType) {
            query.propertyType = propertyType;
        }
        if (compoundId) {
            query.compoundId = compoundId;
        }
        if (areaId) {
            query.areaId = areaId;
        }
        if (developerId) {
            query.developerId = developerId;
        }

        const properties = await prisma.property.findMany({
            where: query,
            // include: {
            //     user: true || null,
            // },

            orderBy: {
                createdAt: "desc",
            },
        });

        const safeProperties = properties.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeProperties;
    } catch (error: any) {
        throw new Error(error);
    }
}
