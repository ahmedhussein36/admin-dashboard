import prisma from "@/app/libs/prismadb";

interface IParams {
    categoryId?: string;
}

export default async function getcategoryById(params: IParams) {
    try {
        const { categoryId } = params;

        const category = await prisma.category.findUnique({
            where: {
                id: categoryId,
            },
            include: {
                posts: true,
            },
        });

        if (!category) {
            return null;
        }

        const safecategory = {
            ...category,
            created_at: category?.createdAt?.toString(),
        };

        return safecategory;
    } catch (error: any) {
        throw new Error(error);
    }
}
