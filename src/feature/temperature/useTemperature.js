import { useEffect, useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import useGetTemperature from "../../hooks/useGetTemperature";

const useTemperature = ({ position }) => {
    const {
        isLoading: temperatureLoading,
        countryTemperature,
        refetch: fetchCountryTemperature,
    } = useGetTemperature(position);

    const { dispatch } = useContext(WeatherContext);

    // 更新溫度
    useEffect(() => {
        if (
            position &&
            position.latitude !== null &&
            position.longitude !== null
        )
            fetchCountryTemperature();
    }, [fetchCountryTemperature, position]);

    // 溫度若更新也一併更新 context 內容
    useEffect(() => {
        dispatch({
            type: "SET_HUMIDITY",
            payload: {
                temperature: {
                    data: countryTemperature.current.temperature_2m,
                    unit: countryTemperature.current_units.temperature_2m,
                },
            },
        });
    }, [countryTemperature, dispatch]);

    return {
        temperatureLoading,
        countryTemperature,
    };
};

export default useTemperature;
