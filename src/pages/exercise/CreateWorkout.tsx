
import { useEffect, useState, useRef } from 'react';

//utils
import { createUserPostAsync } from '../../utils/data/postData';
import { createExerciseRegimAsync, getAllExercisesAsync } from '../../utils/data/getExerciseData';

//types
import { emptyExerciseData } from '../../types/stateTypes';

//custom hook
import { useFormInput } from '../../customHooks/useFormInput';

//ionic
import { add, checkmarkCircleOutline, checkmarkOutline } from 'ionicons/icons';
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
    IonSelectOption,
    IonTitle,
    IonFab,
    IonFabButton
} from '@ionic/react';
import { exercises } from '../../App';

function CreateWorkout() {
    const [allExercises, setAllExercises] = useState([emptyExerciseData]);
    const [numberOfExercises, setNumberOfExercises] = useState(1);
    const [exercisesArr, setExercisesArr] = useState<number[]>([]);

    const [nameInputProps, nameInputValue] = useFormInput();
    const [descriptionInputProps, descriptionInputValue] = useFormInput();
    const mediaInputRef = useRef<HTMLInputElement>(null);

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
        exerciseSelects.push(<IonItem key={i} >
            <IonLabel position="stacked">Exercise {i + 1} <button>help</button></IonLabel>
            <IonSelect interface="popover" placeholder="Exercise Exercise"
            onIonChange={(e)=> {
                setExercisesArr(prev=>{
                    let arr = [...prev];
                    arr[i] = e.target.value;
                    console.log(arr);
                    return arr;
                })
            }}>
                {allExercises.map(item => {
                    return <IonSelectOption key={item.id} value={item.id}>{item.name}</IonSelectOption>
                })}
                {/* <IonSelectOption key={-1} value={-1}>Remove</IonSelectOption> */}
            </IonSelect>
        </IonItem>);
    }

    function addExerciseHandler() {
        setNumberOfExercises(prev => prev + 1);
    }

    function submitHandler() {
        let errorFields = []
        if (nameInputValue.trim() === "") {
            errorFields.push("name");
        }
        if (descriptionInputValue.trim() === "") {
            errorFields.push("description")
        }
        if (mediaInputRef.current!.files !== null) {
            if (mediaInputRef.current!.files.length <= 0) {
                errorFields.push("image")
            }
        }
        console.log(errorFields);
    }

    function nameChangeHandler() {

    }
    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/exercise">back</IonBackButton>
                </IonButtons>
                <IonTitle>
                    Create Workout
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <main className="pr-4">
                <form id="create-regime-form">
                    <IonList>
                        <IonItem>
                            <IonLabel position="stacked">Name</IonLabel>
                            {/* <IonInput onChange={nameChangeHandler} placeholder="Enter Workout Name"></IonInput> */}
                            <input className="bg-transparent focus:outline-none w-full" type="text" placeholder="Enter Name" {...nameInputProps} />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Description</IonLabel>
                            <input className="bg-transparent focus:outline-none w-full" type="text" placeholder="Enter Name" {...descriptionInputProps} />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Banner Image</IonLabel>
                            <input type="file" ref={mediaInputRef} onChange={(e) => console.log(mediaInputRef.current?.files)} />
                        </IonItem>
                        {exerciseSelects.map(item => item)}
                        <IonButton disabled={numberOfExercises >= 30 ? true : false} onClick={addExerciseHandler} fill="clear">
                            <IonIcon slot="icon-only" icon={add}></IonIcon>
                        </IonButton>
                    </IonList>
                </form>
            </main>
            <IonFab slot="fixed" vertical="bottom" horizontal="end">
                <IonFabButton onClick={submitHandler}>
                    <IonIcon icon={checkmarkOutline}></IonIcon>
                </IonFabButton>
            </IonFab>
        </IonContent>
    </IonPage>
}

export default CreateWorkout;