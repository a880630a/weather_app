import React, { useEffect, useReducer, useState } from "react";
import useGetCountryPosition from "../hooks/countryHook";
import useGetTemperature from "../hooks/useGetTemperature";
import useGetWindSpeed from "../hooks/useGetWindSpeed";
import useGetHumidity from "../hooks/useGetHumidity";
import useGetWeatherCode from "../hooks/useGetWeatherCode";
import { handleWeatherCode } from "../utils/weatherCode";
import FiveDay from "../feature/fiveDay/FiveDay";
import styles from "./weather.module.scss";
import weatherDefault from "../assets/images/weatherDefault.jpg";
import clsx from "clsx";
import GlassWrapper from "../components/glassWrapper";
import humidityIcon from "../assets/icon/humidity.svg";
import windIcon from "../assets/icon/wind.svg";
import SearchBar from "../feature/searchBar/SearchBar";
import temperatureIcon from "../assets/icon/temperature.svg";
import dateIcon from "../assets/icon/date.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const initWeatherData = {
    city: null,
    weatherCode: null,
    temperature: { data: null, unit: null },
    windSpeed: { data: null, unit: null },
    humidity: { data: null, unit: null },
    bgImg: weatherDefault,
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

const Weather = () => {
    const [countryName, setCountryName] = useState("Taiwan");
    const [position, setPosition] = useState({
        latitude: null,
        longitude: null,
    });

    const [weatherInfo, dispatch] = useReducer(weatherReducer, initWeatherData);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // 取得目前螢幕寬度並更改背景圖片
    const handleWidth = () => {
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
    };

    // 當畫面寬度有變化時，更新 windowWidth
    useEffect(() => {
        window.addEventListener("resize", handleWidth);

        return () => {
            window.removeEventListener("resize", handleWidth);
        };
    }, [windowWidth, weatherInfo.weatherCode]);

    // ================ API ====================
    const {
        isLoading: countryPositionLoading,
        countryPosition,
        refetch: fetchCountryPosition,
    } = useGetCountryPosition(countryName);

    const {
        isLoading: temperatureLoading,
        countryTemperature,
        refetch: fetchCountryTemperature,
    } = useGetTemperature(position);

    const {
        isLoading: windSpeedLoading,
        countryWindSpeed,
        refetch: fetchCountryWindSpeed,
    } = useGetWindSpeed(position);

    const {
        isLoading: HumidityLoading,
        countryHumidity,
        refetch: fetchCountryHumidity,
    } = useGetHumidity(position);

    const {
        isLoading: weatherCodeLoading,
        countryWeatherCode,
        refetch: fetchWeatherCode,
    } = useGetWeatherCode(position);

    // ================ API ====================

    const handleCountryChange = (e) => {
        setCountryName(e.target.value);
    };

    useEffect(() => {
        if (countryPosition && countryPosition.results) {
            setPosition({
                latitude: countryPosition.results[0].latitude,
                longitude: countryPosition.results[0].longitude,
            });
        }
    }, [countryPosition, countryName]);

    useEffect(() => {
        if (
            position &&
            position.latitude !== null &&
            position.longitude !== null
        ) {
            fetchCountryTemperature();
            fetchCountryWindSpeed();
            fetchCountryHumidity();
            fetchWeatherCode();
        }
    }, [
        fetchCountryHumidity,
        fetchCountryTemperature,
        fetchCountryWindSpeed,
        fetchWeatherCode,
        position,
    ]);

    useEffect(() => {
        if (
            countryPosition &&
            countryPosition.results &&
            countryHumidity?.current &&
            countryWindSpeed?.current &&
            countryTemperature?.current &&
            countryWeatherCode?.current
        ) {
            const date = countryWeatherCode.current.time.split("T");

            dispatch({
                type: "SET_WEATHER_DATA",
                payload: {
                    city: countryPosition.results[0].name,
                    weatherCode: countryWeatherCode.current.weather_code,
                    temperature: {
                        data: countryTemperature.current.temperature_2m,
                        unit: countryTemperature.current_units.temperature_2m,
                    },
                    windSpeed: {
                        data: countryWindSpeed.current.wind_speed_10m,
                        unit: countryWindSpeed.current_units.wind_speed_10m,
                    },
                    humidity: {
                        data: countryHumidity.current.relative_humidity_2m,
                        unit: countryHumidity.current_units
                            .relative_humidity_2m,
                    },
                    currentDate: date[0],
                },
            });
        }
    }, [
        countryName,
        countryTemperature,
        countryWindSpeed,
        countryHumidity,
        countryWeatherCode,
        countryPosition,
    ]);

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
    }, [countryWeatherCode, windowWidth]);

    if (
        countryPositionLoading ||
        temperatureLoading ||
        windSpeedLoading ||
        HumidityLoading ||
        weatherCodeLoading
    ) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <div
                className={clsx(styles.wrapper)}
                style={{
                    backgroundImage: `url(${weatherInfo.bgImg})`,
                }}
            >
                <SearchBar
                    handleCountryChange={handleCountryChange}
                    fetchCountryPosition={fetchCountryPosition}
                />
                <div className={styles.cityName}>{weatherInfo.city}</div>
                <div className={styles.swiperArea}>
                    <Swiper
                        className={styles.swiperContainer}
                        navigation={true}
                        modules={[Navigation]}
                    >
                        <SwiperSlide>
                            {" "}
                            <div className={styles.dataContainer}>
                                <div className={styles.windHumidityContainer}>
                                    <GlassWrapper>
                                        <div className={styles.weatherGroup}>
                                            <p className={styles.iconSubTitle}>
                                                humidity
                                            </p>
                                            <div className={styles.iconText}>
                                                <img
                                                    className={
                                                        styles.weatherIcon
                                                    }
                                                    src={humidityIcon}
                                                    alt="humidity"
                                                />
                                                <div
                                                    className={
                                                        styles.weatherText
                                                    }
                                                >
                                                    <p>
                                                        {
                                                            weatherInfo.humidity
                                                                .data
                                                        }
                                                    </p>
                                                    <p className={styles.unit}>
                                                        {
                                                            weatherInfo.humidity
                                                                .unit
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassWrapper>
                                    <GlassWrapper>
                                        <div className={styles.weatherGroup}>
                                            <p className={styles.iconSubTitle}>
                                                Wind Speed
                                            </p>
                                            <div className={styles.iconText}>
                                                <img
                                                    className={
                                                        styles.weatherIcon
                                                    }
                                                    src={windIcon}
                                                    alt="wind"
                                                />
                                                <div
                                                    className={
                                                        styles.weatherText
                                                    }
                                                >
                                                    <p>
                                                        {
                                                            weatherInfo
                                                                .windSpeed.data
                                                        }
                                                    </p>
                                                    <p className={styles.unit}>
                                                        {
                                                            weatherInfo
                                                                .windSpeed.unit
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassWrapper>
                                </div>
                                <div className={styles.statusContainer}>
                                    <GlassWrapper>
                                        <p className={styles.iconSubTitle}>
                                            {weatherInfo.weatherCodeInfo}
                                        </p>
                                        <div className={styles.statusGroup}>
                                            <img
                                                className={styles.statusIcon}
                                                src={weatherInfo.weatherIcon}
                                                alt="weather icon"
                                            />
                                            <div
                                                className={
                                                    styles.temperatureGroup
                                                }
                                            >
                                                <img
                                                    className={
                                                        styles.temperatureIcon
                                                    }
                                                    src={temperatureIcon}
                                                    alt="temperature"
                                                />
                                                <div
                                                    className={
                                                        styles.weatherText
                                                    }
                                                >
                                                    <p>
                                                        {
                                                            weatherInfo
                                                                .temperature
                                                                .data
                                                        }
                                                    </p>
                                                    <p className={styles.unit}>
                                                        {
                                                            weatherInfo
                                                                .temperature
                                                                .unit
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassWrapper>
                                </div>
                                <div className={styles.dateContainer}>
                                    <GlassWrapper>
                                        <p className={styles.iconSubTitle}>
                                            date
                                        </p>
                                        <div className={styles.dateGroup}>
                                            <img
                                                className={styles.dateIcon}
                                                src={dateIcon}
                                                alt="date"
                                            />
                                            <p className={styles.date}>
                                                {weatherInfo.currentDate}
                                            </p>
                                        </div>
                                    </GlassWrapper>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <FiveDay position={position} />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Weather;
