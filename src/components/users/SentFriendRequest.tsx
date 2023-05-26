import React, { useState, useEffect } from "react";

import { IonButton, IonRouterLink } from "@ionic/react";
import { ProfileData, emptyProfileData } from "../../types/stateTypes";

import {
  sendFriendRequest,
  deleteFriendRequest,
} from "../../utils/data/friends";
import { getOtherProfileDataAsync } from "../../utils/data/profileData";

import { imgBackend } from "../../App";

import PersonCircleIcon from "../../assets/svgComponents/PersonCircleIcon";


type SentFriendRequestProps = {
  profileId: number;
};

const SentFriendRequest = ({ profileId }: SentFriendRequestProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [profileData, setProfileData] = useState<ProfileData>(emptyProfileData);
  const [requestSent, setRequestSent] = useState(true);

  const sendRequest = async () => {
    let response = await sendFriendRequest(profileId);
    if (response?.status === 200) setRequestSent(true);
  };
  const deleteRequest = async () => {
    let response = await deleteFriendRequest(profileId);
    if (response?.status === 200) setRequestSent(false);
  };
  const getProfileData = async () => {
    setProfileData(await getOtherProfileDataAsync(profileId));
  };
  useEffect(() => {
    getProfileData();
    if (profileData?.profile_photo) {
      setImageUrl(imgBackend.concat(profileData.profile_photo));
    }
  }, [profileData?.profile_photo, requestSent, setRequestSent]);

  return (
    <div className=" mt-4 p-2 flex flex-row justify-between items-center">
      <IonRouterLink
        routerLink={`/home/profile/${profileData.id}`}
        routerDirection="forward"
        color="dark"
        className="flex flex-row"
      >
        <div id="pic-and-name" className="flex flex-row items-center">
          {imageUrl ? <img
            alt="profile-picture"
            src={imageUrl}
            className="h-12 w-12 rounded-full object-cover"
          /> : <span className="h-12 w-12 bg-slate-300 rounded-full"><PersonCircleIcon className="h-12 w-12 fill-white" /></span>}

          <span className="ml-2">{profileData?.username}</span>

        </div>
      </IonRouterLink>
      {requestSent ? (
        <button onClick={deleteRequest} className="h-8 flex items-center px-4 text-sm text-gray-600 bg-gray-300 rounded-full">
          Cancel
        </button>
      ) : (
        <button onClick={sendRequest} className="h-8 flex items-center px-4 text-sm text-gray-600 bg-gray-300 rounded-full">
          Resend
        </button>
      )}
    </div>
  );
};

export default SentFriendRequest;
