import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const StageBreakdown = (props) => {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const [matchData, setMatchData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.leagueos.gg/seasons/${props.seasonId}/stages/${props.stageId}/matches`, {
          headers: {
            'x-leagueos-api-key': customFields.apiKey,
          },
        });
        console.log(response);

        // Check if the response has a 'results' property and 'teams' array
        if (response.data) {
          setMatchData(response.data.data.results);
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

  // Sort the match data by match ID
  const sortedResults = matchData.sort((a, b) => a.matchId - b.matchId);

  return (
    <div>
      <h2>Sorted Results</h2>
      <ul>
        {sortedResults.map((result) => {
          // Converting UNIX timestamp to local timezone
          const date = new Date(result.date * 1000).toLocaleString();

          return (
            <li key={result.id}>
              <div>
                <strong>Match ID:</strong> {result.matchId}
              </div>
              <div>
                <strong>Date:</strong> {result.date}
              </div>
              <div>
                <strong>Name:</strong> {result.name}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StageBreakdown;
