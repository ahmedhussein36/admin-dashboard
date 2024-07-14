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
        name,
        ref,
        description,
        content,
        slug,
        mainImage,
        images,
        masterPlan,
        lat, 
        lng,
        minPrice,
        maxPrice,
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
            name,
            ref,
            description,
            content,
            slug,
            mainImage,
            masterPlan,
            images,
            seoDetails: {
                metaDescription,
                metaTitle,
            },
            lat : parseFloat(lat),
            lng: parseFloat(lng),
            minPrice : parseInt(minPrice),
            maxPrice : parseInt(maxPrice),
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
