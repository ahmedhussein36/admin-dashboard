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
        status,
        title,
        slug,
        description,
        image,
        metaTitle,
        metaDescription,
        isFeatured,
        isRecommended,
        isFooter,
        isAddHome,
        categories,
        tags,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const post = await prisma.post.create({
        data: {
            status,
            title,
            slug,
            description,
            image,
            metaTitle,
            metaDescription,
            isFeatured,
            isRecommended,
            isFooter,
            isAddHome,
            category: {
                connect:
                    categories.map((categortId: string) => ({
                        id: categortId,
                    })) || [],
            },
            tags: {
                connectOrCreate:
                    tags.map((tagId: string) => ({
                        id: tagId,
                    })) || [],
            },
            userId: currentUser.id,
        },
    });

    return NextResponse.json(post);
}
