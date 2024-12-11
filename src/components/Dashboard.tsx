import { LivenessCheck } from "./LivenessCheck";
import { Button } from "./ui/button";
import { useState } from "react";

export const Dashboard = () => {
  const [isChecking, setIsChecking] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Identity Verification</h1>
          <p className="text-lg text-gray-600">Complete your liveness check to verify your identity</p>
        </div>

        {!isChecking ? (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 animate-fade-in">
            <div className="space-y-6">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 inline-block mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Liveness Check</h2>
                <p className="text-gray-600 mb-6">
                  We'll need to verify your identity through a quick video check. Please ensure you're in a well-lit area.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Takes less than 2 minutes</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Secure and encrypted</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Works on all devices</span>
                </div>
              </div>

              <Button
                onClick={() => setIsChecking(true)}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Start Verification
              </Button>
            </div>
          </div>
        ) : (
          <LivenessCheck onComplete={() => setIsChecking(false)} />
        )}
      </div>
    </div>
  );
};