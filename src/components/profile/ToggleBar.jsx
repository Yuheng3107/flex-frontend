import TrendingUpIcon from "../../assets/svgComponents/TrendingUpIcon"
import GridViewIcon from "../../assets/svgComponents/GridViewIcon"

export default function ToggleBar({ isTrend, setTrend }) {
    const defaultClasses = "border-b w-full flex justify-center"
    return <div id="toggle-bar" className="pt-3 pb-1 w-full grid grid-cols-2 justify-items-center mb-2">
        <div onClick={() => setTrend(true)} className={isTrend ? `${defaultClasses} border-black border-b-2 dark:border-orange-200` : `${defaultClasses} border-zinc-600`}>
            <TrendingUpIcon className={isTrend ? "h-8 fill-black stroke-black stroke-2 dark:fill-orange-200 dark:stroke-orange-200" : "h-8 fill-gray-500 dark:fill-zinc-700 stroke-1"}></TrendingUpIcon>
        </div>
        <div onClick={() => setTrend(false)} className={isTrend ? `${defaultClasses} border-zinc-600` : `${defaultClasses} border-black border-b-2 dark:border-orange-200`}>
            <GridViewIcon className={isTrend ? "h-8 fill-gray-500 dark:fill-zinc-700 stroke-1" : "h-8 fill-black stroke-black dark:fill-orange-200 dark:stroke-orange-200"}></GridViewIcon>
        </div>

    </div>
}