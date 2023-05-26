import React, { useState, useEffect } from "react";

import { useAppSelector } from "../../store/hooks";

import { IonButton, IonRouterLink } from '@ionic/react';
import { ProfileData, emptyProfileData } from "../../types/stateTypes";

import { sendFriendRequest, deleteFriendRequest, deleteFriend } from "../../utils/data/friends";
import { getOtherProfileDataAsync } from "../../utils/data/profileData";

import { imgBackend } from "../../App";

//component imports
import PersonCircleIcon from "../../assets/svgComponents/PersonCircleIcon";
import { ActionButton } from "../../pages/profile/FriendsList";

type UserCardProps = {
  profileData: ProfileData;
};

/**
 * Card displaying profile picture, username, and ability to add friend 
 * @param profileData 
 * @returns UserCard
 */
function UserCard({ profileData }: UserCardProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [friendStatus, setFriendStatus] = useState(0);
  const profileDataRedux = useAppSelector((state) => state.profile.profileData)

  const friendRequest = async () => {
    let response = await sendFriendRequest(profileData.id);
    if (response?.status === 200) setFriendStatus(1);
  }

  const removeFriendRequest = async () => {
    let response = await deleteFriendRequest(profileData.id);
    if (response?.status === 200) setFriendStatus(0);
  }

  const removeFriend = async () => {
    let response = await deleteFriend(profileData.id);
    if (response?.status === 200) setFriendStatus(0);
  }

  useEffect(() => {
    if (profileDataRedux.followers.includes(profileData.id)) setFriendStatus(2);
    if (profileData?.profile_photo) {
      setImageUrl(imgBackend.concat(profileData.profile_photo));
    }
  }, [profileData?.profile_photo, friendStatus, setFriendStatus, profileDataRedux])

  return (
    <div className="mt-4 p-2 flex flex-row justify-between items-center">
      <div className="flex flex-row justify-evenly items-center">
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
        </IonRouterLink >

      </div>
      {friendStatus === 0 ?
        <ActionButton actionFunc={friendRequest} label="Request" className="bg-gray-300"/>
        : friendStatus === 1 ?
          <ActionButton actionFunc={removeFriendRequest} label="Remove Request" className="bg-gray-300"/>
          :
          <ActionButton actionFunc={removeFriend} label="Unfriend" className="bg-gray-300"/>
      }
    </div>
  );
}


export default UserCard;