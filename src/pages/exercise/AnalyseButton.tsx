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
      className={
        buttonVisible
          ? "bg-[#FC6111] text-white p-4 text-[20px] font-medium"
          : "hidden"
      }
      onClick={startVideoHandler}
    >
      Analyze
    </Button>
  );
}
