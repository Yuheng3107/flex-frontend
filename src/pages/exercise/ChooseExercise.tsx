import { useEffect, useState } from "react";

import { useHistory } from "react-router";

//ionic imports
import {
  IonContent,
  IonPage,
  IonIcon,
  IonFab,
  IonFabButton,
} from "@ionic/react";

import { addCircleOutline, cloudUploadOutline } from "ionicons/icons";

//redux imports
import { useAppSelector } from "../../store/hooks";

//components
import { backend } from "../../App";
import ExerciseCard from "../../components/Exercise/ExerciseCard";
import WorkoutCard from "../../components/Exercise/workout/WorkoutCard";

//utils
import { getExerciseListAsync, getExerciseRegimeAsync } from "../../utils/data/getExerciseData";

//types
import { ExerciseData } from "../../types/stateTypes";

const ChooseExercise = () => {

  const [exerciseCardArray, setExerciseCardArray] = useState<ExerciseData[]>([]);
  const [regimeCardArray, setRegimeCardArray] = useState<any[]>([]);
  const exerciseStatsRedux = useAppSelector(state => state.exerciseStats)

  const history = useHistory();

  useEffect(() => {
    console.log("useEffect running");
    async function getRegimesData() {
      let regimesDataArray = [];
      for (let regimeId of exerciseStatsRedux.exercise_regimes) {
        let data = await getExerciseRegimeAsync(Number(regimeId));
        console.log(data);
        let exercisesData = await getExerciseListAsync(data.exercises);
        //Notes exercisesData is a list of ExerciseData WITHOUT duplicates!
        data.exercises = exercisesData;
        console.log(data);
        regimesDataArray.push(data);

      }
      setRegimeCardArray(regimesDataArray);

    }
    async function getExercises() {
      try {
        const response = await fetch(backend.concat('/exercises/exercise/list'), {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": String(
              document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]
            ),
          },
        });
        const data = await response.json();
        setExerciseCardArray(data);

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    getExercises();
    getRegimesData();
  }, [exerciseStatsRedux])

  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="p-4">
          <section id="workouts-container" className="mb-4">
            <p className="text-xl mb-2 flex flex-row justify-between items-center">
              Workouts
              <button onClick={() => history.push("/exercise/workout/create")}>
                <IonIcon color="primary" size="large" icon={addCircleOutline}></IonIcon>
              </button>
            </p>
            {regimeCardArray.map((regimeData) => (
              <WorkoutCard key={regimeData.id} regimeData={regimeData} />
            ))}
          </section>
          <section id="Exercises-container">
            <p className="text-xl mb-2">Exercises</p>
            <div className="flex flex-col">
              {exerciseCardArray.map((cardInfo) => (
                <ExerciseCard key={cardInfo.id} name={cardInfo.name} likes={cardInfo.likes} media={cardInfo.media} exerciseId={cardInfo.id} />
              ))}
            </div>

          </section>
        </main>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton routerLink="exercise/upload">
            <IonIcon icon={cloudUploadOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};



export default ChooseExercise;
