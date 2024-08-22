import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetData = ({ url, key }) => {
  const axiosPrivate = useAxiosPrivate();
  const { isLoading, isFetched, data, isError, error } = useQuery({
    queryKey: key,
    queryFn: () => {
      return axiosPrivate.get(url);
    },
    select: (data) => {
      return data.data;
    },
  });

  return { isLoading, isFetched, data, isError, error };
};

export default useGetData;
