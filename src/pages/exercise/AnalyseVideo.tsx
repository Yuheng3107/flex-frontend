//React imports
import { useEffect, useState, useRef } from "react";

//ionic imports
import {
  IonContent,
  IonPage,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonSpinner,
} from "@ionic/react";

//components
import TextBox from "../../components/ui/TextBox";
import StartEndButton from "../../components/Exercise/StartEndButton";

//assets
import expandIcon from "../../assets/svg/expand-icon.svg";

//MoveNet
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
// import '@tensorflow/tfjs-backend-wasm';

//formCorrection
import * as formCorrection from "../../utils/formCorrection";
import getExercise from "../../utils/ExerciseAlgo/exericseAlgo";
import RepCountCircle from "../../components/Exercise/RepCountCircle";

// draw lines
import { RendererCanvas2d } from "../../components/Exercise/workout/renderer_canvas2d";

let isActive = false;

const AnalyseVideo = () => {
  const [repCount, setRepCount] = useState<number>(0);
  const [maxRepCount, setMaxRepCount] = useState<number>(10);
  const [feedbackLogShowing, setFeedbackLogShowing] = useState<boolean>(false);
  const [repFeedback, setRepFeedback] = useState<string>("");
  const [repFeedbackLog, setRepFeedbackLog] = useState<string[]>([]);
  const [generalFeedback, setGeneralFeedback] = useState<string>("");
  const [detector, setDetector] = useState<any>(undefined);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [frameCount, setFrameCount] = useState<number>(0);
  const [perfectRepCount, setPerfectRepCount] = useState<any>("");
  const [exerciseEnded, setExerciseEnded] = useState<boolean>(false);
  const [startButton, setStartButton] = useState<boolean>(true);
  const [videoURL, setVideoURL] = useState<string>("");

  const videoInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  let rendererCanvas: RendererCanvas2d;

  const toggleFeedbackLog = () => {
    setFeedbackLogShowing(!feedbackLogShowing);
  };

  useEffect(() => {}, []);
  const loadDetector = async () => {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    };
    let detectorObject = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    setDetector(detectorObject);
  };

  function fileInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    if (
      videoInputRef.current !== null &&
      videoInputRef.current.files !== null
    ) {
      console.log(videoInputRef.current.files);
    }
    if (videoInputRef.current !== null && videoInputRef.current.files !== null)
      setVideoURL(URL.createObjectURL(videoInputRef.current.files[0]));
    loadDetector();
  }

  const start = async () => {
    if (detector === undefined || videoRef.current === null) {
      window.alert("loading!");
      return;
    }
    // assign img height
    assignImgHeight();
    setGeneralFeedback("Loading...");
    // start the video
    videoRef.current.play();
    await delay(1);
    await detector.estimatePoses(videoRef.current);
    console.log("start");
    // reset local variables
    isActive = true;
    setFrameCount(0);
    setFeedback(["", ""]);

    // get from backend
    let exercise: any = getExercise(Number(1)); // EXERCISE ID??? TODO
    // initialise form correction
    formCorrection.init(
      exercise.evalPoses,
      exercise.scoreThreshold,
      exercise.scoreDeviation,
      exercise.angleWeights,
      exercise.angleThresholds,
      exercise.minRepTime,
      exercise.glossary,
      exercise.minSwitchPoseCount
    );

    while (isActive) {
      let poses = await detector.estimatePoses(videoRef.current);
      await delay(1);
      // add lines
      rendererCanvas.draw([videoRef.current, poses, false]);
      // process raw data
      let newFeedback = formCorrection.run(poses);
      if (newFeedback[0] !== "") {
        let newRepCount = newFeedback[0].slice(-1)[0].match(/\d+/)[0];
        console.log(newFeedback[0][0]);
        setRepCount(newRepCount);

        setRepFeedback(newFeedback[0].slice(-1));
        setRepFeedbackLog(newFeedback[0]);
      }
      if (newFeedback[1] !== feedback[1]) setGeneralFeedback(newFeedback[1]);
      setFeedback(newFeedback);
      setFrameCount(frameCount + 1);
    }
  };

  /**
   * Ends Exercise
   */
  const end = () => {
    isActive = false;
    console.log("End");
    let completedFeedback = formCorrection.endExercise();
    setRepFeedback(completedFeedback[0]);
    setPerfectRepCount(completedFeedback[1]);
    setGeneralFeedback("Exercise ended");
    setExerciseEnded(true);
    console.log(completedFeedback);
  };

  /*--------------------
  HELPER FUNCTIONS
  --------------------*/
  async function delay(ms: number) {
    // return await for better async stack trace support in case of errors.
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }
  const assignImgHeight = () => {
    if (videoRef.current === null || canvas.current === null) return;
    console.log("set");
    // set explicit width and height for canvas
    [canvas.current.width, canvas.current.height] = [
      videoRef.current.width,
      videoRef.current.height,
    ];

    // get the width and height of the camera (which is used as the basis for tf keypoint calculations)
    let cameraWidth = videoRef.current.videoWidth;
    let cameraHeight = videoRef.current.videoHeight;
    rendererCanvas = new RendererCanvas2d(
      canvas.current,
      cameraWidth,
      cameraHeight
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Analyse Video</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {videoURL === "" ? (
          <IonButton>
            Upload Video
            <input
              ref={videoInputRef}
              type="file"
              className="opacity-0 z-10 absolute"
              onChange={fileInputHandler}
              accept="video/*"
            ></input>
          </IonButton>
        ) : (
          <>
            <canvas ref={canvas} className="absolute z-10 w-full"></canvas>
            <video
              src={videoURL}
              ref={videoRef}
              height={videoRef.current?.videoHeight}
              width={videoRef.current?.videoWidth}
              className="w-full"
              onEnded={() => end()}
            />
          </>
        )}

        <div id="scatter-gl-container" className="hidden"></div>
        <div className="exercise-feedback flex flex-col items-center p-5 w-full">
          <RepCountCircle repCount={repCount} repCountInput={maxRepCount} />

          <TextBox className="flex flex-col justify-between bg-zinc-100 pt-3 pb-0 w-4/5 mt-3">
            {feedbackLogShowing}
            {repFeedback}
            <button
              onClick={toggleFeedbackLog}
              className="flex flex-row items-center justify-center"
              id="show-log-button"
            >
              <span className="text-zinc-400">Show Feedback Log</span>
              <img
                className={`${feedbackLogShowing && "rotate-180"} `}
                src={expandIcon}
                alt="expand icon"
                height="36"
                width="36"
              />
            </button>
            {feedbackLogShowing && (
              <span className="mt-1">{repFeedbackLog}</span>
            )}
          </TextBox>

          <TextBox className="bg-zinc-100 p-3 w-4/5 mt-3">
            {generalFeedback}
          </TextBox>
        </div>
        <div id="button-container" className="flex justify-center pb-20">
          {detector === undefined || videoRef === null ? (
            <IonSpinner />
          ) : (
            <StartEndButton
              detector={detector}
              start={start}
              end={end}
              startButton={startButton}
              setButton={setStartButton}
              repCount={repCount}
              perfectRepCount={perfectRepCount}
            />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AnalyseVideo;
