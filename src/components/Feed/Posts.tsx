import React, { useState, useEffect } from "react";

import { backend } from "../../App";
import PersonTextCard from "./PersonTextCard";

//ionic imports
import {
  IonButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";

type PostProps = {
  posts: {
    postArray: any[];
    profileArray: any[];
    communityArray: any[];
    likeArray: any[];
  };
  loadData: (() => any) | undefined;
  isComment?: Boolean;
  isProfilePage?: Boolean;
};

const Posts = ({
  posts,
  loadData,
  isComment = false,
  isProfilePage = false,
}: PostProps) => {
  return (
    <div
      id="userFeed"
      className={`flex flex-col justify-start w-full h-full ${
        isProfilePage && "bg-[#EFEFEF] -my-3"
      }`}
    >
      {posts.postArray.length === 0 ? (
        <div className="text-center">
          {isComment ? "No Comments" : "No Posts"}
        </div>
      ) : (
        posts.postArray.map((item, i) => (
          <PersonTextCard
            postData={item}
            profileData={
              posts.profileArray.length === 1
                ? posts.profileArray[0]
                : posts.profileArray[i]
            }
            communityData={
              posts.communityArray.length === 1
                ? posts.communityArray[0]
                : posts.communityArray[i]
            }
            key={item.id}
            isLiked={posts.likeArray.includes(item.id)}
            isComment={isComment}
            isProfilePage={isProfilePage}
          />
        ))
      )}
      {loadData === undefined ? (
        ""
      ) : (
        <IonButton onClick={loadData}>Load Posts</IonButton>
      )}
      <IonInfiniteScroll
        onIonInfinite={(ev) => {
          if (loadData !== undefined) loadData();
          setTimeout(() => ev.target.complete(), 500);
        }}
      >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </div>
  );
};

export default Posts;
