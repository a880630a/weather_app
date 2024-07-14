import { useContext, useState, useEffect, useCallback } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { handleWeatherCode } from "../utils/weatherCode";
import useGetCountryPosition from "../hooks/countryHook";
import useGetWeatherCode from "../hooks/useGetWeatherCode";

const useWeather = () => {
    const { weatherInfo, dispatch } = useContext(WeatherContext);
    const [countryName, setCountryName] = useState("Taiwan");
    const [position, setPosition] = useState({
        latitude: null,
        longitude: null,
    });
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // 更新cityName
    const handleCityNameChange = (e) => {
        setCountryName(e.target.value);
    };

    // 取得目前螢幕寬度並更改背景圖片
    const handleWidth = useCallback(() => {
        const newWidth = window.innerWidth;
        setWindowWidth(newWidth);

        if (weatherInfo.weatherCodeInfo) {
            const code = handleWeatherCode(weatherInfo.weatherCode);
            const newBgImg = newWidth < 1080 ? code.imgUrl : code.imgUrlDT;
            dispatch({
                type: "SET_BG_IMG",
                payload: newBgImg,
            });
        }
    }, [weatherInfo.weatherCode, weatherInfo.weatherCodeInfo, dispatch]);

    // 當畫面寬度有變化時，更新 windowWidth
    useEffect(() => {
        window.addEventListener("resize", handleWidth);

        return () => {
            window.removeEventListener("resize", handleWidth);
        };
    }, [handleWidth]);

    // ================ API ====================
    const {
        isLoading: countryPositionLoading,
        countryPosition,
        refetch: fetchCountryPosition,
    } = useGetCountryPosition(countryName);

    const {
        isLoading: weatherCodeLoading,
        countryWeatherCode,
        refetch: fetchWeatherCode,
    } = useGetWeatherCode(position);

    // ================ API ====================

    // 更新 position
    useEffect(() => {
        if (countryPosition && countryPosition.results) {
            setPosition({
                latitude: countryPosition.results[0].latitude,
                longitude: countryPosition.results[0].longitude,
            });
        }
    }, [countryPosition]);

    useEffect(() => {
        if (position.latitude !== null && position.longitude !== null) {
            fetchWeatherCode();
        }
    }, [fetchWeatherCode, position]);

    useEffect(() => {
        if (
            countryPosition &&
            countryPosition.results &&
            countryWeatherCode?.current
        ) {
            const date = countryWeatherCode.current.time.split("T");

            dispatch({
                type: "SET_WEATHER_DATA",
                payload: {
                    city: countryPosition.results[0].name,
                    weatherCode: countryWeatherCode.current.weather_code,
                    currentDate: date[0],
                },
            });
        }
    }, [countryWeatherCode, countryPosition, dispatch]);

    useEffect(() => {
        if (countryWeatherCode?.current) {
            const code = handleWeatherCode(
                countryWeatherCode.current.weather_code
            );
            dispatch({
                type: "SET_WEATHER_CODE_INFO",
                payload: {
                    bgImg: windowWidth < 1080 ? code.imgUrl : code.imgUrlDT,
                    weatherCodeInfo: code.name,
                    weatherIcon: code.icon,
                },
            });
        }
    }, [countryWeatherCode, dispatch, windowWidth]);

    return {
        countryPositionLoading,
        countryPosition,
        fetchCountryPosition,
        position,
        weatherCodeLoading,
        countryWeatherCode,
        handleCityNameChange,
        weatherInfo,
    };
};

export default useWeather;
