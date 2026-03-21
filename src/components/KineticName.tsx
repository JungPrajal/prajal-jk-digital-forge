import React, { useRef, useEffect, useState, useMemo } from 'react';

const CODE_LINES = [
  'import tensorflow as tf',
  'model = Sequential()',
  'model.add(Dense(128, activation="relu"))',
  'optimizer = Adam(lr=0.001)',
  'loss = categorical_crossentropy',
  'model.compile(optimizer, loss)',
  'history = model.fit(X_train, y_train)',
  'predictions = model.predict(X_test)',
  'accuracy = evaluate(predictions)',
  'def neural_network(input):',
  '    hidden = relu(W @ input + b)',
  '    return softmax(hidden)',
  'class TransformerBlock(nn.Module):',
  '    self.attention = MultiHeadAttention()',
  '    self.ffn = FeedForward(d_model)',
  'gradient = backward(loss)',
  'weights -= learning_rate * gradient',
  'export default AIModel',
  'const pipeline = new Pipeline()',
  'await pipeline.train(dataset)',
];

const FlowingCodeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let columns: { lines: { text: string; y: number; speed: number; opacity: number }[] }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      initColumns();
    };

    const initColumns = () => {
      const colCount = Math.floor(canvas.width / 280);
      columns = [];
      for (let c = 0; c < colCount; c++) {
        const lines: { text: string; y: number; speed: number; opacity: number }[] = [];
        for (let i = 0; i < 12; i++) {
          lines.push({
            text: CODE_LINES[Math.floor(Math.random() * CODE_LINES.length)],
            y: Math.random() * canvas.height,
            speed: 1 + Math.random() * 2.5,
            opacity: 0.3 + Math.random() * 0.7,
          });
        }
        columns.push({ lines });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '24px monospace';

      columns.forEach((col, ci) => {
        const x = (ci + 0.5) * (canvas.width / columns.length);
        col.lines.forEach((line) => {
          ctx.fillStyle = `rgba(0, 229, 255, ${line.opacity * 0.6})`;
          ctx.fillText(line.text, x, line.y);
          line.y += line.speed;
          if (line.y > canvas.height + 30) {
            line.y = -30;
            line.text = CODE_LINES[Math.floor(Math.random() * CODE_LINES.length)];
            line.speed = 1 + Math.random() * 2.5;
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};

interface KineticNameProps {
  scrollY: number;
}

const KineticName: React.FC<KineticNameProps> = ({ scrollY }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = useMemo(() => 'PRAJAL'.split(''), []);

  // Each letter gets a unique parallax multiplier for Z-axis offset
  const parallaxFactors = useMemo(
    () => letters.map((_, i) => {
      const center = (letters.length - 1) / 2;
      const distFromCenter = Math.abs(i - center);
      return 0.5 + distFromCenter * 0.3; // outer letters move more
    }),
    [letters]
  );

  // Scroll-based reveal: opacity goes from 0 to 1 as user scrolls into view
  const revealProgress = Math.min(1, Math.max(0, 1 - scrollY / 300));

  return (
    <div ref={containerRef} className="relative w-full" style={{ perspective: '1200px' }}>
      {/* Flowing code background - masked by text */}
      <div className="relative">
        {/* The code background layer */}
        <div
          className="absolute inset-0 overflow-hidden rounded-lg"
          style={{
            WebkitMaskImage: 'none',
            maskImage: 'none',
          }}
        >
          <FlowingCodeBackground />
        </div>

        {/* Main kinetic text */}
        <div className="relative flex justify-center lg:justify-start items-baseline select-none">
          {letters.map((letter, i) => {
            const parallax = parallaxFactors[i];
            const zOffset = scrollY * parallax * 0.5;
            const yOffset = Math.sin(scrollY * 0.01 + i * 0.8) * 8;
            const rotateX = scrollY * 0.02 * (i % 2 === 0 ? 1 : -1);
            const rotateY = scrollY * 0.01 * parallax;
            const delay = i * 0.08;

            return (
              <span
                key={i}
                className="inline-block transition-none"
                style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(3.5rem, 12vw, 10rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  transform: `
                    translateZ(${zOffset}px)
                    translateY(${yOffset}px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                  `,
                  transformStyle: 'preserve-3d',
                  // Text is a mask for flowing code: use background-clip text
                  background: `linear-gradient(180deg, rgba(0,229,255,0.95) 0%, rgba(168,85,247,0.8) 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 ${20 + zOffset * 0.1}px rgba(0,229,255,0.3))`,
                  opacity: revealProgress,
                  animationDelay: `${delay}s`,
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>

        {/* Code reveal mask layer - sits behind text, visible through it */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            WebkitMaskImage: `url("data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='50%' y='70%' text-anchor='middle' font-family='Unbounded,sans-serif' font-weight='900' font-size='${Math.min(160, window.innerWidth * 0.12)}px' fill='white'>PRAJAL</text></svg>`
            )}")`,
            WebkitMaskSize: 'contain',
            WebkitMaskPosition: 'center',
            WebkitMaskRepeat: 'no-repeat',
            maskImage: `url("data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='50%' y='70%' text-anchor='middle' font-family='Unbounded,sans-serif' font-weight='900' font-size='${Math.min(160, window.innerWidth * 0.12)}px' fill='white'>PRAJAL</text></svg>`
            )}")`,
            maskSize: 'contain',
            maskPosition: 'center',
            maskRepeat: 'no-repeat',
            opacity: 1 - revealProgress, // Reveal code as text gradient fades
            mixBlendMode: 'screen',
          }}
        >
          <FlowingCodeBackground />
        </div>
      </div>

      {/* Subtitle under the name */}
      <div
        className="mt-2 sm:mt-4 text-center lg:text-left"
        style={{
          fontFamily: "'Unbounded', sans-serif",
          fontWeight: 700,
          opacity: revealProgress,
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <span className="text-sm sm:text-lg md:text-xl tracking-[0.3em] uppercase text-muted-foreground">
          Jung Kunwar
        </span>
      </div>
    </div>
  );
};

export default KineticName;
