//React imports
import { useEffect, useState } from "react";
import { backend } from "../../App";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/react";

import Header from "../../components/ui/Header";
//component imports
import ExerciseOptions from "../../components/Exercise/ExerciseOptions";
import VideoFeed from "../../components/Exercise/video";
import { RouteComponentProps } from "react-router";

interface ExercisePageProps
  extends RouteComponentProps<{
    exerciseId: string;
  }> {}

const ExercisePage: React.FC<ExercisePageProps> = ({ match }) => {
  console.log(match.params.exerciseId);
  const [isExercising, setIsExercising] = useState(false);
  const [repCountInput, setRepCountInput] = useState<number>(10);
  const [exerciseName, setExerciseName] = useState<string>(
    "Exercise Name (Placeholder)"
  );
  function startExerciseHandler(event: React.MouseEvent<HTMLButtonElement>) {
    setIsExercising(true);
  }

  const repIncrementHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRepCountInput((prevState) => {
      return prevState + 1;
    });
  };
  const repDecrementHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (repCountInput > 1) {
      setRepCountInput((prevState) => {
        return prevState - 1;
      });
    }
  };
  useEffect(() => {
    fetch(`${backend}/exercises/exercise/${Number(match.params.exerciseId)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": String(
          document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]
        ),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setExerciseName(data?.name);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <IonPage>
      <Header title={exerciseName}></Header>
      <IonContent fullscreen>
        <main className="w-full h-full">
          {isExercising ? (
            <VideoFeed
              repCountInput={repCountInput}
              exerciseId={Number(match.params.exerciseId)}
              completeExerciseButton={null}
              exerciseData={null}
            />
          ) : (
            <ExerciseOptions
              startExerciseHandler={startExerciseHandler}
              repDecrementHandler={repDecrementHandler}
              repIncrementHandler={repIncrementHandler}
              repCountInput={repCountInput}
            />
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default ExercisePage;
