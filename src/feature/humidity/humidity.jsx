import React from "react";
import styles from "./humidity.module.scss";
import humidityIcon from "../../assets/icon/humidity.svg";
import useHumidity from "./useHumidity";
import PureLoader from "../../components/loader/pureLoader";
const Humidity = ({ position }) => {
    const { HumidityLoading, countryHumidity } = useHumidity(position);
    if (HumidityLoading) {
        return <PureLoader />;
    }
    return (
        <div className={styles.weatherGroup}>
            <p className={styles.iconSubTitle}>humidity</p>
            <div className={styles.iconText}>
                <img
                    className={styles.weatherIcon}
                    src={humidityIcon}
                    alt="humidity"
                />
                <div className={styles.weatherText}>
                    <p>{countryHumidity.data}</p>
                    <p className={styles.unit}>{countryHumidity.unit}</p>
                </div>
            </div>
        </div>
    );
};

export default Humidity;
