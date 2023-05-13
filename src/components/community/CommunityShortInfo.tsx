
import React, { useState, useEffect } from "react";

// utils imports
import { joinCommunityAsync, leaveCommunityAsync } from "../../utils/data/communityData";
import { CommunityData } from "../../types/stateTypes";
import { backend } from "../../App";
import { IonRouterLink } from "@ionic/react";

type CommunityInfoProps = {
    communityData: CommunityData;
}
function CommunityShortInfo({ communityData }: CommunityInfoProps) {
    const [communityPhotoUrl, setCommunityPhotoUrl] = useState("");

    useEffect(() => {
        if (communityData?.community_photo !== null) setCommunityPhotoUrl(communityData.community_photo)
    });

    return <IonRouterLink className="flex flex-row justify-between h-12 item-center border-b border-b-stone-600" routerLink={`/home/community/${communityData.id}`}>
        <div className="name-and-photo flex flex-row h-full items-center ml-2">
            <img
                alt="community photo"
                className="aspect-square h-5/6 object-cover rounded-full"
                src={communityPhotoUrl}
            ></img>
            <span className="ml-2">{communityData.name}</span>
        </div>
    </IonRouterLink>
}

export default CommunityShortInfo;