
// Workout and ExerciseRegime is the same thing

import { useHistory } from 'react-router-dom';

//icon imports
import likeIcon from '../../assets/svg/favorite_FILL0_wght300_GRAD0_opsz48.svg'
import playIcon from '../../assets/svg/play_arrow_FILL1_wght400_GRAD0_opsz48.svg'

//component imports
import Button from '../ui/Button';
import PlayIcon from '../../assets/svgComponents/playIcon';

import { backend } from '../../App';

export type WorkoutCardProps = {
    className?: string;
    name: string;
    exercises: string[];
    likes: number;
    media: string;
    exerciseRegimeId: number;
}


function WorkoutCard({ className, name, likes, media, exerciseRegimeId, exercises }: WorkoutCardProps) {
    const history = useHistory();
    return <div className={`${className} relative bg-zinc-200 rounded-xl m-3 flex flex-col justify-between h-52 overflow-hidden`} >
        <img className="absolute w-full h-full object-cover z-0 grayscale contrast-75 brightness-75" alt="card background image"
            src={media}></img>
        <div className="z-10">
            <h3 className="text-left p-3 pb-0 text-2xl font-semibold text-white m-0">{name}</h3>
            <p className="text-left px-3 text-white">{exercises}</p>
        </div>

        <div className="flex flex-row justify-between p-2 items-end z-10">
            <div className="flex flex-row items-center">
                <img src={likeIcon} alt="like icon" className="w-8 h-8 aspect-square invert" />
                <span className="text-white">{likes}</span>
            </div>
            <button onClick={(e) => {
                e.preventDefault();
                history.push(`/exercise/workout/${exerciseRegimeId}`);
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