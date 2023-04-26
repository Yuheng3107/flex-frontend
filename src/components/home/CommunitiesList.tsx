import { IonButton } from "@ionic/react";
import { useEffect, useState, ReactNode } from "react";

//utils
import { getCommunityListAsync } from "../../utils/data/communities";
import PushPinIcon from "../../assets/svgComponents/PushPinIcon";
import VerticalDots from "../../assets/svgComponents/VerticalDotsIcon";
import { emptyCommunityData } from "../../types/stateTypes";

type CommunitiesListProps = {
    // closeSideMenu: () => Promise<boolean>;
    closeSideMenu: () => void;
    communitiesList: any[];
}
function CommunitiesList({ closeSideMenu, communitiesList }: CommunitiesListProps) {
    const [communitiesData, setCommunitiesData] = useState([emptyCommunityData]);

    useEffect(() => {
        console.log('useEffect running from CommunitiesList.tsx')
        async function getCommunitiesInfo() {
            const data = await getCommunityListAsync(communitiesList);
            setCommunitiesData(data);
            console.log(data);
        }
        getCommunitiesInfo();
    }, [setCommunitiesData, getCommunityListAsync, communitiesList]);
    console.log(communitiesList[0]);
    return <aside>
        <ul>
            {communitiesData.map(item => (
                <li key={item.id} className="flex flex-row justify-between h-12 item-center border-b border-b-stone-600">
                    <div className="name-and-photo flex flex-row h-full items-center ml-2">
                        <img alt="community photo" className="aspect-square h-5/6 object-cover rounded-full" src="https://images.unsplash.com/photo-1580692475446-c2fabbbbf835?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"></img>
                        <span className="ml-2">{item.name}</span>
                    </div>
                    <div className="flex flex-row items-center mr-2">
                        <ListButton>
                            <PushPinIcon className="rotate-90 h-full fill-gray-700" />
                        </ListButton>
                        <ListButton>
                            <VerticalDots className="h-full fill-gray-700" />
                        </ListButton>
                    </div>
                </li>
            ))}

        </ul>
        <IonButton routerLink="/home/community/create" onClick={() => closeSideMenu()}>
            Create Community
        </IonButton>
    </aside>
}

interface ListButtonProps {
    children: ReactNode;
}
function ListButton(props: ListButtonProps) {
    return <button className="h-8 aspect-square">
        {props.children}
    </ button>
}


export default CommunitiesList;