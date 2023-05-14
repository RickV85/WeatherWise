import { useEffect, useState } from "react";
import "./App.css";
import {
  fetchForecast,
  fetchWeatherSelectedLocation,
  fetchWeatherCurrentLocation,
} from "../../Util/APICalls";
import { Coords, ForecastData } from "../../Interfaces/AppInt";
import LocationSelect from "../LocationSelect/LocationSelect";
import DetailedDayForecast from "../DetailedDayForecast/DetailedDayForecast";

function App() {
  const [currentGPSCoords, setCurrentGPSCoords] = useState<Coords>();
  const [selectedLocCoords, setSelectedLocCoords] = useState<string>();
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
      "There was an error using your current location. Please try again."
    );
    setError(
      "There was an error using your current location. Please try again."
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
    if (selectedLocCoords) {
      setIsLoading(true);
      fetchWeatherSelectedLocation(selectedLocCoords)
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
  }, [selectedLocCoords]);

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
    const forecast = forecastData?.properties.periods.map((data, i) => {
      return (
        <DetailedDayForecast data={data} key={i} />
      );
    });
    return forecast;
  };

  return (
    <main className="app-main">
      <h1>WeatherWise</h1>
      <p className="tagline">The best weather app of all time</p>
      <section className="header-section">
        {currentGPSCoords ? (
          <h2 className="current-loc-display">{` Your current location: ${currentGPSCoords.latitude}, ${currentGPSCoords.longitude}`}</h2>
        ) : (
          <p className="loading-msg">Fetching your location</p>
        )}
        {error ? <p>{error}</p> : null}
        {isLoading ? (
          <p className="loading-msg">
            Please wait while we load weather data for your location
          </p>
        ) : null}
        <LocationSelect
          currentGPSCoords={currentGPSCoords}
          setSelectedLocCoords={setSelectedLocCoords}
        />
      </section>
      <section className="detailed-forecast">
        {createDetailedForecast()}
      </section>
    </main>
  );
}

export default App;
