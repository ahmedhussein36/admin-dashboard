import prisma from "@/app/libs/prismadb";

interface IParams {
    tagId?: string;
}

export default async function getTagById(params: IParams) {
    try {
        const { tagId } = params;

        const tag = await prisma.tag.findUnique({
            where: {
                id: tagId,
            },
            include: {
                posts: true,
            },
        });

        if (!tag) {
            return null;
        }

        const safetag = {
            ...tag,
        };

        return safetag;
    } catch (error: any) {
        throw new Error(error);
    }
}
