import axios from "axios";

const getWeatherInfoFive = (position) => {
  const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${position.latitude}&longitude=${position.longitude}`;

  // 獲取5天天氣狀況
  const getWeatherCodeFive = async () => {
    const data = await axios.get(
      `${endpoint}&daily=weather_code&timezone=Asia%2FTokyo&past_days=2&forecast_days=3`
    );
    return data?.data;
  };
  // 獲取5天最高溫度
  const getTemperatureMaxFive = async () => {
    const data = await axios.get(
      `${endpoint}&daily=temperature_2m_max&timezone=Asia%2FTokyo&past_days=2&forecast_days=3`
    );
    return data?.data;
  };

  // 獲取5天最高溫度
  const getTemperatureMinFive = async () => {
    const data = await axios.get(
      `${endpoint}&daily=temperature_2m_min&timezone=Asia%2FTokyo&past_days=2&forecast_days=3`
    );
    return data?.data;
  };

  return { getWeatherCodeFive, getTemperatureMaxFive, getTemperatureMinFive };
};

export default getWeatherInfoFive;
