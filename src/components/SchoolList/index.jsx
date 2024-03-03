import React from 'react';

const SchoolList = ({ jsonData }) => {
  const filteredSchools = jsonData.data.results.filter(
    (school) => school.type === 0
  );

  return (
    <div>
      <h2>Schools List</h2>
      <ul>
        {filteredSchools.map((school) => (
          <li key={school.id}>
            <a href={`https://example.com/${school.id}`}>
              {school.name.trim()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolList;
