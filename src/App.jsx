import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Convector from './components/convector/Convector'
import Home from './components/home/HomePage';

const App = () => {
    return(
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/convector' element={<Convector />}/>
        </Routes>
    )
}

export default App