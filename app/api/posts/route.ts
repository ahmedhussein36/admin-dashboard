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
        content,
        image,
        tagIds,
        categoryIds,
        metaDescription,
        metaTitle,
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

    const post = await prisma.post.create({
        data: {
            title,
            slug,
            image,
            content,
            tags: {
                connect: tagIds.map((id: string) => ({ id})),
            },
            categories: { 
                connect: categoryIds.map((id: string) => ({ id})), 
            },
            metaDescription,
            metaTitle,
            status,
            isFeatured,
            isAddHome,
            isFooterMenu,
            isRecommended,
            userId: currentUser.id,
        },

        include: {
            tags: true,
            categories: true,
        },
    });

    return NextResponse.json(post);
}
