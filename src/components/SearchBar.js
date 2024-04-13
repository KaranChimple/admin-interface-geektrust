import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        onSearch(searchText);
    };

    return (
        <form className="search-bar" onSubmit={handleSearchSubmit}>
            <input
                type="text"
                placeholder="Search by name, email or role"
                value={searchText}
                onChange={handleSearchChange}
                style={{ width: "90%", height: '36px', margin: "20px 0px" }}
            />
            <button className='search-icon' type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
