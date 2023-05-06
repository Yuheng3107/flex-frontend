import { backend } from "../../App";
import { ExerciseData } from "../../types/stateTypes";
import { ExerciseRegimeInfoUnit } from "../../types/stateTypes";

export const getExerciseAsync = async function (pk: Number) {
  try {
    let res = await fetch(`${backend}/exercises/exercise/${pk}`, {
      method: "GET",
      credentials: "include", // include cookies in the request
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]),
      },
    })
    let data = await res.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

export const getExerciseListAsync = async function (pkArr: Number[]) {
  try {
    let res = await fetch(`${backend}/exercises/exercise/list`, {
      method: "POST",
      credentials: "include", // include cookies in the request
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]),
      },
      body: JSON.stringify({
        exercises: pkArr
      })
    })
    let data = await res.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

//Fetch all the exercises in the db
export async function getAllExercisesAsync() {
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
    return data
  } catch (error) {
    console.error(error);
  }
}

//Get data about ExerciseRegime (name, id, image, etc)
export const getExerciseRegimeAsync = async function (pk: Number) {
  try {
    let res = await fetch(`${backend}/exercises/exercise_regime/${pk}`, {
      method: "GET",
      credentials: "include", // include cookies in the request
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]),
      },
    })
    let data = await res.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

// fills the array of exercises in the ExerciseRegime with the appropriate information
export const getExerciseRegimeWithExercisesAsync = async function (pk: number) {
  try {
    let regimeData = await getExerciseRegimeAsync(pk);
    let exercisesData = await getExerciseListAsync(regimeData.exercises);
    let regimeReps = await getExerciseRegimeInfoAsync(pk);
    let exercisesDataArr: ExerciseData[] = [];
    //modify exerciseData such that each element's id is the same as its index in the array 
    // (eg.Squats has id:1, it becomes the 2nd element in the array)
    exercisesData.forEach((item: ExerciseData) => exercisesDataArr[item.id] = item)

    //modify regimeData such that the array of exercises is now populated with the details of each exercise
    //Also add the number of reps to each element
    regimeData.exercises = regimeData.exercises.map((el: number, index: number) => {
      let element: any = {...exercisesDataArr[el]};
      element.reps = regimeReps[index];
      return element
    });
    return regimeData;
  } catch (error) {
    console.log(error);
  }


}

//To get the info about the number of reps of each exercise
export const getExerciseRegimeInfoAsync = async function (pk: number) {
  try {
    let res = await fetch(`${backend}/exercises/exercise_regime_info/${pk}`, {
      method: "GET",
      credentials: "include", // include cookies in the request
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]),
      },
    })
    let data = await res.json();
    //sort the array to ensure that "order" is in ascending
    data.sort((a: ExerciseRegimeInfoUnit, b: ExerciseRegimeInfoUnit) => a.order > b.order ? 1 : -1);
    return data
  } catch (error) {
    console.log(error);
  }
}