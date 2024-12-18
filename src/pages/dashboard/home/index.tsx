import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

import { fetchAllUIDs } from "@/services/uid";
import { useAuth } from "@/contexts/authContext";
import UserCard from "@/components/userCard";
import AddUserDialog from "@/components/addUserDialog";

function DashboardHome() {
  const { logout } = useAuth();
  const uids = useQuery({ queryKey: ["uids"], queryFn: fetchAllUIDs });

  const handleLogout = () => {
    logout();
  };

  const uidList = uids.data?.data;

  return (
    <div className="p-4">
      <Button type="button" className="mb-4" onClick={handleLogout}>
        Logout
      </Button>
      <section>
        <div className="flex justify-between items-center pb-4">
          <h3 className="font-bold text-base">User Management</h3>
          <AddUserDialog />
        </div>
        <div className="flex flex-col gap-4">
          {uidList !== undefined &&
            uidList.map(({ uid, name, amount }) => (
              <UserCard
                title={name}
                content={amount.toString()}
                id={uid}
                key={uid}
              />
            ))}
        </div>
      </section>
    </div>
  );
}

export default DashboardHome;
