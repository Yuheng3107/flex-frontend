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
    IonToggle
} from '@ionic/react';

//utils
import { toggleDarkTheme } from '../../utils/darkMode';

// Functional Component
function Settings() {
    let mediaDarkmodePref = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let localDarkmodePref = JSON.parse(localStorage.getItem("darkmode") || "undefined");
    console.log(localDarkmodePref);
    const [darkThemeToggleChecked, setDarkThemeToggleChecked] = useState<boolean | undefined>(localDarkmodePref === null ? mediaDarkmodePref : localDarkmodePref);
    console.log(darkThemeToggleChecked);
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

        </IonContent>
    </IonPage >
}

export default Settings;