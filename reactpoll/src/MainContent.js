import React, { useContext, useEffect } from 'react';
import { HomeContext } from './HomeContext';
import PollsTable from './PollsTable';

const MainContent = () => {
  const { filteredPolls, setFilteredPolls } = useContext(HomeContext);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch('http://localhost:8000/polls/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFilteredPolls(data.data);
        console.log(data.data);
      } catch (error) {
        console.error('Error fetching polls:', error);
      }
    };

    fetchPolls();
  }, [setFilteredPolls]);

  return (
    <div className="main-content">
      <PollsTable polls={filteredPolls} />
    </div>
  );
};

export default MainContent;
