import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import Markdown from 'marked-react'; // Import marked for converting Markdown to HTML
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const Pages = (props) => {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const [bookData, setBookData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.leagueos.gg/league/pages/${props.bookid}`, {
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
    let mainHeadingNumber = 0;
    let subHeadingNumber = 0;
    let subSubHeadingNumber = 0;
  
    return mdContent.replace(/^(#+)\s+(.*)$/gm, (match, hashes, title) => {
      const level = hashes.length;
  
      if (level === 2) {
        mainHeadingNumber++;
        subHeadingNumber = 0;
        subSubHeadingNumber = 0;
        return `${'#'.repeat(level)} ${mainHeadingNumber}. ${title}`;
      } else if (level === 3) {
        subHeadingNumber++;
        subSubHeadingNumber = 0;
        return `${'#'.repeat(level)} ${mainHeadingNumber}.${subHeadingNumber}. ${title}`;
      } else if (level === 4) {
        subSubHeadingNumber++;
        return `${'#'.repeat(level)} ${mainHeadingNumber}.${subHeadingNumber}.${subSubHeadingNumber}. ${title}`;
      }
  
      return match;
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

export default Pages;
