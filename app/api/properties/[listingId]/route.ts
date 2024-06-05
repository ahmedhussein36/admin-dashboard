import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid ID");
    }

    const listing = await prisma.property.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id,
        },
    });

    return NextResponse.json(listing);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        ref,
        // slug,
        description,
        content,
        images,
        mainImage,
        category,
        roomCount,
        bathroomCount,
        propertyType,
        saleType,
        amenities,
        group,
        status,
        isFeatured,
        isAddHome,
        isRecommended,
        isFooterMenu,
        finishing,
        deliveryStatus,
        furniture,
        paymentPlan,
        rentalPlan,
        rentValue,
        RentalPeriod,
        rentAvailableDate,
        downPayment,
        installmentValue,
        installmentPeriod,
        developerName,
        commissionValue,
        deliveryDate,
        metaDescription,
        metaTitle,
        country,
        city,
        phone,
        whatsapp,
        price,
        currency,
        size,
        sizeUnit,
        developer,
        area,
        compound,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid ID");
    }

    const property = await prisma.property.updateMany({
        where: {
            id: listingId,
        },
        data: {
            title,
            ref,
            // slug,
            description,
            content,
            images,
            mainImage,
            category,
            roomCount,
            bathroomCount,
            propertyType,
            group,
            status,
            finishing,
            deliveryStatus,
            furniture,
            isFeatured,
            isAddHome,
            isRecommended,
            isFooterMenu,
            saleType,
            amenities,
            seoDetails: {
                metaDescription,
                metaTitle,
            },
            paymentPlan,
            rentalPlan,
            rentValue,
            RentalPeriod,
            rentAvailableDate,
            downPayment: parseInt(downPayment),
            installmentValue: parseFloat(installmentValue),
            installmentPeriod: parseInt(installmentPeriod),
            developerName,
            commissionValue: parseFloat(commissionValue) || null,
            deliveryDate,
            country,
            city: city.value,
            phone,
            whatsapp,
            price: parseInt(price),
            currency,
            size: parseInt(size),
            sizeUnit,
            developerId: developer?.id,
            areaId: area?.id,
            compoundId: compound?.id,
        },
    });

    return NextResponse.json(property);
}
