import React, { useEffect, useRef, useState } from "react";

const AlumniNetwork = () => {
  const stats = [
    { value: 201, label: "Alumni across the globe" },
    { value: 331, label: "On-Campus Alumni" },
    { value: 128, label: "WILP Alumni" },
    { value: 330, label: "Academicians" },
    { value: 74, label: "CEOs" },
    { value: 64, label: "Founders/Co-founders" },
    { value: 15, label: "Unicorn Startups" },
    { value: 5, label: "Padma Bhushan/Shri Awardees" },
    { value: 5, label: "BITS Ratna Awardees" },
    { value: 110, label: "Distinguished Alumnus Awardees" },
    { value: 16, label: "Distinguished Services Awardees" },
    { value: 11, label: "Young Alumnus Achievement Awardees" },
  ];

  const [animatedStats, setAnimatedStats] = useState(
    stats.map(() => 0) // Initialize all stats at 0
  );
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          stats.forEach((stat, index) => {
            animateValue(index, stat.value, 2000); // Animate each stat
          });
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const animateValue = (index, targetValue, duration) => {
    const stepTime = Math.abs(Math.floor(duration / targetValue));
    let current = 0;

    const step = () => {
      current += Math.ceil(targetValue / (duration / stepTime));
      if (current >= targetValue) {
        current = targetValue;
        clearInterval(timer);
      }
      setAnimatedStats((prevStats) => {
        const newStats = [...prevStats];
        newStats[index] = current;
        return newStats;
      });
    };

    const timer = setInterval(step, stepTime);
  };

  return (
    <div className="mt-16 px-4" ref={ref}>
      <div className="text-center text-5xl font-bold mb-12">Alumni Network</div>
      <div className="bg-yellow-600 rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold">{animatedStats[index]}</div>
              <div className="text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumniNetwork;
