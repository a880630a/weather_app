import axios from "axios";

const getCountryPosition = async (countryName) => {
  const data = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search`,
    {
      params: {
        name: countryName,
        count: 1,
      },
    }
  );
  return data?.data;
};

export default getCountryPosition;
