import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Markdown from 'marked-react';
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

        if (response.data && response.data.data.md) {
          const markdownContent = response.data.data.md;
          // Parse markdown content and generate numbered headings
          const parsedContent = parseMarkdown(markdownContent);
          setBookData(parsedContent);
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
  }, [props.bookid, customFields.apiKey]);

  // Function to parse markdown content and generate numbered headings
  const parseMarkdown = (content) => {
    let lines = content.split('\n');
    let result = [];
    let currentNumbering = [];

    lines.forEach(line => {
      if (line.startsWith('## ')) {
        currentNumbering = [parseInt(line.match(/\d+/)[0])];
        result.push(<h2>{currentNumbering.join('.')} {line.substring(3)}</h2>);
      } else if (line.startsWith('### ')) {
        currentNumbering.push(1);
        result.push(<h3>{currentNumbering.join('.')} {line.substring(4)}</h3>);
      } else if (line.startsWith('#### ')) {
        currentNumbering.push(1);
        result.push(<h4>{currentNumbering.join('.')} {line.substring(5)}</h4>);
      } else if (line.startsWith('##### ')) {
        currentNumbering.push(1);
        result.push(<h5>{currentNumbering.join('.')} {line.substring(6)}</h5>);
      } else {
        result.push(<p>{line}</p>);
      }
    });

    return result;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Markdown>{bookData}</Markdown>
    </div>
  );
};

export default Rulebook;
