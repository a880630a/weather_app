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
import Humidity from "../feature/humidity/humidity";
import WindSpeed from "../feature/windSpeed/windSpeed";
import Temperature from "../feature/temperature/temperature";
import Date from "../feature/date/date";
import useWeather from "./useWeather";

const Weather = () => {
    const {
        countryPositionLoading,
        fetchCountryPosition,
        position,
        weatherCodeLoading,
        handleCityNameChange,
        weatherInfo,
    } = useWeather();
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
                        handleCityNameChange={handleCityNameChange}
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
