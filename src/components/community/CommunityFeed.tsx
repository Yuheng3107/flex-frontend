
import React, { useState, useEffect } from "react";

import Posts from "../Feed/Posts";

import { CommunityData } from "../../types/stateTypes";

import { backend } from "../../App";
import { Link } from "react-router-dom";


type CommunityFeedProps = {
    postArray: any[];
    profileArray: any[];
    communityData: CommunityData
    loadData: () => void;
}
function CommunityFeed({ postArray, profileArray, communityData, loadData }: CommunityFeedProps) {
    return <main className="w-full relative">
        <Posts posts={{
            postArray: postArray,
            profileArray: profileArray,
            communityArray: [communityData],
        }} loadData={loadData} />
    </main>
}


export default CommunityFeed;