
import { useEffect, useState, useRef } from 'react';

//utils
import { createUserPostAsync } from '../../utils/data/postData';
import { getAllExercisesAsync } from '../../utils/data/getExerciseData';
import { createExerciseRegimeAsync } from '../../utils/create/exerciseRegimeCreate';

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
    IonFabButton,
    useIonToast
} from '@ionic/react';
import { exercises } from '../../App';
import { useHistory } from 'react-router';

function CreateWorkout() {
    const [allExercises, setAllExercises] = useState([emptyExerciseData]);
    const [numberOfExercises, setNumberOfExercises] = useState(1);
    const [exercisesArr, setExercisesArr] = useState<number[]>([]);

    const [nameInputProps, nameInputValue] = useFormInput();
    const [descriptionInputProps, descriptionInputValue] = useFormInput();
    const mediaInputRef = useRef<HTMLInputElement>(null);

    const history = useHistory();

    const [present] = useIonToast();
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
            <IonLabel position="stacked">Exercise {i + 1}</IonLabel>
            <IonSelect interface="popover" placeholder="Exercise Exercise"
                onIonChange={(e) => {
                    setExercisesArr(prev => {
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

    async function submitHandler() {
        let errorFields = [];
        let imageTooLarge = false;

        // Check all the fields are filled in
        if (nameInputValue.trim() === "") {
            errorFields.push("name");
        }
        if (descriptionInputValue.trim() === "") {
            errorFields.push("description")
        }
        if (mediaInputRef.current!.files !== null) { //type guard to ensure that "files" isn't null
            console.log(mediaInputRef.current!.files)
            if (mediaInputRef.current!.files.length <= 0) {
                errorFields.push("image")
            }
        }
        if (exercisesArr.every((value) => value !== undefined) === false || exercisesArr.length === 0) {
            errorFields.push("exercises")
        }
        console.log(errorFields);

        //show toast if there are empty fields
        if (errorFields.length > 0) {
            // showing ion toast for missing fields
            let errorMessage = ""
            for (let i = 0; i < errorFields.length; i++) errorMessage.concat(`${errorFields[i]}, `)
            errorMessage.concat("cannot be empty!");
            present({
                message: errorMessage,
                duration: 1000,
                position: "top"
            })
            return;
        }

        //make imageFormData
        const imageFormData = new FormData();
        if (mediaInputRef.current!.files !== null && mediaInputRef.current!.files[0] !== undefined) { //type guard to ensure that the file isn't undefined
            imageFormData.append("media", mediaInputRef.current!.files[0])
        }
        //make JSON for other fields
        let formDataJson = JSON.stringify({
            name: nameInputValue,
            text: descriptionInputValue,
            exercises: exercisesArr
        })
        let results = await createExerciseRegimeAsync(formDataJson, imageFormData);
        if (results !== undefined && results.res !== undefined && results.res.ok) {
            history.push(`/exercise/workout/${results.pk}`);
        }
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
                            <input className="bg-transparent focus:outline-none w-full" type="text" placeholder="Enter Description" {...descriptionInputProps} />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Banner Image</IonLabel>
                            <input type="file" ref={mediaInputRef} onChange={(e) => {
                                if (mediaInputRef.current!.files !== null && mediaInputRef.current!.files.length > 0) {
                                    if (mediaInputRef.current!.files[0].size > 10000000) {
                                        e.target.value = "";
                                        present({
                                            message: "Image cannot be larger than 10mb!",
                                            duration: 1000,
                                            position: "top"
                                        })
                                    }
                                };
                            }} />
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