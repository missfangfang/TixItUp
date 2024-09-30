import prisma from '@/prisma/db';
import DataTable from '@/app/tickets/DataTable';

const Tickets = async () => {
  const tickets = await prisma.ticket.findMany();

  return (
    <div>
      <DataTable tickets={tickets} />
    </div>
  );
};

export default Tickets;
