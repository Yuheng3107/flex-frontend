import { IonButton } from "@ionic/react";
import { useEffect } from "react";
type CommunitiesListProps = {
    // closeSideMenu: () => Promise<boolean>;
    closeSideMenu: () => void;
    communitiesList: any[];
}
function CommunitiesList({ closeSideMenu, communitiesList }: CommunitiesListProps) {

    useEffect(() => {

    }, []);

    return <aside>
        <ul>
            {communitiesList.map(item => (
                <li key={item}>{item}</li>
            ))}
        </ul>
        <IonButton routerLink="/home/community/create" onClick={() => closeSideMenu()}>
            Create Community
        </IonButton>
    </aside>
}


export default CommunitiesList;