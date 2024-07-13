import "chart.js/auto";
import { useCallback, useEffect, useReducer, useState } from "react";
import useWeatherInfoFive from "../../hooks/fiveDay/useWeatherInfoFive";
import { Line } from "react-chartjs-2";
import styles from "./FiveDay.module.scss";
import GlassWrapper from "../../components/glassWrapper/glassWrapper";
import { handleWeatherCode } from "../../utils/weatherCode";
import Loader from "../../components/loader/allPageLoader";

const initFiveDayInfo = {
    fiveDayRange: [],
    fiveDayTemperature: [],
    fiveDayWeatherCode: [],
};

const fiveDayReducer = (state, action) => {
    switch (action.type) {
        case "SET_FIVE_DAY_INFO":
            return {
                ...state,
                fiveDayRange: action.payload.fiveDayRange,
                fiveDayTemperature: action.payload.fiveDayTemperature,
                fiveDayWeatherCode: action.payload.fiveDayWeatherCode,
            };

        case "RESET_FIVE_DAY_INFO":
            return {
                fiveDayRange: [],
                fiveDayTemperature: [],
                fiveDayWeatherCode: [],
            };

        default:
            throw new Error("Invalid action type");
    }
};

const FiveDay = ({ position }) => {
    const [temperatureFive, setTemperatureFive] = useState([]);
    const [fiveDayInfo, dispatchFiveDayInfo] = useReducer(
        fiveDayReducer,
        initFiveDayInfo
    );

    const {
        useGetWeatherCodeFive,
        useGetTemperatureMaxFive,
        useGetTemperatureMinFive,
    } = useWeatherInfoFive(position);

    const {
        weatherCodeFive,
        isLoading: weatherCodeLoading,
        refetch: fetchWeatherCodeFive,
    } = useGetWeatherCodeFive();
    const {
        temperatureMaxFive,
        isLoading: temperatureMaxLoading,
        refetch: fetchTemperatureMaxFive,
    } = useGetTemperatureMaxFive();
    const {
        temperatureMinFive,
        isLoading: temperatureMinLoading,
        refetch: fetchTemperatureMinFive,
    } = useGetTemperatureMinFive();

    const chartData = {
        labels: fiveDayInfo.fiveDayRange,
        datasets: [
            {
                label: "Temperature",
                data: fiveDayInfo.fiveDayTemperature,
                fill: false,
                borderColor: "black",
                pointBackgroundColor: "red",
                tension: 0.1,
            },
        ],
    };

    const refetchAllFiveData = useCallback(() => {
        fetchWeatherCodeFive();
        fetchTemperatureMaxFive();
        fetchTemperatureMinFive();
    }, [
        fetchTemperatureMaxFive,
        fetchTemperatureMinFive,
        fetchWeatherCodeFive,
    ]);

    // 設定 chart config
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // 允許圖表在容器中填滿

        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const index = context.dataIndex;
                        const temperature =
                            fiveDayInfo.fiveDayTemperature[index];
                        const weatherCondition = handleWeatherCode(
                            fiveDayInfo.fiveDayWeatherCode[index]
                        );
                        return `Temperature: ${temperature} °C, Weather condition: ${weatherCondition.name}`;
                    },
                },
            },
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Average Temperature Over 5 Days",
                color: "black",
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "black", // x 軸標籤顏色
                },
            },
            y: {
                ticks: {
                    color: "black", // y 軸標籤顏色
                },
            },
        },
    };

    // 處理平均溫度
    useEffect(() => {
        if (temperatureMaxFive && temperatureMinFive) {
            const newTemperatureFive =
                temperatureMaxFive.daily.temperature_2m_max.map(
                    (maxTemp, index) =>
                        (maxTemp +
                            temperatureMinFive.daily.temperature_2m_min[
                                index
                            ]) /
                        2
                );
            setTemperatureFive(newTemperatureFive);
        }
    }, [temperatureMaxFive, temperatureMinFive]);

    useEffect(() => {
        if (weatherCodeFive && temperatureFive.length > 0) {
            dispatchFiveDayInfo({
                type: "SET_FIVE_DAY_INFO",
                payload: {
                    fiveDayRange: weatherCodeFive.daily.time,
                    fiveDayTemperature: temperatureFive,
                    fiveDayWeatherCode: weatherCodeFive.daily.weather_code,
                },
            });
        }
    }, [temperatureFive, weatherCodeFive]);

    useEffect(() => {
        dispatchFiveDayInfo({ type: "RESET_FIVE_DAY_INFO" });
        refetchAllFiveData();
    }, [position, refetchAllFiveData]);

    if (weatherCodeLoading || temperatureMaxLoading || temperatureMinLoading) {
        return <Loader />;
    }
    return (
        <div className={styles.wrapper}>
            <GlassWrapper>
                {weatherCodeFive && temperatureFive.length > 0 && (
                    <Line data={chartData} options={chartOptions} />
                )}
            </GlassWrapper>
        </div>
    );
};

export default FiveDay;
