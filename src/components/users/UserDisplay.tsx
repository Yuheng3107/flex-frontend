import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { ProfileData } from "../../types/stateTypes";

type UserDisplayProps = {
  users: ProfileData[];
};

const UserDisplay = ({ users }: UserDisplayProps) => {
  return (
    <div>
      {users.length === 0 ? 
        <div className="text-center">No Users</div>
      :
        users.map(item => (
          <UserCard profileData={item} key={item.id}/>
      ))}
    </div>
  )
};

export default UserDisplay;
