import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  areaId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  // const currentUser = await getCurrentUser();

  // if (!currentUser) {
  //   return NextResponse.error();
  // }

  const { areaId } = params;

  if (!areaId || typeof areaId !== 'string') {
    throw new Error('Invalid ID');
  }

  const area = await prisma.area.deleteMany({
    where: {
      id: areaId,
    }
  });

  return NextResponse.json(area);
}


export async function PUT(
  request: Request,
  { params }: { params: IParams }
) {
  // const currentUser = await getCurrentUser();

  // if (!currentUser) {
  //     return NextResponse.error();
  // }

  const body = await request.json();
  const {
    title,
    description,
    slug,
    image,
    lat,
    long,
    content,
    status,
    isFeatured,
    isAddHome,
    isFooterMenu,
    isRecommended,

  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const { areaId } = params;

  if (!areaId || typeof areaId !== 'string') {
    throw new Error('Invalid ID');
  }

  const area = await prisma.area.updateMany({
    where: {
      id: areaId
    },
    data: {
      title,
      description,
      content,
      status,
      isFeatured,
      isAddHome,
      isFooterMenu,
      isRecommended,
      slug,
      image,
      lat: parseFloat(lat),
      long: parseFloat(long),

    },
  });

  return NextResponse.json(area);
}
