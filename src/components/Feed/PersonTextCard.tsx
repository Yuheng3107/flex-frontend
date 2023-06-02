
//icons
import FilledCircle from "../../assets/svgComponents/FilledCircle";
import CommentIcon from "../../assets/svgComponents/CommentIcon";
import LikeIcon from "../../assets/svgComponents/LikeIcon";
import LikeIconFilled from "../../assets/svgComponents/LikeIconFilled";
import FilterIcon from "../../assets/svgComponents/FilterIcon";
import VerticalDots from "../../assets/svgComponents/VerticalDotsIcon";

//React
import React, { useState, useEffect, useRef } from "react";

//Redux
import { useAppSelector } from "../../store/hooks";

//utils
import { imgBackend } from "../../App";
import {
  UserPostData,
  ProfileData,
  CommunityData,
  PostType,
} from "../../types/stateTypes";
import { timeSince } from "../../utils/generalUtils";
import { deleteUserPostAsync, likePostAsync, unlikePostAsync } from "../../utils/data/postData";

//ionic imports
import { IonRouterLink, IonContent, IonButton, IonPopover } from "@ionic/react";


type PostProps = {
  postData: UserPostData;
  profileData: ProfileData;
  communityData: CommunityData | null;
  isLiked: Boolean;
  isPostPage?: Boolean;
  isComment?: Boolean;
  isProfilePage?: Boolean;
};

const PersonTextCard = ({
  postData,
  profileData,
  communityData,
  isLiked,
  isPostPage = false,
  isComment = false,
  isProfilePage = false,
}: PostProps) => {
  const profileDataRedux = useAppSelector((state) => state.profile.profileData);
  const [imageUrl, setImageUrl] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState<number>(postData.likes);
  const [postType, setPostType] = useState<PostType>("user");

  const [dropdownShowing, setDropdownShowing] = useState(false);
  console.log(postData);

  const dialogRef = useRef<HTMLDialogElement>(document.createElement("dialog"));

  const postDate =
    postData.posted_at === "" ? new Date() : new Date(postData.posted_at);
  useEffect(() => {
    // to update postData likes
    setLikes(postData.likes);
  }, [postData]);
  useEffect(() => {
    if (profileData?.profile_photo) {
      setImageUrl(imgBackend.concat(profileData.profile_photo));
    }
    if (postData?.media) {
      setMediaUrl(imgBackend.concat(postData.media));
    }
    if (isLiked) setHasLiked(true);
    if (postData?.community) setPostType("community");
    if (postData?.title === undefined) setPostType("comment");
  }, [profileData?.profile_photo, profileDataRedux]);

  const likePost = async () => {
    let response = await likePostAsync(postType, postData.id);
    if (response?.status === 200) {
      setHasLiked(true);
      setLikes(likes + 1);
    }
  };
  const unlikePost = async () => {
    let response = await unlikePostAsync(postType, postData.id);
    if (response?.status === 200) {
      setHasLiked(false);
      setLikes(likes - 1);
    }
  };

  async function deletePostHandler () {
    let res = await deleteUserPostAsync(postData.id);
    console.log(res)
  }

  let postMediaDisplay = <></>;
  if (postData.media) {
    if (postData.media.endsWith(".mp4") || postData.media.endsWith(".webm")) {
      postMediaDisplay = (
        <video
          src={mediaUrl}
          controls
          disablePictureInPicture
          className="mt-3"
        ></video>
      );
    } else {
      postMediaDisplay = (
        <img alt="post image" src={mediaUrl} className="w-full" />
      );
    }
  }

  return (
    <div
      className={`border border-b-zinc-300 p-2  font-inter bg-white dark:bg-zinc-800 m-1 rounded-lg drop-shadow-card`}
    >
      <div id="top-bar" className=" flex flex-row justify-between">
        <div className="flex flex-row">
          <IonRouterLink
            routerLink={`/home/profile/${profileData.id}`}
            routerDirection="forward"
          >
            <img
              alt="prof pic"
              src={imageUrl}
              className="h-12 w-12 rounded-full object-cover"
            />
          </IonRouterLink>
          <div className="ml-3">
            <IonRouterLink
              id="username"
              className="font-semibold"
              routerLink={`/home/profile/${profileData.id}`}
              routerDirection="forward"
              color="dark"
            >
              {profileData?.username}
            </IonRouterLink>
            <p
              id="subtitle"
              className="flex flex-row items-center text-sm text-gray-700 dark:text-gray-500"
            >
              <span id="post-place">
                {postType === "user" ? (
                  ""
                ) : postType === "community" ? (
                  <IonRouterLink
                    className="text-gray-700"
                    routerLink={`/home/community/${communityData?.id}`}
                    routerDirection="forward"
                  >
                    {communityData?.name}
                  </IonRouterLink>
                ) : (
                  "Comment"
                )}
              </span>
              <FilledCircle className="mx-1 h-1.5 w-1.5 aspect-square fill-slate-500" />
              <span className="time-stamp">{timeSince(postDate)}</span>
            </p>
          </div>
        </div>
        <button id="menu-button" className="relative" onClick={e => setDropdownShowing(prev => !prev)}>
          <VerticalDots className="fill-gray-600 h-8"></VerticalDots>
          {dropdownShowing && <div className="-left-6 absolute bg-white border border-gray-200 shadow-sm blur-none p-3 rounded ">
            <button onClick={deletePostHandler}>Delete</button>
          </div>}
        </button>
        <dialog ref={dialogRef}></dialog>
      </div>
      <IonRouterLink
        routerLink={
          postType === "user"
            ? `/home/post/${postData.id}`
            : postType === "community"
              ? `/home/community/post/${postData.id}`
              : undefined
        }
        className="mb-2"
        color="dark"
      >
        {isPostPage ? (
          <>
            <h3 className="font-semibold text-xl mb-2">
              {postData?.title}
            </h3>
            <p id="main-content" className="text-sm">
              {postData?.text}
            </p>
            {postMediaDisplay}
          </>
        ) : (
          <>
            {postMediaDisplay}
            <h3 className="font-semibold text-xl mb-2">
              {postData?.title}
            </h3>
            <p id="main-content" className="text-sm">
              {postData?.text}
            </p>
          </>
        )}
      </IonRouterLink>

      <div className="flex flex-row items-center justify-start mx-auto action-bar gap-2">
        <div className="like-group flex items-center gap-1">
          {hasLiked ? (
            <button onClick={unlikePost}>
              <LikeIconFilled className="w-8 h-8 fill-red-500" />
            </button>
          ) : (
            <button onClick={likePost}>
              <LikeIcon className="w-8 h-8 fill-red-500" />
            </button>
          )}
          <p>{likes}</p>
        </div>
        <div className="comment-group flex items-center gap-1">
          <IonButton
            fill="clear"
            color="dark"
            className="ion-no-padding"
            routerLink={
              postType === "user"
                ? `/home/post/${postData.id}`
                : postType === "community"
                  ? `/home/community/post/${postData.id}`
                  : undefined
            }
          >
            <CommentIcon className="w-8 h-8"></CommentIcon>
          </IonButton>
          <p className="comment">
            {postData.comments !== undefined ? postData.comments.length : 0}
          </p>
        </div>
      </div>
      <div className="hashtags"></div>
      {isPostPage && (
        <div className="all-comments flex justify-between items-center mx-2">
          <h5 className="text-[#090909] text-sm">All Comments</h5>{" "}
          <FilterIcon className="w-6 h-6"></FilterIcon>
        </div>
      )}
    </div>
  );
};


export default PersonTextCard;
