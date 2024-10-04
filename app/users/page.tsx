import UserForm from "@/components/UserForm";
import UsersDataTable from "@/app/users/UsersDataTable";
import prisma from "@/prisma/db";

const Users = async () => {
  const users = await prisma.user.findMany();

  return (
    <div>
      <UserForm />
      <UsersDataTable users={users} />
    </div>
  );
};

export default Users;
