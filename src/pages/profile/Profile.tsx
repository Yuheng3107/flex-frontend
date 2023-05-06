import React, { useState, useEffect, FormEvent } from "react";

//redux imports
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { profileDataActions } from '../../store/profileDataSlice';

//utils imports
import checkLoginStatus from "../../utils/checkLogin";
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
import Login from "../../components/login/Login";
import UserProfileTemplate from "../../components/profile/UserProfileTemplate";

type ProfileProps = {
  // updateProfileState: number;
  // setUpdateProfileState: (arg: number) => void;
}

const Tab3 = ({ }: ProfileProps) => {
  const [posts, setPosts] = useState<PostArray>(emptyPostArray);;
  const [loginStatus, setLoginStatus] = useState(false);
  const [currentUserPostSet, setCurrentUserPostSet] = useState(0);
  const dispatch = useAppDispatch();

  const profileDataRedux = useAppSelector((state) => state.profile.profileData)
  const exerciseStatsRedux = useAppSelector((state) => state.exerciseStats)
  console.log(profileDataRedux);

  useEffect(() => {
    console.log(`the current loginStatus is ${loginStatus}`);
    checkLoginStatus(loginStatus, setLoginStatus);
    if (profileDataRedux !== emptyProfileData) loadUserPostData();
  }, [loginStatus, setLoginStatus, checkLoginStatus, exerciseStatsRedux, profileDataRedux]);

  const logOut = () => {
    googleLogout();
    setLoginStatus(false);
    dispatch(profileDataActions.setProfileData(emptyProfileData))
  };

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
        {loginStatus ?
          <UserProfileTemplate profileData={profileDataRedux} exerciseStats={exerciseStatsRedux} posts={posts} loadUserPostData={loadUserPostData} />
          :
          <Login setLoginStatus={setLoginStatus} />
        }
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
