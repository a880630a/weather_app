import { useEffect, useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import useGetTemperature from "../../hooks/useGetTemperature";

const useTemperature = (position) => {
    const {
        isLoading: temperatureLoading,
        countryTemperature,
        refetch: fetchCountryTemperature,
    } = useGetTemperature(position);

    const { dispatch } = useContext(WeatherContext);

    useEffect(() => {
        if (
            position &&
            position.latitude !== null &&
            position.longitude !== null
        ) {
            fetchCountryTemperature();
        }
    }, [fetchCountryTemperature, position]);

    useEffect(() => {
        if (countryTemperature?.current && countryTemperature?.current_units) {
            dispatch({
                type: "SET_TEMPERATURE",
                payload: {
                    temperature: {
                        data: countryTemperature.current.temperature_2m,
                        unit: countryTemperature.current_units.temperature_2m,
                    },
                },
            });
        }
    }, [countryTemperature, dispatch]);

    return {
        temperatureLoading,
        countryTemperature,
    };
};

export default useTemperature;
