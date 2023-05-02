//React imports
import { useState } from "react";
import { Route } from "react-router";


import {
  IonContent,
  IonPage,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonRouterOutlet

} from "@ionic/react";

//component imports
import { RouteComponentProps } from "react-router";
import ExercisePage from "./Exercise";

import "./Workout.css";

interface WorkoutPageProps extends RouteComponentProps<{
  workoutId: string;
}> {

}

function Workout({ match }: WorkoutPageProps) {
  console.log(match.url);
  const [isExercising, setIsExercising] = useState(false)
  const [repCountInput, setRepCountInput] = useState<number>(1);

  function startExerciseHandler(event: React.MouseEvent<HTMLButtonElement>) {
    setIsExercising(true);
  }

  const repIncrementHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRepCountInput((prevState) => {
      return (prevState + 1);
    })
  }
  const repDecrementHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (repCountInput > 1) {
      setRepCountInput((prevState) => {
        return (prevState - 1);
      })
    }
  }
  let samplePhoto = "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  let sampleSquatPhoto = "https://images.unsplash.com/photo-1567598508481-65985588e295?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="h-full w-full relative">
          <section id="top-section" className="relative h-1/4">
            <div id="workout-info" className="text-white z-20 absolute flex flex-col justify-end h-full p-3">
              <p id="workout-name" className="text-xl font-semibold">Cardio</p>
              <p className="text-sm">
                <span id="workout-duration"></span>
                <span id="exercise-count">The ID of this workout is {match.params.workoutId}</span>
              </p>
            </div>
            <img id="bg-banner" alt="banner image" src={samplePhoto} className=" z-0 absolute w-full h-full object-cover object-center"></img>
            <div className="h-full w-full bg-gradient-to-b from-transparent to-black z-10 absolute"></div>
          </section>
          <section id="exercises">
            <IonList>
              <IonItem>
                <IonThumbnail slot="start">
                  <img className="aspect-square object-cover" src={sampleSquatPhoto}></img>
                </IonThumbnail>
                <IonLabel>Squats</IonLabel>
              </IonItem>
            </IonList>
          </section>
          <div className="absolute bottom-0 w-full flex flex-row justify-center">
            <button className="py-4 px-6 mb-3 bg-orange-500 text-white rounded-xl inline">Start</button>
          </div>
        </main>

      </IonContent>
    </IonPage >
  );
};

export default Workout;
