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
            select: {
                id: true,
                title: true,
                slug: true,
                ref: true,
                roomCount: true,
                developerId: true,
                areaId: true,
                compoundId: true,
                status: true,
                user: true,
                category: true,
                bathroomCount: true,
                propertyType: true,
                content: false,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const safeProperties = properties.map((listing) => ({
            ...listing,
        }));

        return safeProperties;
    } catch (error: any) {
        throw new Error(error);
    }
}
