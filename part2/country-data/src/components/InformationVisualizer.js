import React from "react";

const InformationVisualizer = ({searchResults}) => {
  
    const processCountryData = (searchResults) => {
        if(searchResults.length === 0){
            return
        }else if(searchResults.length > 10){
            return (
                <p>
                There are too many matches! Continue typing to narrow your results further down.
                </p>
            )
        }else if(searchResults.length > 1) {
            return (
                <ul>
                {searchResults.map(result => <li key={result.id}>{result.name}</li>)}
                </ul>
            )
        }else {

            const iterateLanguages = (result) => {
                const languages = []
                for(const key in result.languages){
                    languages.push(<li key={result.id}>{result.languages[key]}</li>)
                }

                return languages
            }

            return (
                <>
                    <h2>{searchResults[0].name}</h2>
                    <p>CC2: {searchResults[0].id}</p>
                    <p>Capital: {searchResults[0].capital}</p>
                    <p>Population: {searchResults[0].population}</p>
                    <p>Languages: {iterateLanguages(searchResults[0])}</p>
                    <img src={searchResults[0].flag} alt="Flag"></img>
                </>
            )
        }
    }

    return(
        <div>
        <ul>
            {processCountryData(searchResults)}
        </ul>
        </div>
    )
}

export default InformationVisualizer