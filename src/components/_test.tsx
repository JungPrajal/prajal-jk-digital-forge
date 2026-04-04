import React from 'react';
import { motion } from 'framer-motion';
const roomScale = 1;
const isMobile = false;
const T = () => (
<div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{ perspective: isMobile ? '600px' : '1200px', scale: roomScale }}
        >
        <div
          className="relative pointer-events-auto"
          style={{
            width: isMobile ? '360px' : undefined,
            height: isMobile ? '360px' : undefined,
            perspective: isMobile ? '600px' : '1200px',
            perspectiveOrigin: isMobile ? `${55 + mouseX * 5}% ${25 + mouseY * 5}%` : `${perspX}% ${perspY}%`,
            transition: 'perspective-origin 0.3s ease-out',
            transform: isMobile ? 'scale(1.6) translate(10%, 5%)' : 'none',
          }}
        >
        <div
          className={`relative ${isMobile ? 'w-[320px] h-[320px]' : 'w-[480px] h-[480px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[520px] lg:w-[700px] lg:h-[560px]'}`}
          style={{
            perspective: isMobile ? '600px' : '1200px',
            perspectiveOrigin: isMobile ? `${55 + mouseX * 5}% ${25 + mouseY * 5}%` : `${perspX}% ${perspY}%`,
            transition: 'perspective-origin 0.3s ease-out',
          }}
        >
          <div
            className="relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${roomRotateX}deg) rotateZ(${roomRotateZ}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            {/* ── Floor - Dark with glowing grid lines ── */}
            <div
              className="absolute"
              style={{

</div></div></div></div></div></div></div></div></div></div></div></div></div></div></div>
</div>
);
export default T;
