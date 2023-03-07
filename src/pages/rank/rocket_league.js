
import React from 'react';
import Layout from '@theme/Layout';

export default function Ranking() {
  return (
        <Layout title="Rocket League Rank" description="Rocket League Rank">
  
        <main>
          <p className="description">
          See the current posted rankings for Rocket League.
          </p>
          <h2 className="game">Rocket League</h2>
          <div className="ranking">
            <ol>
              <li>Team A</li>
              <li>Team B</li>
              <li>Team C</li>
              <li>Team D</li>
            </ol>
          </div>
      </main>
    </Layout>
  );
}