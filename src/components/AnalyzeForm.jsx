// src/components/AnalyzeForm.js
import React, { useState } from 'react';
import axios from 'axios';

function AnalyzeForm({ onAnalyze }) {
  const [policyText, setPolicyText] = useState('');
  const [loading, setLoading] = useState(false);

  const analyzePolicy = async () => {
    setLoading(true);

    // Example API for sentiment analysis (replace with your own API key and endpoint)
    const apiKey = 'dec434953c2f461389651d7cb640f3c2';
    const apiUrl = 'https://api.dandelion.eu/datatxt/nex/v1'; // Example API endpoint

    try {
      const response = await axios.get(apiUrl, {
        params: {
          text: policyText,
          token: apiKey,
        },
      });

      const score = calculatePrivacyScore(response.data);
      const recommendation = getRecommendations(score);
      onAnalyze(score, recommendation);

    } catch (error) {
      console.error('Error analyzing policy:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePrivacyScore = (data) => {
    let score = 100;
    if (data.annotations.some((item) => item.spot === 'location tracking')) {
      score -= 20;
    }
    if (data.annotations.some((item) => item.spot === 'third-party sharing')) {
      score -= 30;
    }
    return score;
  };

  const getRecommendations = (score) => {
    if (score < 50) {
      return 'This website collects a lot of personal data. Consider using incognito mode or turning off location services.';
    } else {
      return 'This website seems to respect your privacy, but still be cautious about sharing personal information.';
    }
  };

  return (
    <div className="analyze-form">
      <textarea
        value={policyText}
        onChange={(e) => setPolicyText(e.target.value)}
        placeholder="Paste privacy policy here..."
        rows="6"
      />
      <button onClick={analyzePolicy} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </div>
  );
}

export default AnalyzeForm;
