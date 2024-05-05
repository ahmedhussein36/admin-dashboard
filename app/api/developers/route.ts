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
        slug,
        image,
        description,
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

    const developer = await prisma.developer.create({
        data: {
            title,
            slug,
            image,
            description,
            content,
            status,
            isFeatured,
            isAddHome,
            isFooterMenu,
            isRecommended,
            userId: currentUser.id,
        },
    });

    return NextResponse.json(developer);
}
