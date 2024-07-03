import prisma from "@/app/libs/prismadb";
import { SafeArea } from "../types";

export interface IParams {
    title?: string;
    status?: string;
}

export default async function getAreas(params: IParams){
    try {
        const { title, status } = params;

        let query: any = {};

        if (title) {
            query.title = { contains: title };
        }
        if (status) {
            query.status = status;
        }

        const areas = await prisma.area.findMany({
            where: query,
            orderBy: {
                createdAt: "desc",
            },
        });

        const safeAreas = areas.map((area) => ({
            ...area,
            createdAt: area.createdAt,
        }));

        return safeAreas;
    } catch (error: any) {
        throw new Error(error);
    }
}
