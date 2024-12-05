const router = require('express').Router();

// Define the route
router.get('/movies/:movieId/recommendations', checkApiKey, getRecommendedMovies);

module.exports = router;
