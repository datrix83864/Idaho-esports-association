
import React from 'react';
import Layout from '@theme/Layout';

export default function Rules() {
  return (
    <Layout title="Rankings" description="Rankings">
  
        <main>
          <p className="description">
            See the current rankings for our different games.
          </p>
          <h2 className="Game"><a href="/rankings/overwatch_2">Overwatch 2</a></h2>
          <h2 className="Game"><a href="/rankings/valorant">Valorant</a></h2>
          <h2 className="Game"><a href="/rankings/rocket_league">Rocket League</a></h2>
          <h2 className="Game"><a href="/rankings/super_smash_bros">Super Smash Bros Universe</a></h2>
          <h2 className="Game"><a href="/rankings/league_of_legends">League of Legends</a></h2>
      </main>
    </Layout>
  );
}