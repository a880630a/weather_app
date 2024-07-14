import { useQuery } from "@tanstack/react-query";
import getWeatherInfo from "../services/weatherInfoApi";

const useGetTemperature = (position) => {
    const { getTemperature } = getWeatherInfo(position);
    const { isLoading, data, refetch, ...query } = useQuery({
        queryKey: ["temperature"],
        queryFn: () => getTemperature(),
        enabled: !!(position.latitude && position.longitude),
    });
    return { isLoading, countryTemperature: data, refetch, ...query };
};

export default useGetTemperature;
