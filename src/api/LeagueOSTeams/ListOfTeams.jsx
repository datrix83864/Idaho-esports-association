import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


const ListOfTeams = () => {
  const { siteConfig: {customFields}, } = useDocusaurusContext();
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.leagueos.gg/league/groups', {
          headers: {
            'x-leagueos-api-key': customFields.apiKey,
          },
        });
        console.log(response);

        // Check if the response has a 'results' property and 'teams' array
        if (response.data && Array.isArray(response.data.data.results)) {
          const filteredTeams = response.data.data.results.filter(team => team.type !== 5 && team.name != "Example");
          setTeamData(filteredTeams);
        } else {
          console.error('Invalid data format in the API response');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator
  }

  return (
    <ul>
      {teamData.map(team => (
        <li key={team.id}>
          <a href={`https://idahoesports.leagueos.gg/league/groups/${team.id}`}>{team.name}</a>
        </li>
      ))}
    </ul>
  );
};

export default ListOfTeams;
