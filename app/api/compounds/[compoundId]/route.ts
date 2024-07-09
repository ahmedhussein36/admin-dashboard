import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    compoundId?: string;
}

interface Meta {
    title: string;
    description: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { compoundId } = params;

    if (!compoundId || typeof compoundId !== "string") {
        throw new Error("Invalid ID");
    }

    const compound = await prisma.compound.deleteMany({
        where: {
            id: compoundId,
        },
    });

    return NextResponse.json(compound);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        content,
        mainImage,
        images,
        metaTitle,
        metaDescription,
        isLaunch,
        status,
        lat,
        lng,
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

    const { compoundId } = params;

    if (!compoundId || typeof compoundId !== "string") {
        throw new Error("Invalid ID");
    }

    const compound = await prisma.compound.updateMany({
        where: {
            id: compoundId,
        },
        data: {
            title,
            description,
            content,
            mainImage,
            images,
            seoDetails: {
                metaDescription,
                metaTitle,
            },
            lat : parseFloat(lat),
            lng: parseFloat(lng),
            isLaunch,
            status,
            isFeatured,
            isAddHome,
            isFooterMenu,
            isRecommended,
            developerId: developer?.id,
            areaId: area?.id,
        },
    });

    return NextResponse.json(compound);
}
