import React, { useEffect, useState, useContext } from "react";
import useGetCountryPosition from "../hooks/countryHook";
import useGetWeatherCode from "../hooks/useGetWeatherCode";
import { handleWeatherCode } from "../utils/weatherCode";
import FiveDay from "../feature/fiveDay/FiveDay";
import styles from "./weather.module.scss";
import clsx from "clsx";
import GlassWrapper from "../components/glassWrapper/glassWrapper";
import SearchBar from "../feature/searchBar/searchBar";
import AllPageLoader from "../components/loader/allPageLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { WeatherContext } from "../context/WeatherContext";
import Humidity from "../feature/humidity/humidity";
import WindSpeed from "../feature/windSpeed/windSpeed";
import Temperature from "../feature/temperature/temperature";
import Date from "../feature/date/date";

const Weather = () => {
    const { weatherInfo, dispatch } = useContext(WeatherContext);
    const [countryName, setCountryName] = useState("Taiwan");
    const [position, setPosition] = useState({
        latitude: null,
        longitude: null,
    });
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowWidth, weatherInfo.weatherCode]);

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

    const handleCountryChange = (e) => {
        setCountryName(e.target.value);
    };

    useEffect(() => {
        if (countryPosition && countryPosition.results) {
            console.log("countryPosition", countryPosition);
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
    }, [countryName, countryWeatherCode, countryPosition, dispatch]);

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

    if (countryPositionLoading || weatherCodeLoading) {
        return <AllPageLoader />;
    }

    return (
        <div className="App">
            {position.latitude && position.longitude ? (
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
                                    <div
                                        className={styles.windHumidityContainer}
                                    >
                                        <GlassWrapper>
                                            <Humidity position={position} />
                                        </GlassWrapper>
                                        <GlassWrapper>
                                            <WindSpeed position={position} />
                                        </GlassWrapper>
                                    </div>
                                    <div className={styles.statusContainer}>
                                        <GlassWrapper>
                                            <p className={styles.iconSubTitle}>
                                                {weatherInfo.weatherCodeInfo}
                                            </p>
                                            <div className={styles.statusGroup}>
                                                <img
                                                    className={
                                                        styles.statusIcon
                                                    }
                                                    src={
                                                        weatherInfo.weatherIcon
                                                    }
                                                    alt="weather icon"
                                                />
                                                <Temperature
                                                    position={position}
                                                />
                                            </div>
                                        </GlassWrapper>
                                    </div>
                                    <div className={styles.dateContainer}>
                                        <GlassWrapper>
                                            <Date position={position} />
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
            ) : (
                <AllPageLoader />
            )}
        </div>
    );
};

export default Weather;
