import React, { useState } from "react";
import Button from "../../components/ui/Button";

export default function AnalyseButton({
  detector,
  start,
}: {
  detector: any;
  start: () => void;
}) {
  const [buttonVisible, setButtonVisible] = useState(true);
  const startVideoHandler = () => {
    if (detector === null) {
      window.alert("loading!");
    } else {
      start();
      // hide Button
      setButtonVisible(false);
    }
  };

  return (
    <Button
      className={buttonVisible ? "exercise-button" : "hidden"}
      onClick={startVideoHandler}
    >
      Analyze
    </Button>
  );
}
