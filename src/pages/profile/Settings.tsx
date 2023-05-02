import React, { SyntheticEvent, useRef, useEffect, useState } from 'react';

//Ionic Imports
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonButton,
    IonTitle,
    IonButtons,
    IonToggle
} from '@ionic/react';

//utils
import { toggleDarkTheme } from '../../utils/darkMode';

// Functional Component
function Settings() {
    // check if the user device has preference for darkmode
    let mediaDarkmodePref = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //check if the user has a previously stored darkmode preference
    let localDarkmodePref = JSON.parse(localStorage.getItem("darkmode") || "false");
    const [darkThemeToggleChecked, setDarkThemeToggleChecked] = useState<boolean | undefined>(localDarkmodePref === null ? mediaDarkmodePref : localDarkmodePref);
    function onDarkThemeToggle() {
        setDarkThemeToggleChecked((currState) => {
            console.log(currState);
            localStorage.setItem('darkmode', JSON.stringify(!currState));
            toggleDarkTheme(!currState);
            return !currState
        });
    }

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
            <p>Darkmode Toggle</p>
            <IonToggle checked={darkThemeToggleChecked} onIonChange={onDarkThemeToggle}></IonToggle>
            <IonButton  routerLink="/profile/friendslist" routerDirection="forward">Friends</IonButton>
        </IonContent>
    </IonPage >
}

export default Settings;