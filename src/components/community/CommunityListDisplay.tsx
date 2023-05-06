//utils
import { CommunityData } from "../../types/stateTypes";
import CommunityShortInfo from "./CommunityShortInfo";

type CommunitiesListProps = {
  communitiesData: CommunityData[];
};
function CommunityListDisplay({communitiesData}: CommunitiesListProps) {
  return (
    <div>
      {communitiesData.length === 0 ? 
        <div className="text-center">No Communities</div>
      :
        communitiesData.map(item => (
          <CommunityShortInfo communityData={item} key={item.id}/>
      ))}
    </div>
  );
}  
/*
interface ListButtonProps {
  children: ReactNode;
}
function ListButton(props: ListButtonProps) {
  return <button className="h-8 aspect-square">{props.children}</button>;
}
*/
export default CommunityListDisplay;
