import { RouteComponentProps } from "react-router";
import React, { useState, useEffect } from "react";

//utils imports
import { getAllProfileData, getManyOtherProfileDataAsync } from "../../utils/data/profileData";
import { getCommentsAsync, getCommunityPostAsync } from "../../utils/data/postData";
import { getCommunityAsync } from "../../utils/data/communityData";

//type imports
import { UserPostData, emptyUserPostData, ProfileData, emptyProfileData, emptyCommunityData, CommunityData } from "../../types/stateTypes";

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
    IonFab,
    IonFabButton,
    IonIcon,
} from '@ionic/react';
import { pencilOutline } from 'ionicons/icons';

//component imports
import PersonTextCard from "../../components/Feed/PersonTextCard";
import Posts from "../../components/Feed/Posts";

interface PostPageProps
    extends RouteComponentProps<{
        postId: string;
    }> {}

const CommunityPostPage: React.FC<PostPageProps> = ({ match }) => {
    // 0 is no friend request sent, 1 is friend request sent, 2 is already friends
    const [profileData, setProfileData] = useState<ProfileData>(emptyProfileData);
    const [postData, setPostData] = useState<UserPostData>(emptyUserPostData);
    const [communityData, setCommunityData] = useState<CommunityData>(emptyCommunityData);
    const [currentCommentSet, setCurrentCommentSet] = useState(0);
    const [posts, setPosts] = useState<{
        postArray: any[];
        profileArray: any[];
        communityArray: any[];}>({postArray: [], profileArray: [], communityArray: []});

    useEffect(() => {
        //useEffect with empty dependency array means this function will only run once right after the component is mounted
        if (postData === emptyUserPostData) loadPostData(); else loadComments();
    },[postData]);

    const loadPostData = async () => {
        let postData = await getCommunityPostAsync(Number(match.params.postId));
        postData.comments.reverse();
        setPostData(postData);
        console.log(postData);
        let data = await getAllProfileData(postData.poster);
        setProfileData(data.profileData);
        if (postData.community !== undefined) {
            let community = await getCommunityAsync(postData.community);
            setCommunityData(community);
        }
    };

    const loadComments = async () => {
        let start = currentCommentSet*10;
        console.log(`comment set:${currentCommentSet}`);
        if (start >= postData.comments.length) return;
        let end = (currentCommentSet+1)*10;
        if (end > postData.comments.length) end = postData.comments.length;
        let newComments = await getCommentsAsync(postData.comments.slice(start,end));
        console.log(newComments);

        let profiles: any[] = [];
        for (let i = 0; i < newComments.length; i++) profiles.push(newComments[i].poster);
        let tempProfileArray = await getManyOtherProfileDataAsync(profiles);
        const profileMap = tempProfileArray.reduce((acc: any, profile: any) => {
          return {
            ...acc,
            [profile.id]: profile,
          };
        }, {});
        for (let i = 0; i < newComments.length; i++) tempProfileArray[i] = profileMap[newComments[i].poster];
        console.log(tempProfileArray);

        setPosts({
            postArray: posts.postArray.concat(newComments),
            profileArray: posts.profileArray.concat(tempProfileArray),
            communityArray: [communityData],
        });
        setCurrentCommentSet(currentCommentSet+1);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <IonTitle>{postData?.title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {profileData.id === -1 ? 
                    <div className="flex flex-col justify-evenly items-center">
                        <img src={img404} />
                    </div> 
                :
                    <>
                    <div>
                        <PersonTextCard postData={postData} profileData={profileData} communityData={communityData}/>
                        <Posts loadData={loadComments} posts={posts}/>
                    </div>
                    <IonFab slot="fixed" vertical="bottom" horizontal="end">
                        <IonFabButton routerLink={`/home/community/post/${match.params.postId}/create`}>
                            <IonIcon icon={pencilOutline}></IonIcon>
                        </IonFabButton>
                    </IonFab>
                    </>
                }
            </IonContent>
        </IonPage>
    );
}


export default CommunityPostPage;