import React from "react";

const CoachingStatement = ({game}) => {
    let specificStatement
    if (game == "valorant") {
        specificStatement = <li>Coaches can only communicate with the players before the map starts, during tactical timeouts, and between maps.</li>
    }
  return (
    <div>
      <ul>
        <li>Coaches are allowed as long as they are registered as a coach on the team.</li>
        <li>Coaches are not permitted to play.</li>
        <li>Coaches are not allowed to talk to players during the match. </li>
        {specificStatement}
        <li>Coaches are permitted to be un-deafened in voice chat, but mic must be software muted.</li>
      </ul>
    </div>
  );
};

export default CoachingStatement;
