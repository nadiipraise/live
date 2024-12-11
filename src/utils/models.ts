import * as faceapi from 'face-api.js';

export const loadRequiredModels = async () => {
  const MODEL_URL = '/models';
  
  try {
    const modelPromises = [
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
    ];

    await Promise.all(modelPromises);
    return true;
  } catch (error) {
    console.error('Error loading models:', error);
    throw error;
  }
}; 