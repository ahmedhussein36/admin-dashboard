import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, name, username, role, status, password, image } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            username,
            status,
            role,
            image,
            hashedPassword,
        },
    });

    return NextResponse.json(user);
}
