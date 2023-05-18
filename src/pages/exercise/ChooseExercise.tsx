import { useEffect, useState, useRef } from "react";

import { useHistory } from "react-router";

//ionic imports
import {
  IonContent,
  IonPage,
  IonItem,
  IonButton,
  IonIcon,
  IonFab,
  IonFabList,
  IonFabButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  useIonModal
} from "@ionic/react";

import { addCircleOutline, addOutline, closeOutline, cloudUpload, cloudUploadOutline } from "ionicons/icons";

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
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";

const ChooseExercise = () => {

  const [exerciseCardArray, setExerciseCardArray] = useState<ExerciseData[]>([]);
  const [regimeCardArray, setRegimeCardArray] = useState<any[]>([]);
  const exerciseStatsRedux = useAppSelector(state => state.exerciseStats)
  const videoInputRef = useRef<HTMLInputElement>(null)

  //modal
  const [presentModal, dismissModal] = useIonModal(VideoUploadModal, {
    onDismiss: (data: string, role: string) => dismissModal(data, role),
    videoFile: videoInputRef.current !== null && videoInputRef.current.files !== null ? videoInputRef.current.files[0] : null
  });

  function openModal() {
    presentModal({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => { }
    })
  }

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
  }, [backend, exerciseStatsRedux])

  function fileInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    // history.push('exercise/upload')
    if (videoInputRef.current !== null && videoInputRef.current.files !== null) {
      console.log(videoInputRef.current.files[0]);
    }
    openModal();
  }

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
          <IonFabButton>
            <IonIcon icon={cloudUploadOutline}></IonIcon>
            <input ref={videoInputRef} type="file" className="opacity-0 z-10 absolute" onChange={fileInputHandler} accept="video/*"></input>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

const VideoUploadModal = ({ onDismiss, videoFile }: {
  //define the type of props received
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
  videoFile: File | null;
}) => {
  console.log(videoFile)
  return <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={() => onDismiss(null, 'cancel')}>
            <IonIcon icon={closeOutline}></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      Analyze Exercise here
    </IonContent>
  </IonPage>
}

export default ChooseExercise;
