import prisma from "@/app/libs/prismadb";

interface IParams {
    userId?: string;
}

export default async function getUserById(params: IParams) {
    try {
        const { userId } = params;

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return null;
        }

        const safeUser = {
            ...user,
            created_at: user?.createdAt?.toString(),
        };

        return safeUser;
    } catch (error: any) {
        throw new Error(error);
    }
}
