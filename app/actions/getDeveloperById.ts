import prisma from "@/app/libs/prismadb";

interface IParams {
    developerId?: string;
}

export default async function getDeveloperById(params: IParams) {
    try {
        const { developerId } = params;

        const developer = await prisma.developer.findUnique({
            where: {
                id: developerId,
            },
            include: {
                property: true,
                compound: true,
                user: true
            }
        })

        if (!developer) {
            return null;
        }

        const safeDeveloper = {
            ...developer,
            created_at: developer?.createdAt?.toString()

        }

        return safeDeveloper;
    } catch (error: any) {
        throw new Error(error);
    }
}
