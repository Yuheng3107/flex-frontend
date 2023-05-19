export default function UploadedVideo({
  videoFile,
}: {
  videoFile: File | null;
}) {
  if (videoFile === null) {
    return <h1>Video not working</h1>;
  }

  const videoURL = URL.createObjectURL(videoFile);
  return <video src={videoURL} controls autoPlay></video>;
}
