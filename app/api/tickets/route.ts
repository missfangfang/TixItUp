import { NextRequest, NextResponse } from "next/server";
import { ticketSchema } from "@/ValidationSchemas/ticket";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const isValid = ticketSchema.safeParse(body);

  if (!isValid.success) {
    return NextResponse.json(isValid.error.format(), { status: 400 });
  }

  const newTicket = await prisma.ticket.create({
    data: { ...body },
  });

  return NextResponse.json(newTicket, { status: 201 });
}
