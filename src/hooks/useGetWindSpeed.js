import { useQuery } from "@tanstack/react-query";
import getWeatherInfo from "../services/weatherInfoApi";

const useGetWindSpeed = (position) => {
  const { getWindSpeed } = getWeatherInfo(position);
  const { isLoading, data, refetch, ...query } = useQuery({
    queryKey: ["windSpeed"],
    queryFn: () => getWindSpeed(),
    enabled: !!(position.latitude && position.longitude),
  });
  return { isLoading, countryWindSpeed: data, refetch, ...query };
};

export default useGetWindSpeed;
