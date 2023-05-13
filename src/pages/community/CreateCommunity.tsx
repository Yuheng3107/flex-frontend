import React, { useState, useRef } from 'react';

//ion imports
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

import { useHistory } from "react-router-dom";
import { createCommunityAsync } from '../../utils/data/communityData';

function CreateCommunity() {
    const [communityNameInput, setCommunityNameInput] = useState("");
    const [communityDescriptionInput, setCommunityDescriptionInput] = useState("");
    const mediaInputRef = useRef<HTMLInputElement | null>(null);
    const bannerInputRef = useRef<HTMLInputElement | null>(null);
    
    const [toast] = useIonToast();
    const history = useHistory();

    function presentToast(message: string) {
        toast({
            message: message,
            duration: 1500,
            position: 'top'
        })
    }

    async function submitHandler(event: React.FormEvent) {
        event.preventDefault();

        if (communityNameInput.trim() === "" && communityDescriptionInput.trim() === "") return presentToast("Please enter a name and description for your community");
        else if (communityNameInput.trim() === "") return presentToast("Please enter a name for your community");
        else if (communityDescriptionInput.trim() === "") return presentToast("Please enter a description for your community");

        const imageFormData = new FormData();
        if (mediaInputRef.current !== null && mediaInputRef.current!.files !== null && mediaInputRef.current!.files[0] !== undefined) { //type guard
            imageFormData.append("media", mediaInputRef.current!.files[0])
        }
        const bannerFormData = new FormData();
        if (bannerInputRef.current !== null && bannerInputRef.current!.files !== null && bannerInputRef.current!.files[0] !== undefined) { //type guard
            bannerFormData.append("media", bannerInputRef.current!.files[0])
        }

        if (imageFormData.has('media') === false) return presentToast("Please upload a community photo");
        if (bannerFormData.has('media') === false) return presentToast("Please upload a banner photo");
        let response = await createCommunityAsync(communityNameInput, communityDescriptionInput, imageFormData, bannerFormData);
        if (response?.status === 201) history.push('/home');
    }

    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <div className="saturate-0 ml-1">
                        <IonBackButton text="" icon={closeOutline}></IonBackButton>
                    </div>
                </IonButtons>
                <IonTitle>Create Community</IonTitle>
                <IonButtons slot="end">
                    <IonButton className="mr-1 rounded-lg bg-sky-400 py-2 px-3 text-white"
                        onClick={submitHandler}>
                        Create
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <main className="flex flex-col h-full">
                <input value={communityNameInput} type="text" placeholder="Community Name"
                    className="bg-transparent block p-4 text-2xl focus:outline-0"
                    onChange={(event) => {
                        setCommunityNameInput(event.target.value);
                    }} />
                <hr className="border-t border-t-slate-300" />
                <textarea value={communityDescriptionInput} placeholder="Community Description"
                    className="bg-transparent block p-4 text-xl font-light focus:outline-0 h-5/6"
                    onChange={(event) => {
                        setCommunityDescriptionInput(event.target.value);
                    }} />
                <hr className="border-t border-t-slate-300" />
                <p className="bg-transparent block p-4 text-xl focus:outline-0">Community Photo</p>
                <input className="bg-transparent block px-4 pb-5 text-lg font-light focus:outline-0" type="file" ref={mediaInputRef} onChange={(e) => {
                    // photo
                    if (mediaInputRef.current!.files !== null && mediaInputRef.current!.files.length > 0) {
                        if (mediaInputRef.current!.files[0].size > 10000000) {
                            e.target.value = "";
                            presentToast("Image cannot be larger than 10mb!");
                        }
                    };
                }} />
                <hr className="border-t border-t-slate-300" />
                <p className="bg-transparent block p-4 text-xl focus:outline-0">Community Banner</p>
                <input className="bg-transparent block px-4 pb-5 text-lg font-light focus:outline-0" type="file" ref={bannerInputRef} onChange={(e) => {
                    // banner
                    if (bannerInputRef.current!.files !== null && bannerInputRef.current!.files.length > 0) {
                        if (bannerInputRef.current!.files[0].size > 10000000) {
                            e.target.value = "";
                            presentToast("Image cannot be larger than 10mb!");
                        }
                    };
                }} />
            </main>
        </IonContent>
    </IonPage>
}

export default CreateCommunity;