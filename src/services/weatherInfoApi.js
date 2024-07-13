import axios from "axios";

const getWeatherInfo = (position) => {
    const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${position.latitude}&longitude=${position.longitude}`;

    // 獲取當前溫度
    const getTemperature = async () => {
        const data = await axios.get(`${endpoint}&current=temperature_2m`);
        return data?.data;
    };
    // 獲取當前風速
    const getWindSpeed = async () => {
        const data = await axios.get(`${endpoint}&current=wind_speed_10m`);
        return data?.data;
    };
    // 獲取當前濕度
    const getHumidity = async () => {
        console.log("我在這裡");
        const data = await axios.get(
            `${endpoint}&current=relative_humidity_2m`
        );
        return data?.data;
    };
    // 獲取天氣狀況
    const getWeatherCode = async () => {
        const data = await axios.get(
            `${endpoint}&current=weather_code&timezone=Asia%2FTokyo`
        );
        return data?.data;
    };

    return { getTemperature, getWindSpeed, getHumidity, getWeatherCode };
};

export default getWeatherInfo;
