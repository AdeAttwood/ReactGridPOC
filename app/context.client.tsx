import { createContext } from "react";

export interface ClientStyleContextData {
  reset: () => void;
}

const ClientStyleContext = createContext<ClientStyleContextData>({
  reset: () => {
    // do nothing
  },
});

export default ClientStyleContext;
