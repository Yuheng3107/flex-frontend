import React, { SyntheticEvent, useRef, useEffect, useState } from 'react';

//Ionic Imports
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonTitle,
    IonButtons,
    IonButton,
    IonSpinner
} from '@ionic/react';

type SettingsProps = {
    // setUpdateProfileState: (newState: number) => void;
    // updateProfileState: number;
}
// Functional Component
function Settings({ }: SettingsProps) {


    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton></IonBackButton>
                </IonButtons>
                <IonTitle>Settings</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent >


        </IonContent>
    </IonPage >
}

export default Settings;