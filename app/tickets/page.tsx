import prisma from "@/prisma/db";
import DataTable from "@/app/tickets/DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Tickets = async () => {
  const tickets = await prisma.ticket.findMany();

  return (
    <div>
      {/* Use buttonVariants for ShadcnUI button-like styling for Link elements */}
      <Link
        className={buttonVariants({ variant: "default" })}
        href="/tickets/new"
      >
        New Ticket
      </Link>
      <DataTable tickets={tickets} />
    </div>
  );
};

export default Tickets;
