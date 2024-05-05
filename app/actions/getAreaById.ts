import prisma from "@/app/libs/prismadb";

interface IParams {
    areaId: string;
}

export default async function getareaById(params: IParams) {
    try {
        const { areaId } = params;

        const area = await prisma.area.findUnique({
            where: {
                id: areaId,
            }
        })

        if (!area) {
            return null;
        }

        const safearea = {
            ...area,
            createdAat: area?.createdAt?.toString()

        }

        return safearea;
    } catch (error: any) {
        throw new Error(error);
    }
}
