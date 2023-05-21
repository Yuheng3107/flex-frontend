import React, { useState, useEffect, FormEvent } from "react";

//redux imports
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { profileDataActions } from '../../store/profileDataSlice';

//utils imports
import { getAllPostData, getLikesAsync, getUserPostsAsync } from "../../utils/data/postData";

import { googleLogout } from "@react-oauth/google";
import { PostArray, emptyPostArray, emptyProfileData } from "../../types/stateTypes";


//ionic imports
import {
  IonContent,
  IonPage,
  IonButton,
  IonToggle,
  IonIcon,
} from "@ionic/react";
import { cog } from "ionicons/icons";

//component imports
import UserProfileTemplate from "../../components/profile/UserProfileTemplate";

type ProfileProps = {
  // updateProfileState: number;
  // setUpdateProfileState: (arg: number) => void;
}

const Tab3 = ({ }: ProfileProps) => {
  const [posts, setPosts] = useState<PostArray>(emptyPostArray);;
  const [currentUserPostSet, setCurrentUserPostSet] = useState(0);
  const dispatch = useAppDispatch();

  const profileDataRedux = useAppSelector((state) => state.profile.profileData)
  const exerciseStatsRedux = useAppSelector((state) => state.exerciseStats)
  console.log(profileDataRedux);

  useEffect(() => {
    loadUserPostData();
  }, [exerciseStatsRedux, profileDataRedux]);

  const loadUserPostData = async () => {
    let postArray = await getUserPostsAsync(profileDataRedux.id, currentUserPostSet);
    
    console.log(`set:${currentUserPostSet}`);
    console.log(postArray);

    setPosts(await getAllPostData('user', postArray, posts, profileDataRedux, null))
    setCurrentUserPostSet(currentUserPostSet + 1);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonButton routerLink="/profile/settings" fill="default" shape="round">
          <IonIcon icon={cog} />
        </IonButton>
          <UserProfileTemplate profileData={profileDataRedux} exerciseStats={exerciseStatsRedux} posts={posts} loadUserPostData={loadUserPostData} />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
