import { useEffect } from 'react';

// Ionic imports
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonTitle,
    IonButtons,
    IonButton,
} from '@ionic/react';

//redux imports
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { profileDataActions } from '../../store/profileDataSlice';

// component imports
import FriendDisplay from '../../components/friends/FriendDisplay';
import FriendRequestDisplay from '../../components/friends/FriendRequestDisplay';
import SentFriendRequestDisplay from '../../components/friends/SentFriendRequestDisplay';

function FriendsList() {
    const profileDataRedux = useAppSelector((state) => state.profile.profileData)
    const dispatch = useAppDispatch();
    // useEffect(() => {
    //     console.log('use effect ran in friendslist.tsx');
    //     dispatch(profileDataActions.updateProfileCounter);
    // }, [])
    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/profile"></IonBackButton>
                </IonButtons>
                <IonTitle>Friend List</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <div className="border border-zinc-500 m-4 p-2 flex flex-col text-center">
                <div className="text-2xl">Friends</div>
                <FriendDisplay friends={profileDataRedux.followers} />
                <div className="mt-3 text-xl">Incoming Friend Requests</div>
                <FriendRequestDisplay friend_requests={profileDataRedux.friend_requests} />
                <div className="mt-3 text-xl">Sent Friend Requests</div>
                <SentFriendRequestDisplay friend_requests={profileDataRedux.sent_friend_requests} />    
            </div>
            
        </IonContent>
    </IonPage>
}

export default FriendsList