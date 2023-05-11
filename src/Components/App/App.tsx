import { useEffect, useState } from 'react'
import './App.css'
import { fetchForecast, fetchWeatherCurrentLocation } from '../../Util/APICalls';
import { ForecastData } from '../../Interfaces/AppInt';

interface Coords {
  latitude: string;
  longitude: string;
}

function App() {
  const [currentGPSCoords, setCurrentGPSCoords] = useState<Coords>()
  const [forecastUrl, setForecastUrl] = useState("")
  const [forecastData, setForecastData] = useState<ForecastData>()
  const [error, setError] = useState("")

  const locationFetchSuccess = (position: GeolocationPosition) => {
    console.log(position)
    setCurrentGPSCoords({ 'latitude': `${position.coords.latitude}`, 'longitude':`${position.coords.longitude}`})
  };
  
  const locationFetchFailure = () => {
    alert("There was an error using your current location. Please try again or enter zip.")
    setError("There was an error using your current location. Please try again or enter zip.");
    setTimeout(() => {setError('')}, 3000);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(locationFetchSuccess, locationFetchFailure);
  }, [])

  useEffect(() => {
    if (currentGPSCoords) {
      fetchWeatherCurrentLocation(currentGPSCoords.latitude, currentGPSCoords.longitude)
      .then(result => {
        setForecastUrl(result.properties.forecast)
      })
      .catch(error => {
        console.error(error)
        alert('There was an error fetching weather')
      }) 
    }
  }, [currentGPSCoords])

  useEffect(() => {
    if (forecastUrl) {
      fetchForecast(forecastUrl)
      .then(result => {
        setForecastData(result)
      })
      .catch(error => {
        console.error(error)
        alert('There was an error fetching forecast')
      }) 
    }
  }, [forecastUrl])

  return (
    <main className='app-main'>
      <h1>Weather Wise</h1>
      <p>{forecastData?.properties.periods.map((day) => {
        return day.detailedForecast;
      })}</p>
    </main>
  )
}

export default App
