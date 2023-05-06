import React, { useState, useEffect } from "react";

//utils imports
import { getSearchCommunitiesAsync } from "../../utils/data/communityData";

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
import SearchBar from "../../components/Feed/SearchBar";
import CommunityListDisplay from "../../components/community/CommunityListDisplay";

const SearchCommunities = ({  }) => {
    const [communities, setCommunities] = useState<any[]>([]);

    const loadCommunities = async (content: string) => {
        let results = await getSearchCommunitiesAsync(content);
        if (typeof results !== "string") setCommunities(results);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <SearchBar submitForm={loadCommunities} placeholder="Search Communities"/>
                </IonToolbar>
            </IonHeader>    
            <IonContent fullscreen>
                <CommunityListDisplay communitiesData={communities}/>
            </IonContent>
        </IonPage>
    );
}


export default SearchCommunities;