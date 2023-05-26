import { IonRouterLink } from "@ionic/react";

type KeyStatsProps = {
  followers: number | undefined;
  reps: number | undefined;
  perfect_reps: number | undefined
}
export default function KeyStats({ followers, reps, perfect_reps }: KeyStatsProps) {
  return (
    <div
      id="user-stats"
      className="flex flex-row items-center justify-evenly w-full my-1"
    >
      <StatAndLabelContainer label="Repetitions" number={reps === undefined ? 0 : reps} />
      <StatAndLabelContainer label="Perfect" number={reps === undefined || perfect_reps === undefined ? 0 : perfect_reps} />
      <IonRouterLink
        id="followers"
        routerLink="/profile/friendslist"
        routerDirection="forward"
        color="dark"
      >
        <StatAndLabelContainer label="Friends" number={followers === undefined ? 0 : followers} />
      </IonRouterLink>
    </div>
  );
}

type StatAndLabelContainerProps = {
  label: string;
  number: number
}
function StatAndLabelContainer({ label, number }: StatAndLabelContainerProps) {
  return <div id={label} className="flex flex-col items-center justify-evenly w-12">
    <span className="text-xl font-semibold -mb-1">
      {number === undefined ? "?" : number}
    </span>
    <span className="text-l m-0">{label}</span>
  </div>
}