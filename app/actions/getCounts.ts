import prisma from "@/app/libs/prismadb";

export async function getAreasCounts(): Promise<number> {
    try {
        const areas = await prisma.area.findMany();
        return areas.length;
    } catch (error: any) {
        console.error("Error fetching area count:", error);
        throw new Error("Failed to fetch area count");
    } finally {
        await prisma.$disconnect();
    }
}

export async function getDeveloperCount(): Promise<number> {
    try {
        const developers = await prisma.developer.findMany();
        return developers.length;
    } catch (error: any) {
        console.error("Error fetching developer count:", error);
        throw new Error("Failed to fetch developer count");
    } finally {
        await prisma.$disconnect();
    }
}
export async function getCompoundsCounts(): Promise<number> {
    try {
        const compounds = await prisma.compound.findMany();
        return compounds.length;
    } catch (error: any) {
        console.error("Error fetching compound count:", error);
        throw new Error("Failed to fetch compound count");
    } finally {
        await prisma.$disconnect();
    }
}

export async function getListingsCounts(): Promise<number> {
    try {
        const listings = await prisma.property.findMany();
        return listings.length;
    } catch (error: any) {
        console.error("Error fetching listing count:", error);
        throw new Error("Failed to fetch listing count");
    } finally {
        await prisma.$disconnect();
    }
}
