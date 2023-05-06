import React, { useState, useEffect } from "react";

//utils imports
import { getAllPostData, getSearchPostsAsync } from "../../utils/data/postData";

//type imports
import { PostArray, emptyPostArray } from "../../types/stateTypes";

//Ionic Imports
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonButtons,
} from '@ionic/react';

//component imports
import Posts from "../../components/Feed/Posts";
import SearchBar from "../../components/Feed/SearchBar";

const SearchPosts = ({  }) => {
    const [posts, setPosts] = useState<PostArray>(emptyPostArray);

    const loadPosts = async (content: string) => {
        let postArray:any[] = await getSearchPostsAsync(content);
        console.log(postArray);
        if (typeof postArray !== "string") setPosts(await getAllPostData('comment', postArray, posts, undefined, undefined));
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <SearchBar submitForm={loadPosts} placeholder="Search Posts"/>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <Posts loadData={undefined} posts={posts}/>
            </IonContent>
        </IonPage>
    );
}


export default SearchPosts;