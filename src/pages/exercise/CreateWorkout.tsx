
import { useEffect, useState } from 'react';

//utils
import { createUserPostAsync } from '../../utils/data/postData';
import { createExerciseRegimAsync, getAllExercisesAsync } from '../../utils/data/getExerciseData';

//types
import { emptyExerciseData } from '../../types/stateTypes';
//ionic
import { add } from 'ionicons/icons';
import {
    IonPage,
    IonContent,
    IonButton,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonHeader,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption
} from '@ionic/react';
import { exercises } from '../../App';

function CreateWorkout() {
    const [allExercises, setAllExercises] = useState([emptyExerciseData]);
    const [numberOfExercises, setNumberOfExercises] = useState(1);

    useEffect(() => {
        async function fetchAllExercisesInfo() {
            const data = await getAllExercisesAsync();
            setAllExercises(data);
            console.log(data);
        }
        fetchAllExercisesInfo();
    }, [getAllExercisesAsync])

    let exerciseSelects = [];
    for (let i = 0; i < numberOfExercises; i++) {
        exerciseSelects.push(<IonItem>
            <IonLabel position="stacked">Exercises</IonLabel>
            <IonSelect interface="popover" placeholder="Exercise Exercise">
                {allExercises.map(item => {
                    return <IonSelectOption value={item.id}>{item.name}</IonSelectOption>
                })}
            </IonSelect>
        </IonItem>);
    }

    function addExerciseHandler() {
        setNumberOfExercises(prev => prev + 1);
    }
    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/exercise">back</IonBackButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <main>
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">Name</IonLabel>
                        <IonInput placeholder="Enter Workout Name"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Description</IonLabel>
                        <IonInput placeholder="Enter Description"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Exercises</IonLabel>
                        <IonSelect interface="popover" placeholder="Exercise Exercise">
                            {allExercises.map(item => {
                                return <IonSelectOption value={item.id}>{item.name}</IonSelectOption>
                            })}
                        </IonSelect>
                    </IonItem>
                    {exerciseSelects.map(item => item)}
                    <IonButton onClick={addExerciseHandler} fill="clear">
                        <IonIcon slot="icon-only" icon={add}></IonIcon>
                    </IonButton>
                </IonList>
            </main>
        </IonContent>
    </IonPage>
}

export default CreateWorkout;