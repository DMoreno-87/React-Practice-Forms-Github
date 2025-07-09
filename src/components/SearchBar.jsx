import React, {useState} from "react";

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(input.trim()) {
            onSearch(input.trim());
            setInput("");
        }
    }

    return (
        <form onSubmit={handleSubmit} classname="search-bar">
            <input
                type = "text"
                placeholder = "Enter Github username"
                value = {input}
                onChange = {(e) => setInput(e.target.value)}
            />
            <button tyoe = "submit"> Search </button>
        </form>
    );
};

export default SearchBar;