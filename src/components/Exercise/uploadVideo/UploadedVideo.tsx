import { memo } from "react";
const UploadedVideo: any = memo(function UploadedVideo({
  videoURL,
  videoInputRef,
}: {
  videoURL: any;
  videoInputRef: any;
}) {
  return (
    <video
      src={videoURL}
      ref={videoInputRef}
      controls
      autoPlay
      height={videoInputRef.current?.videoHeight}
      width={videoInputRef.current?.videoWidth}
      className="w-full"
    />
  );
});

export default UploadedVideo;
