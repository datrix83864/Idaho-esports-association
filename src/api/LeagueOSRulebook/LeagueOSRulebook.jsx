import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Markdown from 'marked-react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ReactDOMServer from 'react-dom/server';

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
  }, [props.bookid, customFields.apiKey]);

  const parseMarkdown = (content) => {
    let lines = content.split('\n');
    let result = [];
    let currentNumbering = [];

    lines.forEach(line => {
      if (line.startsWith('## ')) {
        currentNumbering = [parseInt(line.match(/\d+/)[0])];
        result.push(`<h2>${currentNumbering.join('.')} ${line.substring(3)}</h2>`);
      } else if (line.startsWith('### ')) {
        currentNumbering.push(1);
        result.push(`<h3>${currentNumbering.join('.')} ${line.substring(4)}</h3>`);
      } else if (line.startsWith('#### ')) {
        currentNumbering.push(1);
        result.push(`<h4>${currentNumbering.join('.')} ${line.substring(5)}</h4>`);
      } else if (line.startsWith('##### ')) {
        currentNumbering.push(1);
        result.push(`<h5>${currentNumbering.join('.')} ${line.substring(6)}</h5>`);
      } else {
        result.push(`<p>${line}</p>`);
      }
    });

      const numbers = new Array(currentLevel).fill(0).map((_, i) => i + 1);
      const numberedLine = `<h${currentLevel}>${numbers.join('.')} ${line.substr(currentLevel + 1)}</h${currentLevel}>`;
      numberedLines.push(numberedLine);
    }

    return numberedLines.join('\n');
  };

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
      <div dangerouslySetInnerHTML={{ __html: bookData }}></div>
    </div>
  );
};

export default Rulebook;
