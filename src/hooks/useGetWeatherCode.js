import { useQuery } from "@tanstack/react-query";
import getWeatherInfo from "../services/weatherInfoApi";
const useGetWeatherCode = (position) => {
  const { getWeatherCode } = getWeatherInfo(position);
  const { data, isLoading, ...query } = useQuery({
    queryKey: ["weatherCode"],
    queryFn: () => getWeatherCode(),
    enabled: !!(position.latitude && position.longitude),
  });
  return {
    countryWeatherCode: data,
    isLoading,
    ...query,
  };
};

export default useGetWeatherCode;
