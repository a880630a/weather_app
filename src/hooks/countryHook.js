import { useQuery } from "@tanstack/react-query";
import getCountryPosition from "../services/countryApi";

const useGetCountryPosition = (countryName) => {
  const { isLoading, data, refetch, ...query } = useQuery({
    queryKey: ["position"],
    queryFn: () => getCountryPosition(countryName),
  });
  return { isLoading, countryPosition: data, refetch, ...query };
};

export default useGetCountryPosition;
