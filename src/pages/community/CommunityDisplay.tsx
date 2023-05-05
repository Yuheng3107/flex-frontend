
import { useState, useEffect, useReducer } from 'react';

//Ionic Imports
import {
    IonPage,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
} from '@ionic/react';
import { pencilOutline } from 'ionicons/icons';

import { RouteComponentProps } from "react-router";

//img imports
import img404 from "../../assets/img/404.png"

//utils imports
import { getCommunityAsync } from '../../utils/data/communityData';
import { getCommunityPostsAsync, getLikesAsync } from "../../utils/data/postData";
import { getManyOtherProfileDataAsync } from "../../utils/data/profileData";

import { backend } from '../../App';
import { CommunityData, emptyCommunityData, invalidCommunityData } from '../../types/stateTypes';

import CommunityFeed from '../../components/community/CommunityFeed';
import CommunityInfo from '../../components/community/CommunityInfo';

interface CommunityDisplayProps extends RouteComponentProps<{
    communityId: string;
}> { }

function CommunityDisplay({ match }: CommunityDisplayProps) {
    const [communityData, setCommunityData] = useState<CommunityData>(emptyCommunityData);
    const [postArray, setPostArray] = useState<any[]>([]);
    const [profileArray, setProfileArray] = useState<any[]>([]);
    const [likeArray, setLikeArray] = useState<any[]>([]);
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

        // split data
        let profiles: number[] = [];
        let postPks: number[] = [];
        for (let i = 0; i < newPostArray.length; i++) {
            profiles.push(newPostArray[i].poster);
            postPks.push(newPostArray[i].id);
        }

        // profile
        let newProfileArray = await getManyOtherProfileDataAsync(profiles);
        const profileMap = newProfileArray.reduce((acc:any, profile:any) => {
            return {
              ...acc,
              [profile.id]: profile,
            };
          }, {});
        for (let i=0;i<newPostArray.length;i++) newProfileArray[i] = profileMap[newPostArray[i].poster];

        // likes
        let likes = await getLikesAsync('community',postPks);

        setPostArray(postArray.concat(newPostArray));
        setProfileArray(profileArray.concat(newProfileArray));
        setCurrentFeedSet(currentFeedSet + 1);
        setLikeArray(likeArray.concat(likes));
    }

    return <IonPage>
        <IonContent>
            { communityData.id === -1 ?
                <div className="flex flex-col justify-evenly items-center">
                    <img src={img404} />
                </div> 
            :
                <>
                    <main className="h-full">
                        <CommunityInfo communityData={communityData} />
                        <CommunityFeed postArray={postArray} profileArray={profileArray} communityData={communityData} likeArray={likeArray} loadData={loadFeedData} />
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