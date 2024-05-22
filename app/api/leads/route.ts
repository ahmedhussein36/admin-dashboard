import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, name, phone, subject } = body;

    const user = await prisma.lead.create({
        data: {
            email,
            name,
            phone,
            subject,
        },
    });

    return NextResponse.json(user);
}
