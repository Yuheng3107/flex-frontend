
import { useState, useEffect } from 'react';

//Ionic Imports
import {
    IonPage,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
} from '@ionic/react';
import { pencilOutline } from 'ionicons/icons';

import { RouteComponentProps } from "react-router";

//img imports
import img404 from "../../assets/img/404.png"

//utils imports
import { getCommunityAsync } from '../../utils/data/communityData';
import { getCommunityPostsAsync, getAllPostData } from "../../utils/data/postData";

import { CommunityData, PostArray, emptyCommunityData, emptyPostArray, invalidCommunityData } from '../../types/stateTypes';

import CommunityFeed from '../../components/community/CommunityFeed';
import CommunityInfo from '../../components/community/CommunityInfo';

interface CommunityDisplayProps extends RouteComponentProps<{
    communityId: string;
}> { }

function CommunityDisplay({ match }: CommunityDisplayProps) {
    const [communityData, setCommunityData] = useState<CommunityData>(emptyCommunityData);
    const [posts, setPosts] = useState<PostArray>(emptyPostArray);
    const [currentFeedSet, setCurrentFeedSet] = useState(0);

    useEffect(() => {
        async function getCommunityData(pk: number) {
            let communityDetails = await getCommunityAsync(pk);
            if (communityDetails === undefined) communityDetails = invalidCommunityData;
            setCommunityData(communityDetails);
        }
        if (communityData === emptyCommunityData) {
            getCommunityData(parseInt(match.params.communityId))
        } else loadFeedData();
    }, [match,communityData])

    const loadFeedData = async () => {
        const newPostArray = await getCommunityPostsAsync(Number(match.params.communityId), currentFeedSet);
        console.log(`set:${currentFeedSet}`)
        console.log(newPostArray);

        setPosts(await getAllPostData('community', newPostArray, posts, undefined, communityData));
        setCurrentFeedSet(currentFeedSet + 1);
    }

    return <IonPage>
        <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <IonTitle>{communityData?.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
        <IonContent>
            { communityData.id === -1 ?
                <div className="flex flex-col justify-evenly items-center">
                    <img src={img404} />
                </div> 
            :
                <>
                    <main className="h-full">
                        <CommunityInfo communityData={communityData} />
                        <CommunityFeed posts={posts} loadData={loadFeedData} />
                    </main>
                    <IonFab slot="fixed" vertical="bottom" horizontal="end">
                        <IonFabButton routerLink={`/home/community/${communityData.id}/create`}>
                            <IonIcon icon={pencilOutline}></IonIcon>
                        </IonFabButton>
                    </IonFab>
                </>
            }
        </IonContent>
    </IonPage>
}
export default CommunityDisplay;