import React, { useContext } from 'react';
import { HomeContext } from './HomeContext';
import Button from '@mui/material/Button';

const Filter = () => {
  const { selectedTags, setFilteredPolls, message, setMessage } = useContext(HomeContext);

  const handleFilterClick = async () => {
    try {
      let url = 'http://localhost:8000/polls/';
      if (selectedTags.length > 0) {
        url = `http://localhost:8000/polls/filteredpoll?tags=${selectedTags.join(',')}`;
      }
      const response = await fetch(url);
      console.log(selectedTags);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFilteredPolls(data.data);
      if (selectedTags.length === 0) {
        console.log('No tags selected');
        setMessage('No tags selected');
        setTimeout(() => {
          setMessage('');
        }, 2000);
        return;
      } else {
        setMessage(''); // Clear the message if there are tags selected
      }
    } catch (error) {
      console.error('Error filtering polls:', error);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" size="small" onClick={handleFilterClick}>Filter by Tags</Button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Filter;
