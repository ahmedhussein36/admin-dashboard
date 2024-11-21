import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/libs/prismadb";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { startDate, endDate } = req.query;

    const leads = await prisma.lead.findMany({
        where: {
            createdAt: {
                gte: new Date(startDate as string),
                lte: new Date(endDate as string),
            },
        },
    });

    res.json(leads);
}
