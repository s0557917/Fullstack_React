import {React, useState, useEffect} from "react";
import axios from 'axios'
import InformationVisualizer from "./components/InformationVisualizer";
import SearchForm from "./components/SearchForm";

const WeatherInformation = () => {

}

const App = () => {
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  // const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
    .get(`https://restcountries.com/v3.1/name/${search}`)
    .then((response) => {
      const resultsObjects = response.data.map(data => 
        ({
          "id": data.cca2, 
          "name":data.name.common, 
          "population":data.population,
          "capital": data.capital,
          "languages": data.languages, 
          "flag": data.flags.png
        }))
      setSearchResults(resultsObjects)
    })
    .catch(err => console.log("No suitable country found!"))
  }, [search])

  // useEffect(() => {
  //   console.log("ENV: ", process.env.WEATHER_API_KEY )
  //   if(searchResults !== null){
  //     axios
  //     .get(`http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY }&query=Berlin`)
  //     .then((response) => {
  //       console.log("Weather: ", response.data)
  //     })
  //     .catch(err => console.log("No suitable country found!"))
  //   }
  // }, [search])

  const handleSearchInput = (event) => {
    setSearch(event.target.value)
  }

  return(
    <div>
      <h1>Country Information</h1>
      <SearchForm search={search} handleSearchInput={handleSearchInput}/>
      <InformationVisualizer searchResults={searchResults}/>
      <div>
        <h3>Weather</h3>
      </div>
    </div>
  )
}

export default App;
