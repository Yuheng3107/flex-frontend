import { RouteComponentProps } from "react-router";
import React, { useState, useEffect } from "react";

//utils imports
import { getAllProfileData } from "../../utils/data/profileData";
import { getCommentsAsync, getPostAsync, getLikesAsync, getAllPostData, createCommentAsync } from "../../utils/data/postData";
import { getCommunityAsync } from "../../utils/data/communityData";

//type imports
import { UserPostData, emptyUserPostData, ProfileData, emptyProfileData, emptyCommunityData, CommunityData, PostArray, emptyPostArray } from "../../types/stateTypes";

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
    IonFooter,
    IonButton,
} from '@ionic/react';
import { pencilOutline } from 'ionicons/icons';

//component imports
import PersonTextCard from "../../components/Feed/PersonTextCard";
import Posts from "../../components/Feed/Posts";

interface PostPageProps
    extends RouteComponentProps<{
        postId: string;
    }> {}

const PostPage: React.FC<PostPageProps> = ({ match }) => {
    const [profileData, setProfileData] = useState<ProfileData>(emptyProfileData);
    const [postData, setPostData] = useState<UserPostData>(emptyUserPostData);
    const [communityData, setCommunityData] = useState<CommunityData>(emptyCommunityData);
    const [currentCommentSet, setCurrentCommentSet] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [posts, setPosts] = useState<PostArray>(emptyPostArray);

    const [postTextInput, setPostTextInput] = useState<string>("");

    useEffect(() => {
        if (postData === emptyUserPostData) loadPostData(); else loadComments();
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

        setPosts(await getAllPostData('comment', commentArray, posts, undefined, communityData));
        setCurrentCommentSet(currentCommentSet+1);
    };

    const submitHandler = async() => {
        if (postTextInput === "") return console.log("no text!");
        let response = await createCommentAsync('user',Number(match.params.postId),"", postTextInput);
        console.log(response);
        if (response?.status === 201) {
            setPosts(emptyPostArray);
            setPostData(emptyUserPostData);
            setCurrentCommentSet(0);
        }
    }

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
                    <div className="px-2">
                        <PersonTextCard postData={postData} profileData={profileData} communityData={communityData} isLiked={isLiked}/>
                        <Posts loadData={loadComments} posts={posts}/>
                    </div>
                }
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <div className="flex flex-row justify-between items-center">
                        <textarea value={postTextInput} placeholder="Post Comment"
                            className="m-2 bg-transparent block text-xl font-light w-5/6 h-8"
                            onChange={(event) => {
                                setPostTextInput(event.target.value);
                                console.log(postTextInput);
                            }} />
                        <IonButton className="mr-1 rounded-lg bg-sky-400 text-white"
                            onClick={submitHandler}>
                            Post
                        </IonButton>    
                    </div>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
}


export default PostPage;