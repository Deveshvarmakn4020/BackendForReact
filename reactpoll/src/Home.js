import React from "react";
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { HomeProvider } from './HomeContext';
import './App.css';

const Home = () => {
  return (
    <div className="home">
      <HomeProvider>
        <div className="content">
          <Sidebar />
          <div className='tables'>
            <MainContent />
          </div>
        </div>
      </HomeProvider>
    </div>
  );
}

export default Home;
