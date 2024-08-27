import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  tagId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  // const currentUser = await getCurrentUser();

  // if (!currentUser) {
  //   return NextResponse.error();
  // }

  const { tagId } = params;

  if (!tagId || typeof tagId !== 'string') {
    throw new Error('Invalid ID');
  }

  const tag = await prisma.tag.deleteMany({
    where: {
      id: tagId,
    }
  });

  return NextResponse.json(tag);
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
        metaTitle,
        metaDescription


  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const { tagId } = params;

  if (!tagId || typeof tagId !== 'string') {
    throw new Error('Invalid ID');
  }

  const tag = await prisma.tag.updateMany({
    where: {
      id: tagId
    },
    data: {
      title,
        description,
        metaTitle,
        metaDescription
    },
  });

  return NextResponse.json(tag);
}
