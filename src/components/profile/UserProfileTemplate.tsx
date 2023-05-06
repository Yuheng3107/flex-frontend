import React, { useState, useEffect } from "react";

import { backend } from "../../App";

import ToggleBar from "./ToggleBar";
import KeyProfileInfoDisplay from "./KeyProfileInfoDisplay";
import ExerciseStatsDisplay from "./ExerciseStatsDisplay";
import Posts from "../Feed/Posts";
import { ProfileData, ExerciseStats, PostArray } from "../../types/stateTypes";

type UserProfileTemplateProps = {
  profileData: ProfileData;
  exerciseStats: ExerciseStats;
  posts: PostArray;
  loadUserPostData: () => void;
};

const UserProfileTemplate = ({ profileData, exerciseStats, posts, loadUserPostData }: UserProfileTemplateProps) => {
  useEffect(() => {
  },[])
  const [isTrend, setTrend] = useState(true);
  return (
    <div>
      <KeyProfileInfoDisplay profileData={profileData} />
      <ToggleBar isTrend={isTrend} setTrend={setTrend} />
      {isTrend === true ?
        <ExerciseStatsDisplay exerciseStats={exerciseStats} />
        :
        <Posts 
          posts={posts}
          loadData={loadUserPostData}
          />
      }
    </div>
  )
};

export default UserProfileTemplate;
