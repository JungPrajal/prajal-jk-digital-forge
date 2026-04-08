import React, { useState, useEffect } from 'react';

const SystemStatusBar: React.FC = () => {
  const [stats, setStats] = useState({
    mem: 42.3,
    cpu: 12.7,
    uptime: '127h 04m',
    fps: 60,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        mem: +(Math.random() * 30 + 35).toFixed(1),
        cpu: +(Math.random() * 20 + 5).toFixed(1),
        uptime: `${Math.floor(Math.random() * 200 + 100)}h ${String(Math.floor(Math.random() * 60)).padStart(2, '0')}m`,
        fps: Math.floor(Math.random() * 5 + 58),
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-6 px-4 py-1 font-mono select-none pointer-events-none"
      style={{
        fontSize: '10px',
        background: 'rgba(5, 5, 15, 0.7)',
        backdropFilter: 'blur(6px)',
        borderTop: '1px solid rgba(0, 229, 255, 0.1)',
        color: 'rgba(0, 229, 255, 0.5)',
        letterSpacing: '0.08em',
      }}
    >
      <span>MEM: {stats.mem}%</span>
      <span className="hidden sm:inline">CPU: {stats.cpu}%</span>
      <span>FPS: {stats.fps}</span>
      <span className="hidden sm:inline">UPTIME: {stats.uptime}</span>
      <span className="flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        CONNECTION: SECURE
      </span>
    </div>
  );
};

export default React.memo(SystemStatusBar);
