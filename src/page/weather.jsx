import { useEffect, useReducer, useState } from "react";
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
import NavBar from "../feature/searchBar/searchBar";
import temperatureIcon from "../assets/icon/temperature.svg";
import dateIcon from "../assets/icon/date.svg";

const initWeatherData = {
    city: null,
    weatherCode: null,
    temperature: null,
    windSpeed: null,
    humidity: null,
    bgImg: weatherDefault,
    weatherCodeInfo: null,
    currentDate: null,

    fiveDayRange: [],
    fiveDayTemperature: [],
    fiveDayWeatherCode: [],
};

const weatherReducer = (state, action) => {
    switch (action.type) {
        case "SET_WEATHER_DATA":
            return {
                ...state,
                city: action.payload.city,
                weatherCode: action.payload.weatherCode,
                temperature: action.payload.temperature,
                windSpeed: action.payload.windSpeed,
                humidity: action.payload.humidity,
                currentDate: action.payload.currentDate,
            };
        case "SET_WEATHER_CODE_INFO":
            return {
                ...state,
                bgImg: action.payload.bgImg,
                weatherCodeInfo: action.payload.weatherCodeInfo,
                weatherIcon: action.payload.weatherIcon,
            };

        case "SET_FIVE_DAY_RANGE":
            return {
                ...state,
                fiveDayRange: action.payload,
            };
        case "SET_FIVE_DAY_TEMPERATURE":
            return {
                ...state,
                fiveDayTemperature: action.payload,
            };
        case "SET_FIVE_DAY_WEATHER_CODE":
            return {
                ...state,
                fiveDayWeatherCode: action.payload,
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
                    temperature: countryTemperature.current.temperature_2m,
                    windSpeed: countryWindSpeed.current.wind_speed_10m,
                    humidity: countryHumidity.current.relative_humidity_2m,
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
                    bgImg: code.imgUrl,
                    weatherCodeInfo: code.name,
                    weatherIcon: code.icon,
                },
            });
        }
    }, [countryWeatherCode]);

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
                <NavBar
                    handleCountryChange={handleCountryChange}
                    fetchCountryPosition={fetchCountryPosition}
                />
                <div className={styles.cityName}>{weatherInfo.city}</div>
                <div className={styles.windHumidityContainer}>
                    <GlassWrapper>
                        <div className={styles.weatherGroup}>
                            <p className={styles.iconSubTitle}>humidity</p>
                            <div className={styles.iconText}>
                                <img
                                    className={styles.weatherIcon}
                                    src={humidityIcon}
                                    alt="humidity"
                                />
                                {weatherInfo.humidity}
                            </div>
                        </div>
                    </GlassWrapper>
                    <GlassWrapper>
                        <div className={styles.weatherGroup}>
                            <p className={styles.iconSubTitle}>Wind Speed</p>
                            <div className={styles.iconText}>
                                <img
                                    className={styles.weatherIcon}
                                    src={windIcon}
                                    alt="wind"
                                />
                                {weatherInfo.windSpeed}
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
                            <div className={styles.temperatureGroup}>
                                <img
                                    className={styles.temperatureIcon}
                                    src={temperatureIcon}
                                    alt="temperature"
                                />
                                <p className={styles.tempText}>
                                    {weatherInfo.temperature}
                                </p>
                            </div>
                        </div>
                    </GlassWrapper>
                </div>
                <div className={styles.dateContainer}>
                    <GlassWrapper>
                        <div className={styles.dateGroup}>
                            <img
                                className={styles.dateIcon}
                                src={dateIcon}
                                alt="date"
                            />
                            <p className={styles.iconSubTitle}>
                                {weatherInfo.currentDate}
                            </p>
                        </div>
                    </GlassWrapper>
                </div>
                {/* <input
                    type="text"
                    onChange={handleCountryChange}
                    placeholder="Enter country name"
                />
                <button onClick={() => fetchCountryPosition()}>確認</button>
                <div>
                    {countryPositionLoading && <div>Loading...</div>}
                    {weatherInfo ? (
                        <div>
                            <p>不用顯示但必要的資料</p>
                            <p>經度:{countryPosition.results[0].latitude}</p>
                            <p>緯度:{countryPosition.results[0].longitude}</p>
                            <hr />
                            <p>要顯示的資料</p>
                            <p>城市:{countryPosition.results[0].name}</p>
                            <p>
                                溫度:{countryTemperature.current.temperature_2m}
                            </p>
                            <p>
                                風速:{countryWindSpeed.current.wind_speed_10m}
                            </p>
                            <p>
                                濕度:
                                {countryHumidity.current.relative_humidity_2m}
                            </p>
                            <p>天氣狀況:{weatherCode}</p>
                        </div>
                    ) : (
                        <div>No results found.</div>
                    )}
                </div> */}
                {/* 5天內容 */}
                {/* <div>
                    <FiveDay position={position} />
                </div> */}
            </div>
        </div>
    );
};

export default Weather;
