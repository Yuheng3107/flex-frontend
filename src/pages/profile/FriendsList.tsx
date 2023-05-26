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
        console.log(profileDataRedux.followers)
        const getFriendData = async function () {
            setFriends(await getManyOtherProfileDataAsync(profileDataRedux.followers));
        }
        getFriendData();
    }, [profileDataRedux])
    console.log(friends)
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
            <main className="h-full w-full bg-gray-50 py-3">
                {profileDataRedux.friend_requests.length !== 0 && <FriendRequestDisplay friend_requests={profileDataRedux.friend_requests} />}
                {profileDataRedux.sent_friend_requests.length !== 0 && <SentFriendRequestDisplay friend_requests={profileDataRedux.sent_friend_requests} />}

                <UserDisplay users={friends} />
            </main>
        </IonContent>
    </IonPage>
}

type ActionButtonProps = {
    actionFunc: () => void;
    className?: string;
    label: string;
}
export const ActionButton = ({actionFunc, className, label}:ActionButtonProps) => {
    return <button onClick={actionFunc} className={`${className} h-8 flex items-center px-4 text-sm rounded-full`}>
        {label}
    </button>
}

export default FriendsList