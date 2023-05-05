import { useEffect, useState } from "react";

import { useHistory } from "react-router";

//ionic imports
import {
  IonContent,
  IonPage,
  IonItem,
  IonButton,
  IonIcon
} from "@ionic/react";

import { addCircleOutline, addOutline } from "ionicons/icons";

//redux imports
import { useAppSelector } from "../../store/hooks";
import { useAppDispatch } from "../../store/hooks";
import { exerciseDataActions } from "../../store/exerciseDataSlice";

//components
import { backend } from "../../App";
import ExerciseCard from "../../components/Exercise/ExerciseCard";
import WorkoutCard from "../../components/Exercise/workout/WorkoutCard";

import AddIcon from "../../assets/svgComponents/AddIcon";

//utils
import { getExerciseListAsync, getExerciseRegimeAsync } from "../../utils/data/getExerciseData";

//types
import { ObjExerciseRegimesInfo } from "../../types/stateTypes";
import { ExerciseData } from "../../types/stateTypes";

const ChooseExercise = () => {

  const [exerciseCardArray, setExerciseCardArray] = useState<ExerciseData[]>([]);
  const [regimeCardArray, setRegimeCardArray] = useState<any[]>([]);
  const exerciseStatsRedux = useAppSelector(state => state.exerciseStats)
  const dispatch = useAppDispatch();
  const history = useHistory();
  useEffect(() => {
    console.log("useEffect running");
    async function getRegimesData() {
      let regimesDataArray = [];
      let regimesDataObject: ObjExerciseRegimesInfo = {};
      for (let regimeId of exerciseStatsRedux.exercise_regimes) {
        let data = await getExerciseRegimeAsync(Number(regimeId));
        console.log(data);
        let exercisesData = await getExerciseListAsync(data.exercises);
        data.exercises = exercisesData;
        console.log(data);
        regimesDataArray.push(data);

        // 'keyof...' is to overcome a typescript error
        regimesDataObject[data.id as keyof typeof regimesDataObject] = data;
      }
      console.log(regimesDataObject);
      dispatch(exerciseDataActions.setExerciseRegimesInfo(regimesDataObject));
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
  }, [backend, exerciseStatsRedux])

  let samplePhoto = "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

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
            {regimeCardArray.map((regimeInfo) => (
              <WorkoutCard key={regimeInfo.id} name={regimeInfo.name} likes={regimeInfo.likes} media={regimeInfo.media || samplePhoto} exercises={regimeInfo.exercises} exerciseRegimeId={regimeInfo.id} />
            ))}
          </section>
          <section id="Exercises-container">
            <p className="text-xl mb-2">Exercises</p>
            <div className="flex flex-row">
              {exerciseCardArray.map((cardInfo) => (
                <ExerciseCard key={cardInfo.id} name={cardInfo.name} likes={cardInfo.likes} media={cardInfo.media} exerciseId={cardInfo.id} />
              ))}
            </div>

          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default ChooseExercise;
