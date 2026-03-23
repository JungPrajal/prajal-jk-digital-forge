import React, { useEffect, useRef } from 'react';

const GrainOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      // Use smaller canvas for performance, CSS stretches it
      canvas.width = 256;
      canvas.height = 256;
    };
    resize();

    let frame = 0;
    const renderGrain = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      // Only update every 3 frames for perf
      if (frame % 3 === 0) {
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = 18; // Very subtle
        }
        ctx.putImageData(imageData, 0, 0);
      }
      frame++;
      frameRef.current = requestAnimationFrame(renderGrain);
    };

    frameRef.current = requestAnimationFrame(renderGrain);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[50]"
      style={{
        opacity: 0.08,
        mixBlendMode: 'overlay',
      }}
    />
  );
};

export default GrainOverlay;
