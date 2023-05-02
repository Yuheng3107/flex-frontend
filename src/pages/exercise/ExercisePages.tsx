
//Ionic Imports
import { IonPage, IonContent, IonRouterOutlet } from "@ionic/react";
import { Route, RouteComponentProps } from "react-router";
import ChooseExercise from "./ChooseExercise";

//Page component imports
import ExercisePage from "./Exercise";

interface ExercisePagesProps extends RouteComponentProps<{
}> { }

//This component defines the routes following /community
function ExercisePages({ match }: ExercisePagesProps) {
    return <IonPage>
        <IonRouterOutlet>
            <Route exact path={`${match.url}`
            }>
                <ChooseExercise />
            </Route>
            < Route
                exact
                path={`${match.url}/:exerciseId`}
                render={(props) => {
                    return <ExercisePage {...props} />;
                }}
            />
        </IonRouterOutlet>
    </IonPage>;
}

export default ExercisePages;