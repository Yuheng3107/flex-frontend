import React, { useState, useEffect, FormEvent } from "react";

//redux imports
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { profileDataActions } from '../../store/profileDataSlice';

//utils imports
import checkLoginStatus from "../../utils/checkLogin";
import { getUserPostsAsync } from "../../utils/data/posts";

import { googleLogout } from "@react-oauth/google";
import { emptyProfileData } from "../../types/stateTypes";


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

let currentUserPostSet = 0;
const Tab3 = ({ }: ProfileProps) => {
  const [userPostArray, setUserPostArray] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);
  const dispatch = useAppDispatch();

  const profileDataRedux = useAppSelector((state) => state.profile.profileData)
  const exerciseStatsRedux = useAppSelector((state) => state.exerciseStats)

  useEffect(() => {
    console.log(`the current loginStatus is ${loginStatus}`);
    checkLoginStatus(loginStatus, setLoginStatus);
  }, [loginStatus, setLoginStatus, checkLoginStatus, exerciseStatsRedux]);

  const logOut = () => {
    googleLogout();
    setLoginStatus(false);
    dispatch(profileDataActions.setProfileData(emptyProfileData))
  };

  const loadUserPostData = async () => {
    let data = await getUserPostsAsync(profileDataRedux.id, currentUserPostSet);
    setUserPostArray(userPostArray.concat(data));
    console.log(data);
    currentUserPostSet += 1;
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonButton routerLink="/profile/settings" fill="default" shape="round">
          <IonIcon icon={cog} />
        </IonButton>
        {loginStatus ?
          <UserProfileTemplate profileData={profileDataRedux} exerciseStats={exerciseStatsRedux} userPostArray={userPostArray} loadUserPostData={loadUserPostData} />
          :
          <Login setLoginStatus={setLoginStatus} />
        }
        <IonButton routerLink="/profile/create" routerDirection="forward">
          Edit Profile
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
