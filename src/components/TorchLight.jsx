import { useEffect, useState, useRef } from 'react';

const TorchLight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef();
  const lastUpdateRef = useRef(0);
  const timeoutRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = performance.now();
      
      // Show torch light when mouse moves
      setIsVisible(true);
      
      // Clear the hide timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Hide torch light after 2 seconds of no movement
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      
      // Throttle updates to 60fps to prevent performance issues
      if (now - lastUpdateRef.current >= 16) { // 16ms = ~60fps
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        
        animationFrameRef.current = requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          lastUpdateRef.current = now;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`torch-light ${isVisible ? 'torch-visible' : 'torch-hidden'}`}
      style={{
        left: mousePosition.x - 150,
        top: mousePosition.y - 150,
        transform: 'translate3d(0, 0, 0)', // Force hardware acceleration
      }}
    />
  );
};

export default TorchLight; 