

//Ionic
import {
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
} from "@ionic/react";

//utils
import { backend } from "../../../App";
import { ExerciseRegime, ExerciseRegimeInfo } from "../../../types/stateTypes";

interface WorkoutInfoDisplayProps {
    exerciseRegime: ExerciseRegime;
    // regimeInfo: ExerciseRegimeInfo;
}

function WorkoutInfoDisplay({ exerciseRegime }: WorkoutInfoDisplayProps) {
    let samplePhoto = "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

    return <>
        <section id="top-section" className="relative h-1/4">
            <div id="workout-info" className="text-white z-20 absolute flex flex-col justify-end h-full p-3">
                <p id="workout-name" className="text-xl font-semibold">{exerciseRegime.name}</p>
                <p className="text-sm">
                    <span id="workout-duration"></span>
                    <span id="exercise-count">{exerciseRegime.exercises.length} exercises</span>
                </p>
            </div>
            <img id="bg-banner" alt="banner image" src={backend.concat(exerciseRegime.media)} className=" z-0 absolute w-full h-full object-cover object-center"></img>
            <div className="h-full w-full bg-gradient-to-b from-transparent to-black z-10 absolute"></div>
        </section>
        <section id="exercises">
            <IonList>
                {exerciseRegime.exercises.map((item, index) => {
                    return <IonItem key={index}>
                        <IonThumbnail slot="start">
                            <img className="aspect-square object-cover" src={backend.concat(item.media)}></img>
                        </IonThumbnail>
                        <div>
                            <p>{item.name}</p>
                            <p className="text-xs text-slate-600">{exerciseRegime.exercises[index].reps.rep_count} reps</p>
                        </div>
                        {/* <IonLabel>{item.name}</IonLabel> */}
                    </IonItem>
                })}

            </IonList>
        </section>
    </>
}

export default WorkoutInfoDisplay;