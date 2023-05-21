import { useState, useRef, forwardRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//Ionic imports
import {
  IonContent,
  IonPage,
} from '@ionic/react';

//Redux imports
import { useAppSelector, useAppDispatch } from '../../store/hooks';

type Ref = HTMLIonMenuElement
type HomeProps = {

}
const Loading = forwardRef<Ref, HomeProps>(function (props, ref) {
  const profileId = useAppSelector((state) => state.profile.profileData.id);
  const history = useHistory();
  useEffect(()=>{
    console.log(profileId);
    if (profileId === -1) {
      history.push('/profile');
      return;
    }
    if (profileId !== 0) history.push('/home');
  },[profileId])
  
  return <IonPage id="main-content">
      <IonContent fullscreen className="relative">
        Loading...
      </IonContent>
    </IonPage>
});

export default Loading;
