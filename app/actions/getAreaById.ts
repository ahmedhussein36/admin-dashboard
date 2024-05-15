import prisma from "@/app/libs/prismadb";

interface IParams {
    slug: string;
}

export default async function getareaById(params: IParams) {
    try {
        const { slug } = params;

        const area = await prisma.area.findUnique({
            where: {
                slug: decodeURI(slug),
            },
        });

        if (!area) {
            return null;
        }

        const safearea = {
            ...area,
            createdAat: area?.createdAt?.toString(),
        };

        return safearea;
    } catch (error: any) {
        throw new Error(error);
    }
}
