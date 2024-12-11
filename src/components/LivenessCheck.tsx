import { useState } from "react";
import { CameraSetup } from "./camera/CameraSetup";
import { Controls } from "./camera/Controls";
// Remove OvalFrame import since it's now handled in CameraSetup
// import { OvalFrame } from "./camera/OvalFrame";

interface LivenessCheckProps {
  onComplete: () => void;
}

export const LivenessCheck = ({ onComplete }: LivenessCheckProps) => {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  // Remove duplicate state since it's handled in CameraSetup
  // const [isFaceDetected, setIsFaceDetected] = useState(false);

  const handleFaceDetected = () => {
    console.log("Face detected, moving to next step");
    handleNextStep();
  };

  const handleNextStep = () => {
    console.log("Current step:", step);
    if (step < 3) {
      setStep(prevStep => prevStep + 1);
      // Only start recording on step 2
      if (step === 1) {
        setIsRecording(true);
      }
    } else {
      setIsRecording(false);
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 animate-fade-in">
      <div className="relative h-full">
        <CameraSetup 
          onFaceDetected={handleFaceDetected}
          currentStep={step}
          onStepComplete={handleNextStep}
        />
        <Controls
          step={step}
          isRecording={isRecording}
          onCancel={() => {
            setIsRecording(false);
            onComplete();
          }}
        />
      </div>
    </div>
  );
};