import Link from "next/link";
import Image from "next/image";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-4 text-2xl font-bold">
        <Image
          src="/event-chat-logo.png"
          alt="Event Chat Logo"
          width={150}
          height={50}
        />
      </div>

      <nav className="flex flex-col p-4">
        <Link href="/admin/users">
          <p className="mb-4 text-lg hover:bg-gray-700 p-2 rounded">Users</p>
        </Link>
        <Link href="/admin/events">
          <p className="mb-4 text-lg hover:bg-gray-700 p-2 rounded">Events</p>
        </Link>
        <Link href="/admin/reports">
          <p className="text-lg hover:bg-gray-700 p-2 rounded">Reports</p>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
