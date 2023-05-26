//React imports
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

//utils
import { createUserPostAsync } from '../../utils/data/postData';
import CreatePostForm from '../../components/Feed/CreatePostForm';

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
    IonFab,
    IonFabButton,
    IonIcon,
    IonFabList,
    IonImg
} from "@ionic/react";
import { addOutline, imageOutline, videocamOutline, closeOutline } from "ionicons/icons";

function CreatePost() {
    const makeUserPost = async (title: string, text: string, media: FormData) => {
        return await createUserPostAsync(title, text, media);
    }
    const [postTitleInput, setPostTitleInput] = useState("");
    const [postTextInput, setPostTextInput] = useState("");
    const [imageDataUrl, setImageDataUrl] = useState<string | ArrayBuffer | null>("");
    console.log(imageDataUrl);

    const history = useHistory();
    const mediaInputRef = useRef<HTMLInputElement | null>(null);

    const [present] = useIonToast();

    let backUrl = "/home";
    let isComment = false;

    const submitHandler = async () => {
        const imageFormData = new FormData();
        if (
            mediaInputRef.current !== null &&
            mediaInputRef.current!.files !== null &&
            mediaInputRef.current!.files[0] !== undefined
        ) {
            //type guard to ensure that the file isn't undefined
            imageFormData.append("media", mediaInputRef.current!.files[0]);
        }
        let response = await makeUserPost(postTitleInput, postTextInput, imageFormData);
        console.log(response);
        if (response?.status === 201) history.push(backUrl);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <div className="saturate-0 ml-1">
                            <IonBackButton text="" icon={closeOutline}></IonBackButton>
                        </div>
                    </IonButtons>
                    <IonTitle>{isComment ? "Create Comment" : "Create Post"}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton color="tertiary" className="mr-1 rounded-lg py-2 px-3" onClick={submitHandler}>
                            Post
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <main className="flex flex-col">
                    {isComment ? (
                        ""
                    ) : (
                        <input
                            value={postTitleInput}
                            type="text"
                            placeholder="Post Title"
                            className="bg-transparent block p-4 text-2xl focus:outline-0"
                            onChange={(event) => {
                                setPostTitleInput(event.target.value);
                            }}
                        />
                    )}
                    <hr className="border-t border-t-slate-300" />
                    {imageDataUrl && <div className="w-full aspect-square flex justify-center items-center overflow-hidden">
                        <IonImg
                            className="object-cover"
                            src={typeof imageDataUrl === "string" ? imageDataUrl : undefined}
                            alt="post image"
                        />
                    </div>}
                    <textarea
                        value={postTextInput}
                        placeholder="Post Text"
                        className="bg-transparent block p-4 text-xl font-light focus:outline-0 h-32 mb-4"
                        onChange={(event) => {
                            setPostTextInput(event.target.value);
                            console.log(postTextInput);
                        }}
                    />
                    

                    {/* <hr className="border-t border-t-slate-300" />
                    <p className="bg-transparent block p-4 text-xl focus:outline-0">
                        Upload Optional Media
                    </p>
                    <input
                        className="file-input"
                        type="file"
                        ref={mediaInputRef}
                        onChange={(e) => {
                            if (
                                mediaInputRef.current!.files !== null &&
                                mediaInputRef.current!.files.length > 0
                            ) {
                                if (mediaInputRef.current!.files[0].size > 10000000) {
                                    e.target.value = "";
                                    present({
                                        message: "Image cannot be larger than 10mb!",
                                        duration: 1000,
                                        position: "top",
                                    });
                                }
                            }
                        }}
                    /> */}
                </main>
                <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    <IonFabButton color="tertiary">
                        <IonIcon icon={addOutline}></IonIcon>
                    </IonFabButton>
                    <IonFabList side="top">
                        <IonFabButton>
                            <input
                                className="opacity-0 absolute z-10"
                                type="file"
                                ref={mediaInputRef}
                                onChange={(e) => {
                                    if (
                                        mediaInputRef.current!.files !== null &&
                                        mediaInputRef.current!.files.length > 0
                                    ) {
                                        if (mediaInputRef.current!.files[0].size > 10000000) {
                                            e.target.value = "";
                                            present({
                                                message: "Image cannot be larger than 10mb!",
                                                duration: 1000,
                                                position: "top",
                                            });
                                        } else {
                                            if (FileReader) {
                                                var fr = new FileReader();
                                                fr.onload = function () {
                                                    setImageDataUrl(fr.result);
                                                }
                                                fr.readAsDataURL(mediaInputRef.current!.files[0]);
                                            }
                                        }
                                    }
                                }}
                            />
                            <IonIcon icon={imageOutline}></IonIcon>
                        </IonFabButton>
                        <IonFabButton>
                            <IonIcon icon={videocamOutline}></IonIcon>
                        </IonFabButton>
                    </IonFabList>
                </IonFab>
            </IonContent>
        </IonPage>
    );
}

export default CreatePost;