import React from "react";

const GameStopStatement = ({numPlayers}) => {
    const oneLess = numPlayers - 1;

  return (
    <div>
      <ul>
        <li>
          Shortly after a pause is initiated, a reason must be given to the IEA
          representative acting as referee for the match (i.g: player
          disconnect, ping issues, technical difficulties, ect.)
        </li>
        <li>
          Each team will have 5 cummulative minutes to pause. When 5 minutes have
          been exhausted, teams are required to continue play. Both teams should
          consider keeping track of time.
        </li>
        <li>
          Each team is responsible for timing their pause (any issues should be
          discussed with the opposing team, coaches, and then IEA officials)
        </li>
        <li>
          In the case of a player disconnect, after the 5 minutes are used, the
          team must continue the game ({oneLess} v {numPlayers})
        </li>
        <li>
          If the player is able to reconnect, the player can rejoin the match.
        </li>
        <li> No subs are allowed to be subbed in the middle of a match.</li>
      </ul>
    </div>
  );
};

export default GameStopStatement;
