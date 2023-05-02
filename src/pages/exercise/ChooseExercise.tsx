import { useEffect, useState } from "react";

//ionic imports
import {
  IonContent,
  IonPage,
  IonItem
} from "@ionic/react";

//redux imports
import { useAppSelector } from "../../store/hooks";

import { backend } from "../../App";
import ExerciseCard from "../../components/Exercise/ExerciseCard";
import WorkoutCard from "../../components/Exercise/WorkoutCard";

//utils
import { getExerciseRegimeAsync } from "../../utils/data/getExerciseData";

type ExerciseInfo = {
  id: number;
  likers: number[];
  likes: number;
  media: string;
  name: string;
  perfect_reps: number;
  posted_at: "string";
  poster: number;
  shared_id: number;
  shared_type: number;
  tags: string[];
  text: string;
  total_reps: number;
}

const ChooseExercise = () => {

  const [exerciseCardArray, setExerciseCardArray] = useState<ExerciseInfo[]>([]);
  const [regimeCardArray, setRegimCardArray] = useState<any[]>([]);
  const exerciseStatsRedux = useAppSelector(state => state.exerciseStats)
  useEffect(() => {
    console.log("useEffect running");
    async function getRegimesData() {
      let regimeDataArray = [];
      for (let regimeId of exerciseStatsRedux.exercise_regimes) {
        let data = await getExerciseRegimeAsync(Number(regimeId));
        regimeDataArray.push(data);
      }
      console.log(regimeDataArray);
      setRegimCardArray(regimeDataArray);
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
        <IonItem routerLink="/exercise/placeholder">
          Start
        </IonItem>
        <section id="workouts-container">
          <p>Workouts</p>
          {regimeCardArray.map((regimeInfo) => (
            <WorkoutCard key={regimeInfo.id} name={regimeInfo.name} likes={regimeInfo.likes} media={regimeInfo.media || samplePhoto} exercises={regimeInfo.exercises} exerciseRegimeId={1} />
          ))}
        </section>
        <section id="Exercises-container">
          <p>Exercises</p>
          <div className="flex flex-row">
            {exerciseCardArray.map((cardInfo) => (
              <ExerciseCard key={cardInfo.id} name={cardInfo.name} likes={cardInfo.likes} media={cardInfo.media} exerciseId={cardInfo.id} />
            ))}
          </div>

        </section>
      </IonContent>
    </IonPage>
  );
};

export default ChooseExercise;
