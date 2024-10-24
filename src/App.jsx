// src/App.js
import React, { useState } from 'react';
import AnalyzeForm from './components/AnalyzeForm';
import PrivacyScoreChart from './components/PrivacyScoreChart';
import './App.css';

function App() {
  const [privacyScore, setPrivacyScore] = useState(null);
  const [recommendations, setRecommendations] = useState('');

  const handleAnalysisResult = (score, recommendation) => {
    setPrivacyScore(score);
    setRecommendations(recommendation);
  };

  return (
    <div className="app">
      <h1>Personal Data Privacy Dashboard</h1>
      <AnalyzeForm onAnalyze={handleAnalysisResult} />
      {privacyScore !== null && (
        <div>
          <PrivacyScoreChart score={privacyScore} />
          <div className="recommendations">
            <h3>Recommendations:</h3>
            <p>{recommendations}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
