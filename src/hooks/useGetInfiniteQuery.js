import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetInfiniteQuery = ({ url, key }) => {
  const axiosPrivate = useAxiosPrivate();
  const {
    isLoading,
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: key,
    queryFn: ({ pageParam }) => {
      return axiosPrivate.get(`${url}?page=${pageParam}`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.length ? pages.length + 1 : undefined;
    },
  });

  return {
    isLoading,
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useGetInfiniteQuery;
