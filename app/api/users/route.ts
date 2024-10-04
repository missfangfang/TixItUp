import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/ValidationSchemas/user";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const isValid = userSchema.safeParse(body);
  if (!isValid.success) {
    return NextResponse.json(isValid.error.format(), { status: 400 });
  }

  const duplicateUsername = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });
  if (duplicateUsername) {
    return NextResponse.json(
      { message: "Username Already Exists" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  body.password = hashedPassword;

  const newUser = await prisma.user.create({
    data: { ...body },
  });

  return NextResponse.json(newUser, { status: 201 });
}
