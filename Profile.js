import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) fetchFavorites();
  }, [user]);

  const fetchFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/favorites', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFavorites(response.data);
    } catch (err) {
      setError('Failed to load favorites.');
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFavorites(favorites.filter((fav) => fav.id !== id));
    } catch (err) {
      console.error('Error removing favorite:', err);
    }
  };

  if (!user) return <div className="p-6">Please log in to view your profile.</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Profile</h1>
      <p>Email: {user}</p>
      <h2 className="text-2xl mt-4">Favorites</h2>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.map((fav) => (
          <div key={fav.id} className="bg-gray-800 p-4 rounded">
            <img
              src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`}
              alt={fav.title}
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="text-xl mt-2">{fav.title}</h2>
            <button
              onClick={() => removeFavorite(fav.id)}
              className="mt-2 p-2 bg-red-600 rounded w-full"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;