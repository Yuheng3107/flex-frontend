
import { RouteComponentProps } from "react-router";
import CreatePostForm from "../../components/Feed/CreatePostForm";
import { createCommentAsync } from "../../utils/data/postData";
interface CommentProps extends RouteComponentProps<{
    postId: string;
}> { }
function CreateComment({ match }: CommentProps) {
    const makeComment = async (title:string, text: string) => {
        return await createCommentAsync(15,Number(match.params.postId),title, text);
    }
    return <CreatePostForm makePost={makeComment} backUrl={`/home/post/${match.params.postId}`} isComment={true}/>
}

export default CreateComment;