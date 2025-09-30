import React, { useState, useEffect } from "react";

const BackgroundParticles = () => {
  const starCount = 25;
  const [meteors, setMeteors] = useState([]);
  const [stars, setStars] = useState([]);

  // Generate stars once
  useEffect(() => {
    const generatedStars = Array.from({ length: starCount }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const colors = [
        "bg-blue-400",
        "bg-purple-400",
        "bg-violet-400",
        "bg-indigo-400",
        "bg-blue-300",
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = `${Math.random() * 3}s`;

      return { id: i, size, top, left, color, delay };
    });

    setStars(generatedStars);
  }, []);

  // Add a meteor at random intervals
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const startTop = Math.random() * 80;
      const startLeft = Math.random() * 80;

      setMeteors((prev) => [...prev, { id, startTop, startLeft }]);

      // remove after animation
      setTimeout(() => {
        setMeteors((prev) => prev.filter((m) => m.id !== id));
      }, 3000);
    }, Math.random() * 5000 + 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full opacity-70 animate-pulse ${star.color}`}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: star.delay,
          }}
        />
      ))}

      {/* Meteors */}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-80 meteor"
          style={{
            top: `${meteor.startTop}%`,
            left: `${meteor.startLeft}%`,
          }}
        />
      ))}

      {/* Meteor CSS */}
      <style>{`
        @keyframes meteor {
          0% {
            transform: translate(0, 0) scaleX(1.5);
            opacity: 1;
          }
          100% {
            transform: translate(200px, 200px) scaleX(1.5);
            opacity: 0;
          }
        }
        .meteor {
          box-shadow: 0 0 6px 2px white;
          animation: meteor 2s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default BackgroundParticles;
