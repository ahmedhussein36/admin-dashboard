import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    // Set CORS headers
    const headers = new Headers({
        "Access-Control-Allow-Origin": "http://127.0.0.1:5500/", // Adjust this to allow specific origins
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });

    // Handle preflight requests
    if (request.method === "OPTIONS") {
        return new Response(null, { headers });
    }

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

    // Include CORS headers in the response
    return new Response(JSON.stringify(user), {
        headers: headers,
        status: 200,
    });
}
