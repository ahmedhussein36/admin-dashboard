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
        content,
        slug,
        mainImage,
        images,
        metaTitle,
        metaDescription,
        isLaunch,
        status,
        isFeatured,
        isAddHome,
        isFooterMenu,
        isRecommended,
        developer,
        area,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const compound = await prisma.compound.create({
        data: {
            title,
            description,
            content,
            slug,
            mainImage,
            images,
            seoDetails: {
                metaDescription,
                metaTitle,
            },
            isLaunch,
            status,
            isFeatured,
            isAddHome,
            isFooterMenu,
            isRecommended,
            developerId: developer?.id,
            areaId: area?.id,
            userId: currentUser.id,
        },
    });

    return NextResponse.json(compound);
}
