import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

const VideoPlayer = ({ src, fallbackImage, ...props }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    console.error('Error loading video:', src);
    setError(true);
  };

  if (error) {
    return (
      <Box
        component="img"
        src={fallbackImage}
        alt="Fallback"
        sx={{
          width: '100%',
          height: 'auto',
          maxHeight: '500px',
          objectFit: 'contain',
        }}
      />
    );
  }

  return (
    <Box
      component="video"
      onError={handleError}
      controls
      sx={{
        width: '100%',
        height: 'auto',
        maxHeight: '500px',
        objectFit: 'contain',
      }}
      {...props}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </Box>
  );
};

export default VideoPlayer; 