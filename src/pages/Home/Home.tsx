import { useState, useRef } from 'react';

//Ionic imports
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenu,
  IonMenuButton,
  IonButton,
  IonMenuToggle,
  IonIcon,
  IonFabButton,
  IonFab
} from '@ionic/react';
import { chevronBackOutline, pencilOutline } from 'ionicons/icons';
//Redux imports
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { profileDataActions } from '../../store/profileDataSlice';


//Component imports
import Feed from '../../components/Feed/Feed';
import SearchBar from '../../components/Feed/SearchBar';
import CommunitiesList from '../../components/home/CommunitiesList';
import { Link } from "react-router-dom";
import AddIcon from "../../assets/svgComponents/AddIcon";

const Home: React.FC = () => {
  const communitiesRedux = useAppSelector((state) => state.profile.profileData.communities);
  console.log(communitiesRedux);
  const [sideMenuShowing, setSetMenuShowing] = useState(false);
  const sideMenuRef = useRef<HTMLIonMenuElement>(null);
  const dispatch = useAppDispatch();
  function closeSideMenu() {
    sideMenuRef.current?.close();
  }
  return <>
    {/* This is the content of the sideMenu  */}
    <IonMenu ref={sideMenuRef} contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonMenuToggle>
            <IonButton fill="clear" size="small">
              <IonIcon icon={chevronBackOutline} />
            </IonButton>
          </IonMenuToggle>
          <IonTitle>Communities</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-no-padding">
        <CommunitiesList closeSideMenu={closeSideMenu} communitiesList={communitiesRedux} />
      </IonContent>
    </IonMenu>
    {/* This is the main content of the page */}
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
            <SearchBar />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="relative">
        <Feed />
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton routerLink='/home/post/create'>
            <IonIcon icon={pencilOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  </>


};

export default Home;
