import React from 'react';
import Layout from '@theme/Layout';

export default function Schedule() {
  return (
    <Layout title="Schedule" description="Schedule">
  
        <main>
          <p className="description">
            See the current posted schedule for our different games.
          </p>
          <h2 className="Game"><a href="/schedule/overwatch_2">Overwatch 2</a></h2>
          <h2 className="Game"><a href="/schedule/valorant">Valorant</a></h2>
          <h2 className="Game"><a href="/schedule/rocket_league">Rocket League</a></h2>
          <h2 className="Game"><a href="/schedule/super_smash_bros">Super Smash Bros Universe</a></h2>
          <h2 className="Game"><a href="/schedule/league_of_legends">League of Legends</a></h2>
      </main>
    </Layout>
  );
}