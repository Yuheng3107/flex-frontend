import { IonButton } from "@ionic/react";
import { useEffect, useState, ReactNode } from "react";

//utils
import { getCommunityListAsync } from "../../utils/data/communityData";
import PushPinIcon from "../../assets/svgComponents/PushPinIcon";
import VerticalDots from "../../assets/svgComponents/VerticalDotsIcon";
import { emptyCommunityData } from "../../types/stateTypes";
import { assignToTypedArray } from "@tensorflow/tfjs-core/dist/backends/complex_util";
import CommunityListDisplay from "../community/CommunityListDisplay";

type CommunitiesListProps = {
  // closeSideMenu: () => Promise<boolean>;
  closeSideMenu: () => void;
  communitiesList: any[];
};
function CommunitiesList({
  closeSideMenu,
  communitiesList,
}: CommunitiesListProps) {
  const [communitiesData, setCommunitiesData] = useState<any[]>([]);

  useEffect(() => {
    async function getCommunitiesInfo() {
      const data = await getCommunityListAsync(communitiesList);
      console.log(data);
      setCommunitiesData(data);
    }
    getCommunitiesInfo();
  }, [setCommunitiesData, getCommunityListAsync, communitiesList]);
  if (Array.isArray(communitiesData)) {
    return (
      <aside>
        <CommunityListDisplay communitiesData={communitiesData}/>
        <IonButton
          routerLink="/home/community/create"
          onClick={() => closeSideMenu()}
        >
          Create Community
        </IonButton>
      </aside>
    );
  } else return <aside></aside>;
}

interface ListButtonProps {
  children: ReactNode;
}
function ListButton(props: ListButtonProps) {
  return <button className="h-8 aspect-square">{props.children}</button>;
}

export default CommunitiesList;
