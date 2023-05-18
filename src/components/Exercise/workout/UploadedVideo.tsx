export default function UploadedVideo({videoFile,}: {videoFile: File | null;}) {
  if (videoFile === null) {
    return <video src=""></video>;
  }

  const videoURL = URL.createObjectURL(videoFile);
  return <video src={videoURL} controls autoPlay></video>;
}
