
import React from 'react';
import Layout from '@theme/Layout';

export default function Rules() {
  return (
    <Layout title="Rules" description="Rules">
  
        <main>
          <p className="description">
            See the current posted rules for our different games.
          </p>
          <h2 className="Game"><a href="docs/Rules/general-rules">General Rules</a></h2>
          <h2 className="Game"><a href="docs/Rules/overwatch-2-rules">Overwatch 2</a></h2>
          <h2 className="Game"><a href="docs/Rules/valorant-rules">Valorant</a></h2>
          <h2 className="Game"><a href="docs/Rules/rocket-league-rules">Rocket League</a></h2>
          <h2 className="Game"><a href="docs/Rules/super-smash-bros-rules">Super Smash Bros Universe</a></h2>
          <h2 className="Game"><a href="docs/Rules/league-of-legends-rules">League of Legends</a></h2>
      </main>
    </Layout>
  );
}