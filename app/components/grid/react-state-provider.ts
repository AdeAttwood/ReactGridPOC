import { useState } from "react";
import type { StateProvider } from "./grid";

export function useReactStateProvider(): StateProvider {
  const [state, setState] = useState({ page: 1, perPage: 10 });

  return {
    page: state.page,
    perPage: state.perPage,
    filters: {},

    setPage: (page) => setState((state) => ({ ...state, page })),
    setPerPage: (perPage) => setState((state) => ({ ...state, perPage })),
  };
}
