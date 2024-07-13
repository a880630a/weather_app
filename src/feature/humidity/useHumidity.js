import { useEffect, useContext } from "react";
import useGetHumidity from "../../hooks/useGetHumidity";
import { WeatherContext } from "../../context/WeatherContext";

const useHumidity = ({ position }) => {
    const {
        isLoading: HumidityLoading,
        countryHumidity,
        refetch: fetchCountryHumidity,
    } = useGetHumidity(position);
    const { dispatch } = useContext(WeatherContext);

    // 更新濕度
    useEffect(() => {
        if (
            position &&
            position.latitude !== null &&
            position.longitude !== null
        )
            fetchCountryHumidity();
    }, [fetchCountryHumidity, position]);

    // 濕度若更新也一併更新 context 內容
    useEffect(() => {
        dispatch({
            type: "SET_HUMIDITY",
            payload: {
                humidity: {
                    data: countryHumidity.current.relative_humidity_2m,
                    unit: countryHumidity.current_units.relative_humidity_2m,
                },
            },
        });
    }, [countryHumidity, dispatch]);
    return { HumidityLoading, countryHumidity };
};

export default useHumidity;
