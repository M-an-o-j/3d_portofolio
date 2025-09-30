import React, { useEffect } from "react";

const Meteor = ({ startTop, startLeft }) => {
  useEffect(() => {
    // Nothing here yet, but could be used for lifecycle logic
  }, []);

  return (
    <>
      <div
        className="absolute meteor"
        style={{
          top: `${startTop}%`,
          left: `${startLeft}%`,
        }}
      />
      <style>{`
        @keyframes meteor {
          0% {
            transform: translate(0, 0) scaleX(1);
            opacity: 1;
          }
          100% {
            transform: translate(200px, 200px) scaleX(1);
            opacity: 0;
          }
        }
        .meteor {
          width: 2px;
          height: 100px;
          background: linear-gradient(45deg, white, transparent);
          border-radius: 50%;
          box-shadow: 0 0 6px 2px white;
          animation: meteor 2s linear forwards;
        }
      `}</style>
    </>
  );
};

export default Meteor;
