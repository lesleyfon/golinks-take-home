import { createContext } from "react";

// Instantiate context object
// Where data will be stored
const AppContext = createContext();

export const Provider = AppContext.Provider;
export const Consumer = AppContext.Consumer;
