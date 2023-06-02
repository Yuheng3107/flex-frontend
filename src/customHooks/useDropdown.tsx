import { useState, ReactNode } from 'react';

import VerticalDots from '../assets/svgComponents/VerticalDotsIcon';

type DropdownProps = {
    children: ReactNode;
    iconClass?: string;
    leftOffset: string
}
export function useDropdown(): [(props: DropdownProps) => JSX.Element] {
    const [isOpen, setIsOpen] = useState(false);

    const Dropdown = (props: DropdownProps) => {
        return <button id="menu-button" className="relative" onClick={e => setIsOpen(prev => !prev)}>
            <VerticalDots className={`fill-gray-600 h-8 ${props.iconClass}`}></VerticalDots>
            {isOpen && <div className={`${props.leftOffset} absolute bg-white border border-gray-200 shadow-sm blur-none p-3 rounded `}>
                {props.children}
            </div>}
        </button>
    }


    return [Dropdown];
}
