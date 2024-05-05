import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        slug,
        image,
        lat,
        long,
        content,
        status, 
        isFeatured,
        isAddHome,
        isFooterMenu,
        isRecommended,

    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const area = await prisma.area.create({
        data: {
            title,
            description,
            content,
            slug,
            image,
            lat: parseFloat(lat),
            long: parseFloat(long),
            status,
            isFeatured,
            isAddHome,
            isFooterMenu,
            isRecommended,
            userId: currentUser?.id

        },
    });

    return NextResponse.json(area);
}
