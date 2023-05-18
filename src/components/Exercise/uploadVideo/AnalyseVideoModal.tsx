//ionic imports
import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButtons,
} from "@ionic/react";

import { closeOutline } from "ionicons/icons";
import UploadedVideo from "../workout/UploadedVideo";

const AnalyseVideoModal = ({
  onDismiss,
  videoFile,
}: {
  //define the type of props received
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
  videoFile: File | null;
}) => {
  console.log(videoFile);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => onDismiss(null, "cancel")}>
              <IonIcon icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        Analyze Exercise here
        <UploadedVideo videoFile={videoFile}></UploadedVideo>
      </IonContent>
    </IonPage>
  );
};

export default AnalyseVideoModal;
