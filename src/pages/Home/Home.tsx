import { useState, useRef, forwardRef, useEffect } from 'react';

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

//Utils imports
import checkLoginStatus from '../../utils/checkLogin';

//Component imports
import Feed from '../../components/Feed/Feed';
import CommunitiesList from '../../components/home/CommunitiesList';

//svg imports
import SearchIcon from "../../assets/svgComponents/SearchIcon";
type Ref = HTMLIonMenuElement
type HomeProps = {

}
const Home = forwardRef<Ref, HomeProps>(function (props, ref) {
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
    <IonMenu ref={ref} contentId="main-content" className=''>
      <IonHeader>
        <IonToolbar className="bg-white">
          <IonMenuToggle>
            <IonButton fill="clear" size="small">
              <IonIcon icon={chevronBackOutline} color="medium" />
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
          <IonButtons slot="start" color="medium">
            <IonMenuButton color="medium"></IonMenuButton>
          </IonButtons>
          <IonButtons slot="end">

            <IonButton routerLink='/home/search'>
              <SearchIcon className="w-6 aspect-square stroke-zinc-600 dark:stroke-zinc-400" />
            </IonButton>
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


});



export default Home;
