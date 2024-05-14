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
          // Set the Markdown content to state
          setBookData(response.data.data.md);
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
    let lineNumber = 0;
    return mdContent.replace(/^(#+)\s+(.*)$/gm, (match, hashes, title) => {
      lineNumber++;
      const level = hashes.length;
      return `${'#'.repeat(level)} ${lineNumber}. ${title}`;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render bookData as Markdown, converted to HTML with numbered headings */}
      <Markdown>{convertToNumberedHeadings(bookData)}</Markdown>
    </div>
  );
};

export default Rulebook;
