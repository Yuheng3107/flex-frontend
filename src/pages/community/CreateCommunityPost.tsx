import { RouteComponentProps } from "react-router";
import { createCommunityPostAsync } from '../../utils/data/postData';
import CreatePostForm from '../../components/Feed/CreatePostForm';

interface CreateCommunityPostProps extends RouteComponentProps<{
    communityId: string;
}> { }
function CreateCommunityPost({ match }: CreateCommunityPostProps) {
    const makeCommunityPost = async (title:string, text: string) => {
        return await createCommunityPostAsync(Number(match.params.communityId),title, text);
    }
    return <CreatePostForm makePost={makeCommunityPost} backUrl={`/home/community/${match.params.communityId}`} isComment={false}/>
}
export default CreateCommunityPost;