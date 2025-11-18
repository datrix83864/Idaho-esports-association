export const tournamentAPI = {
  // Fetch all registered teams/schools through secure proxy
  fetchSchools: async () => {
    try {
      console.log('Fetching schools through Netlify function...');
      
      const response = await fetch('/.netlify/functions/leagueos-schools');

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Function error:', errorData);
        throw new Error(errorData.error || 'Failed to fetch schools');
      }

      const data = await response.json();
      console.log('Received schools data:', data);

      if (data.success && Array.isArray(data.schools)) {
        return data.schools;
      } else {
        console.error('Invalid response format');
        return [];
      }
    } catch (error) {
      console.error('Error fetching schools:', error);
      return [];
    }
  },

  // Fetch upcoming tournaments (if needed later)
  fetchTournaments: async () => {
    // TODO: Create another Netlify function for tournaments if needed
    console.log('Tournaments API not yet implemented');
    return [];
  },
};
