import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  developerId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  // const currentUser = await getCurrentUser();

  // if (!currentUser) {
  //   return NextResponse.error();
  // }

  const { developerId } = params;

  if (!developerId || typeof developerId !== 'string') {
    throw new Error('Invalid ID');
  }

  const developer = await prisma.developer.deleteMany({
    where: {
      id: developerId,
    }
  });

  return NextResponse.json(developer);
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

  const { developerId } = params;

  if (!developerId || typeof developerId !== 'string') {
    throw new Error('Invalid ID');
  }

  const developer = await prisma.developer.updateMany({
    where: {
      id: developerId
    },
    data: {
      title,
      description,
      slug,
      image,
      content,
      status,
      isFeatured,
      isAddHome,
      isFooterMenu,
      isRecommended,


    },
  });

  return NextResponse.json(developer);
}
