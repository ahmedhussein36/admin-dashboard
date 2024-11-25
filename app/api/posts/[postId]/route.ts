import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    postId?: string;
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

    const { postId } = params;

    if (!postId || typeof postId !== "string") {
        throw new Error("Invalid ID");
    }

    const post = await prisma.post.deleteMany({
        where: {
            id: postId,
        },
    });

    return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        status,
        title,
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

    const { postId } = params;

    if (!postId || typeof postId !== "string") {
        throw new Error("Invalid ID");
    }

    const post = await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            status,
            title,
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
