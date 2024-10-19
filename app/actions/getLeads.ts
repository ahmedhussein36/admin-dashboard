import prisma from "@/app/libs/prismadb";

export interface LeadParams {
    name?: string;
    email?: string;
    status?: string;
    country: string;
    compoundName: string;
    compoundRef: string;
    unitRef: string;
}

export default async function getLeads(params: LeadParams) {
    try {
        const { name, email, country, compoundName, compoundRef, unitRef } =
            params;

        let query: any = {};

        if (name) {
            query.name = {
                contains: name,
            };
        }
        if (email) {
            query.email = email;
        }
        if (country) {
            query.country = country;
        }
        if (compoundName) {
            query.compoundName = compoundName;
        }
        if (compoundRef) {
            query.compoundRef = compoundRef;
        }
        if (unitRef) {
            query.unitRef = unitRef;
        }

        const leads = await prisma.lead.findMany({
            where: query,
            orderBy: {
                createdAt: "asc",
            },
        });

        const safeleads = leads.map((lead) => ({
            ...lead,
            createdAt: lead.createdAt.toLocaleString(),
        }));

        return safeleads;
    } catch (error: any) {
        throw new Error(error);
    }
}
