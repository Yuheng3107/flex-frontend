import { createUserPostAsync } from '../../utils/data/postData';
import CreatePostForm from '../../components/Feed/CreatePostForm';

function CreatePost() {
    const makeUserPost = async (title:string, text: string) => {
        return await createUserPostAsync(title, text);
    }
    return <CreatePostForm makePost={makeUserPost} backUrl="/home" isComment={false}/>
}

export default CreatePost;