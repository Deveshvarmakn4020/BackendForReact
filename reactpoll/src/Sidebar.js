import React, { useEffect, useState, useContext } from 'react';
import CreatePollBtn from './CreatePollBtn';
import Filter from './Filter';
import { HomeContext } from './HomeContext';

const Sidebar = () => {
  const [tags, setTags] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia("(max-width: 425px)").matches);
  const { selectedTags, setSelectedTags } = useContext(HomeContext);
  const poll = { QuestionID: 1, Question: 'Sample question?' }; // Example poll object

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:8000/polls/tags/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setTags(data.data);
        } else {
          console.error(data.msg);
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 425px)");
    const handleMediaQueryChange = (e) => setIsSmallScreen(e.matches);
    mediaQuery.addListener(handleMediaQueryChange);
    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, []);

  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <aside>
      <CreatePollBtn poll={poll} />
      <div style={{
        marginLeft: '25px',
        marginTop: '5px',
        backgroundColor: '#e3f2fd',
        padding: '20px',
        borderRadius: '5px',
        width: isSmallScreen ? '89%' : '250px', // Adjust width based on screen size
        marginRight:isSmallScreen ? '255px': '0px'
      }}>
        {/* <h4 style={{ marginBottom: '10px' }}>Filter by Tags</h4> */}
        {tags.map(tag => (
          <div key={tag} style={{ marginBottom: '15px' }}>
            <input
              type="checkbox"
              id={tag}
              checked={selectedTags.includes(tag)}
              onChange={() => handleTagChange(tag)}
            />
            <label htmlFor={tag} style={{ paddingLeft: '6px' }}>{capitalizeFirstLetter(tag)}</label>
          </div>
        ))}
        <Filter />
      </div>
    </aside>
  );
};

export default Sidebar;
