import { useState } from 'react';
import SearchIcon from "../../assets/svgComponents/SearchIcon";

type SearchBarProps = {
    submitForm: (content: string) => void;
    placeholder: string;
}
function SearchBar({submitForm, placeholder}: SearchBarProps) {
    const [searchInput, setSearchInput] = useState("");

    function inputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchInput(event.target.value);
        
    }

    function searchHandler (event: React.FormEvent) {
        event.preventDefault();
        if (searchInput.trim() === "") {
            return
        }
        submitForm(searchInput);
        console.log("form submitted");
    }

    return <form onSubmit={searchHandler} className="flex flex-row bg-gray-200 dark:bg-zinc-700 rounded-full px-4 py-1 justify-between mx-5">
        <input value={searchInput} onChange={inputChangeHandler} type="text" placeholder={placeholder}
        className="focus:outline-0 bg-transparent dark:text-gray-200"></input>
        <button type="submit">
            <SearchIcon className="w-6 aspect-square dark:stroke-gray-400" />
        </button>
    </form>
}

export default SearchBar;