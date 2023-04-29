
import React, { useState, useEffect, useMemo } from "react";

//Redux imports
import { useAppSelector, useAppDispatch } from '../../store/hooks';

//component imports
import Posts from "./Posts";

//util imports
import { getUserFeedAsync } from "../../utils/data/posts";
import { getManyOtherProfileDataAsync } from "../../utils/data/profile";
import { getCommunityListAsync } from "../../utils/data/communities";

import { backend } from "../../App";
let currentFeedSet = 0;
function Feed() {
  const profileDataRedux = useAppSelector((state) => state.profile.profileData);
  const [feedPost, setFeedPost] = useState<{ postArray: any[], profileArray: any[], communityArray: any[] }>({
    postArray: [],
    profileArray: [],
    communityArray: [],
  });
  const loadFeedData  = async function () {
    console.log('loadFeedData is running');
    const postArray = await getUserFeedAsync(currentFeedSet);
    console.log(`set:${currentFeedSet}`)
    console.log(postArray);
    let profiles: any[] = [];
    for (let i = 0; i < postArray.length; i++) profiles.push(postArray[i].poster);
    let profileArray = await getManyOtherProfileDataAsync(profiles);
    const profileMap = profileArray.reduce((acc: any, profile: any) => {
      return {
        ...acc,
        [profile.id]: profile,
      };
    }, {});
    for (let i = 0; i < postArray.length; i++) profileArray[i] = profileMap[postArray[i].poster];

    let communities: any[] = [];
    for (let i = 0; i < postArray.length; i++) if (postArray[i].community !== undefined) communities.push(postArray[i].community);
    let communityArray = await getCommunityListAsync(communities);
    const communityMap = communityArray.reduce((acc: any, community: any) => {
      return {
        ...acc,
        [community.id]: community,
      };
    }, {});
    for (let i = 0; i < postArray.length; i++) communityArray[i] = communityMap[postArray[i].community];
    setFeedPost({
      postArray: feedPost.postArray.concat(postArray),
      profileArray: feedPost.profileArray.concat(profileArray),
      communityArray: feedPost.communityArray.concat(communityArray),
    });
    currentFeedSet += 1;
  }

  return <main className="w-full relative">
    <Posts posts={feedPost} loadData={loadFeedData} />
  </main>
}

export default Feed;