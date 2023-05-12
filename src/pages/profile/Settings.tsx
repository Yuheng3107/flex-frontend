//React imports
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
import { logoutAsyc } from '../../utils/data/profileData';

// Functional Component
function Settings() {
    // check if the user device has preference for darkmode
    let mediaDarkmodePref = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //check if the user has a previously stored darkmode preference
    let localDarkmodePref = JSON.parse(localStorage.getItem("darkmode") || "false");
    const [darkThemeToggleChecked, setDarkThemeToggleChecked] = useState<boolean | undefined>(localDarkmodePref === null ? mediaDarkmodePref : localDarkmodePref);
    const history = useHistory();
    function onDarkThemeToggle() {
        setDarkThemeToggleChecked((currState) => {
            console.log(currState);
            localStorage.setItem('darkmode', JSON.stringify(!currState));
            toggleDarkTheme(!currState);
            return !currState
        });
    }

    const logout = async function () {
        let response = await logoutAsyc();
        if (response?.status === 200) history.push("/profile")
        window.location.reload();
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
        <IonContent>
            <div className="flex flex-col justify-evenly">
                <div>
                    <p>Darkmode Toggle</p>
                    <IonToggle checked={darkThemeToggleChecked} onIonChange={onDarkThemeToggle}></IonToggle>    
                </div>
                <IonButton  routerLink="/profile/friendslist" routerDirection="forward">Friends</IonButton>
                <IonButton routerLink="/profile/create" routerDirection="forward">
                    Edit Profile
                </IonButton>
                <IonButton onClick={logout}>
                    Logout
                </IonButton>
            </div>
        </IonContent>
    </IonPage >
}

export default Settings;