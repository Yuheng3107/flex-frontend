//React imports
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

//ionic imports
import {
    IonPage,
    IonContent,
    IonBackButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    useIonToast,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";

type CreatePostProps = {
    makePost: (title:string, text:string, media:FormData) => any;
    backUrl: string;
    isComment: boolean;
}
function CreatePostForm({ makePost, backUrl, isComment }: CreatePostProps ) {
    const [postTitleInput, setPostTitleInput] = useState("");
    const [postTextInput, setPostTextInput] = useState("");
    const history = useHistory();
    const mediaInputRef = useRef<HTMLInputElement | null>(null);

    const [present] = useIonToast();

    const submitHandler = async() => {
        const imageFormData = new FormData();
        if (mediaInputRef.current !== null && mediaInputRef.current!.files !== null && mediaInputRef.current!.files[0] !== undefined) { //type guard to ensure that the file isn't undefined
            imageFormData.append("media", mediaInputRef.current!.files[0])
        }
        let response = await makePost(postTitleInput, postTextInput, imageFormData);
        console.log(response);
        if (response?.status === 201) history.push(backUrl);
    }

    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <div className="saturate-0 ml-1">
                        <IonBackButton text="" icon={closeOutline}></IonBackButton>
                    </div>
                </IonButtons>
                <IonTitle>{isComment? "Create Comment" : "Create Post"}</IonTitle>
                <IonButtons slot="end">
                    <IonButton className="mr-1 rounded-lg bg-sky-400 py-2 px-3 text-white"
                        onClick={submitHandler}>
                        Post
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <main className="flex flex-col h-3/4">
                { isComment ? "" :
                <input value={postTitleInput} type="text" placeholder="Post Title"
                    className="bg-transparent block p-4 text-2xl focus:outline-0"
                    onChange={(event) => {
                        setPostTitleInput(event.target.value);
                    }} />
                }
                <hr className="border-t border-t-slate-300" />
                <textarea value={postTextInput} placeholder="Post Text"
                    className="bg-transparent block p-4 text-xl font-light focus:outline-0 h-5/6"
                    onChange={(event) => {
                        setPostTextInput(event.target.value);
                        console.log(postTextInput);
                    }} />
                { isComment ? "" : <>
                <hr className="border-t border-t-slate-300" />
                <p className="bg-transparent block p-4 text-xl focus:outline-0">Upload Optional Media</p>
                <input className="bg-transparent block px-4 pb-5 text-lg font-light focus:outline-0" type="file" ref={mediaInputRef} onChange={(e) => {
                    if (mediaInputRef.current!.files !== null && mediaInputRef.current!.files.length > 0) {
                        if (mediaInputRef.current!.files[0].size > 10000000) {
                            e.target.value = "";
                            present({
                                message: "Image cannot be larger than 10mb!",
                                duration: 1000,
                                position: "top"
                            })
                        }
                    };
                }} />
                </>}
            </main>
        </IonContent>
    </IonPage>
}

export default CreatePostForm;