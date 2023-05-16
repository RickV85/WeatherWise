import { Dispatch, SetStateAction } from "react";

export interface Coords {
  latitude: string;
  longitude: string;
}

export interface ForecastData {
  "@context": [
    string,
    {
      "@version": string;
      wx: string;
      geo: string;
      unit: string;
      "@vocab": string;
    }
  ];
  type: string;
  geometry: {
    type: string;
    coordinates: [[number, number][]];
  };
  properties: {
    updated: string;
    units: string;
    forecastGenerator: string;
    generatedAt: string;
    updateTime: string;
    validTimes: string;
    elevation: {
      unitCode: string;
      value: number;
    };
    periods: {
      number: number;
      name: string;
      startTime: string;
      endTime: string;
      isDaytime: boolean;
      temperature: number;
      temperatureUnit: string;
      temperatureTrend: null;
      probabilityOfPrecipitation: {
        unitCode: string;
        value: number | null;
      };
      dewpoint: {
        unitCode: string;
        value: number;
      };
      relativeHumidity: {
        unitCode: string;
        value: number;
      };
      windSpeed: string;
      windDirection: string;
      icon: string;
      shortForecast: string;
      detailedForecast: string;
    }[];
  };
}

export interface LocationSelectProps {
  setSelectedLocCoords: Dispatch<SetStateAction<string>>;
  selectedLocType: string;
}

export interface TypeSelectProps {
  currentGPSCoords?: Coords;
  setSelectedLocType: Dispatch<SetStateAction<string>>;
}