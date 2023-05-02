import filledCircle from "../../assets/svg/circle_FILL1_wght400_GRAD0_opsz48.svg";
import FilledCircle from "../../assets/svgComponents/FilledCircle";
import CommentIcon from "../../assets/svgComponents/CommentIcon";
import LikeIcon from "../../assets/svgComponents/LikeIcon";
import BookmarkIcon from "../../assets/svgComponents/BookmarkIcon";
import SendIcon from "../../assets/svgComponents/SendIcon";

import React, { useState, useEffect } from "react";

import { backend } from "../../App";
import { UserPostData, ProfileData, CommunityData } from "../../types/stateTypes";
import { timeSince } from "../../utils/generalUtils";

//ionic imports
import {
  IonRouterLink,
  IonContent,
  IonButton,
} from "@ionic/react";

type PostProps = {
  postData: UserPostData;
  profileData: ProfileData;
  communityData: CommunityData;
};

const PersonTextCard = ({ postData, profileData, communityData }: PostProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const postDate = new Date(postData.posted_at);

  useEffect(() => {
    if (profileData?.profile_photo) {
      setImageUrl(backend.concat(profileData.profile_photo));
    }
    if (postData?.media) {
      setMediaUrl(backend.concat(postData.media));
    }
  }, [profileData?.profile_photo])

  return (
    <div id="card-container" className="border border-zinc-500 mt-4 p-2">
      <div id="top-bar" className=" flex flex-row justify-between mb-2">
        <div className="flex flex-row">
          <IonRouterLink routerLink={`/home/profile/${profileData.id}`} routerDirection="forward">
            <img
              alt="profile-picture"
              src={imageUrl}
              className="h-12 w-12 rounded-full object-cover"
            />
          </IonRouterLink>
          <div className="ml-3">
            <IonRouterLink id="username" className="font-semibold" routerLink={`/home/profile/${profileData.id}`} routerDirection="forward">
              {profileData?.username}
            </IonRouterLink>
            <p
              id="subtitle"
              className="flex flex-row items-center text-sm text-gray-700"
            >
              <span id="post-place">
                {postData?.community === undefined ? 
                  <IonRouterLink className="text-gray-700" routerLink={`/home/profile/${profileData.id}`} routerDirection="forward">
                    Profile
                  </IonRouterLink>
                : 
                  <IonRouterLink className="text-gray-700" routerLink={`/home/community/${communityData.id}`} routerDirection="forward">
                    {communityData?.name}
                  </IonRouterLink>
                }</span>
              <FilledCircle className="mx-1 h-1.5 w-1.5 aspect-square fill-slate-500" />
              <span id="time-stamp">{timeSince(postDate)}</span>
            </p>  
          </div>
        </div>
        <button id="menu-button"></button>
      </div>
      <IonRouterLink routerLink={ postData?.community === undefined ? 
        `/home/post/${postData.id}`
      :
        `/home/community/post/${postData.id}`
      } id="content" className="mb-2">
        <p id="title" className="font-semibold text-xl mb-2">
          {postData?.title}
        </p>
        {postData?.media ?
          <img
            alt="post image"
            src={mediaUrl}
            className="w-full"
          />
        :
          ""
        }
        
        <p id="main-content" className="text-sm">
          {postData?.text}
        </p>
      </IonRouterLink>
      <div
        id="action-bar"
        className="flex flex-row items-center justify-evenly mx-auto"
      >
        <button>
          <LikeIcon className="w-8 h-8" />
        </button>
        <p>{postData.likes}</p>
        <button>
          <CommentIcon className="w-8 h-8" />
        </button>
        <button>
          <BookmarkIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

export default PersonTextCard;
