import { useRef, useEffect, useState } from 'react';

const videoSources = [
  '/assets/videos/explore.mp4',
  '/assets/videos/highlight-first.mp4',
  '/assets/videos/hightlight-fourth.mp4',
];

const VideoReverseLoop = () => {
  return (
    <div style={{ display: 'flex', width: '100%', height: '50vh', background: 'black' }}>
      {videoSources.map((src, idx) => (
        <ReverseLoopVideo key={src} src={src} />
      ))}
    </div>
  );
};

const ReverseLoopVideo = ({ src }) => {
  const videoRef = useRef();
  const [isReversing, setIsReversing] = useState(false);
  const reverseFrameRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsReversing(true);
    };

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(reverseFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!isReversing) return;

    let lastTime = video.currentTime;
    video.pause();

    const step = () => {
      if (video.currentTime > 0) {
        video.currentTime = Math.max(0, video.currentTime - 0.033); // ~30fps
        reverseFrameRef.current = requestAnimationFrame(step);
      } else {
        setIsReversing(false);
        video.currentTime = 0;
        video.play();
      }
    };
    reverseFrameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(reverseFrameRef.current);
  }, [isReversing]);

  return (
    <video
      ref={videoRef}
      src={src}
      style={{ width: '33.33%', objectFit: 'cover', height: '100%' }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
};

export default VideoReverseLoop; 