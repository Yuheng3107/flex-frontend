import React, { useState, useEffect } from "react";

import { IonButton, IonRouterLink, IonIcon } from "@ionic/react";
import { ProfileData, emptyProfileData } from "../../types/stateTypes";
import {closeOutline} from "ionicons/icons"

import {
  acceptFriendRequest,
  declineFriendRequest,
} from "../../utils/data/friends";
import { getOtherProfileDataAsync } from "../../utils/data/profileData";

import { imgBackend } from "../../App";

//components
import PersonCircleIcon from "../../assets/svgComponents/PersonCircleIcon";

type FriendRequestProps = {
  profileId: number;
};

const FriendRequest = ({ profileId }: FriendRequestProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [profileData, setProfileData] = useState<ProfileData>(emptyProfileData);
  // 0 is pending, 1 is accepted, 2 is declined
  const [requestState, setRequestState] = useState(0);


  useEffect(() => {
    const getProfileData = async () => {
      setProfileData(await getOtherProfileDataAsync(profileId));
    };
    getProfileData();
    if (profileData?.profile_photo) {
      setImageUrl(imgBackend.concat(profileData.profile_photo));
    }
  }, [profileData?.profile_photo, requestState, setRequestState]);


  const acceptRequest = async () => {
    let response = await acceptFriendRequest(profileId);
    if (response?.status === 200) setRequestState(1);
  };
  const declineRequest = async () => {
    let response = await declineFriendRequest(profileId);
    if (response?.status === 200) setRequestState(2);
  };


  return (
    <div className="mt-4 p-2 flex flex-row justify-between items-center">

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
      <div id="accept-reject-buttons" className="flex flex-row items-center">

        {requestState === 0 ? (
          <div className="flex flex-row items-center">
            <button onClick={acceptRequest} className="h-8 w-8 mr-2 flex justify-center items-center rounded-full bg-gray-300 text-white">
              <IonIcon size="large" icon={closeOutline} />
            </button>
            <button onClick={acceptRequest} className="h-8 flex items-center px-4 text-sm text-white bg-pantone-orange rounded-full">
              Accept
            </button>
          </div>
        ) : requestState === 1 ? (
          <div> Request Accepted.</div>
        ) : (
          <div> Request Declined.</div>
        )}
      </div>
    </div >
  );
};

export default FriendRequest;
