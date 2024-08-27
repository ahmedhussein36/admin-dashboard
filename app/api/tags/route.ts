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
        description,
        metaTitle,
        metaDescription,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const tag = await prisma.tag.create({
        data: {
            title,
            slug,
            description,
            metaTitle,
            metaDescription,
            userId: currentUser.id,
        },
    });

    return NextResponse.json(tag);
}
