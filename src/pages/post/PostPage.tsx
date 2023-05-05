import { RouteComponentProps } from "react-router";
import React, { useState, useEffect } from "react";

//utils imports
import { getAllProfileData, getManyOtherProfileDataAsync } from "../../utils/data/profileData";
import { getCommentsAsync, getPostAsync, getLikesAsync } from "../../utils/data/postData";
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
    IonFab,
    IonFabButton,
    IonIcon,
} from '@ionic/react';
import { pencilOutline } from 'ionicons/icons';

//component imports
import UserProfileTemplate from "../../components/profile/UserProfileTemplate";
import PersonTextCard from "../../components/Feed/PersonTextCard";
import Posts from "../../components/Feed/Posts";

//Redux imports
import { useAppSelector } from '../../store/hooks';

interface PostPageProps
    extends RouteComponentProps<{
        postId: string;
    }> {}

const PostPage: React.FC<PostPageProps> = ({ match }) => {
    // 0 is no friend request sent, 1 is friend request sent, 2 is already friends
    const [profileData, setProfileData] = useState<ProfileData>(emptyProfileData);
    const [postData, setPostData] = useState<UserPostData>(emptyUserPostData);
    const [communityData, setCommunityData] = useState<CommunityData>(emptyCommunityData);
    const [currentCommentSet, setCurrentCommentSet] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [posts, setPosts] = useState<{
        postArray: any[]; profileArray: any[]; communityArray: any[]; likeArray: any[];
    }>({
        postArray: [], profileArray: [], communityArray: [], likeArray: [],
    });

    useEffect(() => {
        //useEffect with empty dependency array means this function will only run once right after the component is mounted
        if (postData === emptyUserPostData) loadPostData();
        loadComments();
    },[postData]);

    const loadPostData = async () => {
        let postData = await getPostAsync(Number(match.params.postId));
        postData.comments.reverse();
        
        console.log(postData);
        let data = await getAllProfileData(postData.poster);
        
        if (postData?.community) {
            let community = await getCommunityAsync(postData.community);
            setCommunityData(community);
        }
        let liked = await getLikesAsync('user', [Number(match.params.postId)]);

        setPostData(postData);
        setProfileData(data.profileData);
        setIsLiked(liked.includes(Number(match.params.postId)));
    };

    const loadComments = async () => {
        let start = currentCommentSet*10;
        console.log(`comment set:${currentCommentSet}`);
        if (start >= postData.comments.length) return;
        let end = (currentCommentSet+1)*10;
        if (end > postData.comments.length) end = postData.comments.length;
        let commentArray = await getCommentsAsync(postData.comments.slice(start,end));
        commentArray.reverse();
        console.log(commentArray);

        // split data
        let profiles: number[] = [];
        let postPks: number[] = [];
        for (let i = 0; i < commentArray.length; i++) {
            profiles.push(commentArray[i].poster);
            postPks.push(commentArray[i].id);
        }

        // profile
        let profileArray = await getManyOtherProfileDataAsync(profiles);
        const profileMap = profileArray.reduce((acc: any, profile: any) => {
          return {
            ...acc,
            [profile.id]: profile,
          };
        }, {});
        for (let i = 0; i < commentArray.length; i++) profileArray[i] = profileMap[commentArray[i].poster];

        // likes
        let likes = await getLikesAsync('comment',postPks);

        setPosts({
            postArray: posts.postArray.concat(commentArray),
            profileArray: posts.profileArray.concat(profileArray),
            communityArray: [communityData],
            likeArray: posts.likeArray.concat(likes)
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
                        <PersonTextCard postData={postData} profileData={profileData} communityData={communityData} isLiked={isLiked}/>
                        <Posts loadData={loadComments} posts={posts}/>
                        <IonFab slot="fixed" vertical="bottom" horizontal="end">
                            <IonFabButton routerLink={`/home/post/${match.params.postId}/createcomment`}>
                                <IonIcon icon={pencilOutline}></IonIcon>
                            </IonFabButton>
                        </IonFab>
                    </>
                }
            </IonContent>
        </IonPage>
    );
}


export default PostPage;