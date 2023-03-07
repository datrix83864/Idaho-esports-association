
import React from 'react';
import Layout from '@theme/Layout';

export default function Ranking() {
  return (
    <Layout title="Overwatch 2 Rank" description="Overwatch 2 Rank">
  
        <main>
          <p className="description">
            See the current posted rankings for Overwatch 2.
          </p>
          <h2 className="game">Overwatch 2</h2>
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