import { useEffect, useState } from "react";
import { PAGINATION } from "@/config/constants";

interface UseEntitySearchProps<
  T extends {
    search: string;
    page: number;
  }
> {
  searchParams: T;
  setSearchParams: (params: T) => void;
  debounceMs?: number;
}

export function useEntitySearch<T extends { search: string; page: number }>({
  searchParams,
  setSearchParams,
  debounceMs = 500,
}: UseEntitySearchProps<T>) {
  const [localSearch, setLocalSearch] = useState(searchParams.search);

  useEffect(() => {
    if (localSearch === "" && searchParams.search !== "") {
      setSearchParams({
        ...searchParams,
        search: "",
        page: PAGINATION.DEFAULT_PAGE,
      });
      return;
    }

    const timeout = setTimeout(() => {
      if (localSearch !== searchParams.search) {
        setSearchParams({
          ...searchParams,
          search: localSearch,
          page: PAGINATION.DEFAULT_PAGE,
        });
      }
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [
    localSearch,
    searchParams.page,
    searchParams.search,
    setSearchParams,
    debounceMs,
  ]);

  useEffect(() => {
    setLocalSearch(searchParams.search);
  }, [searchParams.search]);

  return {
    searchValue: localSearch,
    onSearchChange: setLocalSearch,
  };
}
