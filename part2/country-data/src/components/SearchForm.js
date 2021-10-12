import React from "react";

const SearchForm = ({search, handleSearchInput}) => {
    return(
      <form>
        <label>Search for a country:  </label>
        <br></br>
        <input value={search} onChange={handleSearchInput}></input>
      </form>
    )
}

export default SearchForm