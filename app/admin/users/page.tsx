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


import { useRouter } from "next/navigation";

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

  const router = useRouter();

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

  const handleDeleteUser = async (id: string) => {
    try {
      await apiInstance.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCreateUser = () => {
    router.push("/admin/users/create");
  };

  return (
    <div className="min-h-screen bg-blue-100 p-8">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <button
        type="button"
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleCreateUser}
      >
        Create User
      </button>


      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2">Display Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">User Type</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border p-2">{user.displayName}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.userType}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
