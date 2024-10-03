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
        locale,
        slug,
        image,
        description,
        status,
        metaTitle,
        metaDescription,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const category = await prisma.category.create({
        data: {
            title,
            name,
            locale,
            slug,
            image,
            description,
            status,
            metaTitle,
            metaDescription,
        },
    });

    return NextResponse.json(category);
}
