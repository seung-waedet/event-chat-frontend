// app/components/UserCard.tsx
import React from "react";

type UserCardProps = {
  user: {
    displayName: string;
    email: string;
    bio: string;
    displayImage?: string;
    userType: string;
  };
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="user-card">
      {/* {user.displayImage && <img src={user.displayImage} alt={`${user.displayName}'s image`} />} */}
      <h3>{user.displayName}</h3>
      <p>{user.email}</p>
      <p>{user.bio}</p>
      <p>{user.userType}</p>
    </div>
  );
};

export default UserCard;
