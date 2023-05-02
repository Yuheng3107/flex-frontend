
//Ionic Imports
import { IonPage, IonContent, IonRouterOutlet } from "@ionic/react";
import { Route, RouteComponentProps } from "react-router";


//Page component imports
import CreateCommunity from "./CreateCommunity";
import CommunityDisplay from "./CommunityDisplay";
import CreateCommunityPost from "./CreateCommunityPost";
import CommunityPostPage from "./CommunityPostPage";
import CreateCommunityComment from "./CreateCommunityComment";

interface CommunityPageProps extends RouteComponentProps<{
}> { }

//This component defines the routes following /community
function CommunityPage({ match }: CommunityPageProps) {
    return <IonPage>
        <IonRouterOutlet>
            <Route exact path={`${match.url}/:communityId`} render={(props) => {
                return <CommunityDisplay {...props} />;
            }} />
            <Route exact path={`${match.url}/create`}>
                <CreateCommunity />
            </Route>
            <Route exact path={`${match.url}/:communityId/create`} render={(props) => {
                return <CreateCommunityPost {...props} />;
            }} />
            <Route exact path={`${match.url}/post/:postId`} render={(props) => {
                return <CommunityPostPage {...props} />;
              }}
            />
            <Route exact path={`${match.url}/post/:postId/create`} render={(props) => {
                return <CreateCommunityComment {...props} />;
              }}
            />
        </IonRouterOutlet>
    </IonPage>;
}

export default CommunityPage;