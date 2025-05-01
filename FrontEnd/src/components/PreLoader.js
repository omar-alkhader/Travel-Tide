import React, { useEffect } from 'react';
import { preLoaderAnim } from '../animations/loading';

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);

  return (
    <div className="preloader">
       <div className="spinner"></div>
      <div className="text-container">
        <span>Adventure</span>
        <span>Begin</span>
        <span>Soon</span>
      </div>
    </div>
  );
};

export default PreLoader;

