import { useEffect, useState } from "react";
import "./App.css";
import {
  fetchForecast,
  fetchWeatherSelectedLocation,
} from "../../Util/APICalls";
import {
  Coords,
  ForecastData,
  LocationDetails,
} from "../../Interfaces/interfaces";
import LocationSelect from "../LocationSelect/LocationSelect";
import DetailedDayForecast from "../DetailedDayForecast/DetailedDayForecast";
import TypeSelect from "../TypeSelect/TypeSelect";

function App() {
  const [currentGPSCoords, setCurrentGPSCoords] = useState<Coords>();
  const [selectedLocCoords, setSelectedLocCoords] = useState("");
  const [selectedLocType, setSelectedLocType] = useState("Current Location");
  const [locationDetails, setLocationDetails] = useState<LocationDetails>();
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
    setError(
      "There was an error using your current location. Please allow this site to access your location or reload the page to try again."
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

  // useEffect(() => {
  //   if (currentGPSCoords) {
  //     setIsLoading(true);
  //     setSelectedLocCoords(
  //       `${currentGPSCoords.latitude},${currentGPSCoords.longitude}`
  //     )
  //   }
  // }, [currentGPSCoords]);

  useEffect(() => {
    if (selectedLocType === "Current Location" && currentGPSCoords) {
      setSelectedLocCoords(
        `${currentGPSCoords.latitude},${currentGPSCoords.longitude}`
      )
    }
  }, [selectedLocType, currentGPSCoords])

  useEffect(() => {
    if (selectedLocCoords) {
      setIsLoading(true);
      fetchWeatherSelectedLocation(selectedLocCoords)
        .then((result) => {
          setLocationDetails(result);
          setForecastUrl(result.properties.forecast);
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
          setError(error);
          setIsLoading(false);
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
        });
    }
  }, [forecastUrl]);

  const createDetailedForecast = () => {
    const forecast = forecastData?.properties.periods.map((data, i) => {
      return <DetailedDayForecast data={data} key={i} />;
    });
    return forecast;
  };

  return (
    <main className="app-main">
      <h1>WeatherWise</h1>
      <p className="tagline">The best weather app of all time</p>
      <section className="header-section">
        <TypeSelect
          setSelectedLocType={setSelectedLocType}
        />
        <LocationSelect
          selectedLocType={selectedLocType}
          setSelectedLocCoords={setSelectedLocCoords}
        />
        {error ? <p>{error}</p> : null}
        {isLoading ? (
          <p className="loading-msg">
            Please wait while we load weather data for your location
          </p>
        ) : null}
        {locationDetails ? (
          <h2 className="current-loc-display">{`Forecast for: ${locationDetails.properties.relativeLocation.geometry.coordinates[0]}, ${locationDetails.properties.relativeLocation.geometry.coordinates[1]}
          near ${locationDetails.properties.relativeLocation.properties.city}, ${locationDetails.properties.relativeLocation.properties.state}`}</h2>
        ) : (
          <p className="loading-msg">Fetching your location</p>
        )}
      </section>
      <section className="detailed-forecast">
        {createDetailedForecast()}
      </section>
    </main>
  );
}

export default App;
