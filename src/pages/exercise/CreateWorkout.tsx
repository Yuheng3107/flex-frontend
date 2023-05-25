import { useEffect, useState, useRef } from "react";

//utils
import { createUserPostAsync } from "../../utils/data/postData";
import { getAllExercisesAsync } from "../../utils/data/getExerciseData";
import { createExerciseRegimeAsync } from "../../utils/create/exerciseRegimeCreate";

//types
import { emptyExerciseData } from "../../types/stateTypes";

//custom hook
import { useFormInput } from "../../customHooks/useFormInput";

//ionic
import {
  add,
  caretBackOutline,
  caretForwardOutline,
  checkmarkOutline,
} from "ionicons/icons";
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
  useIonToast,
} from "@ionic/react";
import { exercises } from "../../App";
import { useHistory } from "react-router";

function CreateWorkout() {
  const [allExercises, setAllExercises] = useState([emptyExerciseData]);
  const [numberOfExercises, setNumberOfExercises] = useState(1);
  const [exercisesArr, setExercisesArr] = useState<number[]>([]);
  const [exercisesRepsArr, setExercisesRepsArr] = useState<number[]>([1]);

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
  }, [getAllExercisesAsync]);

  let exerciseSelects = [];
  for (let i = 0; i < numberOfExercises; i++) {
    exerciseSelects.push(
      <div className="flex flex-row w-full">
        <div className="w-3/4">
          <IonItem key={i}>
            <IonLabel position="stacked">Exercise {i + 1}</IonLabel>
            <IonSelect
              interface="popover"
              placeholder="Exercise"
              onIonChange={(e) => {
                setExercisesArr((prev) => {
                  let arr = [...prev];
                  arr[i] = e.target.value;
                  console.log(arr);
                  return arr;
                });
              }}
            >
              {allExercises.map((item) => {
                return (
                  <IonSelectOption key={item.id} value={item.id}>
                    {item.name}
                  </IonSelectOption>
                );
              })}
              {/* <IonSelectOption key={-1} value={-1}>Remove</IonSelectOption> */}
            </IonSelect>
          </IonItem>
        </div>

        <div className="flex flex-row items-end justify-center pb-2 w-1/4 ml-2">
          <button
            type="button"
            className="px-1 py-2 bg-gray-200 rounded-md flex justify-center items-center"
            onClick={() => {
              if (exercisesRepsArr[i] >= 2)
                setExercisesRepsArr((prev) => {
                  let arr = [...prev];
                  arr[i] = arr[i] - 1;
                  console.log(arr);
                  return arr;
                });
            }}
          >
            <IonIcon size="small" icon={caretBackOutline}></IonIcon>
          </button>
          <span className="text-2xl mx-3">{exercisesRepsArr[i]}</span>
          <button
            type="button"
            className="px-1 py-2 bg-gray-200 rounded-md flex justify-center items-center"
            onClick={() => {
              setExercisesRepsArr((prev) => {
                let arr = [...prev];
                arr[i] = arr[i] + 1;
                console.log(arr);
                return arr;
              });
            }}
          >
            <IonIcon size="small" icon={caretForwardOutline}></IonIcon>
          </button>
        </div>
      </div>
    );
  }

  function addExerciseHandler() {
    setNumberOfExercises((prev) => prev + 1);
    setExercisesRepsArr((prev) => [...prev, 1]);
  }

  async function submitHandler() {
    let errorFields = [];
    let imageTooLarge = false;

    // Check all the fields are filled in
    if (nameInputValue.trim() === "") {
      errorFields.push("name");
    }
    if (descriptionInputValue.trim() === "") {
      errorFields.push("description");
    }
    if (mediaInputRef.current!.files !== null) {
      //type guard to ensure that "files" isn't null
      console.log(mediaInputRef.current!.files);
      if (mediaInputRef.current!.files.length <= 0) {
        errorFields.push("image");
      }
    }
    if (
      exercisesArr.every((value) => value !== undefined) === false ||
      exercisesArr.length === 0
    ) {
      errorFields.push("exercises");
    }
    console.log(errorFields);

    //show toast if there are empty fields
    if (errorFields.length > 0) {
      // showing ion toast for missing fields
      let errorMessage = "";
      for (let i = 0; i < errorFields.length; i++)
        errorMessage.concat(`${errorFields[i]}, `);
      errorMessage.concat("cannot be empty!");
      present({
        message: errorMessage,
        duration: 1000,
        position: "top",
      });
      return;
    }

    //make imageFormData
    const imageFormData = new FormData();
    if (
      mediaInputRef.current!.files !== null &&
      mediaInputRef.current!.files[0] !== undefined
    ) {
      //type guard to ensure that the file isn't undefined
      imageFormData.append("media", mediaInputRef.current!.files[0]);
    }
    //make JSON for other fields
    let formDataJson = JSON.stringify({
      name: nameInputValue,
      text: descriptionInputValue,
      exercises: exercisesArr,
    });

    let set_count = [];
    for (let el of exercisesArr) set_count.push(0);
    let results = await createExerciseRegimeAsync(formDataJson, imageFormData, {
      exercises: exercisesArr,
      rep_count: exercisesRepsArr,
      set_count: set_count,
    });
    if (results !== undefined && results.res !== undefined && results.res.ok) {
      history.push(`/exercise/workout/${results.pk}`);
    }
  }

  function nameChangeHandler() {}
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/exercise">back</IonBackButton>
          </IonButtons>
          <IonTitle>Create Workout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <main className="pr-4">
          <form id="create-regime-form">
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                {/* <IonInput onChange={nameChangeHandler} placeholder="Enter Workout Name"></IonInput> */}
                <input
                  className="bg-transparent focus:outline-none w-full"
                  type="text"
                  placeholder="Enter Name"
                  {...nameInputProps}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Description</IonLabel>
                <input
                  className="bg-transparent focus:outline-none w-full"
                  type="text"
                  placeholder="Enter Description"
                  {...descriptionInputProps}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Banner Image</IonLabel>
                <input
                  type="file"
                  className="file-input"
                  ref={mediaInputRef}
                  onChange={(e) => {
                    if (
                      mediaInputRef.current!.files !== null &&
                      mediaInputRef.current!.files.length > 0
                    ) {
                      if (mediaInputRef.current!.files[0].size > 10000000) {
                        e.target.value = "";
                        present({
                          message: "Image cannot be larger than 10mb!",
                          duration: 1000,
                          position: "top",
                        });
                      }
                    }
                  }}
                />
              </IonItem>
              {exerciseSelects.map((item) => item)}
              <IonButton
                disabled={numberOfExercises >= 30 ? true : false}
                onClick={addExerciseHandler}
                fill="clear"
              >
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
  );
}

export default CreateWorkout;
