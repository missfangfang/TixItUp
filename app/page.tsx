import prisma from "@/prisma/db";
import DashboardRecentTickets from "@/components/DashboardRecentTickets";
import DashboardChart from "@/components/DashboardChart";

const Dashboard = async () => {
  const tickets = await prisma.ticket.findMany({
    where: {
      NOT: [{ status: "CLOSED" }],
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: 0,
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  const groupTicket = await prisma.ticket.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });

  return (
    <div>
      <div className="grid gap-4 px-2 md:grid-cols-2">
        <div>
          <DashboardRecentTickets tickets={tickets} />
        </div>
        <div>
          <DashboardChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
