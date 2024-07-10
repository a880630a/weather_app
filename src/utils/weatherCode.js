import clearSky from "../assets/images/clearSky.jpg";
import rain1 from "../assets/images/rain1.jpg";
import rain2 from "../assets/images/rain2.jpg";
import rain3 from "../assets/images/rain3.jpg";
import snow1 from "../assets/images/snow1.jpg";
import snow2 from "../assets/images/snow2.jpg";
import overcast from "../assets/images/overcast.jpg";
import thunderstorm from "../assets/images/thunderstorm.jpg";
import fog1 from "../assets/images/fog1.jpg";
import fog2 from "../assets/images/fog2.jpg";

export const weatherCodes = {
    0: { name: "Clear sky", imgUrl: clearSky },
    1: { name: "Mainly clear", imgUrl: clearSky },
    2: { name: "Partly cloudy", imgUrl: clearSky },
    3: { name: "Overcast", imgUrl: overcast },
    45: { name: "Fog", imgUrl: fog1 },
    48: { name: "Depositing rime fog", imgUrl: fog2 },
    51: { name: "Drizzle: Light intensity", imgUrl: rain1 },
    53: { name: "Drizzle: Moderate intensity", imgUrl: rain1 },
    55: { name: "Drizzle: Dense intensity", imgUrl: rain1 },
    56: { name: "Freezing Drizzle: Light intensity", imgUrl: rain1 },
    57: { name: "Freezing Drizzle: Dense intensity", imgUrl: rain1 },
    61: { name: "Rain: Slight intensity", imgUrl: rain2 },
    63: { name: "Rain: Moderate intensity", imgUrl: rain2 },
    65: { name: "Rain: Heavy intensity", imgUrl: rain2 },
    66: { name: "Freezing Rain: Light intensity", imgUrl: rain3 },
    67: { name: "Freezing Rain: Heavy intensity", imgUrl: rain3 },
    71: { name: "Snow fall: Slight intensity", imgUrl: snow1 },
    73: { name: "Snow fall: Moderate intensity", imgUrl: snow1 },
    75: { name: "Snow fall: Heavy intensity", imgUrl: snow1 },
    77: { name: "Snow grains", imgUrl: snow1 },
    80: { name: "Rain showers: Slight", imgUrl: rain3 },
    81: { name: "Rain showers: Moderate", imgUrl: rain3 },
    82: { name: "Rain showers: Violent", imgUrl: rain3 },
    85: { name: "Snow showers: Slight", imgUrl: snow2 },
    86: { name: "Snow showers: Heavy", imgUrl: snow2 },
    95: { name: "Thunderstorm: Slight or moderate", imgUrl: thunderstorm },
    96: { name: "Thunderstorm with slight hail", imgUrl: thunderstorm },
    99: { name: "Thunderstorm with heavy hail", imgUrl: thunderstorm },
};

export const handleWeatherCode = (code) => {
    console.log("weatherCodes[code]", weatherCodes[code]);
    return weatherCodes[code];
};
