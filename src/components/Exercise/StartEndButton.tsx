import Button from "../ui/Button";

import PlayIcon from "../../assets/svgComponents/playIcon";
import StopIcon from "../../assets/svgComponents/stopIcon";

import { backend } from "../../App";

//redux imports
import { useAppSelector } from "../../store/hooks";

function StartEndButton({detector, start, end, startButton, setButton, repCount, perfectRepCount}:{detector:any, start:()=>void, end:()=>void, startButton:boolean, setButton:any, repCount: number, perfectRepCount: number}) {
  const profileDataRedux = useAppSelector((state) => state.profile.profileData);
  function startButtonHandler(event:any) {
    if (detector === null) {
      window.alert("loading!");
    } else {
      start();
      setButton(false);
    }
    // console.log(props.parentState.detector);
    // props.start();
    // props.setState({
    //     startButton: false
    // })
  }

  function endButtonHandler(event:any) {
    console.log(
      JSON.stringify({
        exercise_id: 1,
        total_reps: Number(repCount),
        perfect_reps: Number(perfectRepCount),
      })
    );
    end();
    setButton(true);
    fetch(`${backend}/exercises/exercise_statistics/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": String(
          document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]
        ),
      },
      credentials: "include",
      body: JSON.stringify({
        exercise_id: 1,
        total_reps: Number(repCount),
        perfect_reps: Number(perfectRepCount),
      }),
    })
      .then((response) => {
        // do something with response
        console.log(response);
        return response.json();
      })
      .then((body) => {
        console.log(body);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Button
        onClick={startButtonHandler}
        className={`${
          startButton ? "" : "hidden"
        } bg-blue-400 w-16 h-16 mx-2 text-zinc-900
      flex justify-center items-center p-0 aspect-square`}
      >
        <PlayIcon className="h-14 w-14 fill-white" />
      </Button>
      <Button
        onClick={endButtonHandler}
        className={`${
          startButton ? "hidden" : ""
        } bg-amber-300 w-16 h-16 mx-2 text-zinc-900
      flex justify-center items-center p-0 aspect-square`}
      >
        <StopIcon className="h-14 w-14 fill-white" />
      </Button>
    </>
  );
}

export default StartEndButton;
