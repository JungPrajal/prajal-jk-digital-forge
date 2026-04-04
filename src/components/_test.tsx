import React from 'react';
import { motion } from 'framer-motion';
const roomScale=1;const isMobile=false;const mouseX=0;const mouseY=0;const perspX=50;const perspY=50;const roomRotateX=0;const roomRotateZ=0;
const T=()=>(<div>
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
                width: '350px',
                height: '350px',
                left: '50%',
                top: '50%',
                marginLeft: '-175px',
                marginTop: '-175px',
                transformStyle: 'preserve-3d',
                transform: 'translateZ(0px)',
                background: '#0a0e14',
                border: '1px solid rgba(0,229,255,0.08)',
              }}
            >
              {/* Glowing grid lines */}
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(0,229,255,0.08) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,229,255,0.08) 1px, transparent 1px)
                `,
                backgroundSize: '35px 35px',
                animation: 'gridGlow 3s ease-in-out infinite',
              }} />
              {/* Grid intersection dots */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle 1.5px, rgba(0,229,255,0.15) 100%, transparent 100%)',
                backgroundSize: '35px 35px',
                backgroundPosition: '0 0',
              }} />
              {/* GI: Cyan glow from code window / monitor onto desk+floor */}
              <div className="absolute" style={{
                width: '200px',
                height: '150px',
                left: '50%',
                top: '20%',
                marginLeft: '-50px',
                background: 'radial-gradient(ellipse, rgba(0,229,255,0.12) 0%, rgba(0,229,255,0.04) 40%, transparent 70%)',
                filter: 'blur(20px)',
                animation: 'screenGlow 4s ease-in-out infinite',
              }} />
              {/* Magenta secondary bounce */}
              <div className="absolute" style={{
                width: '120px',
                height: '100px',
                left: '55%',
                top: '25%',
                background: 'radial-gradient(ellipse, rgba(236,72,153,0.06) 0%, transparent 60%)',
                filter: 'blur(15px)',
                animation: 'screenGlow 4s ease-in-out 2s infinite',
              }} />
              {/* AO corners */}
              <div className="absolute top-0 left-0 w-[100px] h-[100px]" style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(0,0,0,0.6) 0%, transparent 70%)' }} />
              <div className="absolute top-0 right-0 w-[100px] h-[100px]" style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(0,0,0,0.5) 0%, transparent 70%)' }} />
              <div className="absolute bottom-0 left-0 w-[80px] h-[80px]" style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(0,0,0,0.4) 0%, transparent 75%)' }} />
              {/* Wall-floor junction AO */}
              <div className="absolute top-0 left-0 right-0 h-[40px]" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 100%)' }} />
              <div className="absolute top-0 right-0 w-[40px] h-full" style={{ background: 'linear-gradient(270deg, rgba(0,0,0,0.35) 0%, transparent 100%)' }} />
              {/* Under-desk shadow */}
              <div className="absolute" style={{ width: '240px', height: '140px', left: '50%', top: '35%', marginLeft: '-70px', background: 'radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 65%)', filter: 'blur(5px)' }} />
            </div>

            {/* ── Back wall (left) ── */}

</div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div>
</div>
);
export default T;
