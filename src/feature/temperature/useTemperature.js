import { useEffect, useContext, useCallback } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import useGetTemperature from "../../hooks/useGetTemperature";

const useTemperature = (position) => {
    const {
        isLoading: temperatureLoading,
        countryTemperature,
        refetch: fetchCountryTemperature,
    } = useGetTemperature(position);

    const { dispatch } = useContext(WeatherContext);

    // 使用 useCallback 確保 fetchCountryTemperature 的穩定性
    const fetchTemperature = useCallback(() => {
        if (position.latitude !== null && position.longitude !== null) {
            fetchCountryTemperature();
        }
    }, [fetchCountryTemperature, position.latitude, position.longitude]);

    // 更新溫度
    useEffect(() => {
        fetchTemperature();
    }, [fetchTemperature]);

    // 溫度若更新也一併更新 context 內容
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
