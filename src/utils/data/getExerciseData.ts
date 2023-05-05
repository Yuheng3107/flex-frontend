import { backend } from "../../App";
import { ExerciseRegimeInfo, emptyExerciseRegime } from "../../types/stateTypes";

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
    console.log(data);
    return data
  } catch (error) {
    console.log(error);
  }
}

// fills the array of exercises in the ExerciseRegime with the appropriate information
export const getExerciseRegimeWithExercisesAsync = async function (pk: Number) {
  try {
    // let regimeData: ExerciseRegimeInfo = emptyExerciseRegime;
    let regimeData = await getExerciseRegimeAsync(Number(pk));
    let exercisesData = await getExerciseListAsync(regimeData.exercises);
    regimeData.exercises = exercisesData;
    return regimeData;
  } catch (error) {
    console.log(error);
  }


}