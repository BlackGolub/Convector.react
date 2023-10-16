import React, { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import { Wallet, course } from './Wallet';
import { Link } from "react-router-dom";
import {BiSolidDownArrow} from 'react-icons/bi';
import {PiArrowElbowRightUpBold, PiArrowDownBold} from 'react-icons/pi';
import {BsArrowLeftRight} from 'react-icons/bs';
import {HiArrowPathRoundedSquare} from 'react-icons/hi2'

const Home = () => {
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [showFilteredCurrencies, setShowFilteredCurrencies] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [totalBalance, setTotalBalance] = useState(0);

    /* Получение списка валют */
    const currencies = Array.from(new Set(Wallet.map(item => item.code)));

    /* Фильтрация вылют(без выбранной) */
    const filteredCurrencies = currencies.filter(currency => currency !== selectedCurrency);

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

    /* Ключи поиска курсов */
    const convertedBalances = currencies.map(currency => {
        const key = `${selectedCurrency}${currency}`;
        if (course[key]) {
          return Wallet.find(item => item.code === currency).balance / course[key];
        }
        return Wallet.find(item => item.code === currency).balance;
    });

    /* Общий счет */
    useEffect(() => {
        const newTotalBalance = convertedBalances.reduce((total, balance) => total + balance, 0);
        setTotalBalance(newTotalBalance);
    }, [selectedCurrency, currencies, convertedBalances]);

    /* Конвертация списка балансов */
    function formatCurrencyBalance(balance, key) {
        if (key && course[key]) {
          const convertedBalance = (balance / course[key]).toFixed(2);
          return `${selectedCurrency} ${Number(convertedBalance).toLocaleString()}`;
        } else {
          return `${selectedCurrency} ${Number(balance).toFixed(2).toLocaleString()}`;
        }
    }

    return(
        <div className={styles.home_pages}>
            <div className={styles.account}>
                <div className={styles.my_account}>
                    <img src="/Convector.react/images/avatar.jpg" className={styles.avatar} alt="avatar" />
                    <p>myvallet.fr.id</p>
                    <button className={styles.account_button}><BiSolidDownArrow /></button>
                </div>
                <button className={styles.share_button}>share</button>
            </div>
            <div className={styles.total_wallet}>
                <div className={styles.total_info}>
                    <h1 className={styles.total_h1}>Total estimated value</h1>
                    <div className={styles.total_value}>
                        <h2 className={styles.total_h2}>{Number((totalBalance).toFixed(2)).toLocaleString()}</h2>
                        <p className={styles.total_currency}>{selectedCurrency}</p>
                    </div>
                </div>
                <input  className={styles.checkbox} type="checkbox" id="checkbox_currencies" onChange={handleCheckboxChange}/>
                <label className={styles.button_wallet} style={labelStyle} htmlFor="checkbox_currencies" onClick={handleRotation}><HiArrowPathRoundedSquare /></label>
                    <ul className={showFilteredCurrencies ? styles.handleCurrencySelect : ''}>
                        {filteredCurrencies.map(currency => (
                        <li key={currency} onClick={() => handleCurrencySelect(currency)}>{currency}</li>
                        ))}
                    </ul>
            </div>
            <div className={styles.naw}>
                <Link to='/transfer' className={styles.naw_button}>
                    <PiArrowElbowRightUpBold className={styles.naw_icon}/>
                    <p>Send</p>
                </Link>
                <Link to='/convector' className={styles.naw_button}>
                    <BsArrowLeftRight className={styles.naw_icon} />
                    <p>Convert</p>
                </Link>
                <Link to='/deposit' className={styles.naw_button}>
                    <PiArrowDownBold className={styles.naw_icon}/>
                    <p>Deposit</p>
                </Link>
            </div>
            <h3 className={styles.total_h3}>My assets</h3>
            <div className={styles.assets_list}>
                {Wallet.map((currency, index) => (
                    <div className={styles.currency_balance} key={index}>
                        <div className={styles.currency_info}>
                            <img src={currency.image} className={styles.icon} alt={currency.code} />
                            <div>
                                <p className={styles.full_name}>{currency.full_name}</p>
                                <p className={styles.code}>{currency.code}: {currency.balance.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className={styles.each_balance}>
                            <p className={styles.full_name}>{formatCurrencyBalance(currency.balance, `${selectedCurrency}${currency.code}`)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home