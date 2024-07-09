import { useEffect, useState } from "react";
import useGetCountryPosition from "../hooks/countryHook";
import useGetTemperature from "../hooks/useGetTemperature";
import useGetWindSpeed from "../hooks/useGetWindSpeed";
import useGetHumidity from "../hooks/useGetHumidity";
import useGetWeatherCode from "../hooks/useGetWeatherCode";
import { handleWeatherCode } from "../utils/weatherCode";
import FiveDay from "../feature/fiveDay/FiveDay";
function Weather() {
  const [countryName, setCountryName] = useState("");
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [weatherCode, setWeatherCode] = useState(null);

  const {
    isLoading: countryPositionLoading,
    countryPosition,
    refetch: fetchCountryPosition,
  } = useGetCountryPosition(countryName);

  const {
    isLoading: temperatureLoading,
    countryTemperature,
    refetch: fetchCountryTemperature,
  } = useGetTemperature(position);

  const {
    isLoading: windSpeedLoading,
    countryWindSpeed,
    refetch: fetchCountryWindSpeed,
  } = useGetWindSpeed(position);

  const {
    isLoading: HumidityLoading,
    countryHumidity,
    refetch: fetchCountryHumidity,
  } = useGetHumidity(position);

  const {
    isLoading: weatherCodeLoading,
    countryWeatherCode,
    refetch: fetchWeatherCode,
  } = useGetWeatherCode(position);

  const handleCountryChange = (e) => {
    setCountryName(e.target.value);
  };

  useEffect(() => {
    if (countryPosition && countryPosition.results) {
      setPosition({
        latitude: countryPosition.results[0].latitude,
        longitude: countryPosition.results[0].longitude,
      });
    }
  }, [countryPosition, countryName]);
  useEffect(() => {
    if (position && position.latitude !== null && position.longitude !== null) {
      fetchCountryTemperature();
      fetchCountryWindSpeed();
      fetchCountryHumidity();
      fetchWeatherCode();
    }
  }, [
    fetchCountryHumidity,
    fetchCountryTemperature,
    fetchCountryWindSpeed,
    fetchWeatherCode,
    position,
  ]);

  useEffect(() => {
    if (countryWeatherCode?.current) {
      const code = handleWeatherCode(countryWeatherCode.current.weather_code);
      setWeatherCode(code);
    }
  }, [countryWeatherCode]);

  if (
    countryPositionLoading |
    temperatureLoading |
    windSpeedLoading |
    HumidityLoading |
    weatherCodeLoading
  ) {
    return <div>no data!</div>;
  }
  console.log("countryWeatherCode?.current", countryWeatherCode?.current);
  return (
    <div className="App">
      <input
        type="text"
        onChange={handleCountryChange}
        placeholder="Enter country name"
      />
      <button onClick={() => fetchCountryPosition()}>確認</button>
      <div>
        {countryPositionLoading && <div>Loading...</div>}
        {countryPosition?.results &&
        countryTemperature?.current &&
        countryWindSpeed?.current &&
        countryHumidity?.current &&
        countryWeatherCode?.current ? (
          <div>
            <p>不用顯示但必要的資料</p>
            <p>經度:{countryPosition.results[0].latitude}</p>
            <p>緯度:{countryPosition.results[0].longitude}</p>
            <hr />
            <p>要顯示的資料</p>
            <p>城市:{countryPosition.results[0].name}</p>
            <p>溫度:{countryTemperature.current.temperature_2m}</p>
            <p>風速:{countryWindSpeed.current.wind_speed_10m}</p>
            <p>濕度:{countryHumidity.current.relative_humidity_2m}</p>
            <p>天氣狀況:{weatherCode}</p>
          </div>
        ) : (
          <div>No results found.</div>
        )}
      </div>
      <div>
        <FiveDay position={position} />
      </div>
    </div>
  );
}

export default Weather;
