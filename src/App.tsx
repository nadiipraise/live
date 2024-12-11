import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { LivenessCheck } from './components/LivenessCheck';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Dashboard route */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* LivenessCheck route */}
        <Route path="/liveness-check" element={<LivenessCheck onComplete={() => {
          // Navigate back to dashboard after completion
          window.location.href = '/dashboard';
        }} />} />
      </Routes>
    </Router>
  );
}

export default App;
