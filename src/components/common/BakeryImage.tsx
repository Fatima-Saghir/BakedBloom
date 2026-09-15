import React, { useState } from 'react';

interface BakeryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrcs?: string[];
  alt: string;
  className?: string;
}

export const BakeryImage: React.FC<BakeryImageProps> = ({
  src,
  fallbackSrcs = [],
  alt,
  className = '',
  ...props
}) => {
  const defaultLocalFallback = '/images/berry-velvet-hero.svg';

  // Build the complete fallback sequence
  const sourceList = [src, ...fallbackSrcs, defaultLocalFallback];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    if (currentIndex < sourceList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Smooth Shimmer / Skeleton while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-cream-200 animate-pulse z-0" />
      )}
      <img
        src={sourceList[currentIndex]}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        className={`w-full h-full object-cover transition-opacity duration-500 z-10 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
