import { ReactNode } from "react";
import Sidebar from "@/components/ui/Sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-100 ">{children}</main>
    </div>
  );
};

export default AdminLayout;
