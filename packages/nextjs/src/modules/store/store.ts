import { Dropdown } from "@/components/dropdown/dropdown";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { CalendarDropdownOption } from "@/app/page";
type Store = {
  selectedCalendarOption: CalendarDropdownOption | null;
  setSelectedCalendarOption: (
    selectedCalendarOption: CalendarDropdownOption
  ) => void;
};

const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        selectedCalendarOption: null,
        setSelectedCalendarOption: (
          selectedCalendarOption: CalendarDropdownOption
        ) => set({ selectedCalendarOption }),
      }),
      {
        name: "storage",
      }
    )
  )
);

export default useStore;
