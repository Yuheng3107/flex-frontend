
//Ionic Imports
import { IonPage, IonContent, IonRouterOutlet } from "@ionic/react";
import { Route, RouteComponentProps } from "react-router";


import EditProfile from "./EditProfile";
import Profile from "./Profile";
import FriendsList from "./FriendsList";
import Settings from "./Settings";

//Page component imports
interface CommunityPageProps extends RouteComponentProps<{
}> { }

//This component defines the routes following /community
function ProfilePages({ match }: CommunityPageProps) {
    return <IonPage>
        <IonRouterOutlet>
            <Route exact path={`${match.url}`}>
                <Profile />
            </Route>
            <Route exact path={`${match.url}/create/`}>
                <EditProfile />
            </Route>
            <Route exact path='/profile/friendslist/'>
                <FriendsList />
            </Route>
            <Route exact path={`${match.url}/settings`} >
                <Settings />
            </Route>
        </IonRouterOutlet>

    </IonPage>;
}

export default ProfilePages;