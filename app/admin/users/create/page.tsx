// app/users/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";

import Link from "next/link";

import { useAxios } from "@/lib/api";

export interface User {
  id: string;
  displayName: string;
  email: string;
  password?: string; // Optional if you don't need to display it
  displayImage?: string;
  bio: string;
  userType: string;
}

// const UsersPage: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);

//   const apiInstance = useAxios();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const response = await fetch("http://your-backend-url/users", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const data: User[] = await response.json();
//       setUsers(data);
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       <h1>Users</h1>
//       <Link href="/users/create">Create New User</Link>
//       <div className="user-list">
//         {users.map((user) => (
//           <UserCard key={user.id} user={user} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UsersPage;

interface IUser {
  _id: string;
  displayName: string;
  email?: string;
  password: string;
  displayImage?: string;
  bio: string;
  userType: "attendee" | "admin" | "speaker";
}

const UserManagement: React.FC = () => {
  const apiInstance = useAxios();

  const [users, setUsers] = useState<IUser[]>([]);
  const [newUser, setNewUser] = useState<Partial<IUser>>({
    displayName: "",
    email: "",
    password: "",
    displayImage: "",
    bio: "",
    userType: "attendee",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiInstance.get("/api/users");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiInstance.post("/api/users", newUser);
      fetchUsers();
      setNewUser({
        displayName: "",
        email: "",
        password: "",
        displayImage: "",
        bio: "",
        userType: "attendee",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await apiInstance.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <form onSubmit={handleCreateUser} className="mb-8">
        <div className="mb-4">
          <label className="block mb-2">Display Name</label>
          <input
            type="text"
            name="displayName"
            value={newUser.displayName}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Display Image</label>
          <input
            type="text"
            name="displayImage"
            value={newUser.displayImage}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Bio</label>
          <input
            type="text"
            name="bio"
            value={newUser.bio}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create User
        </button>
      </form>
    </div>
  );
};

export default UserManagement;
