"use client";
import { createContext, useContext, useState } from "react";

type LoaderContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const LoaderContext = createContext<LoaderContextType>({
  loading: false,
  setLoading: () => {}, // Removed unused param to fix lint
});

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
