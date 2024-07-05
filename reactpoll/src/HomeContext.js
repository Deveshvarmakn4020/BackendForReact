import React, { createContext, useState } from 'react';

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredPolls, setFilteredPolls] = useState([]);
  const [message, setMessage] = useState('');

  return (
    <HomeContext.Provider value={{ selectedTags, setSelectedTags, filteredPolls, setFilteredPolls ,message, setMessage }}>
      {children}
    </HomeContext.Provider>
  );
};

export { HomeContext, HomeProvider };
