
//Ionic Imports
import { IonPage, IonContent, IonRouterOutlet } from "@ionic/react";
import { Route, RouteComponentProps } from "react-router";
import ChooseExercise from "./ChooseExercise";

//Page component imports
import ExercisePage from "./Exercise";
import Workout from "./Workout";
import CreateWorkout from "./CreateWorkout";
import AnalyseVideo from "./AnalyseVideo";

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
                path={`${match.url}/upload`}
            >
                <AnalyseVideo />
            </Route>
            < Route
                exact
                path={`${match.url}/exercise/:exerciseId`}
                render={(props) => {
                    return <ExercisePage {...props} />;
                }}
            />


            < Route
                exact
                path={`${match.url}/workout/:workoutId`}
                render={(props) => {
                    return <Workout {...props} />;
                }}
            />
            < Route
                exact
                path={`${match.url}/workout/create`}
            >
                <CreateWorkout />
            </Route>
        </IonRouterOutlet>
    </IonPage>;
}

export default ExercisePages;