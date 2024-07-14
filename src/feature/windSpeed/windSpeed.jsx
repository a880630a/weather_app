import React from "react";
import styles from "./windSpeed.module.scss";
import PureLoader from "../../components/loader/pureLoader";
import useWindSpeed from "./useWindSpeed";
import windIcon from "../../assets/icon/wind.svg";

const WindSpeed = ({ position }) => {
    const { windSpeedLoading, countryWindSpeed } = useWindSpeed(position);
    console.log("🚀 ~ WindSpeed ~ countryWindSpeed:", countryWindSpeed);
    if (windSpeedLoading) {
        return <PureLoader />;
    }
    return (
        <div className={styles.weatherGroup}>
            <p className={styles.iconSubTitle}>Wind Speed</p>
            <div className={styles.iconText}>
                <img className={styles.weatherIcon} src={windIcon} alt="wind" />
                <div className={styles.weatherText}>
                    <p>{countryWindSpeed.current.wind_speed_10m}</p>
                    <p className={styles.unit}>
                        {countryWindSpeed.current_units.wind_speed_10m}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WindSpeed;
