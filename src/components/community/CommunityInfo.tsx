
import React, { useState, useEffect } from "react";

// utils imports
import { joinCommunityAsync, leaveCommunityAsync } from "../../utils/data/communityData";

//Redux imports
import { useAppSelector } from '../../store/hooks';

import { CommunityData } from "../../types/stateTypes";
import { backend } from "../../App";
import ShareIcon from '../../assets/svgComponents/ShareIcon';

//testing
const banner = "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
const image = "https://images.unsplash.com/photo-1580692475446-c2fabbbbf835?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"

type CommunityInfoProps = {
    communityData: CommunityData;
}
function CommunityInfo({ communityData }: CommunityInfoProps) {
    const [bannerUrl, setBannerUrl] = useState("");
    const [communityPhotoUrl, setCommunityPhotoUrl] = useState("");
    const [isMember, setIsMember] = useState(false);

    const profileDataRedux = useAppSelector((state) => state.profile.profileData)

    useEffect(() => {
        if (communityData?.banner !== null) setBannerUrl(backend.concat(communityData.banner))
        if (communityData?.community_photo !== null) setCommunityPhotoUrl(backend.concat(communityData.community_photo))
        if (profileDataRedux.communities.includes(communityData.id)) setIsMember(true);
    });

    const joinCommunity = async () => {
        let response = await joinCommunityAsync(communityData.id);
        if (response?.status === 200) setIsMember(true);
    }
    const leaveCommunity = async () => {
        let response = await leaveCommunityAsync(communityData.id);
        if (response?.status === 200) setIsMember(false);
    }

    return <div className="flex flex-col">
        <div className="w-full h-36 object-cover relative">
            <img src={bannerUrl ? banner : bannerUrl} className="w-full h-36 object-cover absolute" alt="" />
            <div className=" absolute w-full h-full left-0 top-0 bg-gradient-to-t from-gray-900 z-0"></div>
            <img alt="community-picture" src={communityPhotoUrl ? image : communityPhotoUrl}
                className="absolute h-36 left-4 -bottom-[4.5rem] aspect-square rounded-full object-cover border border-zinc-500" />
            <div id='name-and-members' className="text-gray-100 absolute left-1/2 bottom-2">
                <p id="community-name" className="text-2xl font-semibold">{communityData.name}</p>
                <p id="member-count" className="text-sm font-light">{communityData.member_count} members</p>
            </div>
        </div>

        <div id="actions" className="flex flex-row justify-start pl-[50%] pt-2 h-16">
            {isMember === true ?
                <button onClick={leaveCommunity} className=" mr-1 px-4 rounded-full bg-orange-400 text-white h-8">
                    Leave </button>
                :
                <button onClick={joinCommunity} className=" mr-1 px-4 rounded-full bg-orange-400 text-white h-8">
                    Join </button>
            }
            <button className=" aspect-square bg-gray-300 rounded-full h-8 flex justify-center items-center">
                <ShareIcon className={`h-4 w-4`} />
            </button>
        </div>
        <p id="description" className="px-6 mt-3">{communityData.description}</p>
    </div>
}

export default CommunityInfo;