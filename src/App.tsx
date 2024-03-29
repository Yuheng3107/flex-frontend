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
} from "./utils/data/profileData";
import { getExerciseRegimeAsync } from "./utils/data/getExerciseData";
import { checkAndToggleDarkTheme } from "./utils/darkMode";
import { isDev } from "./utils/checkEnv";
import { toggleDarkTheme } from "./utils/darkMode";

// tailwind imports
import "./theme/tailwind.css";
import { Redirect, Route, useHistory } from "react-router-dom";

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
import { accessibility, home, person } from "ionicons/icons";

//Pages Components imports
import Home from "./pages/Home/Home";
import ExercisePages from "./pages/exercise/ExercisePages";
import CreatePost from "./pages/post/CreatePost";
import CommunityPage from "./pages/community/CommunityPage";
import PostPage from "./pages/post/PostPage";
import ProfilePages from "./pages/profile/ProfilePages";
import Search from "./pages/Home/Search";

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

//import styles
import "./theme/variables.css";

//import pages
import OtherUserProfile from "./pages/other users/OtherUserProfile";
import SearchPosts from "./pages/Home/SearchPosts";
import SearchUsers from "./pages/Home/SearchUsers";
import SearchCommunities from "./pages/Home/SearchCommunities";
import checkLoginStatus from "./utils/checkLogin";
import { emptyProfileData } from "./types/stateTypes";
import Loading from "./pages/Home/Loading";
import Login from "./pages/Home/Login";

setupIonicReact();
checkAndToggleDarkTheme();

// 'globals'
const backend = isDev() ? "http://localhost:8000" : "https://fitai.click";
const imgBackend = isDev() ? "http://localhost:8000" : "";
const exercises = ["zero", "Squats", "Push-ups", "Hamstring Stretch"];

const App: React.FC = () => {
  const [updateProfileState, setUpdateProfileState] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

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
        dispatch(profileDataActions.setProfileData({ id: -1 }));
        setLoading(false);
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
      console.log(data);
      dispatch(profileDataActions.setProfileData(data.profileData));
      dispatch(exerciseStatsActions.setExerciseStats(data.exerciseStats));
      setLoading(false);
    }

    obtainProfileData();
  }, [updateProfileState, updateProfileCounter]);

  function closeHomeSideMenu() {
    homeMenuRef.current?.close();
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {loading === true ? (
              <>
                <Route>
                  <Redirect to="/" />
                </Route>
                <Route exact path="/">
                  <Loading />
                </Route>
              </>
            ) : profileDataRedux.id === -1 ? (
              <>
                <Route>
                  <Redirect to="/profile/login" />
                </Route>
                <Route exact path="/profile/login">
                  <Login />
                </Route>
              </>
            ) : (
              <>
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
                <Route exact path="/home">
                  <Home ref={homeMenuRef} />
                </Route>
                {/* SubRoutes of /home/community are inside the CommunityPage component */}
                <Route path="/home/community/" component={CommunityPage} />

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
                <Route path="/home/post/create">
                  <CreatePost />
                </Route>
                <Route path="/home/search">
                  <Search />
                </Route>
                <Route path="/home/search/post">
                  <SearchPosts />
                </Route>
                <Route path="/home/search/user">
                  <SearchUsers />
                </Route>
                <Route path="/home/search/community">
                  <SearchCommunities />
                </Route>

                <Route path="/profile" component={ProfilePages} />

                <Route path="/exercise" component={ExercisePages} />
              </>
            )}
          </IonRouterOutlet>
          <IonTabBar slot="bottom" onClick={closeHomeSideMenu}>
            {profileDataRedux.id !== -1 &&
              <IonTabButton tab="home" href="/home">
                <IonIcon aria-hidden="true" icon={home} />
              </IonTabButton>}
            {profileDataRedux.id !== -1 &&
              <IonTabButton tab="exercise" href="/exercise">
                <IonIcon
                  className="absolute"
                  aria-hidden="true"
                  icon={accessibility}
                />
              </IonTabButton>}


            <IonTabButton tab="profile" href={profileDataRedux.id === -1 ? "/profile/login" : "/profile"}>
              {/* <IonIcon aria-hidden="true" icon={profileData.profile_photo} /> */}
              {profileDataRedux.profile_photo ? (
                <img
                  className={`rounded-full border border-neutral-800 h-9`}
                  src={imgBackend.concat(profileDataRedux.profile_photo)}
                />
              ) : (
                <IonIcon className="" aria-hidden="true" src={person} />
              )}
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

export { backend, imgBackend, exercises };
