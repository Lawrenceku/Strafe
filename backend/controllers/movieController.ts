const axios = require('axios');

// Base URL of the movie API
const BASE_URL = 'https://api.themoviedb.org/3';

// Fetch recommended movies
const getRecommendedMovies = async (req:any, res:any) => {
  const { movieId } = req.params; // Example: Pass movie ID in the route

  try {
    // Call the external API
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/recommendations`, {
      params: {
        api_key: req.apiKey, // Use the API key attached by the middleware
        language: 'en-US',   // Optional: Language parameter
        page: 1,             // Optional: Pagination
      },
    });

    // Manipulate the data (e.g., format movie titles or filter results)
    const movies = response.data.results.map((movie:any) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // Full poster URL
    }));

    res.json(movies); // Send manipulated data to the frontend
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching recommended movies:', error.message);
    } else {
      console.error('Error fetching recommended movies:', error);
    }
    res.status(500).json({ error: 'Failed to fetch recommended movies' });
  }
};

module.exports = { getRecommendedMovies };
