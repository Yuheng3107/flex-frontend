import React, { useState, useEffect } from 'react';

//ionic imports
import { IonRouterLink } from "@ionic/react";

//icons
import ArrowForwardIcon from '../../assets/svgComponents/ArrowForwardIcon';
import LikeIconFilled from '../../assets/svgComponents/LikeIconFilled';
import LikeIcon from '../../assets/svgComponents/LikeIcon';

//type imports
import { UserPostData, ProfileData, CommunityData } from '../../types/stateTypes';

//utils
import { imgBackend } from '../../App';
import { likePostAsync, unlikePostAsync } from '../../utils/data/postData';

type CommentCardProps = {
    postData: UserPostData;
    profileData: ProfileData;
    communityData: CommunityData | null;
    isLiked: Boolean;
};



function CommentCard({ postData, profileData, isLiked }: CommentCardProps) {

    const [imageUrl, setImageUrl] = useState("");
    const [hasLiked, setHasLiked] = useState(false);
    const [likes, setLikes] = useState<number>(postData.likes);

    useEffect(() => {
        if (profileData?.profile_photo) {
            setImageUrl(imgBackend.concat(profileData.profile_photo));
        }
        if (isLiked) setHasLiked(true);
    }, [profileData?.profile_photo]);

    const likePost = async () => {
        let response = await likePostAsync("comment", postData.id);
        if (response?.status === 200) {
            setHasLiked(true);
            setLikes(likes + 1);
        }
    };
    const unlikePost = async () => {
        let response = await unlikePostAsync("comment", postData.id);
        if (response?.status === 200) {
            setHasLiked(false);
            setLikes(likes - 1);
        }
    };

    return <div className="comment flex justify-between items-center mx-2 py-4">
        <div className="profile flex flex-row items-start">
            <img
                alt="prof pic"
                src={imageUrl}
                className="h-12 w-12  rounded-full object-cover border border-gray-300"
            />
            <div className="profile-info px-2">
                <IonRouterLink
                    id="username"
                    className="font-semibold"
                    routerLink={`/home/profile/${profileData.id}`}
                    routerDirection="forward"
                    color="dark"
                >
                    <p className="flex items-center">
                        {profileData?.username}
                    </p>
                </IonRouterLink>
                <p id="main-content" className="text-sm">
                    {postData?.text}
                </p>
            </div>
        </div>
        {hasLiked ? (
            <button onClick={unlikePost}>
                <LikeIconFilled className="w-6 h-6 fill-red-500" />
            </button>
        ) : (
            <button onClick={likePost}>
                <LikeIcon className="w-6 h-6 fill-red-500" />
            </button>
        )}
    </div>
}

export default CommentCard