
import React, { useState, useEffect, useMemo } from "react";

//Redux imports
import { useAppSelector, useAppDispatch } from '../../store/hooks';

//component imports
import Posts from "./Posts";

//util imports
import { getLikesAsync, getUserFeedAsync } from "../../utils/data/postData";
import { getManyOtherProfileDataAsync } from "../../utils/data/profileData";
import { getCommunityListAsync } from "../../utils/data/communityData";

function Feed() {
  const profileDataRedux = useAppSelector((state) => state.profile.profileData);
  const [currentFeedSet, setCurrentFeedSet] = useState(0);
  const [feedPost, setFeedPost] = useState<{ postArray: any[], profileArray: any[], communityArray: any[], likeArray: any[] }>({
    postArray: [],
    profileArray: [],
    communityArray: [],
    likeArray: [],
  });
  useEffect(() => {
    if (profileDataRedux.id !== 0) loadFeedData();
  },[profileDataRedux]);
  const loadFeedData  = async function () {
    // get feed set
    const postArray = await getUserFeedAsync(currentFeedSet);
    console.log(`set:${currentFeedSet}`)
    console.log(postArray);

    // split data
    let profiles: number[] = [];
    let postPks: number[] = [];
    let communities: any[] = [];
    for (let i = 0; i < postArray.length; i++) {
      profiles.push(postArray[i].poster);
      postPks.push(postArray[i].id);
      if (postArray[i].community !== undefined) communities.push(postArray[i].community);
    }

    // get profile data
    let profileArray = await getManyOtherProfileDataAsync(profiles);
    const profileMap = profileArray.reduce((acc: any, profile: any) => {
      return {
        ...acc,
        [profile.id]: profile,
      };
    }, {});
    for (let i = 0; i < postArray.length; i++) profileArray[i] = profileMap[postArray[i].poster];

    // get community data
    let communityArray = await getCommunityListAsync(communities);
    const communityMap = communityArray.reduce((acc: any, community: any) => {
      return {
        ...acc,
        [community.id]: community,
      };
    }, {});
    for (let i = 0; i < postArray.length; i++) communityArray[i] = communityMap[postArray[i].community];

    // get like data
    let likes = await getLikesAsync('user', postPks);
    console.log(likes);
    setFeedPost({
      postArray: feedPost.postArray.concat(postArray),
      profileArray: feedPost.profileArray.concat(profileArray),
      communityArray: feedPost.communityArray.concat(communityArray),
      likeArray: feedPost.likeArray.concat(likes),
    });
    setCurrentFeedSet(currentFeedSet + 1);
  }

  return <main className="w-full relative">
    <Posts posts={feedPost} loadData={loadFeedData} />
  </main>
}

export default Feed;