import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import Markdown from 'marked-react'; // Import marked for converting Markdown to HTML
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const Rulebook = (props) => {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const [bookData, setBookData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.leagueos.gg/rulebooks/${props.bookid}`, {
          headers: {
            'x-leagueos-api-key': customFields.apiKey,
          },
        });
        console.log(response);

        if (response.data && response.data.data.md) {
          // Convert Markdown to HTML using marked
          const mdContent = response.data.data.md;
          const numberedHTML = convertToNumberedHeadings(mdContent);
          setBookData(numberedHTML);
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
  }, [props.bookid]); // Include props.bookid in the dependency array

  const convertToNumberedHeadings = (mdContent) => {
    const lines = mdContent.split('\n');
    let currentLevel = 0;
    let numberedLines = [];

    for (let line of lines) {
      if (line.startsWith('## ')) {
        currentLevel = 1;
      } else if (line.startsWith('### ')) {
        currentLevel = 2;
      } else if (line.startsWith('#### ')) {
        currentLevel = 3;
      } else if (line.startsWith('##### ')) {
        currentLevel = 4;
      } else if (line.startsWith('###### ')) {
        currentLevel = 5;
      } else {
        numberedLines.push(line);
        continue;
      }

      const numbers = new Array(currentLevel).fill(0).map((_, i) => i + 1);
      const numberedLine = numbers.join('.') + ' ' + line.substr(currentLevel + 1);
      numberedLines.push(numberedLine);
    }

    return numberedLines.join('\n');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render bookData as HTML */}
      <Markdown>{bookData}</Markdown>
    </div>
  );
};

export default Rulebook;
