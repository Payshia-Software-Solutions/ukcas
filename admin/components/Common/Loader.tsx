"use client";
import { useEffect, useState } from "react";
import { useLoader } from "@/app/context/LoaderContext";

const Loader = () => {
  const { loading } = useLoader();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (loading) {
      setShouldRender(true);
    } else {
      timeout = setTimeout(() => {
        setShouldRender(false);
      }, 500); 
    }

    return () => clearTimeout(timeout);
  }, [loading]);

  if (!shouldRender) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
