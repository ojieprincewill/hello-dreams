import React, { useRef, useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';

const VideoPlayer = ({
  poster,
  captions,
  playbackId,
  userId,
  assetId,
  lessonTitle,
}) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const handleLoadedData = () => setLoading(false);

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {/* <video
        ref={videoRef}
        src={videoUrl}
        poster={poster}
        controls
        className="w-full h-full object-cover"
        onLoadedData={handleLoadedData}
        preload="auto"
      > */}
      <MuxPlayer
        controls
        playbackId={playbackId}
        metadata={{
          video_id: assetId,
          video_title: lessonTitle,
          viewer_user_id: userId,
        }}
      />
    </div>
  );
};

export default VideoPlayer;
