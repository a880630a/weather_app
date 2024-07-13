import { useEffect, useState, useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import useGetWeatherCode from "../../hooks/useGetWeatherCode";

const useDate = ({ position }) => {
    const [date, setDate] = useState(null);
    const {
        isLoading,
        countryWeatherCode,
        refetch: fetchWeatherCode,
    } = useGetWeatherCode(position);
    const { dispatch } = useContext(WeatherContext);

    // 更新日期
    useEffect(() => {
        if (countryWeatherCode?.current) {
            const tempDate = countryWeatherCode.current.time.split("T");
            setDate(tempDate);
        }
    }, [countryWeatherCode, date]);

    // 更新到 context
    useEffect(() => {
        dispatch({
            type: "SET_CURRENT_DATE",
            payload: {
                currentDate: date,
            },
        });
    }, [countryWeatherCode, date, dispatch]);

    return { dateLoading: isLoading, date };
};

export default useDate;
