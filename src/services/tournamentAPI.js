const API_BASE = 'https://api.leagueos.gg';
const API_KEY = import.meta.env.LEAGUEOS_API_KEY;

export const tournamentAPI = {
  // Fetch all registered teams/schools from LeagueOS
  fetchSchools: async () => {
    try {
      console.log('Fetching teams from LeagueOS...');
      
      const response = await fetch(`${API_BASE}/league/groups?ipp=400`, {
        headers: {
          'x-leagueos-api-key': API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('LeagueOS API response:', data);

      // Check if the response has the expected structure
      if (data && data.data && Array.isArray(data.data.results)) {
        // Filter out type 5 teams and "Example" team
        const filteredTeams = data.data.results.filter(
          team => team.type !== 5 && team.name !== "Example" && team.name !== "Yellow Lemming" && team.teamCount > 0
        );

        // Transform to match our SchoolCard component format
        return filteredTeams.map(team => ({
          id: team.id,
          name: team.name,
          city: team.city || null,
          logo: `https://images.leagueos.gg/groups/${team.id}/${team.avatar}` || null,
          teamCount: team.memberCount || null,
          leagueosUrl: `https://idahoesports.leagueos.gg/league/groups/${team.id}`,
          // Include any other relevant fields from the API
          ...team
        }));
      } else {
        console.error('Invalid data format in the API response');
        return [];
      }
    } catch (error) {
      console.error('Error fetching schools from LeagueOS:', error);
      return [];
    }
  },

  // Fetch upcoming tournaments (if needed)
  fetchTournaments: async () => {
    try {
      const response = await fetch(`${API_BASE}/league/tournaments`, {
        headers: {
          'x-leagueos-api-key': API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      return [];
    }
  },
};
