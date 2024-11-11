import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const TeamName = ({ teamId }) => {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(`https://api.leagueos.gg/league/teams/${teamId}`, {
          headers: {
            'x-leagueos-api-key': customFields.apiKey,
          },
        });

        if (response.data && response.data.data) {
          setTeamName(response.data.data.parent.name);
        } else {
          console.error('Invalid data format in the API response');
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (teamId) {
      fetchTeamData();
    } else {
      setLoading(false);
      setTeamName('TBD');
    }
  }, [teamId, customFields.apiKey]);

  if (loading) {
    return <span>Loading...</span>;
  }

  return <span>{teamName}</span>;
};

export default TeamName;
