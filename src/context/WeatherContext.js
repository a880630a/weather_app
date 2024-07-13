import React, { createContext, useReducer } from "react";

const WeatherContext = createContext();

const initWeatherData = {
    city: null,
    weatherCode: null,
    temperature: { data: null, unit: null },
    windSpeed: { data: null, unit: null },
    humidity: { data: null, unit: null },
    bgImg: null,
    weatherCodeInfo: null,
    currentDate: null,
};

const weatherReducer = (state, action) => {
    switch (action.type) {
        case "SET_WEATHER_DATA":
            return {
                ...state,
                city: action.payload.city,
                weatherCode: action.payload.weatherCode,
                temperature: {
                    data: action.payload.temperature.data,
                    unit: action.payload.temperature.unit,
                },
                windSpeed: {
                    data: action.payload.windSpeed.data,
                    unit: action.payload.windSpeed.unit,
                },
                humidity: {
                    data: action.payload.humidity.data,
                    unit: action.payload.humidity.unit,
                },
                currentDate: action.payload.currentDate,
            };
        case "SET_HUMIDITY":
            return {
                ...state,
                humidity: {
                    data: action.payload.humidity.data,
                    unit: action.payload.humidity.unit,
                },
            };
        case "SET_WIND_SPEED":
            return {
                ...state,
                windSpeed: {
                    data: action.payload.windSpeed.data,
                    unit: action.payload.windSpeed.unit,
                },
            };

        case "SET_TEMPERATURE":
            return {
                ...state,
                temperature: {
                    data: action.payload.temperature.data,
                    unit: action.payload.temperature.unit,
                },
            };
        case "SET_CURRENT_DATE":
            return {
                ...state,
                currentDate: action.payload,
            };
        case "SET_WEATHER_CODE_INFO":
            return {
                ...state,
                bgImg: action.payload.bgImg,
                weatherCodeInfo: action.payload.weatherCodeInfo,
                weatherIcon: action.payload.weatherIcon,
            };
        case "SET_BG_IMG":
            return {
                ...state,
                bgImg: action.payload,
            };
        default:
            console.error("Unknown action");
            return state;
    }
};

const WeatherProvider = ({ children }) => {
    const [weatherInfo, dispatch] = useReducer(weatherReducer, initWeatherData);

    return (
        <WeatherContext.Provider value={{ weatherInfo, dispatch }}>
            {children}
        </WeatherContext.Provider>
    );
};

export { WeatherContext, WeatherProvider };
