import React, { useState } from "react";
import styles from "./Transfer.module.css";
import Keyboard from "../convector/keyboard/Keyboard";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';
import { Wallet } from '../home/Wallet';
import {HiArrowPathRoundedSquare} from 'react-icons/hi2';


const Transfer = () => {
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [showFilteredCurrencies, setShowFilteredCurrencies] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    /* Получение списка валют */
    const currencies = Array.from(new Set(Wallet.map(item => item.code)));

    /* Показать список валют */
    const handleCheckboxChange = () => {
        setShowFilteredCurrencies(!showFilteredCurrencies);
    };
      
      /* Повернуть стрклки */
    const handleRotation = () => {
        setIsRotated(!isRotated);
    };
      
    /* Поворот стрелки */
    const labelStyle = {
        transform: isRotated ? 'rotate(180deg)' : 'rotate(0deg)',
    };

    /* Скрытие списка */
    const handleCurrencySelect = currency => {
        setSelectedCurrency(currency);
        setShowFilteredCurrencies(false);
        handleRotation()
    };

    return(
        <div className={styles.transfer}>
            <Link to="/" className={styles.back}><IoIosArrowBack /></Link>
            <h1 className={styles.transfer_h1}>Transfer</h1>
            <div className={styles.transfer_block}>
                <div className={styles.your_account}>
                    <div className={styles.user_block}>
                        <img src="/Convector.react/images/avatar.jpg" className={styles.avatar} alt="avatar"/>
                        <div className={styles.user_info}>
                            <h1 className={styles.user_name}>Name: User</h1>
                            <p className={styles.user_number}>Account number:<br/> 9324 2834 9527 1743</p>
                        </div>
                    </div>
                    <h1 className={styles.user_balance}>Balance: {selectedCurrency}</h1>
                    <div className={styles.transfer_volume}>
                        <h2 className={styles.transfer_transfer}>Transfer:</h2>
                        <div className={styles.transfer_value}>
                            <input className={styles.input_value} id='show_keyboard'></input>
                            <h2 className={`${styles.volume_transfer} ${showFilteredCurrencies ? styles.invisible : ''}`}>{selectedCurrency}</h2>
                            <ul className={showFilteredCurrencies ? styles.handleCurrencySelect : ''}>
                                {currencies.map(currency => (
                                    <li key={currency} onClick={() => handleCurrencySelect(currency)}>{currency}</li>
                                ))}
                            </ul>
                            <input  className={styles.checkbox} type="checkbox" id="checkbox_currencies" onChange={handleCheckboxChange}/>
                            <label className={styles.button_wallet} style={labelStyle} htmlFor="checkbox_currencies" onClick={handleRotation}><HiArrowPathRoundedSquare /></label>
                        </div>
                    </div>
                </div>
                <div className={styles.recipient_account}>
                    <h1>Transfer to:</h1>
                </div>
            </div>
            <Keyboard />
        </div>
    )
}

export default Transfer