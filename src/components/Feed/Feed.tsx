
import React, { useState, useEffect, useMemo } from "react";

//Redux imports
import { useAppSelector, useAppDispatch } from '../../store/hooks';

//component imports
import Posts from "./Posts";

//util imports
import { getAllPostData, getUserFeedAsync } from "../../utils/data/postData";
import { PostArray, emptyPostArray } from "../../types/stateTypes";

function Feed() {
  const profileDataRedux = useAppSelector((state) => state.profile.profileData);
  const [currentFeedSet, setCurrentFeedSet] = useState(0);
  const [feedPost, setFeedPost] = useState<PostArray>(emptyPostArray);
  useEffect(() => {
    if (profileDataRedux.id !== 0) loadFeedData();
  },[profileDataRedux]);
  const loadFeedData  = async function () {
    // get feed set
    const postArray = await getUserFeedAsync(currentFeedSet);
    console.log(`set:${currentFeedSet}`);
    console.log(postArray);

    setFeedPost(await getAllPostData('user', postArray, feedPost, undefined, undefined));
    setCurrentFeedSet(currentFeedSet + 1);
  }

  return <main className="w-full relative">
    <Posts posts={feedPost} loadData={loadFeedData} />
  </main>
}

export default Feed;