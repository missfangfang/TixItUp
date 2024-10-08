import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/ValidationSchemas/user";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json(
      { error: "Authenticated failed: Invalid username or password" },
      { status: 401 }
    );
  }
  if (session.user.role !== "ADMIN") {
    return NextResponse.json(
      {
        error:
          "Unauthorized: Only admin users are permitted to create new accounts",
      },
      { status: 401 }
    );
  }

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
