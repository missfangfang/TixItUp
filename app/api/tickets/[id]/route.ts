import { NextRequest, NextResponse } from "next/server";
import { ticketSchema } from "@/ValidationSchemas/ticket";
import prisma from "@/prisma/db";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const isValid = ticketSchema.safeParse(body);

  if (!isValid.success) {
    return NextResponse.json(isValid.error.format(), { status: 400 });
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return NextResponse.json({ error: "Ticket Not Found" }, { status: 404 });
  }

  const updateTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: { ...body },
  });

  return NextResponse.json(updateTicket);
}
