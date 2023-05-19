import { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";

//ionic imports
import { IonSpinner } from "@ionic/react";

//components
import TextBox from "../ui/TextBox";
import StartEndButton from "./StartEndButton";

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
import RepCountCircle from "./RepCountCircle";

// draw lines
import { RendererCanvas2d } from "./workout/renderer_canvas2d";

// params
import * as params from "./workout/params";

// mobile detection
import { isMobile } from "./workout/util";

let isActive: boolean = false;

const VideoFeed = ({
  repCountInput,
  exerciseId,
  completeExerciseButton,
  exerciseData,
}: {
  repCountInput: number;
  exerciseId: number;
  completeExerciseButton: any;
  exerciseData: any;
}) => {
  const [repCount, setRepCount] = useState<number>(0);
  const [maxRepCount, setMaxRepCount] = useState<number>(1);
  const [feedbackLogShowing, setFeedbackLogShowing] = useState<boolean>(false);
  const [repFeedback, setRepFeedback] = useState<string>("");
  const [repFeedbackLog, setRepFeedbackLog] = useState<string[]>([]);
  const [generalFeedback, setGeneralFeedback] = useState<string>("");
  const [detector, setDetector] = useState<any>(null);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [frameCount, setFrameCount] = useState<number>(0);
  const [perfectRepCount, setPerfectRepCount] = useState<any>("");
  const [exerciseEnded, setExerciseEnded] = useState<boolean>(false);
  const [startButton, setStartButton] = useState<boolean>(true);

  const webcam = useRef<Webcam>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  let rendererCanvas: RendererCanvas2d;

  useEffect(() => {
    loadDetector();
  }, []);

  const toggleFeedbackLog = () => {
    setFeedbackLogShowing(!feedbackLogShowing);
  };

  const determineButtonDisplay = () => {
    const startEndButton = (
      <StartEndButton
        detector={detector}
        start={start}
        end={end}
        startButton={startButton}
        setButton={setStartButton}
        repCount={repCount}
        perfectRepCount={perfectRepCount}
      />
    );
    if (exerciseEnded) {
      if (completeExerciseButton !== null) return completeExerciseButton;
      else return startEndButton;
    } else {
      if (detector === null || webcam.current?.video === null) {
        return <IonSpinner />;
      } else {
        return startEndButton;
      }
    }
  };

  /*--------------------
  EXERCISE FUNCTIONS
  --------------------*/
  /**
   * loads detector
   */
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
  /**
   * starts exercise
   */
  const start = async () => {
    if (detector === null) return window.alert("loading!");
    assignImgHeight();
    if (webcam.current === null || rendererCanvas === undefined)
      return window.alert("video error");

    setGeneralFeedback("Loading...");
    await delay(1);
    await detector.estimatePoses(webcam.current.video);
    console.log("start");
    setMaxRepCount(3);
    setRepFeedback("");
    setRepCount(3);
    setGeneralFeedback("Exercise begins in 3s, please get into position.");

    //allow the feedback to update to loading, and user to get into position
    await delay(1000);
    setRepCount(2);
    setGeneralFeedback("Exercise begins in 2s, please get into position.");
    await delay(1000);
    setRepCount(1);
    setGeneralFeedback("Exercise begins in 1s, please get into position.");
    await delay(1000);
    setRepCount(0);
    setGeneralFeedback("Exercise begin!");
    setMaxRepCount(repCountInput);

    // reset local variables
    isActive = true;
    setFrameCount(0);
    setFeedback(["", ""]);

    // get from backend
    let exercise: any = getExercise(exerciseId);
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

    while (isActive === true) {
      let poses = await detector.estimatePoses(webcam.current.video);
      await delay(1);
      // add lines
      rendererCanvas.draw([webcam.current.video, poses, false]);
      // process raw data
      let newFeedback = formCorrection.run(poses);
      if (newFeedback[0] !== "") {
        let newRepCount = newFeedback[0].slice(-1)[0].match(/\d+/)[0];
        console.log(newFeedback[0][0]);
        setRepCount(newRepCount);
        setRepFeedback(newFeedback[0].slice(-1));
        setRepFeedbackLog(newFeedback[0]);
      }
      if (newFeedback[1] != feedback[1]) setGeneralFeedback(newFeedback[1]);
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
    if (
      webcam.current === null ||
      webcam.current.video === null ||
      canvas.current === null
    )
      return;

    // set explicit width and height for canvas
    [canvas.current.width, canvas.current.height] = [
      webcam.current.video.width,
      webcam.current.video.height,
    ];

    // get the width and height of the camera (which is used as the basis for tf keypoint calculations)
    let cameraWidth = webcam.current.video.videoWidth;
    let cameraHeight = webcam.current.video.videoHeight;
    rendererCanvas = new RendererCanvas2d(
      canvas.current,
      cameraWidth,
      cameraHeight
    );
  };
  return (
    <div className="relative h-full">
      <div className="relative" id="video-feed">
        <canvas ref={canvas} className="absolute z-10 w-full"></canvas>
        <Webcam
          videoConstraints={{
            facingMode: "user",
          }}
          mirrored={true}
          ref={webcam}
          height={webcam.current?.video?.videoHeight}
          width={webcam.current?.video?.videoWidth}
          className="w-full"
        />

        <div id="scatter-gl-container" className="hidden"></div>
      </div>

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
          {feedbackLogShowing && <span className="mt-1">{repFeedbackLog}</span>}
        </TextBox>

        <TextBox className="bg-zinc-100 p-3 w-4/5 mt-3">
          {generalFeedback}
        </TextBox>
      </div>
      <div id="button-container" className="flex justify-center pb-20">
        {/* {this.state.detectorLoading ?
          <IonSpinner></IonSpinner>
          :
          <StartEndButton detector={this.state.detector} start={this.start} end={this.end} startButton={this.state.startButton} setState={this.setState} parentState={this.state} />
        } */}
        {determineButtonDisplay()}
      </div>
    </div>
  );
};

export default VideoFeed;
