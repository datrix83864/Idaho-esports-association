
import React from 'react';
import Layout from '@theme/Layout';

export default function Ranking() {
  return (
    <Layout title="League of Legends Rank" description="League of Legends Rank">
      <div className="container">
        
  
        <main>
          <p className="description">
            See the current posted rankings for League of Legends.
          </p>
          <h2 className="game">League of Legends</h2>
          <div className="ranking">
            <ol>
              <li>Team A</li>
              <li>Team B</li>
              <li>Team C</li>
              <li>Team D</li>
            </ol>
          </div>
      </main>
      </div>
      </Layout>
  );
}