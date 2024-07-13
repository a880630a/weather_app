import { useContext, useEffect } from "react";
import useGetWindSpeed from "../../hooks/useGetWindSpeed";
import { WeatherContext } from "../../context/WeatherContext";

const useWindSpeed = ({ position }) => {
    const {
        isLoading: windSpeedLoading,
        countryWindSpeed,
        refetch: fetchCountryWindSpeed,
    } = useGetWindSpeed(position);
    const { dispatch } = useContext(WeatherContext);
    // 更新風速
    useEffect(() => {
        if (
            position &&
            position.latitude !== null &&
            position.longitude !== null
        )
            fetchCountryWindSpeed();
    }, [fetchCountryWindSpeed, position]);
    // 風速若更新也一併更新 context 內容
    useEffect(() => {
        dispatch({
            type: "SET_WIND_SPEED",
            payload: {
                windSpeed: {
                    data: countryWindSpeed.current.wind_speed_10m,
                    unit: countryWindSpeed.current_units.wind_speed_10m,
                },
            },
        });
    }, [countryWindSpeed, dispatch]);
    return { windSpeedLoading, countryWindSpeed };
};

export default useWindSpeed;
