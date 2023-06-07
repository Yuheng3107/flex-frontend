//React imports
import { useState, useEffect } from "react";

import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonButton,
} from "@ionic/react";

//redux
import { useAppSelector } from "../../store/hooks";

//component imports
import { RouteComponentProps } from "react-router";
import WorkoutInfoDisplay from "../../components/Exercise/workout/WorkoutInfoDisplay";
import VideoFeed from "../../components/Exercise/video";
import Header from "../../components/ui/Header";
//utils
import {
  getExerciseRegimeWithExercisesAsync,
  getExerciseRegimeInfoAsync,
  getExerciseRegimeAsync,
  getExerciseListAsync,
} from "../../utils/data/getExerciseData";

//types
import {
  ExerciseRegime,
  ExerciseRegimeInfo,
  ExerciseRegimeInfoUnit,
  emptyExerciseRegime,
  emptyExerciseRegimeInfo,
} from "../../types/stateTypes";

import { ExerciseData } from "../../types/stateTypes";
//others
import { backend } from "../../App";
import getExercise from "../../utils/ExerciseAlgo/exericseAlgo";

interface WorkoutPageProps
  extends RouteComponentProps<{
    workoutId: string;
  }> {}

function Workout({ match }: WorkoutPageProps) {
  const [isExercising, setIsExercising] = useState(false);
  const [exerciseRegime, setExerciseRegime] =
    useState<ExerciseRegime>(emptyExerciseRegime);
  const [regimeInfo, setRegimeInfo] = useState<ExerciseRegimeInfo>(
    emptyExerciseRegimeInfo
  );
  const [displaysArr, setDisplaysArr] = useState<(string | ExerciseData)[]>([
    "mainInfo",
  ]);
  const [currentDisplayIndex, setCurrentDisplayIndex] = useState<number>(0);

  console.log(displaysArr);

  useEffect(() => {
    function sortRegimeInfoArray(arr: any[]) {}
    async function loadExerciseRegimInfo() {
      let regimeId = Number(match.params.workoutId);
      const data = await getExerciseRegimeWithExercisesAsync(regimeId);
      console.log(data);
      setExerciseRegime(data);
      setDisplaysArr(["mainInfo"].concat(data.exercises));
    }
    loadExerciseRegimInfo();
  }, [getExerciseRegimeWithExercisesAsync, setDisplaysArr]);

  function startExerciseHandler(event: React.MouseEvent<HTMLButtonElement>) {
    setIsExercising(true);
  }

  // let samplePhoto = "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  // let sampleSquatPhoto = "https://images.unsplash.com/photo-1567598508481-65985588e295?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"

  //This button is passed to Video.jsx. Once the user completes the exercise, he clicks on this button to go to the next one
  const nextExerciseButton = (
    <IonButton
      fill="outline"
      onClick={() => {
        if (currentDisplayIndex < displaysArr.length - 1) {
          setCurrentDisplayIndex((prev) => prev + 1);
        } else {
          setCurrentDisplayIndex(0);
        }
      }}
    >
      Next
    </IonButton>
  );

  //typeguard function to check if the argument is of type ExerciseData
  function typeIsExerciseData(
    data: string | ExerciseData
  ): data is ExerciseData {
    return (data as ExerciseData).reps !== undefined;
  }
  let currentDisplayElement = displaysArr[currentDisplayIndex];
  let currentDisplayComponent;
  if (currentDisplayElement === "mainInfo") {
    currentDisplayComponent = (
      <WorkoutInfoDisplay exerciseRegime={exerciseRegime}></WorkoutInfoDisplay>
    );
  } else if (currentDisplayElement !== null) {
    console.log(displaysArr[currentDisplayIndex]);
    if (
      typeIsExerciseData(currentDisplayElement) &&
      currentDisplayElement.reps !== undefined
    ) {
      currentDisplayComponent = (
        <VideoFeed
          repCountInput={currentDisplayElement.reps.rep_count[0]}
          completeExerciseButton={nextExerciseButton}
          exerciseData={displaysArr[currentDisplayIndex]}
          exerciseId={(displaysArr[currentDisplayIndex] as ExerciseData)?.id}
        ></VideoFeed>
      );
    }
  }

  return (
    <IonPage>
      <Header title={exerciseRegime.name}></Header>
      <IonContent fullscreen>
        <main className="h-full w-full relative">
          {currentDisplayComponent}
          <div className="absolute bottom-0 w-full flex flex-row justify-center">
            {displaysArr[currentDisplayIndex] === "mainInfo" && (
              <IonButton
                shape="round"
                onClick={() => {
                  setCurrentDisplayIndex((prev) => prev + 1);
                }}
              >
                <span className="text-white">Start</span>
              </IonButton>
            )}
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
}

export default Workout;
