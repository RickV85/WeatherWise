import { useEffect, useState } from "react";
import "./App.css";
import {
  fetchForecast,
  fetchWeatherCurrentLocation,
} from "../../Util/APICalls";
import { ForecastData } from "../../Interfaces/AppInt";
import LocationSelect from "../LocationSelect/LocationSelect";

interface Coords {
  latitude: string;
  longitude: string;
}

function App() {
  const [currentGPSCoords, setCurrentGPSCoords] = useState<Coords>();
  const [forecastUrl, setForecastUrl] = useState("");
  const [forecastData, setForecastData] = useState<ForecastData>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const locationFetchSuccess = (position: GeolocationPosition) => {
    console.log(position);
    setCurrentGPSCoords({
      latitude: `${position.coords.latitude}`,
      longitude: `${position.coords.longitude}`,
    });
  };

  const locationFetchFailure = () => {
    alert(
      "There was an error using your current location. Please try again or enter zip."
    );
    setError(
      "There was an error using your current location. Please try again or enter zip."
    );
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      locationFetchSuccess,
      locationFetchFailure
    );
  }, []);

  useEffect(() => {
    if (currentGPSCoords) {
      setIsLoading(true);
      fetchWeatherCurrentLocation(
        currentGPSCoords.latitude,
        currentGPSCoords.longitude
      )
        .then((result) => {
          setForecastUrl(result.properties.forecast);
        })
        .catch((error) => {
          console.error(error);
          setError(error);
          setIsLoading(false);
          alert("There was an error fetching weather");
        });
    }
  }, [currentGPSCoords]);

  useEffect(() => {
    if (forecastUrl) {
      setIsLoading(true);
      fetchForecast(forecastUrl)
        .then((result) => {
          setForecastData(result);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError(error);
          setIsLoading(false);
          alert("There was an error fetching forecast");
        });
    }
  }, [forecastUrl]);

  const createDetailedForecast = () => {
    const forecast = forecastData?.properties.periods.map((day, i) => {
      return (
        <article key={i} className="detailed-day-forecast">
          <h3>{day.name}</h3>
          <p>{day.detailedForecast}</p>
        </article>
      );
    });
    return forecast;
  };

  return (
    <main className="app-main">
      <h1>WeatherWise</h1>
      <section className="header-section">
        {currentGPSCoords ? (
          <h2>{` Forecast for your current location: ${currentGPSCoords.latitude}, ${currentGPSCoords.longitude}`}</h2>
        ) : (
          <p>Fetching your location</p>
        )}
        {error ? <p>{error}</p> : null}
        {isLoading ? (
          <p>Please wait while we load weather data for your location</p>
        ) : null}
        {isLoading ? null : <LocationSelect />}
      </section>
      <section className="detailed-forecast">
        {createDetailedForecast()}
      </section>
    </main>
  );
}

export default App;
