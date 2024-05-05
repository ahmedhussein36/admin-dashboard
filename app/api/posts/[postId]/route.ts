import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
// import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    postId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    // const currentUser = await getCurrentUser();

    // if (!currentUser) {
    //   return NextResponse.error();
    // }

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
        title,
        slug,
        image,
        metaDescription,
        metaTitle,
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

    const { postId } = params;

    if (!postId || typeof postId !== "string") {
        throw new Error("Invalid ID");
    }

    const post = await prisma.post.updateMany({
        where: {
            id: postId,
        },
        data: {
            title,
            slug,
            image,
            content,
            metaDescription,
            metaTitle,
            status,
            isFeatured,
            isAddHome,
            isFooterMenu,
            isRecommended,
            userId: currentUser.id,
        },
    });

    return NextResponse.json(post);
}
