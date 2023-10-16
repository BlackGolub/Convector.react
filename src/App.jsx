import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Convector from './components/convector/Convector'
import Home from './components/home/HomePage';
import DepositPage from './components/deposit/Deposit';
import AddMoney from './components/deposit/add money/AddMoney';
import Transfer from './components/transfer/Transfer';

const App = () => {
    return(
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/convector' element={<Convector />}/>
            <Route path='/deposit' element={<DepositPage />}/>
            <Route path='/add_money' element={<AddMoney />}/>
            <Route path='/transfer' element={<Transfer />}/>
        </Routes>
    )
}

export default App