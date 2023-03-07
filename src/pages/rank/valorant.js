
import React from 'react';
import Layout from '@theme/Layout';

export default function Ranking() {
  return (
    <Layout title="Valorant Rank" description="Valorant Rank">
  
        <main>
          <Header title="Valorant Ranking" />
          <hr />
          <p className="description">
          See the current posted rankings for Valorant.
          </p>
          <h2 className="game">Valorant</h2>
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