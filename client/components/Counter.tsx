"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface CounterItem {
  value: number;
  suffix?: string;
  label: string;
}

const counterData: CounterItem[] = [
  { value: 2013, label: "Year Founded" },
  { value: 60, suffix: "+", label: "Online Programs" },
  { value: 155, suffix: "+", label: "Team Members" },
  { value: 320, suffix: "+", label: "Qualifications" },
];

const CounterSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div className="bg-white py-10">
      <div className="container max-w-6xl mx-auto px-4">
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {counterData.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center transform transition duration-500 ease-out"
            >
              <h2 className={`text-3xl sm:text-4xl font-bold text-black ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                {inView && <CountUp start={0} end={item.value} duration={2.5} separator="," />}
                {item.suffix}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
