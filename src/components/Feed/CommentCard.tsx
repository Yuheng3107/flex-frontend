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
import { deleteUserCommentAsync } from '../../utils/data/postData';

//hooks
import { useDropdown } from '../../customHooks/useDropdown';
import { useAppSelector } from '../../store/hooks';

//redux

type CommentCardProps = {
    commentData: UserPostData;
    profileData: ProfileData;
    communityData: CommunityData | null;
    isLiked: Boolean;
};


//
function CommentCard({ commentData, profileData, isLiked }: CommentCardProps) {
    
    const [imageUrl, setImageUrl] = useState("");
    const [hasLiked, setHasLiked] = useState(false);
    const [likes, setLikes] = useState<number>(commentData.likes);

    const profileDataRedux = useAppSelector((state) => state.profile.profileData);

    useEffect(() => {
        if (profileData?.profile_photo) {
            setImageUrl(imgBackend.concat(profileData.profile_photo));
        }
        if (isLiked) setHasLiked(true);
    }, [profileData?.profile_photo]);

    const dropdownContent = <><p>Dropdown content</p></>
    const [Dropdown] = useDropdown();

    const likePost = async () => {
        let response = await likePostAsync("comment", commentData.id);
        if (response?.status === 200) {
            setHasLiked(true);
            setLikes(likes + 1);
        }
    };
    const unlikePost = async () => {
        let response = await unlikePostAsync("comment", commentData.id);
        if (response?.status === 200) {
            setHasLiked(false);
            setLikes(likes - 1);
        }
    };

    const deleteCommentHandler = async () => {
        const res = await deleteUserCommentAsync(commentData.id);
    }

    return <div className="comment flex justify-between items-start p-4 border-b border-b-zinc-200 dark:border-b-zinc-600">
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
                    {commentData?.text}
                </p>
            </div>
        </div>
        <div className="flex flex-row">
            {hasLiked ? (
                <button onClick={unlikePost}>
                    <LikeIconFilled className="w-6 h-6 my-3 fill-red-500" />
                </button>
            ) : (
                <button onClick={likePost}>
                    <LikeIcon className="w-6 h-6 fill-red-500" />
                </button>
            )}
            {commentData.poster === profileDataRedux.id && <Dropdown iconClass="w-6" leftOffset='-left-10'>
                <button onClick={deleteCommentHandler}>Delete</button>
            </Dropdown>}

        </div>

    </div>
}

export default CommentCard