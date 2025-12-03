import { create } from "zustand";
import { persist } from "zustand/middleware";
import { config } from "../config";
import type { CardLayout, LinkTarget, SortingOption } from "../models/config";

export interface UserSettings {
  gridColumns: number;
  cardLayout: CardLayout;
  linkTarget: LinkTarget;
  linkSorting: SortingOption;
  categorySorting: SortingOption;
}

interface SettingsState {
  settings: UserSettings | null; // null means use defaults from config
  _hasHydrated: boolean;
  getEffectiveSettings: () => UserSettings;
  setSettings: (settings: UserSettings) => void;
  resetToDefaults: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const getDefaultSettings = (): UserSettings => ({
  gridColumns: config.gridColumns ?? 4,
  cardLayout: config.cardLayout ?? "default",
  linkTarget: config.linkTarget ?? "new-tab",
  linkSorting: config.linkSorting ?? "defined",
  categorySorting: config.categorySorting ?? "defined",
});

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: null,
      _hasHydrated: false,
      getEffectiveSettings: () => {
        const userSettings = get().settings;
        return userSettings ?? getDefaultSettings();
      },
      setSettings: (settings: UserSettings) => set({ settings }),
      resetToDefaults: () => set({ settings: null }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "resource-hub-settings",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
