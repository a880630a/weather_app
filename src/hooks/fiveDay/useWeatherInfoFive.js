import { useQuery } from "@tanstack/react-query";
import getWeatherInfoFive from "../../services/weatherInfoFiveApi";

const useWeatherInfoFive = (position) => {
  const { getWeatherCodeFive, getTemperatureMaxFive, getTemperatureMinFive } =
    getWeatherInfoFive(position);

  const useGetWeatherCodeFive = () => {
    const { data, isLoading, ...query } = useQuery({
      queryKey: ["weatherCodeFive"],
      queryFn: () => getWeatherCodeFive(),
      enabled: !!(position.latitude && position.longitude),
    });
    return { weatherCodeFive: data, isLoading, ...query };
  };

  const useGetTemperatureMaxFive = () => {
    const { data, isLoading, ...query } = useQuery({
      queryKey: ["temperatureMax"],
      queryFn: () => getTemperatureMaxFive(),
      enabled: !!(position.latitude && position.longitude),
    });
    return { temperatureMaxFive: data, isLoading, ...query };
  };
  const useGetTemperatureMinFive = () => {
    const { data, isLoading, ...query } = useQuery({
      queryKey: ["temperatureMin"],
      queryFn: () => getTemperatureMinFive(),
      enabled: !!(position.latitude && position.longitude),
    });
    return { temperatureMinFive: data, isLoading, ...query };
  };
  return {
    useGetWeatherCodeFive,
    useGetTemperatureMaxFive,
    useGetTemperatureMinFive,
  };
};

export default useWeatherInfoFive;
