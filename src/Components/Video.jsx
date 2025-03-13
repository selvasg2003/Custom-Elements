// a react functional component in jsx format that takes a video url and plays it in video player

import React from "react";
import ReactPlayer from "react-player";

const Video = () => {
  const videoUrl = "https://www.youtube.com/watch?v=P5q3NLEVGN4";

  return (

          <ReactPlayer 
            url={videoUrl} 
            controls 
            // width="100%" 
            // height="100%" 
          />
  );
};

export default Video;
