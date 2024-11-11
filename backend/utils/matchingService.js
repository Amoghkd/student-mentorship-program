const cosineSimilarity = require('cosine-similarity');

/**
 * Create a frequency vector for a set of words.
 * @param {Array} words - Array of words or phrases.
 * @param {Array} allWords - Array of all unique words for creating a common vector space.
 * @returns {Array} - Frequency vector.
 */
function createFrequencyVector(words, allWords) {
  return allWords.map(word => (words.includes(word) ? 1 : 0));
}

/**
 * Calculate the match score using cosine similarity.
 * @param {Object} mentor - Mentor object with properties like expertise.
 * @param {Object} mentee - Mentee object with properties like interests.
 * @returns {Number} - A match score (0 to 100) representing the match strength.
 */
function calculateMatchScore(mentor, mentee) {
  const mentorExpertise = Array.isArray(mentor.expertise) ? mentor.expertise : JSON.parse(mentor.expertise);
  const menteeInterests = Array.isArray(mentee.interests) ? mentee.interests : JSON.parse(mentee.interests);

  // Create a common vector space
  const allWords = Array.from(new Set([...mentorExpertise, ...menteeInterests]));

  // Create frequency vectors for cosine similarity calculation
  const mentorVector = createFrequencyVector(mentorExpertise, allWords);
  const menteeVector = createFrequencyVector(menteeInterests, allWords);

  // Calculate cosine similarity
  const similarity = cosineSimilarity(mentorVector, menteeVector);

  return similarity * 100;
}

/**
 * Find the top N mentors for a given mentee.
 * @param {Array} mentors - List of mentor objects to evaluate.
 * @param {Object} mentee - The mentee object to find matches for.
 * @param {Number} topN - Number of top matches to return.
 * @returns {Array} - A sorted array of the top N mentor objects with match scores.
 */
function findTopMatches(mentors, mentee, topN = 3) {
  const matches = mentors.map(mentor => {
    const score = calculateMatchScore(mentor, mentee);
    return { mentor, score };
  });

  // Sort and return the top N matches
  return matches.sort((a, b) => b.score - a.score).slice(0, topN);
}

module.exports = {
  findTopMatches
};
