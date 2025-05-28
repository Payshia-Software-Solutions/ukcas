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
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="w-14 h-14 border-[6px] border-gray-500 border-t-transparent rounded-full animate-spin shadow-md" />
    </div>
  );
};

export default Loader;
