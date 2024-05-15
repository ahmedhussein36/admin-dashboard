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
        description,
        content,
        slug,
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
        metaDescription,
        metaTitle,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const property = await prisma.property.create({
        data: {
            title,
            description,
            content,
            slug,
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
            paymentPlan,
            rentalPlan,
            seoDetails: {
                metaDescription,
                metaTitle,
            },
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
            userId: currentUser.id,
        },
    });

    return NextResponse.json(property);
}
