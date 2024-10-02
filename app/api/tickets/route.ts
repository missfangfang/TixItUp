import { NextRequest, NextResponse } from "next/server";
import { ticketSchema } from "@/ValidationSchemas/ticket";
import prisma from "@/prisma/db";

export async function POST(request: NextRequest) {
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
