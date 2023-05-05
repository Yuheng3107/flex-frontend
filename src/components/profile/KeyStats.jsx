import { IonRouterLink } from "@ionic/react";
import { useAppDispatch } from "../../store/hooks";
import { profileDataActions } from "../../store/profileDataSlice";
import { useHistory } from "react-router";

export default function KeyStats({ followers, reps, perfect_reps }) {
  const dispatch = useAppDispatch();
  const history = useHistory();
  return (
    <div
      id="user-stats"
      className="flex flex-row items-center justify-evenly w-full my-1"
    >
      <div id="reps" className="flex flex-col items-center justify-evenly">
        <span className="text-xl font-semibold -mb-1">
          {reps === undefined ? "?" : reps}
        </span>
        <span className="text-l m-0">Repetitions</span>
      </div>
      <div id="perfect" className="flex flex-col items-center justify-evenly">
        <span className="text-xl font-semibold -mb-1">
          {reps === undefined || perfect_reps === undefined
            ? "?"
            : perfect_reps}
        </span>
        <span className="text-l">Perfect</span>
      </div>
      <IonRouterLink id="followers" routerLink="/profile/friendslist" routerDirection="forward">
        <div className="flex flex-col items-center justify-evenly">
          <span className="text-xl font-semibold -mb-1">
            {followers === undefined ? "?" : followers}
          </span>
          <span className="text-l">Friends</span>  
        </div>
      </IonRouterLink>
    </div>
  );
}
