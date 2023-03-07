
import React from 'react';
import Layout from '@theme/Layout';

export default function Ranking() {
  return (
    <Layout title="Super Smash Bros Rank" description="Super Smash Bros Rank">
  
        <main>
          <p className="description">
          See the current posted rankings for Super Smash Bros Ultimate.
          </p>
          <h2 className="game">Super Smash Bros Ultimate</h2>
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