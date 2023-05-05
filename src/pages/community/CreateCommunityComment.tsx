
import { RouteComponentProps } from "react-router";
import CreatePostForm from "../../components/Feed/CreatePostForm";
import { createCommentAsync } from "../../utils/data/postData";
interface CommentProps extends RouteComponentProps<{
    postId: string;
}> { }
function CreateCommunityComment({ match }: CommentProps) {
    const makeComment = async (title:string, text: string) => {
        return await createCommentAsync('community',Number(match.params.postId),title, text);
    }
    return <CreatePostForm makePost={makeComment} backUrl={`/home/community/post/${match.params.postId}`} isComment={true}/>
}

export default CreateCommunityComment;