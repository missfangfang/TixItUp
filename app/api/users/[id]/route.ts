import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/ValidationSchemas/user";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();

  const isValid = userSchema.safeParse(body);
  if (!isValid.success) {
    return NextResponse.json(isValid.error.format(), { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!user) {
    return NextResponse.json({ error: "User Not Found" }, { status: 400 });
  }

  if (body?.password && body.password != "") {
    const hashPassword = await bcrypt.hash(body.password, 10);
    body.password = hashPassword;
  } else {
    delete body.password;
  }

  if (user.username !== body.username) {
    const duplicateUsername = await prisma.user.findUnique({
      where: { username: body.username },
    });
    if (duplicateUsername) {
      return NextResponse.json(
        { error: "Username Already Exists" },
        { status: 409 }
      );
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { ...body },
  });

  return NextResponse.json(updatedUser);
}
