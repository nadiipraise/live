import { useState, useEffect } from "react";
import { StatusBadge } from "./StatusBadge";

export const AuthStatus = () => {
  const [status, setStatus] = useState<"online" | "offline" | "checking">("checking");

  useEffect(() => {
    const checkStatus = () => {
      setStatus("checking");
      setTimeout(() => {
        setStatus(Math.random() > 0.5 ? "online" : "offline");
      }, 2000);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Verification Status</h2>
          <StatusBadge status={status} />
        </div>
        <div className="h-px bg-gray-200" />
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Last Check</span>
            <span className="text-gray-800">{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Next Check</span>
            <span className="text-gray-800">10s</span>
          </div>
        </div>
      </div>
    </div>
  );
};