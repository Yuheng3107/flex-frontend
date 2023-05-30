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
import { startForAxis } from "@tensorflow/tfjs-core/dist/ops/slice_util";

function CreatePost() {
    const makeUserPost = async (title: string, text: string, media: FormData) => {
        return await createUserPostAsync(title, text, media);
    }
    const [postTitleInput, setPostTitleInput] = useState("");
    const [postTextInput, setPostTextInput] = useState("");
    const [fileDataUrl, setImageDataUrl] = useState<string | ArrayBuffer | null>("");
    const [mediaType, setMediaType] = useState("image");

    const [videoSrc, setVideoSrc] = useState<string>("");

    const history = useHistory();
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const videoInputRef = useRef<HTMLInputElement | null>(null);

    const [present] = useIonToast();

    let backUrl = "/home";
    let isComment = false;
    console.log(fileDataUrl);
    const submitHandler = async () => {
        let inputRef = imageInputRef;
        if (mediaType === "video") inputRef = videoInputRef;
        const imageFormData = new FormData();
        if (postTitleInput.trim() === "" || postTextInput.trim() === "") {
            present({
                message: "Post title and text cannot be empty!",
                duration: 1000,
                position: "top",
            });
            return
        }
        if (
            inputRef.current !== null &&
            inputRef.current!.files !== null &&
            inputRef.current!.files[0] !== undefined
        ) {
            //type guard to ensure that the file isn't undefined
            imageFormData.append("media", inputRef.current!.files[0]);
        }
        let response = await makeUserPost(postTitleInput, postTextInput, imageFormData);
        if (response?.status === 201) history.push(backUrl);
    };

    function fileInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>, type: string) {
        const target = e.target as HTMLInputElement;
        let inputRef = imageInputRef;
        if (type === "video") inputRef = videoInputRef;
        console.log(target.files);
        if (
            inputRef.current!.files !== null &&
            inputRef.current!.files.length > 0
        ) {
            setMediaType(type);
            console.log(imageInputRef.current!.files);
            if (inputRef.current!.files[0].size > 10000000) {
                target.value = "";
                present({
                    message: "File cannot be larger than 10mb!",
                    duration: 1000,
                    position: "top",
                });
            } else {
                // if (FileReader) {
                //     var fr = new FileReader();
                //     fr.onload = function () {
                //         setImageDataUrl(fr.result);
                //     }
                //     fr.readAsDataURL(inputRef.current!.files[0]);
                // }
                let source = URL.createObjectURL(inputRef.current!.files[0])
                setVideoSrc(source);
            }
        } else {
            console.log('something went wrong')
            present({
                message: "Something went wrong 😢",
                duration: 1000,
                position: "top",
            });
        }

    }

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
                    {fileDataUrl && mediaType === "image" &&
                        <div className="w-full aspect-square flex justify-center items-center overflow-hidden">
                            <IonImg
                                className="object-cover"
                                src={typeof fileDataUrl === "string" ? fileDataUrl : undefined}
                                alt="post image"
                            />
                        </div>}
                    {fileDataUrl && mediaType === "video" &&
                        <video src={videoSrc} controls autoPlay className="" />}
                    <textarea
                        value={postTextInput}
                        placeholder="Post Text"
                        className="bg-transparent block p-4 text-xl font-light focus:outline-0 h-32 mb-4"
                        onChange={(event) => {
                            setPostTextInput(event.target.value);
                        }}
                    />
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
                                ref={imageInputRef}
                                accept="image/*"
                                onChange={(e) => {
                                    fileInputChangeHandler(e, "image")
                                }}
                            />
                            <IonIcon icon={imageOutline}></IonIcon>
                        </IonFabButton>
                        <IonFabButton>
                            <input
                                className="opacity-0 absolute z-10"
                                type="file"
                                ref={videoInputRef}
                                accept="video/*"
                                onChange={(e) => {
                                    fileInputChangeHandler(e, "video")
                                }}
                            />
                            <IonIcon icon={videocamOutline}></IonIcon>
                        </IonFabButton>
                    </IonFabList>
                </IonFab>
            </IonContent>
        </IonPage>
    );
}

export default CreatePost;