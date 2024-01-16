import React from "react";
import {Link} from 'react-router-dom';

const ConflictStatement = () => {
  return (
    <div>
      <ul>
        <li>
          IEA encourages you to attempt to resolve all conflicts with the
          opposing team
        </li>
        <li>
        If your attempts at resolving the conflict have been unsuccessful, please reach out to IEA via the <Link href="https://idahoesports.leagueos.gg">LeagueOS Site</Link> to explain your situation and we will settle the matter for you.
        </li>
        <li> Have screen shots or replays when possible.</li>
        <li> All IEA rulings on disputes are final</li>

      </ul>
    </div>
  );
};

export default ConflictStatement;
