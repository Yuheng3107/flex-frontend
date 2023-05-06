
import Posts from "../Feed/Posts";

import { PostArray } from "../../types/stateTypes";

type CommunityFeedProps = {
    posts: PostArray;
    loadData: () => void;
}
function CommunityFeed({ posts, loadData }: CommunityFeedProps) {
    return <main className="w-full relative">
        <Posts posts={posts} loadData={loadData} />
    </main>
}

export default CommunityFeed;