import React, { useState, useEffect } from "react";

import { useAppSelector } from "../../store/hooks";

import { IonButton, IonRouterLink } from '@ionic/react';
import { ProfileData, emptyProfileData } from "../../types/stateTypes";

import { sendFriendRequest, deleteFriendRequest, deleteFriend } from "../../utils/data/friends";
import { getOtherProfileDataAsync } from "../../utils/data/profileData";

import { backend } from "../../App";

type UserCardProps = {
  profileData: ProfileData;
};

/**
 * Card displaying profile picture, username, and ability to add friend 
 * @param profileData 
 * @returns UserCard
 */
function UserCard({ profileData }:UserCardProps) {
    const [imageUrl, setImageUrl] = useState("");
    const [friendStatus, setFriendStatus] = useState(0);
    const profileDataRedux = useAppSelector((state) => state.profile.profileData)

    useEffect(() => {
      if (profileDataRedux.followers.includes(profileData.id)) setFriendStatus(2);
    },[profileDataRedux]);
  
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
      if (profileData?.profile_photo) {
        setImageUrl(backend.concat(profileData.profile_photo))
      }
    }, [profileData?.profile_photo, friendStatus, setFriendStatus])
  
    return (
      <div className="border border-zinc-500 mt-4 p-2 flex flex-col justify-evenly items-center">
        <div className="flex flex-row justify-evenly items-center">
          <IonRouterLink routerLink={`/home/profile/${profileData.id}`} routerDirection="forward">
            <img
              alt="profile-picture"
              src={imageUrl}
              className="h-12 w-12 rounded-full object-cover"
            />
          </IonRouterLink>
          <div className="mx-3 flex flex-row items-center">
            <IonRouterLink routerLink={`/home/profile/${profileData.id}`} routerDirection="forward" id="username" className="font-semibold text-black">
              {profileData?.username}
            </IonRouterLink>
          </div>
          {friendStatus === 0 ?
              <IonButton onClick={friendRequest}>Request</IonButton>
          : friendStatus === 1 ?
              <IonButton onClick={removeFriendRequest}>Remove Request</IonButton>
          : 
              <IonButton onClick={removeFriend}>Unfriend</IonButton>
          }
        </div>
          <p className="text-xs">
            {profileData?.bio}
          </p>  
      </div>
    );
}

export default UserCard;