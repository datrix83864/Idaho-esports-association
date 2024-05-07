import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TeamName from '../LeagueOSTeamName/TeamName';

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

        if (response.data) {
          setMatchData(response.data.data.results);
        } else {
          console.error('Invalid data format in the API response');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const sortedResults = matchData.sort((a, b) => a.matchId - b.matchId);

  return (
    <div>
      <ul>
        {sortedResults.map((result) => {
          const date = new Date(result.date * 1000).toLocaleString();

          return (
            <li key={result.id}>
              <div>
                <strong>Match Name:</strong> {result.name}
              </div>
              <div>
                <strong>Date:</strong> {date}
              </div>
              <div>
                <strong>Team 1:</strong> <TeamName teamId={result.teamIds[0]} />
              </div>
              <div>
                <strong>Team 2:</strong> <TeamName teamId={result.teamIds[1]} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StageBreakdown;