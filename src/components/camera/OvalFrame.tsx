export const OvalFrame = ({ isFaceDetected }: { isFaceDetected: boolean }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Dark overlay outside the oval */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Oval cutout area - reduced size */}
      <div className="absolute w-[280px] h-[350px] bg-transparent">
        {/* Outer guide frame */}
        <div 
          className={`absolute inset-0 border-4 rounded-[200px] shadow-lg transition-colors duration-300 ${
            isFaceDetected ? 'border-green-500' : 'border-purple-500 animate-pulse'
          }`} 
        />
        {/* Inner guide frame */}
        <div className="absolute inset-6 border-2 border-white/50 rounded-[160px]" />
        
        {/* Guide marks */}
        <div className="absolute inset-0">
          <div className={`absolute top-0 left-1/2 h-4 w-1 -translate-x-1/2 transition-colors duration-300 ${
            isFaceDetected ? 'bg-green-500' : 'bg-purple-500'
          }`} />
          <div className={`absolute bottom-0 left-1/2 h-4 w-1 -translate-x-1/2 transition-colors duration-300 ${
            isFaceDetected ? 'bg-green-500' : 'bg-purple-500'
          }`} />
          <div className={`absolute left-0 top-1/2 w-4 h-1 -translate-y-1/2 transition-colors duration-300 ${
            isFaceDetected ? 'bg-green-500' : 'bg-purple-500'
          }`} />
          <div className={`absolute right-0 top-1/2 w-4 h-1 -translate-y-1/2 transition-colors duration-300 ${
            isFaceDetected ? 'bg-green-500' : 'bg-purple-500'
          }`} />
        </div>
      </div>
    </div>
  );
};

/**
 * OvalFrame component creates a visual guide for face positioning during verification.
 * It displays:
 * - A dark overlay outside the oval area
 * - An oval-shaped cutout with guide frames
 * - Guide marks on all four sides
 * - Color indicators that change based on face detection status
 *   (purple/animated when no face detected, green when face detected)
 * 
 * Props:
 * @param isFaceDetected - Boolean indicating whether a face is currently detected
 *                        Controls the color and animation state of the guide elements
 */
