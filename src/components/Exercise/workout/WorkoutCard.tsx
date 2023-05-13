
// Workout and ExerciseRegime is the same thing

import { useHistory } from 'react-router-dom';

//icon imports
import likeIcon from '../../../assets/svg/favorite_FILL0_wght300_GRAD0_opsz48.svg'

//component imports
import PlayIcon from "../../../assets/svgComponents/playIcon";

import { backend } from '../../../App';
import { ExerciseRegime } from '../../../types/stateTypes';

export type WorkoutCardProps = {
    className?: string;
    regimeData: ExerciseRegime;
}

function WorkoutCard({ className, regimeData }: WorkoutCardProps) {
    console.log(regimeData);
    const history = useHistory();
    return <div className={`${className} relative bg-zinc-200 rounded-xl flex flex-col justify-between h-44 overflow-hidden`} >
        <img className="absolute w-full h-full object-cover z-0 grayscale contrast-75 brightness-75" alt="card background image"
            src={regimeData.media}></img>
        <div className="z-10 p-3">
            <h3 className="text-left pb-0 text-2xl font-semibold text-white m-0">{regimeData.name}</h3>
            {/* <p className="text-left px-3 text-white">{exercises}</p> */}
            {regimeData.exercises.map((item: any, index: number, array) => (
                <span key={`${index}-${item.name}`} className="text-left text-white">{item.name}{index + 1 === array.length ? "" : ", "}</span>
            ))}
        </div>

        <div className="flex flex-row justify-between p-2 items-end z-10">
            <div className="flex flex-row items-center">
                <img src={likeIcon} alt="like icon" className="w-8 h-8 aspect-square invert" />
                <span className="text-white">{regimeData.likes}</span>
            </div>
            <button onClick={(e) => {
                e.preventDefault();
                history.push(`/exercise/workout/${regimeData.id}`);
            }}
                className={` bg-blue-400 w-12 h-12 text-zinc-900
                flex justify-center items-center p-0 aspect-square relative rounded-lg`}
            >
                {/* <img src={playIcon} alt="like icon" className="absolute w-8 h-8 aspect-square" /> */}
                <PlayIcon className="absolute h-8 w-8 fill-white" />
            </button>

        </div>
    </div >
}

export default WorkoutCard;