import React from "react";
import { motion } from "framer-motion";
const roomScale=1;const isMobile=false;const mouseX=0;const mouseY=0;const perspX=50;const perspY=50;const roomRotateX=0;const roomRotateZ=0;const currentCodeIndex=0;const visibleLines:any[]=[];const charCount=0;const cursorVisible=true;const colorize=(t:string)=>t;const CODE_SNIPPETS:any[]=[];const handleCodeClick=()=>{};const scrolled=false;const codeExploding=false;const fullText="";
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
            <div
              className="absolute"
              style={{
                width: '350px',
                height: '200px',
                left: '50%',
                top: '50%',
                marginLeft: '-175px',
                marginTop: '-375px',
                transformStyle: 'preserve-3d',
                transformOrigin: 'bottom center',
                transform: 'rotateX(90deg)',
                background: 'linear-gradient(180deg, #1a1e24 0%, #22272e 100%)',
                borderTop: '1px solid rgba(0,229,255,0.08)',
                borderLeft: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {/* Wall poster / decoration */}
              <div className="absolute top-6 left-8 w-16 h-20 border border-purple-500/15 bg-purple-500/5 rounded-sm flex items-center justify-center">
                <span className="text-[6px] text-purple-400/30 font-mono">AI/ML</span>
              </div>
              <div className="absolute top-4 right-10 w-12 h-12 border border-cyan-500/10 bg-cyan-500/5 rounded-sm flex items-center justify-center">
                <span className="text-[5px] text-cyan-400/30 font-mono">{'{ }'}</span>
              </div>
              {/* AO - wall-floor junction shadow */}
              <div className="absolute bottom-0 left-0 right-0 h-[50px]" style={{
                background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 100%)',
              }} />
              {/* AO - wall corner shadows */}
              <div className="absolute bottom-0 left-0 w-[60px] h-[80px]" style={{
                background: 'radial-gradient(ellipse at 0% 100%, rgba(0,0,0,0.4) 0%, transparent 70%)',
              }} />
              <div className="absolute bottom-0 right-0 w-[60px] h-[80px]" style={{
                background: 'radial-gradient(ellipse at 100% 100%, rgba(0,0,0,0.35) 0%, transparent 70%)',
              }} />
              {/* Monitor point light projection on back wall */}
              <div className="absolute" style={{
                bottom: '10px',
                left: '40%',
                width: '120px',
                height: '80px',
                background: 'radial-gradient(ellipse, rgba(0,229,255,0.08) 0%, rgba(236,72,153,0.04) 40%, transparent 70%)',
                filter: 'blur(10px)',
                animation: 'screenFlicker 3s ease-in-out infinite',
              }} />
            </div>

            {/* ── Side wall (right) ── */}
            <div
              className="absolute"
              style={{
                width: '200px',
                height: '350px',
                left: '50%',
                top: '50%',
                marginLeft: '175px',
                marginTop: '-350px',
                transformStyle: 'preserve-3d',
                transformOrigin: 'left center',
                transform: 'rotateY(-90deg) translateZ(0px)',
                background: 'linear-gradient(180deg, #1a1e24 0%, #22272e 100%)',
                borderTop: '1px solid rgba(0,229,255,0.08)',
              }}
            >
              <RGBStrip className="bottom-0 left-0 w-full h-1" color="purple" />
              {/* AO - wall-floor junction */}
              <div className="absolute bottom-0 left-0 right-0 h-[50px]" style={{
                background: 'linear-gradient(0deg, rgba(0,0,0,0.45) 0%, transparent 100%)',
              }} />
              {/* AO - wall corner where walls meet */}
              <div className="absolute bottom-0 left-0 w-[50px] h-[80px]" style={{
                background: 'radial-gradient(ellipse at 0% 100%, rgba(0,0,0,0.4) 0%, transparent 70%)',
              }} />
              {/* Monitor side-spill light on wall */}
              <div className="absolute" style={{
                bottom: '40%',
                left: '0',
                width: '60px',
                height: '100px',
                background: 'radial-gradient(ellipse at 0% 50%, rgba(0,229,255,0.05) 0%, transparent 60%)',
                filter: 'blur(8px)',
                animation: 'screenGlow 4s ease-in-out 1s infinite',
              }} />
            </div>

            {/* ── Desk ── */}
            <div
              className="absolute"
              style={{
                width: '220px',
                height: '120px',
                left: '50%',
                top: '50%',
                marginLeft: '-60px',
                marginTop: '-90px',
                transformStyle: 'preserve-3d',
                transform: 'translateZ(55px)',
                background: 'linear-gradient(135deg, #1a1f2e 0%, #151a26 100%)',
                borderRadius: '3px',
                border: '1px solid rgba(0,229,255,0.1)',
                boxShadow: '0 5px 30px rgba(0,0,0,0.5)',
              }}
            >
              {/* Desk edge RGB */}
              <RGBStrip className="bottom-0 left-2 right-2 h-0.5" color="cyan" />

              {/* Mouse pad with RGB border */}
              <div
                className="absolute"
                style={{
                  width: '50px',
                  height: '35px',
                  right: '15px',
                  top: '50%',
                  marginTop: '-17px',
                  background: 'rgba(0,229,255,0.03)',
                  border: '1px solid rgba(0,229,255,0.08)',
                  borderRadius: '4px',
                  boxShadow: '0 0 6px rgba(0,229,255,0.06)',
                }}
              >
                {/* Mouse */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-5 rounded-full bg-[#1a1f2e] border border-white/10"
                  style={{ boxShadow: '0 0 8px rgba(0,229,255,0.15)' }}
                />
              </div>

              {/* Mechanical Keyboard with flickering RGB backlighting */}
              <div
                className="absolute"
                style={{
                  width: '100px',
                  height: '42px',
                  left: '20px',
                  top: '50%',
                  marginTop: '-8px',
                  background: 'linear-gradient(180deg, #0e1319 0%, #0a0e14 100%)',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                  boxShadow: '0 3px 14px rgba(0,0,0,0.4), 0 0 20px rgba(0,229,255,0.05)',
                }}
              >
                {/* Key rows with individual RGB flicker */}
                <div className="p-1.5 grid grid-cols-12 gap-[1.5px]">
                  {Array.from({ length: 48 }).map((_, i) => {
                    const rgbColors = [
                      'rgba(0,229,255,0.5)', 'rgba(168,85,247,0.5)', 'rgba(236,72,153,0.45)',
                      'rgba(34,197,94,0.4)', 'rgba(251,191,36,0.4)', 'rgba(99,102,241,0.45)',
                    ];
                    const isActive = i % 3 === 0 || i % 7 === 0;
                    const color = isActive ? rgbColors[i % rgbColors.length] : 'rgba(51,65,85,0.35)';
                    return (
                      <div
                        key={i}
                        className="h-[3.5px] rounded-[1px]"
                        style={{
                          background: color,
                          animation: isActive ? 'rgbFlicker 1.5s ease-in-out infinite' : 'keyPress 2s ease-in-out infinite',
                          animationDelay: `${i * 0.08}s`,
                          boxShadow: isActive ? `0 0 4px ${color}` : 'none',
                        }}
                      />
                    );
                  })}
                </div>
                {/* Bottom RGB light bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{
                  background: 'linear-gradient(90deg, rgba(0,229,255,0.5), rgba(168,85,247,0.5), rgba(236,72,153,0.4), rgba(0,229,255,0.5))',
                  backgroundSize: '200% 100%',
                  animation: 'rgbSlide 3s linear infinite',
                  filter: 'blur(0.5px)',
                }} />
              </div>
            </div>

            {/* ── CHARACTER - High-fidelity 3D Programmer ── */}
            <div
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: '-20px',
                marginTop: '-50px',
                transformStyle: 'preserve-3d',
                transform: 'translateZ(55px)',
                zIndex: 10,
              }}
            >
              {/* Character body group - back slightly to camera, leaning forward */}
              <div className="relative" style={{ transform: 'rotateZ(3deg) rotateX(-6deg)' }}>

                {/* ── ERGONOMIC CHAIR ── */}
                {/* Chair back - tall mesh ergonomic */}
                <div
                  className="absolute -z-10"
                  style={{
                    width: '38px',
                    height: '50px',
                    left: '50%',
                    marginLeft: '-19px',
                    top: '-4px',
                    background: 'linear-gradient(180deg, #1c1c30 0%, #141428 40%, #101024 100%)',
                    borderRadius: '10px 10px 4px 4px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Mesh pattern on chair back */}
                  <div className="absolute inset-2 rounded-lg" style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: '4px 4px',
                  }} />
                  {/* Lumbar support bump */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[28px] h-[8px] rounded-full bg-[#1e1e34] border border-white/[0.03]" />
                  {/* Headrest */}
                  <div
                    className="absolute -top-5 left-1/2 -translate-x-1/2"
                    style={{
                      width: '22px',
                      height: '10px',
                      background: 'linear-gradient(180deg, #1e1e34 0%, #181830 100%)',
                      borderRadius: '6px 6px 3px 3px',
                      border: '1px solid rgba(255,255,255,0.04)',
                    }}
                  />
                </div>
                {/* Chair armrests */}
                <div className="absolute -z-5" style={{ top: '28px', left: '-12px', width: '10px', height: '4px', background: '#1a1a2e', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.04)' }} />
                <div className="absolute -z-5" style={{ top: '28px', right: '-12px', width: '10px', height: '4px', background: '#1a1a2e', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.04)' }} />
                {/* Chair seat */}
                <div
                  className="absolute"
                  style={{
                    width: '36px',
                    height: '10px',
                    left: '50%',
                    marginLeft: '-18px',
                    bottom: '-8px',
                    background: 'linear-gradient(180deg, #1c1c30 0%, #161628 100%)',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.04)',
                    boxShadow: '0 3px 12px rgba(0,0,0,0.3)',
                  }}
                />
                {/* Chair base / gas lift */}
                <div className="absolute" style={{ bottom: '-16px', left: '50%', marginLeft: '-2px', width: '4px', height: '8px', background: '#16162a', borderRadius: '1px' }} />
                {/* Chair star base */}
                <div className="absolute" style={{ bottom: '-20px', left: '50%', marginLeft: '-14px', width: '28px', height: '3px', background: 'radial-gradient(ellipse, #1a1a2e 40%, transparent 70%)', borderRadius: '50%' }} />
                {/* Chair wheels */}
                {[-12, -4, 4, 12].map((offset, i) => (
                  <div key={i} className="absolute" style={{ bottom: '-22px', left: '50%', marginLeft: `${offset - 2}px`, width: '4px', height: '3px', background: '#111', borderRadius: '50%', border: '0.5px solid rgba(255,255,255,0.05)' }} />
                ))}

                {/* ── HEAD with man-bun ── */}
                <div className="relative" style={{ marginBottom: '-2px' }}>
                  {/* Man-bun - larger, more visible */}
                  <div
                    className="absolute -top-4 left-1/2"
                    style={{
                      width: '12px',
                      height: '10px',
                      marginLeft: '-4px',
                      borderRadius: '50% 50% 40% 40%',
                      background: 'radial-gradient(ellipse at 40% 30%, #2a2a3e 0%, #1a1a2e 60%, #0f0f1e 100%)',
                      border: '1px solid rgba(0,229,255,0.1)',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.3), 0 -2px 8px rgba(0,229,255,0.15), 2px 0 6px rgba(0,229,255,0.08)',
                    }}
                  />
                  {/* Hair tie */}
                  <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-[6px] h-[3px] rounded-full bg-cyan-600/30 border border-cyan-500/20" />
                  
                  {/* Head - slightly tilted forward (focused posture) */}
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50% 50% 45% 45%',
                      background: 'linear-gradient(180deg, #c4956a 0%, #b8895e 50%, #a87d52 100%)',
                      margin: '0 auto',
                      position: 'relative',
                      transform: 'rotateX(8deg)',
                    }}
                  >
                    {/* Hair (back view - covering top/back of head) */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(180deg, #1a1a2e 0%, #1a1a2e 50%, transparent 65%)',
                        borderRadius: '50% 50% 45% 45%',
                        boxShadow: '0 -2px 10px rgba(0,229,255,0.1)',
                      }}
                    />
                    {/* Side hair strands */}
                    <div className="absolute top-[3px] -left-[1px] w-[3px] h-[8px] rounded-l-full" style={{ background: 'linear-gradient(180deg, #1a1a2e, #15152a)' }} />
                    <div className="absolute top-[3px] -right-[1px] w-[3px] h-[8px] rounded-r-full" style={{ background: 'linear-gradient(180deg, #1a1a2e, #15152a)' }} />
                    {/* Ears */}
                    <div className="absolute top-[45%] -left-[3px] w-[4px] h-[5px] rounded-full bg-[#b8895e]" style={{ boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.15)' }} />
                    <div className="absolute top-[45%] -right-[3px] w-[4px] h-[5px] rounded-full bg-[#b8895e]" style={{ boxShadow: 'inset -1px 0 2px rgba(0,0,0,0.15)' }} />
                    {/* Screen glow reflection on face/neck area */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(ellipse at center bottom, rgba(0,229,255,0.2) 0%, transparent 60%)',
                        animation: 'screenFlicker 3s ease-in-out infinite',
                      }}
                    />
                  </div>
                </div>

                {/* Neck - slightly forward */}
                <div className="w-[7px] h-[5px] mx-auto" style={{ background: 'linear-gradient(180deg, #b8895e, #a87d52)', transform: 'translateX(1px)' }} />

                {/* ── HOODIE / TORSO - oversized dark hoodie ── */}
                <div
                  className="relative"
                  style={{
                    width: '38px',
                    height: '32px',
                    margin: '0 auto',
                    background: 'linear-gradient(180deg, #1a1a2e 0%, #141428 50%, #101024 100%)',
                    borderRadius: '8px 8px 4px 4px',
                    border: '1px solid rgba(0,229,255,0.06)',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.35), 0 -3px 15px rgba(0,229,255,0.08), 3px 0 12px rgba(236,72,153,0.05)',
                    transform: 'rotateX(4deg)',
                  }}
                >
                  {/* Hood - visible behind head, oversized */}
                  <div
                    className="absolute -top-1 left-1/2 -translate-x-1/2"
                    style={{
                      width: '22px',
                      height: '10px',
                      borderRadius: '0 0 12px 12px',
                      background: 'rgba(255,255,255,0.02)',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      borderLeft: '1px solid rgba(255,255,255,0.02)',
                      borderRight: '1px solid rgba(255,255,255,0.02)',
                    }}
                  />
                  {/* Hoodie wrinkle/seam lines */}
                  <div className="absolute top-3 left-[6px] w-[1px] h-[18px] bg-white/[0.03] rounded-full" />
                  <div className="absolute top-3 right-[6px] w-[1px] h-[18px] bg-white/[0.03] rounded-full" />
                  {/* Center zipper line */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[1px] h-[24px] bg-white/[0.04]" />

                  {/* JK Logo patch on LEFT shoulder - prominent */}
                  <div
                    className="absolute top-[6px] -left-[2px]"
                    style={{
                      width: '12px',
                      height: '8px',
                      background: 'linear-gradient(135deg, rgba(0,229,255,0.15) 0%, rgba(168,85,247,0.1) 100%)',
                      borderRadius: '2px',
                      border: '0.5px solid rgba(0,229,255,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 6px rgba(0,229,255,0.15)',
                    }}
                  >
                    <span style={{ fontSize: '4px', color: 'rgba(0,229,255,0.85)', fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: '0.5px' }}>JK</span>
                  </div>

                  {/* Kangaroo pocket */}
                  <div
                    className="absolute bottom-[5px] left-1/2 -translate-x-1/2"
                    style={{
                      width: '20px',
                      height: '6px',
                      borderTop: '1px solid rgba(255,255,255,0.04)',
                      borderRadius: '0 0 4px 4px',
                      background: 'rgba(0,0,0,0.08)',
                    }}
                  />

                  {/* ── ARMS - actively typing, animated ── */}
                  {/* Left arm + forearm */}
                  <div
                    className="absolute top-[8px] -left-[6px]"
                    style={{
                      width: '20px',
                      height: '7px',
                      background: 'linear-gradient(90deg, #16162a 0%, #1a1a2e 100%)',
                      borderRadius: '4px',
                      transform: 'rotate(-35deg)',
                      transformOrigin: 'right center',
                      animation: 'typingArmL 0.8s ease-in-out infinite',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    {/* Sleeve detail */}
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] rounded-l-full bg-[#141428]" />
                    {/* Hand/fingers */}
                    <div className="absolute left-[-2px] top-[1px]" style={{
                      width: '7px',
                      height: '6px',
                      background: 'linear-gradient(180deg, #c4956a 0%, #b08456 100%)',
                      borderRadius: '2px 1px 2px 3px',
                    }}>
                      {/* Finger details */}
                      <div className="absolute bottom-0 left-[1px] w-[1px] h-[2px] bg-[#a87d52] rounded-b-full" />
                      <div className="absolute bottom-0 left-[3px] w-[1px] h-[2px] bg-[#a87d52] rounded-b-full" />
                      <div className="absolute bottom-0 left-[5px] w-[1px] h-[2px] bg-[#a87d52] rounded-b-full" />
                    </div>
                  </div>

                  {/* Right arm + forearm */}
                  <div
                    className="absolute top-[8px] -right-[6px]"
                    style={{
                      width: '20px',
                      height: '7px',
                      background: 'linear-gradient(270deg, #16162a 0%, #1a1a2e 100%)',
                      borderRadius: '4px',
                      transform: 'rotate(35deg)',
                      transformOrigin: 'left center',
                      animation: 'typingArmR 0.8s ease-in-out 0.15s infinite',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-[4px] rounded-r-full bg-[#141428]" />
                    {/* Hand/fingers */}
                    <div className="absolute right-[-2px] top-[1px]" style={{
                      width: '7px',
                      height: '6px',
                      background: 'linear-gradient(180deg, #c4956a 0%, #b08456 100%)',
                      borderRadius: '1px 2px 3px 2px',
                    }}>
                      <div className="absolute bottom-0 right-[1px] w-[1px] h-[2px] bg-[#a87d52] rounded-b-full" />
                      <div className="absolute bottom-0 right-[3px] w-[1px] h-[2px] bg-[#a87d52] rounded-b-full" />
                      <div className="absolute bottom-0 right-[5px] w-[1px] h-[2px] bg-[#a87d52] rounded-b-full" />
                    </div>
                  </div>

                  {/* Cyan + Magenta screen light projection on hoodie */}
                  <div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(0deg, transparent 30%, rgba(0,229,255,0.1) 70%, rgba(236,72,153,0.06) 100%)',
                      animation: 'screenFlicker 3s ease-in-out infinite',
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(236,72,153,0.05) 0%, transparent 50%, rgba(0,229,255,0.05) 100%)',
                      animation: 'screenFlicker 3s ease-in-out 1.5s infinite',
                    }}
                  />
                </div>

                {/* ── CARGO PANTS / Legs on chair ── */}
                <div className="flex justify-center gap-[2px]" style={{ marginTop: '-1px' }}>
                  <div
                    style={{
                      width: '14px',
                      height: '16px',
                      background: 'linear-gradient(180deg, #2a2a3e 0%, #222236 100%)',
                      borderRadius: '2px 0 4px 4px',
                      border: '1px solid rgba(255,255,255,0.03)',
                    }}
                  >
                    {/* Cargo pocket detail */}
                    <div className="mt-3 mx-auto w-[7px] h-[4px] border border-white/[0.06] rounded-[1px]" />
                  </div>
                  <div
                    style={{
                      width: '14px',
                      height: '16px',
                      background: 'linear-gradient(180deg, #2a2a3e 0%, #222236 100%)',
                      borderRadius: '0 2px 4px 4px',
                      border: '1px solid rgba(255,255,255,0.03)',
                    }}
                  >
                    <div className="mt-3 mx-auto w-[7px] h-[4px] border border-white/[0.06] rounded-[1px]" />
                  </div>
                </div>

                {/* Shoes */}
                <div className="flex justify-center gap-[4px]" style={{ marginTop: '-1px' }}>
                  <div style={{ width: '8px', height: '4px', background: '#111', borderRadius: '2px 1px 3px 3px' }} />
                  <div style={{ width: '8px', height: '4px', background: '#111', borderRadius: '1px 2px 3px 3px' }} />
                </div>
              </div>

              {/* Character shadow on floor */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)',
                }}
              />
            </div>

            {/* ── Floating Glass Shelf with rotating 3D JK emblem ── */}
            <div
              className="absolute"
              style={{
                width: '110px',
                height: '10px',
                left: '50%',
                top: '50%',
                marginLeft: '-120px',
                marginTop: '-340px',
                transformStyle: 'preserve-3d',
                transformOrigin: 'bottom center',
                transform: 'rotateX(90deg) translateZ(0px)',
                background: 'linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '3px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              {/* Glass shelf edge highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              
              {/* 3D Rotating JK metallic emblem */}
              <div
                className="absolute -top-16 left-4"
                style={{
                  width: '22px',
                  height: '22px',
                  animation: 'rotateEmblem 8s linear infinite',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '4px',
                    background: 'linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 25%, #a0a0a0 50%, #d0d0d0 75%, #b0b0b0 100%)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(0,229,255,0.2), 0 0 40px rgba(168,85,247,0.1), inset 0 1px 2px rgba(255,255,255,0.4)',
                  }}
                >
                  <span style={{
                    fontSize: '7px',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    background: 'linear-gradient(135deg, #00e5ff, #a855f7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 3px rgba(0,229,255,0.5))',
                    letterSpacing: '1px',
                  }}>JK</span>
                </div>
                {/* Emblem glow */}
                <div className="absolute inset-0 rounded" style={{
                  boxShadow: '0 0 12px rgba(0,229,255,0.15), 0 0 24px rgba(168,85,247,0.08)',
                  animation: 'emblemGlow 3s ease-in-out infinite',
                }} />
              </div>

              {/* Small plant */}
              <div className="absolute -top-10 left-[50px]">
                <div className="w-[7px] h-[10px] bg-emerald-600/50 rounded-t-full" style={{ boxShadow: '0 0 4px rgba(16,185,129,0.15)' }} />
                <div className="w-[9px] h-[5px] bg-slate-600/60 rounded-sm mx-auto" style={{ marginTop: '-1px' }} />
              </div>
              {/* Books stack */}
              <div className="absolute -top-9 right-4 flex flex-col gap-[1px]">
                <div className="w-[14px] h-[2.5px] bg-purple-700/40 rounded-sm" />
                <div className="w-[14px] h-[2.5px] bg-cyan-700/40 rounded-sm" />
                <div className="w-[14px] h-[2.5px] bg-pink-700/40 rounded-sm" />
              </div>
            </div>

            {/* ── Large Curved Ultrawide Monitor on Silver Arm ── */}
            <div
              className="absolute cursor-pointer"
              onClick={handleMonitorClick}
              style={{
                width: '210px',
                height: '100px',
                left: '50%',
                top: '50%',
                marginLeft: '-55px',
                marginTop: '-215px',
                transformStyle: 'preserve-3d',
                transform: 'translateZ(55px) rotateX(-90deg)',
                transformOrigin: 'bottom center',
                zIndex: 20,
              }}
            >
              {/* Monitor frame - large ultrawide curved */}
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  borderRadius: '8px',
                  border: '2.5px solid rgba(255,255,255,0.1)',
                  boxShadow: `
                    0 0 60px rgba(0,229,255,0.28),
                    0 0 120px rgba(0,229,255,0.12),
                    0 0 180px rgba(236,72,153,0.08),
                    0 0 40px rgba(168,85,247,0.08),
                    inset 0 0 30px rgba(0,229,255,0.08)
                  `,
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                  filter: 'brightness(1.15)',
                }}
              >
                {/* Curved top edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                {/* Bottom bezel brand mark */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0a0e14] flex items-center justify-center">
                  <div className="w-[6px] h-[1px] bg-cyan-500/30 rounded-full" />
                </div>
                <MonitorScreen />
              </div>

              {/* Silver Monitor Arm (clamp-style) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
                {/* Arm joint at monitor */}
                <div style={{
                  width: '8px',
                  height: '6px',
                  background: 'linear-gradient(180deg, #c8c8c8 0%, #a0a0a0 100%)',
                  borderRadius: '2px',
                  margin: '0 auto',
                  border: '1px solid rgba(255,255,255,0.15)',
                }} />
                {/* Vertical arm segment */}
                <div style={{
                  width: '4px',
                  height: '14px',
                  background: 'linear-gradient(90deg, #b0b0b0 0%, #d8d8d8 50%, #b0b0b0 100%)',
                  margin: '0 auto',
                  borderRadius: '1px',
                  boxShadow: '1px 0 2px rgba(0,0,0,0.2)',
                }} />
                {/* Arm elbow joint */}
                <div style={{
                  width: '10px',
                  height: '6px',
                  background: 'linear-gradient(180deg, #c0c0c0 0%, #909090 100%)',
                  borderRadius: '3px',
                  margin: '0 auto',
                  border: '1px solid rgba(255,255,255,0.1)',
                }} />
                {/* Horizontal arm to desk clamp */}
                <div style={{
                  width: '4px',
                  height: '10px',
                  background: 'linear-gradient(90deg, #a8a8a8 0%, #d0d0d0 50%, #a8a8a8 100%)',
                  margin: '0 auto',
                  borderRadius: '1px',
                }} />
                {/* Desk clamp */}
                <div style={{
                  width: '14px',
                  height: '4px',
                  background: 'linear-gradient(180deg, #b0b0b0 0%, #808080 100%)',
                  borderRadius: '1px',
                  margin: '0 auto',
                  border: '1px solid rgba(255,255,255,0.08)',
                }} />
              </div>

              {/* Realistic screen glow - cyan + magenta projection */}
              <div
                className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-64 h-14 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse, rgba(0,229,255,0.2) 0%, rgba(236,72,153,0.08) 50%, transparent 80%)',
                  animation: 'screenGlow 4s ease-in-out infinite',
                }}
              />
              {/* Secondary magenta glow layer */}
              <div
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-10 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse, rgba(236,72,153,0.1) 0%, rgba(168,85,247,0.05) 60%, transparent 90%)',
                  animation: 'screenGlow 4s ease-in-out 2s infinite',
                }}
              />
            </div>

            {/* ── PC Case (tower) ── */}
            <div
              className="absolute"
              style={{
                width: '45px',
                height: '80px',
                left: '50%',
                top: '50%',
                marginLeft: '-180px',
                marginTop: '-80px',
                transformStyle: 'preserve-3d',
                transform: 'translateZ(0px)',
              }}
            >
              <div
                className="relative w-full h-full rounded-sm"
                style={{
                  background: 'linear-gradient(180deg, #111622 0%, #0d1117 100%)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.4)',
                }}
              >
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-cyan-500/20 flex items-center justify-center">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-transparent"
                    style={{
                      background: 'conic-gradient(from 0deg, rgba(0,229,255,0.3), rgba(168,85,247,0.3), rgba(236,72,153,0.3), rgba(0,229,255,0.3))',
                      animation: 'spin 3s linear infinite',
                    }}
                  />
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ boxShadow: '0 0 8px rgba(0,229,255,0.6)' }} />
                <RGBStrip className="right-0 top-2 bottom-2 w-[2px]" color="cyan" />
              </div>
            </div>

            {/* ── Coffee Mug with steam particles ── */}
            <div
              className="absolute"
              style={{
                width: '18px',
                height: '18px',
                left: '50%',
                top: '50%',
                marginLeft: '115px',
                marginTop: '-110px',
                transform: 'translateZ(60px)',
              }}
            >
              {/* Mug body */}
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '3px 3px 5px 5px',
                background: 'linear-gradient(180deg, #2a2a3e 0%, #1e1e30 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                position: 'relative',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}>
                {/* Coffee inside */}
                <div className="absolute top-[2px] left-[2px] right-[2px] h-[4px] rounded-sm" style={{
                  background: 'linear-gradient(180deg, #3d2b1a 0%, #2a1e12 100%)',
                }} />
                {/* Handle */}
                <div className="absolute -right-[4px] top-[3px] w-[5px] h-[8px] border-2 border-white/10 rounded-r-full" style={{ borderLeft: 'none' }} />
                {/* Mug label - tiny JK */}
                <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2">
                  <span style={{ fontSize: '3px', color: 'rgba(0,229,255,0.4)', fontFamily: 'monospace', fontWeight: 'bold' }}>JK</span>
                </div>
              </div>

              {/* Steam particle system */}
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${4 + i * 3}px`,
                    top: '-4px',
                    width: '2px',
                    height: '2px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                    animation: `steamParticle ${2 + i * 0.4}s ease-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
              {/* Larger wispy steam */}
              {[0, 1, 2].map((i) => (
                <div
                  key={`wisp-${i}`}
                  className="absolute"
                  style={{
                    left: `${5 + i * 4}px`,
                    top: '-2px',
                    width: '3px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'linear-gradient(to top, rgba(255,255,255,0.08), transparent)',
                    animation: `steamWisp ${3 + i * 0.6}s ease-in-out infinite`,
                    animationDelay: `${i * 0.8}s`,
                    filter: 'blur(1px)',
                  }}
                />
              ))}
            </div>

            {/* ── Headphones on desk ── */}
            <div
              className="absolute"
              style={{
                width: '20px',
                height: '12px',
                left: '50%',
                top: '50%',
                marginLeft: '100px',
                marginTop: '-70px',
                transform: 'translateZ(58px)',
              }}
            >
              <div className="w-full h-1/2 border-t-2 border-l-2 border-r-2 border-purple-500/20 rounded-t-full" />
            </div>
          </div>
        </div>
        {/* Close size div (452) */}
        </div>
        {/* Close pointer-events-auto div (441) */}
        </div>
        {/* Close absolute inset-0 div (437) */}
      </motion.div>

</div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div>
</div>
);
export default T;
