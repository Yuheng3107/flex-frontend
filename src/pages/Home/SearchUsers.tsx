import React, { useState, useEffect } from "react";

//utils imports
import { getSearchUsersAsync } from "../../utils/data/profileData";

//Ionic Imports
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonButtons,
} from '@ionic/react';

//component imports
import SearchBar from "../../components/Feed/SearchBar";
import UserDisplay from "../../components/users/UserDisplay";

const SearchUsers = ({  }) => {
    const [users, setUsers] = useState<any[]>([]);

    const loadUsers = async (content: string) => {
        let results = await getSearchUsersAsync(content);
        if (typeof results !== "string") setUsers(results);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <SearchBar submitForm={loadUsers} placeholder="Search Users"/>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <UserDisplay users={users}/>
            </IonContent>
        </IonPage>
    );
}


export default SearchUsers;