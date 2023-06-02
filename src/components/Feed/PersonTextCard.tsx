
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
import { likePostAsync, unlikePostAsync } from "../../utils/data/postData";

//ionic imports
import { IonRouterLink, IonContent, IonButton, IonPopover } from "@ionic/react";

//Popper
import { usePopper } from 'react-popper';
import { createPopper } from "@popperjs/core";

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
  console.log(postData);

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
        <button id="click-trigger" className="" >
          <VerticalDots className="fill-gray-600 h-8"></VerticalDots>
        </button>
        <IonPopover trigger="click-trigger" triggerAction="click">
          <IonContent class="ion-padding">Options!</IonContent>
        </IonPopover>
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
    <Dropdown color="white"></Dropdown>
    </div>
  );
};


function Dropdown({color}: {color:string}) {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = useRef<HTMLButtonElement>(document.createElement("button"));
  const dropdownRef = useRef<HTMLDivElement>(document.createElement("div"));
  // const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    if (btnDropdownRef !== null) {
      createPopper( btnDropdownRef.current, dropdownRef.current, {
        placement: "bottom-start"
      });
    }
   
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  // bg colors
  let bgColor;
  color === "white"
    ? (bgColor = "bg-slate-700")
    : (bgColor = "bg-" + color + "-500");
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-6/12 md:w-4/12 px-4">
          <div className="relative inline-flex align-middle w-full">
            <button
              className={
                "text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 " +
                bgColor
              }
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              {color === "white" ? "White Dropdown" : color + " Dropdown"}
            </button>
            <div
              ref={dropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                (color === "white" ? "bg-white " : bgColor + " ") +
                "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
              }
              style={{ minWidth: "12rem" }}
            >
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-slate-700" : "text-white")
                }
                onClick={e => e.preventDefault()}
              >
                Action
              </a>
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-slate-700" : "text-white")
                }
                onClick={e => e.preventDefault()}
              >
                Another action
              </a>
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-slate-700" : "text-white")
                }
                onClick={e => e.preventDefault()}
              >
                Something else here
              </a>
              <div className="h-0 my-2 border border-solid border-t-0 border-slate-800 opacity-25" />
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-slate-700" : "text-white")
                }
                onClick={e => e.preventDefault()}
              >
                Seprated link
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default PersonTextCard;
