//React imports
import { useState } from "react";

import {
  IonContent,
  IonPage,
  IonBackButton
} from "@ionic/react";

//component imports
import { RouteComponentProps } from "react-router";

interface WorkoutPageProps extends RouteComponentProps<{
  workoutId: string;
}> {

}

function Workout({ match }: WorkoutPageProps) {
  console.log(match.params.workoutId);
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
  return (
    <IonPage>
      <IonContent fullscreen>
        <section id="top-section" className="relative h-1/4">
          <IonBackButton>back</IonBackButton>
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
        <section>

        </section>
      </IonContent>
    </IonPage>
  );
};

export default Workout;
