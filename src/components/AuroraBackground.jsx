import React from 'react';

const AuroraBackground = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>

      {/* faint gradient base (fills whole area) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030617] via-[#071034] to-[#000000] -z-10" />

      {/* Layer A - wide soft band with wave motion */}
      <div
        aria-hidden
        className="absolute left-[-15%] top-1/4 w-[140%] h-64 md:h-80 lg:h-96 rounded-full
                   bg-gradient-to-r from-blue-500/40 via-purple-500/30 to-pink-500/20
                   blur-3xl opacity-60 mix-blend-screen"
        style={{ 
          transformOrigin: 'center',
          animation: 'auroraWave 8s ease-in-out infinite, auroraFloat 15s ease-in-out infinite alternate'
        }}
      />

      {/* Layer B - thinner flowing band */}
      <div
        aria-hidden
        className="absolute left-[-20%] top-1/3 w-[160%] h-40 md:h-56 lg:h-64 rounded-full
                   bg-gradient-to-r from-purple-500/30 via-blue-500/20 to-transparent
                   blur-3xl opacity-50 mix-blend-screen"
        style={{ 
          transformOrigin: 'center',
          animation: 'auroraWave 12s ease-in-out infinite reverse, auroraFloat 18s ease-in-out infinite alternate-reverse'
        }}
      />

      {/* Layer C - soft shimmer pulse */}
      <div
        aria-hidden
        className="absolute right-0 bottom-10 w-64 md:w-96 h-32 md:h-44 rounded-full
                   bg-gradient-to-r from-blue-500/30 to-purple-500/20
                   blur-2xl opacity-40 mix-blend-screen"
        style={{
          animation: 'auroraPulse 6s ease-in-out infinite, auroraFloat 10s ease-in-out infinite'
        }}
      />

      {/* Layer D - additional flowing curtain */}
      <div
        aria-hidden
        className="absolute left-[10%] top-[15%] w-[120%] h-48 md:h-64 lg:h-80 rounded-full
                   bg-gradient-to-r from-transparent via-pink-500/20 to-blue-500/25
                   blur-3xl opacity-45 mix-blend-screen"
        style={{
          transformOrigin: 'center',
          animation: 'auroraWave 10s ease-in-out infinite, auroraFloat 20s ease-in-out infinite alternate'
        }}
      />



      {/* CSS animations */}
      <style jsx>{`
        @keyframes auroraWave {
          0% {
            transform: translateY(0) translateX(0) scaleX(1) scaleY(1) skewX(0deg);
          }
          25% {
            transform: translateY(-80px) translateX(100px) scaleX(1.4) scaleY(1.3) skewX(5deg);
          }
          50% {
            transform: translateY(-40px) translateX(-80px) scaleX(0.8) scaleY(0.85) skewX(-3deg);
          }
          75% {
            transform: translateY(-120px) translateX(120px) scaleX(1.5) scaleY(1.4) skewX(7deg);
          }
          100% {
            transform: translateY(0) translateX(0) scaleX(1) scaleY(1) skewX(0deg);
          }
        }

        @keyframes auroraFloat {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg) scaleY(1) scaleX(1);
          }
          20% {
            transform: translateX(-150px) translateY(-80px) rotate(5deg) scaleY(1.5) scaleX(1.3);
          }
          40% {
            transform: translateX(-100px) translateY(-120px) rotate(-3deg) scaleY(0.7) scaleX(0.8);
          }
          60% {
            transform: translateX(140px) translateY(-100px) rotate(8deg) scaleY(1.6) scaleX(1.4);
          }
          80% {
            transform: translateX(80px) translateY(-60px) rotate(-4deg) scaleY(0.75) scaleX(0.85);
          }
          100% {
            transform: translateX(0) translateY(0) rotate(0deg) scaleY(1) scaleX(1);
          }
        }

        @keyframes auroraPulse {
          0% {
            opacity: 0.2;
            transform: scale(0.7) rotate(0deg);
          }
          25% {
            opacity: 0.7;
            transform: scale(1.6) rotate(5deg);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.4) rotate(-3deg);
          }
          75% {
            opacity: 0.8;
            transform: scale(1.8) rotate(8deg);
          }
          100% {
            opacity: 0.2;
            transform: scale(0.7) rotate(0deg);
          }
        }
      `}</style>

    </div>
  );
};

export default AuroraBackground;