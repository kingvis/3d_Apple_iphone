import { useEffect, useRef } from 'react';

const DUST_COLOR = ['#fffbe6', '#ffe066', '#ffffff', '#bfa76a'];
const DUST_COUNT = 120;

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

const PixelDust = () => {
  const canvasRef = useRef();
  const animationRef = useRef();
  const dustParticles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Create dust particles
    dustParticles.current = Array.from({ length: DUST_COUNT }).map(() => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      r: randomBetween(0.5, 2.2),
      color: DUST_COLOR[Math.floor(Math.random() * DUST_COLOR.length)],
      speed: randomBetween(0.08, 0.35),
      angle: randomBetween(0, Math.PI * 2),
      drift: randomBetween(-0.2, 0.2),
    }));

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let p of dustParticles.current) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        // Animate
        p.x += Math.cos(p.angle) * p.drift;
        p.y += p.speed;
        p.angle += randomBetween(-0.01, 0.01);
        // Respawn at top if out of bounds
        if (p.y > height + 10) {
          p.x = randomBetween(0, width);
          p.y = -10;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
      }
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2,
        mixBlendMode: 'lighter',
      }}
    />
  );
};

export default PixelDust; 