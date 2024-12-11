import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { toast } from "sonner";
import { OvalFrame } from "./OvalFrame";

interface CameraSetupProps {
  onFaceDetected: () => void;
  currentStep: number;
  onStepComplete: () => void;
}

interface StepRequirements {
  blinkCount: number;
  headTurnRight: boolean;
  headTurnLeft: boolean;
  smileDetected: boolean;
}

interface Point {
  x: number;
  y: number;
}

interface FaceBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const CameraSetup = ({ onFaceDetected, currentStep, onStepComplete }: CameraSetupProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [faceInFrameCount, setFaceInFrameCount] = useState(0);
  const [stepRequirements, setStepRequirements] = useState<StepRequirements>({
    blinkCount: 0,
    headTurnRight: false,
    headTurnLeft: false,
    smileDetected: false
  });
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadModels = async () => {
      try {
        // Log the current path to verify model location
        console.log("Loading models from:", window.location.origin + '/models');
        
        // Load models sequentially with error checking
        await faceapi.nets.tinyFaceDetector.load('/models');
        console.log("Tiny face detector loaded");
        
        await faceapi.nets.faceLandmark68Net.load('/models');
        console.log("Face landmark model loaded");
        
        await faceapi.nets.faceExpressionNet.load('/models');
        console.log("Face expression model loaded");

        if (isMounted) {
          setModelsLoaded(true);
          console.log("All models loaded successfully");
        }
      } catch (error) {
        console.error("Error loading models:", error);
        if (error instanceof Error) {
          console.error("Error details:", {
            message: error.message,
            stack: error.stack
          });
        }
        toast.error("Error loading face detection models");
      }
    };

    const setupCamera = async () => {
      if (!videoRef.current) return;
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 640,
            height: 480,
            facingMode: "user"
          }
        });
        
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access error:", err);
        toast.error("Unable to access camera");
      }
    };

    const initialize = async () => {
      await loadModels();
      if (isMounted) {
        await setupCamera();
      }
    };

    initialize();

    return () => {
      isMounted = false;
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const detectFace = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    try {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections.length === 1) {
        const detection = detections[0];
        
        switch(currentStep) {
          case 1:
            handleFaceAlignment(detection);
            break;
          case 2:
            handleHeadTurn(detection);
            break;
          case 3:
            handleBlinking(detection);
            break;
          case 4:
            handleSmiling(detection);
            break;
        }
      }

      requestAnimationFrame(detectFace);
    } catch (error) {
      console.error("Face detection error:", error);
      requestAnimationFrame(detectFace);
    }
  };

  const handleFaceAlignment = (detection: faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }>) => {
    if (!videoRef.current) return;

    const videoEl = videoRef.current;
    const ovalWidth = 280;
    const ovalHeight = 350;
    const ovalX = (videoEl.offsetWidth - ovalWidth) / 2;
    const ovalY = (videoEl.offsetHeight - ovalHeight) / 2;
    const faceBox = detection.detection.box;
    
    const margin = 20;
    const isFaceWithinFrame = 
      faceBox.x > (ovalX - margin) &&
      faceBox.y > (ovalY - margin) &&
      (faceBox.x + faceBox.width) < (ovalX + ovalWidth + margin) &&
      (faceBox.y + faceBox.height) < (ovalY + ovalHeight + margin);

    if (isFaceWithinFrame) {
      setFaceInFrameCount(prev => prev + 1);
      if (faceInFrameCount >= 30) {
        setIsFaceDetected(true);
        onStepComplete();
      }
    } else {
      setFaceInFrameCount(0);
    }
  };

  const handleHeadTurn = (detection: faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }>) => {
    const landmarks = detection.landmarks;
    const nose = landmarks.getNose();
    const jawline = landmarks.getJawOutline();
    
    const headPose = calculateHeadPose(nose, jawline);
    
    if (headPose.yaw > 30 && !stepRequirements.headTurnRight) {
      setStepRequirements(prev => ({ ...prev, headTurnRight: true }));
      toast.success("Right turn detected!");
    } else if (headPose.yaw < -30 && !stepRequirements.headTurnLeft) {
      setStepRequirements(prev => ({ ...prev, headTurnLeft: true }));
      toast.success("Left turn detected!");
    }

    if (stepRequirements.headTurnRight && stepRequirements.headTurnLeft) {
      onStepComplete();
    }
  };

  const handleBlinking = (detection: faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }>) => {
    const landmarks = detection.landmarks;
    const eyeAspectRatio = calculateEyeAspectRatio(landmarks);
    
    if (eyeAspectRatio < 0.2) {
      setStepRequirements(prev => ({
        ...prev,
        blinkCount: prev.blinkCount + 1
      }));
      toast.success(`Blink detected! (${stepRequirements.blinkCount + 1}/3)`);
    }

    if (stepRequirements.blinkCount >= 3) {
      onStepComplete();
    }
  };

  const handleSmiling = (detection: faceapi.WithFaceExpressions<faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }>>) => {
    const expressions = detection.expressions;
    if (expressions.happy > 0.7 && !stepRequirements.smileDetected) {
      setStepRequirements(prev => ({ ...prev, smileDetected: true }));
      toast.success("Smile detected!");
      onStepComplete();
    }
  };

  const calculateHeadPose = (nose: Point[], jawline: Point[]) => {
    const faceCenter = jawline[8];
    const noseTop = nose[0];
    const yaw = Math.atan2(noseTop.x - faceCenter.x, noseTop.y - faceCenter.y);
    return { yaw: yaw * (180 / Math.PI), pitch: 0, roll: 0 };
  };

  const calculateEyeAspectRatio = (landmarks: faceapi.FaceLandmarks68) => {
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    return (calculateEyeRatio(leftEye) + calculateEyeRatio(rightEye)) / 2;
  };

  const calculateEyeRatio = (eye: Point[]) => {
    const height = (
      distance(eye[1], eye[5]) + distance(eye[2], eye[4])
    ) / 2;
    const width = distance(eye[0], eye[3]);
    return height / width;
  };

  const distance = (p1: Point, p2: Point) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        onPlay={() => requestAnimationFrame(detectFace)}
        className="w-full h-full"
      />
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <OvalFrame isFaceDetected={isFaceDetected} />
    </div>
  );
}; // No errors found in the closing brace of the component