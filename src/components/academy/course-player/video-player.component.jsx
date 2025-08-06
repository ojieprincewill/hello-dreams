import React, { useRef, useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';

const VideoPlayer = ({
  poster,
  captions,
  playbackId,
  userId,
  assetId,
  lessonTitle,
  videoUrl,
  currentLesson,
}) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLoadedData = () => setLoading(false);

  const handleError = (error) => {
    console.error('Video player error:', error);
    setError('Failed to load video');
    setLoading(false);
  };

  // If no playback ID is available, show a placeholder
  if (!playbackId) {
    return (
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-2xl mb-2">🎥</div>
          <p className="text-lg font-semibold mb-2">Video Not Available</p>
          <p className="text-sm opacity-75">This lesson doesn't have a video yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
          <div className="text-white text-center">
            <div className="text-2xl mb-2">⚠️</div>
            <p className="text-lg font-semibold mb-2">Video Error</p>
            <p className="text-sm opacity-75">{error}</p>
          </div>
        </div>
      ) : (
        <MuxPlayer
          ref={videoRef}
          controls
          playbackId={playbackId}
          metadata={{
            video_id: assetId || currentLesson?.id,
            video_title: lessonTitle || currentLesson?.title,
            viewer_user_id: userId,
          }}
          onLoadedData={handleLoadedData}
          onError={handleError}
          poster={poster}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
