import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [featured, setFeatured] = useState(null);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      // Fetch featured content
      const featuredResponse = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day`,
        { params: { api_key: TMDB_API_KEY } }
      );
      setFeatured(featuredResponse.data.results[0]);

      // Fetch trending
      const trendingResponse = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week`,
        { params: { api_key: TMDB_API_KEY } }
      );
      setTrending(trendingResponse.data.results);

      // Fetch popular
      const popularResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/popular`,
        { params: { api_key: TMDB_API_KEY } }
      );
      setPopular(popularResponse.data.results);

      // Fetch new releases
      const newReleasesResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing`,
        { params: { api_key: TMDB_API_KEY } }
      );
      setNewReleases(newReleasesResponse.data.results);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const ContentRow = ({ title, items }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/movie/${item.id}`}
            className="flex-none w-48 hover:scale-105 transition-transform duration-200"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="w-full h-72 object-cover rounded-lg"
            />
            <h3 className="mt-2 text-sm font-semibold">{item.title || item.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Featured Content */}
      {featured && (
        <div className="relative h-[70vh]">
          <img
            src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
            alt={featured.title || featured.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent">
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-4xl font-bold mb-4">{featured.title || featured.name}</h1>
              <p className="text-lg mb-4">{featured.overview}</p>
              <Link
                to={`/movie/${featured.id}`}
                className="bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Watch Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Content Rows */}
      <div className="p-8">
        <ContentRow title="Trending Now" items={trending} />
        <ContentRow title="Popular Movies" items={popular} />
        <ContentRow title="New Releases" items={newReleases} />
      </div>
    </div>
  );
}

export default Home; 