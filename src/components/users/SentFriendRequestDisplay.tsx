import React, { useState, useEffect } from "react";

import SentFriendRequest from "./SentFriendRequest";

type SentFriendRequestDisplayProps = {
  friend_requests: any[];
};

const SentFriendRequestDisplay = ({ friend_requests }: SentFriendRequestDisplayProps) => {
  return (
    <div className="shadow p-2 bg-white">
      <p className="">Sent Requests</p>
      {friend_requests.length === 0 ?
        <div className="text-center">No Friend Requests Sent</div>
        :
        friend_requests.map(item => (
          <SentFriendRequest profileId={item} key={item} />
        ))}
    </div>
  )
};

export default SentFriendRequestDisplay;
