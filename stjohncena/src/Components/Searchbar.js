import React from 'react'
import './utilities/Searchbar.css'
import search from './utilities/search.svg'

const Searchbar = ({ searchQuery, setSearchQuery }) => {
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className='search-container'>
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search"
                className='search-input'
            />
            <button className='search-button'>
                <img
                    src={search}
                    alt="search"
                />
            </button>
        </div>
    )
}

export default Searchbar