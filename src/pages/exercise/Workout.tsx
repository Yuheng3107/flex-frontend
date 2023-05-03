//React imports
import { useState, useEffect } from "react";

import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonButton
} from "@ionic/react";

//redux
import { useAppSelector } from "../../store/hooks";

//component imports
import { RouteComponentProps } from "react-router";
import WorkoutInfoDisplay from "../../components/Exercise/workout/WorkoutInfoDisplay";
import VideoFeed from "../../components/Exercise/video";
//utils
import { getExerciseRegimeWithExercisesAsync } from "../../utils/data/getExerciseData";

//types
import { ExerciseRegimeInfo, emptyExerciseRegime } from "../../store/exerciseDataSlice";

import { ExerciseData } from "../../types/stateTypes";
//others
import { backend } from "../../App";


interface WorkoutPageProps extends RouteComponentProps<{
  workoutId: string;
}> {

}

function Workout({ match }: WorkoutPageProps) {

  const [isExercising, setIsExercising] = useState(false);
  const [exerciseRegimeInfo, setExerciseRegimeInfo] = useState<ExerciseRegimeInfo>(emptyExerciseRegime);
  const [displaysArr, setDisplaysArr] = useState<(String | ExerciseData)[]>(["mainInfo"]);
  const [currentDisplayIndex, setCurrentDisplayIndex] = useState<number>(0);

  console.log(displaysArr);

  useEffect(() => {
    async function loadExerciseRegimInfo() {
      const data = await getExerciseRegimeWithExercisesAsync(Number(match.params.workoutId));
      setExerciseRegimeInfo(data);
      setDisplaysArr(["mainInfo"].concat(data.exercises));
    }
    loadExerciseRegimInfo();
  }, [getExerciseRegimeWithExercisesAsync, setDisplaysArr])

  function startExerciseHandler(event: React.MouseEvent<HTMLButtonElement>) {
    setIsExercising(true);
  }

  // let samplePhoto = "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  // let sampleSquatPhoto = "https://images.unsplash.com/photo-1567598508481-65985588e295?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"

  //This button is passed to Video.jsx. Once the user completes the exercise, he clicks on this button to go to the next one
  const nextExerciseButton = <IonButton fill="outline" onClick={() => {
    if (currentDisplayIndex < displaysArr.length - 1) {
      setCurrentDisplayIndex(prev => prev + 1)
    } else {
      setCurrentDisplayIndex(0);
    }
  }}>
    Next
  </IonButton >

  let currentDisplayComponent;
  if (displaysArr[currentDisplayIndex] === "mainInfo") {
    currentDisplayComponent = <WorkoutInfoDisplay exerciseRegimeInfo={exerciseRegimeInfo}></WorkoutInfoDisplay>;
  } else if (displaysArr[currentDisplayIndex] !== null) {
    console.log(displaysArr[currentDisplayIndex])
    currentDisplayComponent = <VideoFeed repCountInput={2} completeExerciseButton={nextExerciseButton}
      exerciseData={displaysArr[currentDisplayIndex]}></VideoFeed>
  }




  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="h-full w-full relative">
          {currentDisplayComponent}
          <div className="absolute bottom-0 w-full flex flex-row justify-center">
            {displaysArr[currentDisplayIndex] === "mainInfo" &&
              <IonButton shape="round" onClick={() => { setCurrentDisplayIndex(prev => prev + 1) }}>
                <span className="text-white">Start</span>
              </IonButton>}
          </div>
        </main>

      </IonContent>
    </IonPage >
  );
};

export default Workout;
