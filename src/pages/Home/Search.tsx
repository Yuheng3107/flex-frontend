import React, { useState, useEffect } from "react";

//utils imports
import { getAllPostData, getSearchPostsAsync } from "../../utils/data/postData";
import { getSearchCommunitiesAsync } from "../../utils/data/communityData";
import { getSearchUsersAsync } from "../../utils/data/profileData";


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
    IonLabel,
    IonSegment,
    IonSegmentButton
} from '@ionic/react';

//component imports
import Posts from "../../components/Feed/Posts";
import SearchBar from "../../components/Feed/SearchBar";
import CommunityListDisplay from "../../components/community/CommunityListDisplay";
import UserDisplay from "../../components/users/UserDisplay";

const Search = ({ }) => {
    const [posts, setPosts] = useState<PostArray>(emptyPostArray);
    const [communities, setCommunities] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [searchCategory, setSearchCategory] = useState<string>("posts");


    const loadPosts = async (content: string) => {
        let postArray: any[] = await getSearchPostsAsync(content);
        console.log(postArray);
        if (typeof postArray !== "string") setPosts(await getAllPostData('comment', postArray, posts, undefined, undefined));
    };

    const loadCommunities = async (content: string) => {
        let results = await getSearchCommunitiesAsync(content);
        if (typeof results !== "string") setCommunities(results);
    };


    const loadUsers = async (content: string) => {
        let results = await getSearchUsersAsync(content);
        if (typeof results !== "string") setUsers(results);
    };

    const determineSearchFunction = () => {
        switch (searchCategory) {
            case "posts":
                return loadPosts;
                break;
            case "communities":
                return loadCommunities;
                break;
            case "users":
                return loadUsers;
                break;
        }

        return loadPosts;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <SearchBar submitForm={determineSearchFunction()} placeholder="search" />
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonSegment value={searchCategory} className="pb-1">
                    <IonSegmentButton value="posts" onClick={(e) => setSearchCategory("posts")} >
                        <IonLabel>Posts</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="communities" onClick={(e) => setSearchCategory("communities")}>
                        <IonLabel>Communities</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="users" onClick={(e) => setSearchCategory("users")}>
                        <IonLabel>Users</IonLabel>
                    </IonSegmentButton>
                </IonSegment>

                <main className="mt-3">
                    {searchCategory === "posts" && <Posts loadData={undefined} posts={posts} />}
                    {searchCategory === "communities" && <CommunityListDisplay communitiesData={communities} />}
                    {searchCategory === "users" && <UserDisplay users={users} />}
                </main>
            </IonContent>
        </IonPage>
    );
}


export default Search;