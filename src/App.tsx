//React imports
import { useEffect, useState, useRef } from "react";

//Redux imports
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { profileDataActions } from "./store/profileDataSlice";
import { exerciseStatsActions } from "./store/exerciseStatsSlice";

//Util function imports
import {
  getProfileData,
  getProfileDataAsync,
  getFavoriteExerciseAsync,
  getFavoriteExerciseRegimeAsync,
  splitProfileData,
  getAllProfileData,
} from "./utils/data/profile";
import { getExerciseRegimeAsync } from "./utils/data/getExerciseData";
import { checkAndToggleDarkTheme } from "./utils/darkMode";
import { toggleDarkTheme } from "./utils/darkMode";


//type import
import {
  ProfileData,
  emptyProfileData,
  ExerciseStats,
  emptyExerciseStats,
} from "./types/stateTypes";

// tailwind imports
import "./theme/tailwind.css";
import { Redirect, Route } from "react-router-dom";

//Ionic Imports
import {
  IonApp,
  IonIcon,
  IonMenuToggle,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { accessibility, home } from "ionicons/icons";

//Pages Components imports
import Home from "./pages/Home/Home";
import Exercise from "./pages/exercise/Exercise";
import ChooseExercise from "./pages/exercise/ChooseExercise";
import ExercisePages from "./pages/exercise/ExercisePages";
import CreatePost from "./pages/post/CreatePost";
import CommunityPage from "./pages/community/CommunityPage";
import PostPage from "./pages/post/PostPage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import OtherUserProfile from "./pages/other users/OtherUserProfile";
import CommunityDisplay from "./pages/community/CommunityDisplay";

//import styles
import "./theme/variables.css";
import ProfilePages from "./pages/profile/ProfilePages";

setupIonicReact();
checkAndToggleDarkTheme();

// const backend = "https://flex.fitai.click";
const backend = "http://localhost:8000";
const exercises = ["zero", "Squats", "Push-ups", "Hamstring Stretch"];

const App: React.FC = () => {
  const [updateProfileState, setUpdateProfileState] = useState(0);

  const profileDataRedux = useAppSelector((state) => state.profile.profileData);
  const updateProfileCounter = useAppSelector(
    (state) => state.profile.profileCounter
  );
  const exerciseStatsRedux = useAppSelector((state) => state.exerciseStats);
  const dispatch = useAppDispatch();

  const homeMenuRef = useRef<HTMLIonMenuElement>(null);
  useEffect(() => {
    console.log("getprofiledata running from App.tsx");
    async function obtainProfileData() {
      let data = await getProfileDataAsync();
      //get favorite exercse
      if (data === false) {
        return;
      }
      data.favorite_exercise = await getFavoriteExerciseAsync(data.id);
      //get favorite exercise regime
      data.favorite_exercise_regime = await getFavoriteExerciseRegimeAsync(
        data.id
      );
      data.favorite_exercise_regime.name = null;
      //get exercise regimes
      if (data.favorite_exercise_regime.exercise_regime !== null)
        data.favorite_exercise_regime = await getExerciseRegimeAsync(
          data.favorite_exercise_regime.exercise_regime
        );
      data = splitProfileData(data);
      dispatch(profileDataActions.setProfileData(data.profileData));
      dispatch(exerciseStatsActions.setExerciseStats(data.exerciseStats));
    }

    obtainProfileData();
  }, [getProfileData, updateProfileState, updateProfileCounter]);

  function closeHomeSideMenu() {
    homeMenuRef.current?.close();
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/home">
              <Home ref={homeMenuRef} />
            </Route>
        
            <Route exact path="/home/post/create">
              <CreatePost />
            </Route>
            <Route path="/home/community" component={CommunityPage} />
            
            <Route
              exact
              path="/home/profile/:userId"
              render={(props) => {
                return <OtherUserProfile {...props} />;
              }}
            />

            <Route
              exact
              path="/home/post/:postId"
              render={(props) => {
                return <PostPage {...props} />;
              }}
            />
            <Route path="/profile" component={ProfilePages} />

            
            <Route path="/exercise" component={ExercisePages} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom" onClick={closeHomeSideMenu}>
            <IonTabButton tab="home" href="/home">
              <IonIcon aria-hidden="true" icon={home} />
            </IonTabButton>

            <IonTabButton tab="exercise" href="/exercise">
              {/* <div className="relative bg-sky-400 aspect-square rounded-full"> */}
              <IonIcon
                className="absolute"
                aria-hidden="true"
                icon={accessibility}
              />
              {/* </div> */}
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              {/* <IonIcon className="fill-red-600 stroke-red-600" aria-hidden="true" src={personUnfilled} /> */}
              {/* <IonIcon aria-hidden="true" icon={backend.concat(profileData.profile_photo)} /> */}
              <img
                className={`rounded-full border border-neutral-800 h-9`}
                src={backend.concat(profileDataRedux.profile_photo)}
              />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

export { backend, exercises };
