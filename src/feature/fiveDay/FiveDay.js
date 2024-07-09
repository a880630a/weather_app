import { useEffect, useState } from "react";
import useWeatherInfoFive from "../../hooks/fiveDay/useWeatherInfoFive";

const FiveDay = ({ position }) => {
  const [temperatureFive, setTemperatureFive] = useState([]);
  const {
    useGetWeatherCodeFive,
    useGetTemperatureMaxFive,
    useGetTemperatureMinFive,
  } = useWeatherInfoFive(position);

  const { weatherCodeFive, isLoading: weatherCodeLoading } =
    useGetWeatherCodeFive();
  const { temperatureMaxFive, isLoading: temperatureMaxLoading } =
    useGetTemperatureMaxFive();
  const { temperatureMinFive, isLoading: temperatureMinLoading } =
    useGetTemperatureMinFive();

  useEffect(() => {
    if (temperatureMaxFive && temperatureMinFive) {
      for (
        let i = 0;
        i < temperatureMaxFive.daily.temperature_2m_max.length;
        i++
      ) {
        const maxTemp = temperatureMaxFive.daily.temperature_2m_max[i];
        const minTemp = temperatureMinFive.daily.temperature_2m_min[i];
        setTemperatureFive((prev) => [...prev, (maxTemp + minTemp) * 0.5]);
      }
    }
  }, [temperatureMaxFive, temperatureMinFive]);

  if (weatherCodeLoading || temperatureMaxLoading || temperatureMinLoading) {
    return <div>Loading...</div>;
  }
  console.log("temperatureFive", temperatureFive);
  return (
    <div>
      {weatherCodeFive &&
        weatherCodeFive.daily.weather_code.map((value, index) => (
          <div key={index}>
            <p>Weather Code: {value}</p>
          </div>
        ))}

      {temperatureFive &&
        temperatureFive.map((value, index) => {
          return <p key={index}>Temp:{value} °C</p>;
        })}
    </div>
  );
};

export default FiveDay;
