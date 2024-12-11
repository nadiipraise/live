import { Button } from "../ui/button";
import { StatusBadge } from "../StatusBadge";

interface ControlsProps {
  step: number;
  isRecording: boolean;
  onCancel: () => void;
}

export const Controls = ({ step, isRecording, onCancel }: ControlsProps) => {
  const getStepInstructions = () => {
    switch (step) {
      case 1:
        return "Position your face within the oval frame";
      case 2:
        return "Turn your head slowly left and right";
      case 3:
        return "Blink three times naturally";
      case 4:
        return "Smile naturally";
      default:
        return "";
    }
  };

  return (
    <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium text-white/80">Step {step} of 4</p>
            <p className="text-lg font-semibold text-white">{getStepInstructions()}</p>
          </div>
          <StatusBadge status={isRecording ? "checking" : "online"} />
        </div>

        <div className="h-2 bg-white/20 rounded-full">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="flex justify-between">
          <Button
            onClick={onCancel}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
/**
 * Controls component manages the UI for the face verification process.
 * It displays:
 * - Current step number and instructions
 * - Progress bar showing completion
 * - Recording status indicator
 * - Cancel button
 * 
 * Props:
 * @param step - Current step number (1-4) in the verification process
 * @param isRecording - Whether camera is currently recording
 * @param onCancel - Callback function when cancel button is clicked
 */
