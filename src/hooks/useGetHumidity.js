import { useQuery } from "@tanstack/react-query";
import getWeatherInfo from "../services/weatherInfoApi";

const useGetHumidity = (position) => {
  const { getHumidity } = getWeatherInfo(position);
  const { isLoading, data, refetch, ...query } = useQuery({
    queryKey: ["humidity"],
    queryFn: () => getHumidity(),
    enabled: !!(position.latitude && position.longitude),
  });
  return { isLoading, countryHumidity: data, refetch, ...query };
};

export default useGetHumidity;
