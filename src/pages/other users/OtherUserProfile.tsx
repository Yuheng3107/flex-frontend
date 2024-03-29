import { RouteComponentProps } from "react-router";
import React, { useState, useEffect } from "react";

//utils imports
import { getAllProfileData } from "../../utils/data/profileData";
import { getUserPostsAsync, getLikesAsync, getAllPostData } from "../../utils/data/postData";
import { ExerciseStats, emptyExerciseStats, ProfileData, emptyProfileData, PostArray, emptyPostArray } from "../../types/stateTypes";
import { sendFriendRequest, deleteFriendRequest, deleteFriend } from "../../utils/data/friends";

//img imports
import img404 from "../../assets/img/404.png"

//Ionic Imports
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonTitle,
    IonButtons,
    IonButton,
} from '@ionic/react';

//component imports
import UserProfileTemplate from "../../components/profile/UserProfileTemplate";

//Redux imports
import { useAppSelector } from '../../store/hooks';

interface OtherUserProfileProps
    extends RouteComponentProps<{
        userId: string;
    }> { }

const OtherUserProfile: React.FC<OtherUserProfileProps> = ({ match }) => {
    const [profileData, setProfileData] = useState<ProfileData>(emptyProfileData);
    const [exerciseStats, setExerciseStats] = useState<ExerciseStats>(emptyExerciseStats);
    const [posts, setPosts] = useState<PostArray>(emptyPostArray);
    // 0 is no friend request sent, 1 is friend request sent, 2 is already friends
    const [friendStatus, setFriendStatus] = useState(0);
    const [currentUserPostSet, setCurrentUserPostSet] = useState(0);

    const profileDataRedux = useAppSelector((state) => state.profile.profileData)

    useEffect(() => {
        //useEffect with empty dependency array means this function will only run once right after the component is mounted
        if (profileData === emptyProfileData) loadAllProfileData(); else loadUserPostData();
        if (profileDataRedux.followers.includes(parseInt(match.params.userId))) setFriendStatus(2);
        if (profileDataRedux.sent_friend_requests.includes(parseInt(match.params.userId))) setFriendStatus(1);
    },[friendStatus, setFriendStatus, profileDataRedux, profileData]);

    const loadAllProfileData = async () => {
        let data = await getAllProfileData(Number(match.params.userId));
        setProfileData(data.profileData);
        setExerciseStats(data.exerciseStats);
        console.log(data.profileData);
    };

    const loadUserPostData = async () => {
        let postArray = await getUserPostsAsync(Number(match.params.userId), currentUserPostSet);
        console.log(`set:${currentUserPostSet}`);
        console.log(postArray);
        setPosts(await getAllPostData('user', postArray, posts, profileData, null))
        setCurrentUserPostSet(currentUserPostSet + 1);
    };

    const friendRequest = async () => {
        let response = await sendFriendRequest(Number(match.params.userId));
        if (response?.status === 200) setFriendStatus(1);
    }

    const removeFriendRequest = async () => {
        let response = await deleteFriendRequest(Number(match.params.userId));
        if (response?.status === 200) setFriendStatus(0);
    }

    const removeFriend = async () => {
        let response = await deleteFriend(Number(match.params.userId));
        if (response?.status === 200) setFriendStatus(0);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <IonTitle>{profileData?.username}'s Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {profileData.id === -1 ? 
                    <div className="flex flex-col justify-evenly items-center">
                        <img src={img404} />
                    </div> 
                :
                    <div>
                        <UserProfileTemplate profileData={profileData} exerciseStats={exerciseStats} posts={posts} loadUserPostData={loadUserPostData}/>
                        {friendStatus === 0 ?
                            <IonButton onClick={friendRequest}>Request</IonButton>
                        : friendStatus === 1 ?
                            <IonButton onClick={removeFriendRequest}>Remove Request</IonButton>
                        : 
                            <IonButton onClick={removeFriend}>Unfriend</IonButton>
                        }
                    </div>
                }
            </IonContent>
        </IonPage>
    );
}


export default OtherUserProfile;