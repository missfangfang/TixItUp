import UserForm from "@/components/UserForm";
import UsersDataTable from "@/app/users/UsersDataTable";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

const Users = async () => {
  // const session = await getServerSession(options);
  const users = await prisma.user.findMany();

  // if (session?.user.role !== "ADMIN") {
  //   return <p className="text-destructive">Admin Access Required</p>;
  // }

  return (
    <div>
      <UserForm />
      <UsersDataTable users={users} />
    </div>
  );
};

export default Users;
