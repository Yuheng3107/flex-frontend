import React from 'react';

import CommentCard from './CommentCard';

type CommentContainerProps = {
    comments: {
        postArray: any[];
        profileArray: any[];
        communityArray: any[];
        likeArray: any[];
    };
    loadData: (() => any) | undefined;
};


function CommentContainer({ comments }: CommentContainerProps) {
    return <div>
        {comments.postArray.map((item, i) => (
            <CommentCard
                postData={item}
                profileData={
                    comments.profileArray.length === 1
                        ? comments.profileArray[0]
                        : comments.profileArray[i]
                }
                communityData={
                    comments.communityArray.length === 1
                        ? comments.communityArray[0]
                        : comments.communityArray[i]
                }
                key={item.id}
                isLiked={comments.likeArray.includes(item.id)}
            />
        ))}
    </div>
}

export default CommentContainer;