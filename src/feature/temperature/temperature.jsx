import React from "react";
import styles from "./temperature.module.scss";
import PureLoader from "../../components/loader/pureLoader";
import useTemperature from "./useTemperature";
import temperatureIcon from "../../assets/icon/temperature.svg";

const Temperature = (position) => {
    const { temperatureLoading, countryTemperature } = useTemperature(position);
    console.log("🚀 ~ Temperature ~ countryTemperature:", countryTemperature);
    if (temperatureLoading) {
        return <PureLoader />;
    }
    return (
        <div className={styles.temperatureGroup}>
            {countryTemperature &&
                countryTemperature.current &&
                countryTemperature.current.temperature_2m && (
                    <>
                        <img
                            className={styles.temperatureIcon}
                            src={temperatureIcon}
                            alt="temperature"
                        />
                        <div className={styles.weatherText}>
                            <p>{countryTemperature.current?.temperature_2m}</p>
                            <p className={styles.unit}>
                                {
                                    countryTemperature.current_unit
                                        ?.temperature_2m
                                }
                            </p>
                        </div>
                    </>
                )}
        </div>
    );
};

export default Temperature;
