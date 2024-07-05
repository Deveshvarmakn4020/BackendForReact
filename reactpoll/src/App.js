import React from "react";
import { Routes, Route } from 'react-router-dom';
import PollsDetail from './PollDetail';
import Vote from './Vote';
import Home from './Home';
import Createpoll from './CreatePoll';
import Heading from "./Heading";
import './App.css';

function App() {
    return (
        <main>
            <Heading />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/polldetail" element={<PollsDetail />} />
                <Route path="/vote" element={<Vote />} />
                <Route path="/createpoll" element={<Createpoll />} />
            </Routes>
        </main>  
    );
}

export default App;
