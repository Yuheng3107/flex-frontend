import { backend } from "../../App";

export const createExerciseRegimeAsync = async (formDataJson: string, imageFormData: FormData) => {
    try {
        let res: Response | undefined = await fetch(`${backend}/exercises/exercise_regime/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": String(
                    document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]
                ),
            },
            credentials: "include",
            body: formDataJson,
        })
        let pk: number = await res.json();

        console.log(res);
        console.log(pk);
        if (res.ok) {
            res = await updateExerciseRegimeImageAsync(pk, imageFormData);
            console.log(res);
        }
        return {
            pk: pk,
            res
        }

    } catch (err) {
        console.log(err);
    }
}

export const updateExerciseRegimeImageAsync = async (pk: number, imageFormData: FormData) => {
    try {
        let res = await fetch(`${backend}/exercises/exercise_regime/update/media/${pk}`, {
            method: "POST",
            headers: {
                "X-CSRFToken": String(
                    document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]
                ),
            },
            credentials: "include",
            body: imageFormData,
        })
        console.log(res);
        return res

    } catch (err) {
        console.log(err);
    }
}