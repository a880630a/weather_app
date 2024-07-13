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

import cloudIcon from "../assets/icon/weatherInfo/cloud.svg";
import fogIcon from "../assets/icon/weatherInfo/fog.svg";
import overcastIcon from "../assets/icon/weatherInfo/overcast.svg";
import rainIcon from "../assets/icon/weatherInfo/rain.svg";
import snowIcon from "../assets/icon/weatherInfo/snow.svg";
import thunderstormIcon from "../assets/icon/weatherInfo/thunderstorm.svg";
import sun from "../assets/icon/weatherInfo/sun.svg";

import clearSkyDT from "../assets/images/destop/clearSkyDT.jpg";
import fogDT from "../assets/images/destop/fogDT.jpg";
import overcastDT from "../assets/images/destop/overcastDT.jpg";
import rainDT from "../assets/images/destop/rainDT.jpg";
import snowDT from "../assets/images/destop/snowDT.jpg";
import thunderstormDT from "../assets/images/destop/thunderstormDT.jpg";

export const weatherCodes = {
  0: { name: "Clear sky", imgUrl: clearSky, icon: sun, imgUrlDT: clearSkyDT },
  1: {
    name: "Mainly clear",
    imgUrl: clearSky,
    icon: sun,
    imgUrlDT: clearSkyDT,
  },
  2: {
    name: "Partly cloudy",
    imgUrl: clearSky,
    icon: cloudIcon,
    imgUrlDT: clearSkyDT,
  },
  3: {
    name: "Overcast",
    imgUrl: overcast,
    icon: overcastIcon,
    imgUrlDT: overcastDT,
  },
  45: { name: "Fog", imgUrl: fog1, icon: fogIcon, imgUrlDT: fogDT },
  48: {
    name: "Depositing rime fog",
    imgUrl: fog2,
    icon: fogIcon,
    imgUrlDT: fogDT,
  },
  51: {
    name: "Drizzle: Light intensity",
    imgUrl: rain1,
    icon: rainIcon,
    imgUrlDT: rainDT,
  },
  53: {
    name: "Drizzle: Moderate intensity",
    imgUrl: rain1,
    icon: rainIcon,
    imgUrlDT: rainDT,
  },
  55: {
    name: "Drizzle: Dense intensity",
    imgUrl: rain1,
    icon: rainIcon,
    imgUrlDT: rainDT,
  },
  56: {
    name: "Freezing Drizzle: Light intensity",
    imgUrl: rain1,
    icon: rainIcon,
    imgUrlDT: rainDT,
  },
  57: {
    name: "Freezing Drizzle: Dense intensity",
    imgUrl: rain1,
    icon: rainIcon,
    imgUrlDT: rainDT,
  },
  61: {
    name: "Rain: Slight intensity",
    imgUrl: rain2,
    icon: rainIcon,
    imgUrlDT: rainDT,
  },
  63: {
    name: "Rain: Moderate intensity",
    imgUrl: rain2,
    icon: rainIcon,
    imgUrlDT: rainDT,
  },
  65: {
    name: "Rain: Heavy intensity",
    imgUrl: rain2,
    icon: rainIcon,
    imgUrlDT: rainDT,
  },
  66: {
    name: "Freezing Rain: Light intensity",
    imgUrl: rain3,
    icon: rainIcon,
    imgUrlDT: rainDT,
  },
  67: {
    name: "Freezing Rain: Heavy intensity",
    imgUrl: rain3,
    icon: rainIcon,
    imgUrlDT: rainDT,
  },
  71: {
    name: "Snow fall: Slight intensity",
    imgUrl: snow1,
    icon: snowIcon,
    imgUrlDT: snowDT,
  },
  73: {
    name: "Snow fall: Moderate intensity",
    imgUrl: snow1,
    icon: snowIcon,
    imgUrlDT: snowDT,
  },
  75: {
    name: "Snow fall: Heavy intensity",
    imgUrl: snow1,
    icon: snowIcon,
    imgUrlDT: snowDT,
  },
  77: { name: "Snow grains", imgUrl: snow1, icon: snowIcon, imgUrlDT: snowDT },
  80: {
    name: "Rain showers: Slight",
    imgUrl: rain3,
    icon: rainIcon,
    imgUrlDT: rainDT,
  },
  81: {
    name: "Rain showers: Moderate",
    imgUrl: rain3,
    icon: rainIcon,
    imgUrlDT: rainDT,
  },
  82: {
    name: "Rain showers: Violent",
    imgUrl: rain3,
    icon: rainIcon,
    imgUrlDT: rainDT,
  },
  85: {
    name: "Snow showers: Slight",
    imgUrl: snow2,
    icon: snowIcon,
    imgUrlDT: snowDT,
  },
  86: {
    name: "Snow showers: Heavy",
    imgUrl: snow2,
    icon: snowIcon,
    imgUrlDT: snowDT,
  },
  95: {
    name: "Thunderstorm: Slight or moderate",
    imgUrl: thunderstorm,
    icon: thunderstormIcon,
    imgUrlDT: thunderstormDT,
  },
  96: {
    name: "Thunderstorm with slight hail",
    imgUrl: thunderstorm,
    icon: thunderstormIcon,
    imgUrlDT: thunderstormDT,
  },
  99: {
    name: "Thunderstorm with heavy hail",
    imgUrl: thunderstorm,
    icon: thunderstormIcon,
    imgUrlDT: thunderstormDT,
  },
};

export const handleWeatherCode = (code) => {
  return weatherCodes[code];
};
