import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';

const LiveTv = () => {
  const BASE_Url = process.env.REACT_APP_BASE_URL
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const url = `${BASE_Url}/stream`; // URL of your backend

  useEffect(() => {
    const video = videoRef.current;

    const handlePlay = () => {
      video.muted = false;
    };

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoaded(true);
        video.muted = true;
        video.play().then(handlePlay).catch(error => {
          console.error('Error playing video:', error);
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error('HLS Error:', data);
        }
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.addEventListener('canplay', () => {
        setIsLoaded(true);
        video.muted = true;
        video.play().then(handlePlay).catch(error => {
          console.error('Error playing video:', error);
        });
      });
    } else {
      console.error('HLS is not supported in this browser.');
    }
  }, [url]);

  return (
    <div className='  mx-auto mb-10 mt-2 flex justify-center items-center'>
      <video ref={videoRef} controls autoPlay>
        Your browser does not support the video tag.
      </video>
      {/* {!isLoaded && <p>Loading...</p>} */}
    </div>
  );
};

export default LiveTv;
