import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  categoryId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  // const currentUser = await getCurrentUser();

  // if (!currentUser) {
  //   return NextResponse.error();
  // }

  const { categoryId } = params;

  if (!categoryId || typeof categoryId !== 'string') {
    throw new Error('Invalid ID');
  }

  const category = await prisma.category.deleteMany({
    where: {
      id: categoryId,
    }
  });

  return NextResponse.json(category);
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
        image,
        description,
        status,
        metaTitle,
        metaDescription


  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const { categoryId } = params;

  if (!categoryId || typeof categoryId !== 'string') {
    throw new Error('Invalid ID');
  }

  const category = await prisma.category.updateMany({
    where: {
      id: categoryId
    },
    data: {
      title,
        image,
        description,
        status,
        metaTitle,
        metaDescription



    },
  });

  return NextResponse.json(category);
}
