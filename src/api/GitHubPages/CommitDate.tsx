import { useEffect, useState } from "react";
import React from "react";
import axios from 'axios';

const CommitDate = ({ game }) => {
  const [date, setDate] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.github.com/repos/datrix83864/Idaho-esports-association/commits?path=docs%2FRules%2F${encodeURIComponent(game)}.mdx&page=1&per_page=1`
      );
      const dateObj = new Date(result.data[0].commit.committer.date);
      const formattedDate = `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
      setDate(formattedDate);
    };
    fetchData();
  }, [game]);
  return <>{date}</>;
};

export default CommitDate;