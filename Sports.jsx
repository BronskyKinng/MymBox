import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

function Sports() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const LIVESCORE_API_KEY = process.env.REACT_APP_LIVESCORE_API_KEY || 'YOUR_LIVESCORE_API_KEY';

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get('https://livescore6.p.rapidapi.com/matches/v2/list-live', {
        headers: { 'X-RapidAPI-Key': LIVESCORE_API_KEY },
      })
      .then((response) => {
        setScores(response.data.Stages || []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch sports data.');
        setLoading(false);
      });
    // SuperSport mock (no public API)
    console.log('SuperSport data would be fetched here if API available');
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Sports</h1>
      {loading && <Spinner />}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div>
        {scores.map((stage, index) => (
          <div key={index} className="bg-gray-800 p-4 mb-4 rounded">
            <h2 className="text-xl">{stage.Snm}</h2>
            <p>Live updates coming soon...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sports;