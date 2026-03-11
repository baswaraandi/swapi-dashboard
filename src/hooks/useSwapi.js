import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchSwapi } from "../api/swapi";

// Helper untuk mengambil nomor halaman dari URL 'next' SWAPI
const getPageFromUrl = (url) => {
  if (!url) return undefined;
  return new URL(url).searchParams.get("page");
};

// --- REUSABLE INFINITE HOOK ---
const useSwapiInfinite = (key, endpoint, search = "") => {
  return useInfiniteQuery({
    queryKey: [key, { search }],
    queryFn: ({ pageParam = 1 }) =>
      fetchSwapi(endpoint, { page: pageParam, search }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => getPageFromUrl(lastPage.next),
    staleTime: 5 * 60 * 1000, // Data dianggap fresh selama 5 menit
    gcTime: 10 * 60 * 1000, // Cache disimpan di memori selama 10 menit
  });
};

// --- EXPORTED CUSTOM HOOKS ---

export const usePeopleData = (search = "") =>
  useSwapiInfinite("people", "people", search);

export const usePlanetsData = (search = "") =>
  useSwapiInfinite("planets", "planets", search);

export const useStarshipsData = (search = "") =>
  useSwapiInfinite("starships", "starships", search);

export const useVehiclesData = (search = "") =>
  useSwapiInfinite("vehicles", "vehicles", search);

export const useSpeciesData = (search = "") =>
  useSwapiInfinite("species", "species", search);

// Khusus Films biasanya tidak pakai pagination (hanya sedikit data)
export const useFilmsData = (search = "") => {
  return useQuery({
    queryKey: ["films", { search }],
    queryFn: () => fetchSwapi("films", { search }),
    select: (data) => ({
      ...data,
      results: data.results.sort((a, b) => a.episode_id - b.episode_id),
    }),
    staleTime: 10 * 60 * 1000,
  });
};
