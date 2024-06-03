import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-4 text-2xl font-bold">Admin Dashboard</div>
      <nav className="flex flex-col p-4">
        <Link href="/admin/users">
          <p className="mb-4 text-lg hover:bg-gray-700 p-2 rounded">
            User Management
          </p>
        </Link>
        <Link href="/admin/events">
          <p className="mb-4 text-lg hover:bg-gray-700 p-2 rounded">
            Event Management
          </p>
        </Link>
        <Link href="/admin/reports">
          <p className="text-lg hover:bg-gray-700 p-2 rounded">Reports</p>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
