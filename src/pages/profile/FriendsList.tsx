import { useEffect, useState } from 'react';

// Ionic imports
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonTitle,
    IonButtons,
} from '@ionic/react';

//redux imports
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { profileDataActions } from '../../store/profileDataSlice';

// component imports
import UserDisplay from '../../components/users/UserDisplay';
import FriendRequestDisplay from '../../components/users/FriendRequestDisplay';
import SentFriendRequestDisplay from '../../components/users/SentFriendRequestDisplay';
import { ProfileData } from '../../types/stateTypes';
import { getManyOtherProfileDataAsync } from '../../utils/data/profileData';

function FriendsList() {
    const profileDataRedux = useAppSelector((state) => state.profile.profileData)
    const [friends, setFriends] = useState<ProfileData[]>([]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        getFriendData();
    }, [profileDataRedux])
    const getFriendData = async function () {
        setFriends(await getManyOtherProfileDataAsync(profileDataRedux.followers));
    }
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
                <UserDisplay users={friends} />
                <div className="mt-3 text-xl">Incoming Friend Requests</div>
                <FriendRequestDisplay friend_requests={profileDataRedux.friend_requests} />
                <div className="mt-3 text-xl">Sent Friend Requests</div>
                <SentFriendRequestDisplay friend_requests={profileDataRedux.sent_friend_requests} />    
            </div>
            
        </IonContent>
    </IonPage>
}

export default FriendsList