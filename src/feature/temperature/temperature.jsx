import React from "react";
import styles from "./temperature.module.scss";
import PureLoader from "../../components/loader/pureLoader";
import useTemperature from "./useTemperature";
import temperatureIcon from "../../assets/icon/temperature.svg";

const Temperature = ({ position }) => {
    const { temperatureLoading, countryTemperature } = useTemperature(position);
    if (temperatureLoading) {
        return <PureLoader />;
    }
    return (
        <div className={styles.temperatureGroup}>
            <img
                className={styles.temperatureIcon}
                src={temperatureIcon}
                alt="temperature"
            />
            <div className={styles.weatherText}>
                <p>{countryTemperature.data}</p>
                <p className={styles.unit}>{countryTemperature.unit}</p>
            </div>
        </div>
    );
};

export default Temperature;
