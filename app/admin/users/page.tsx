// const UserManagement: React.FC = () => {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">User Management</h1>
//       {/* User management functionalities will go here */}
//     </div>
//   );
// };

// export default UserManagement;
"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

interface IUser {
  _id: string;
  displayName: string;
  email?: string;
  password: string;
  displayImage?: string;
  bio: string;
  userType: 'attendee' | 'admin' | 'speaker';
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [newUser, setNewUser] = useState<Partial<IUser>>({
    displayName: '',
    email: '',
    password: '',
    displayImage: '',
    bio: '',
    userType: 'attendee',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/users', newUser);
      fetchUsers();
      setNewUser({
        displayName: '',
        email: '',
        password: '',
        displayImage: '',
        bio: '',
        userType: 'attendee',
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
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
        <div className="mb-4">
          <label className="block mb-2">User Type</label>
          <select
            name="userType"
            value={newUser.userType}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          >
            <option value="attendee">Attendee</option>
            <option value="admin">Admin</option>
            <option value="speaker">Speaker</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create User
        </button>
      </form>

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

