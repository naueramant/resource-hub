import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[]; // Array of link hrefs
  isFavorite: (href: string) => boolean;
  toggleFavorite: (href: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      isFavorite: (href: string) => get().favorites.includes(href),
      toggleFavorite: (href: string) =>
        set((state) => ({
          favorites: state.favorites.includes(href)
            ? state.favorites.filter((f) => f !== href)
            : [...state.favorites, href],
        })),
    }),
    {
      name: "developer-portal-favorites",
    }
  )
);
