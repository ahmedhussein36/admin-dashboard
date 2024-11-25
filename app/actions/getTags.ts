import prisma from "@/app/libs/prismadb";

export default async function getTags() {
    try {
        const tag = await prisma.tag.findMany({
            include: {
                posts: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const safetag = tag.map((tag) => ({
            ...tag,
            createdAt: tag.createdAt,
        }));

        return safetag;
    } catch (error: any) {
        throw new Error(error);
    }
}
