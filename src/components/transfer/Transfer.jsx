import React, { useState, useEffect } from "react";
import styles from "./Transfer.module.css";
import Keyboard from "../convector/keyboard/Keyboard";
import { Wallet, updateBalanceForCurrency } from '../home/Wallet';
import { updateUsers, Users } from "./Users";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';
import { HiArrowPathRoundedSquare } from 'react-icons/hi2';


const Transfer = () => {
    const [telNumber, setTelNumber] = useState('+7')
    const [cardNumber, setCardNumber] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [showCurrencies, setShowCurrencies] = useState(false);
    const [activeInput, setActiveInput] = useState(null);
    const [isTelMode, setIsTelMode] = useState(true);
    const [balance, setBalance] = useState(Wallet.find(currency => currency.code === selectedCurrency).balance)

    /* Отслеживание актуального balance */
    useEffect(() => {
        const currencyInfo = Wallet.find(currency => currency.code === selectedCurrency);
        if (currencyInfo) {
          setBalance(currencyInfo.balance);
        }
      }, [selectedCurrency]);

    /* Переключение между типами даанных перевода */
    const toggleMode = () => {
        setIsTelMode(!isTelMode);
    };

    const handleTelNumberChange = (event) => {
      setTelNumber(event.target.value);
    };

    const handleCardNumberChange = (event) => {
        setCardNumber(event.target.value);
    };
  
    const handleInputValueChange = (event) => {
      setInputValue(event.target.value);
    };
  
    /* Функция клавиатуры */
    const handleButtonClick = (event) => {
      let clickedValue = event.currentTarget.getAttribute('value');
  
      if (activeInput === 'telNumber') {
        if (clickedValue === 'null' && telNumber !== '+7') {
            setTelNumber(telNumber.slice(0, -1));
        } else if (clickedValue !== '.' && telNumber.length < 12 && clickedValue !== 'null') {
            setTelNumber(telNumber + clickedValue);
        }
      }else if (activeInput === 'cardNumber') {
        if (clickedValue === 'null') {
            setCardNumber(cardNumber.slice(0, -1));
        } else if (clickedValue !== '.' && cardNumber.length < 16) {
            setCardNumber(cardNumber + clickedValue);
        }
      }else if (activeInput === 'inputValue') {
        if (clickedValue === 'null') {
            setInputValue(inputValue.slice(0, -1));
        } else if (clickedValue !== '.') {
            if (Number(inputValue)*10 > balance) {
              setInputValue(balance.toString());
              return(setInputValue)
            }
            setInputValue(inputValue + clickedValue);
        }
      }
    };

    /* Получение списка валют */
    const currencies = Array.from(new Set(Wallet.map(item => item.code)));

    /* Показать список валют */
    const handleCheckboxChange = () => {
        setShowCurrencies(!showCurrencies);
    };
   
    /* Скрытие списка */
    const handleCurrencySelect = currency => {
        setSelectedCurrency(currency);
        setShowCurrencies(false);
    };

    /* Отображение перевода */
    const handleConfirmClick = () => {
        let formattedNumber = isTelMode
        ? `+${telNumber.slice(1, 2)} (${telNumber.slice(2, 5)}) ${telNumber.slice(5, 8)} ${telNumber.slice(8, 10)} ${telNumber.slice(10)}`
        : `${cardNumber.slice(0, 4)} ${cardNumber.slice(4, 8)} ${cardNumber.slice(8, 12)} ${cardNumber.slice(12)}`;

        const newTransfer = {
            transfer_value: inputValue,
            currency: selectedCurrency,
            data: new Date().toLocaleDateString(),
            image: '../../../images/unknown_user.jpg',
            number: formattedNumber
        };
        const newBalance = balance - inputValue

        if (isTelMode && telNumber.length === 12 && inputValue.length > 0) {
            setBalance(newBalance)
            updateBalanceForCurrency(selectedCurrency, newBalance)
            updateUsers(newTransfer)
            setInputValue('');
            setTelNumber('+7');
        } else if (!isTelMode && cardNumber.length === 16 && inputValue.length > 0) {
            setBalance(newBalance)
            updateBalanceForCurrency(selectedCurrency, newBalance)
            updateUsers(newTransfer)
            setInputValue('');
            setCardNumber('');
        }
      };

    return(
        <div>
            <Link to="/" className={styles.back}><IoIosArrowBack /></Link>
            <h1 className={styles.transfer_h1}>Transfer</h1>
            <div className={styles.transfer}>
                <div className={styles.transfer_block}>
                    <div className={styles.your_account}>
                        <div className={styles.user_block}>
                            <img src="/GIT.Convector/public/images/avatar.jpg" className={styles.avatar} alt="avatar"/>
                            <div className={styles.user_info}>
                                <h1 className={styles.user_name}>Name: User</h1>
                                <p className={styles.user_number}>Account number:<br/> 9324 2834 9527 1743</p>
                            </div>
                        </div>
                        <h1 className={styles.user_balance}>Balance:{balance.toLocaleString()} {selectedCurrency}</h1>
                    </div>
                    <div className={styles.recipient_account}>
                        <h1 className={styles.target_header}>Transfer to:</h1>
                        <div className={styles.target_info}>
                            <button className={styles.transfer_type} onClick={toggleMode}>{isTelMode ? "Tel:" : "Card:"}</button>
                            <InputMask className={styles.target_wallet} id='show_keyboard' 
                            mask={isTelMode ? "+9 (999) 999 99 99" : "9999 9999 9999 9999"}
                            value={isTelMode ? telNumber : cardNumber} onChange={isTelMode ? handleTelNumberChange : handleCardNumberChange} 
                            onFocus={() => setActiveInput(isTelMode ? "telNumber" : "cardNumber")}/>
                        </div>
                        <div className={styles.transfer_volume}>
                            <h5 className={styles.transfer_transfer}>Transfer:</h5>
                            <div className={styles.transfer_value}>
                                <input className={styles.input_value} value={inputValue} id='show_keyboard'
                                 onChange={handleInputValueChange} onFocus={() => setActiveInput('inputValue')}/>
                                <h5 className={`${styles.volume_transfer} ${showCurrencies ? styles.invisible : ''}`}>{selectedCurrency}</h5>
                                <ul className={showCurrencies ? styles.handleCurrencySelect : ''}>
                                    {currencies.map(currency => (
                                    <li key={currency} onClick={() => handleCurrencySelect(currency)}>{currency}</li>
                                    ))}
                                </ul>
                                <input  className={styles.checkbox} type="checkbox" id="checkbox_currencies" onChange={handleCheckboxChange}/>
                                <label className={styles.button_wallet} htmlFor="checkbox_currencies"><HiArrowPathRoundedSquare /></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.history}>
                    <div className={styles.story_list}>
                        {Users.map((user, index) => (
                            <li key={index} className={styles.users_info}> 
                                <img src="./Users.jsx" alt="img" className={styles.users_img}/>
                                <p className={styles.users_numbers}>{user.number}</p>
                                <p className={styles.transfer_data}>{user.data}</p>
                                <div className={styles.users_transfer}>
                                    <p className={styles.transfer_value_history}>{Number(user.transfer_value).toLocaleString()}</p>
                                    <p className={styles.transfer_currency}>{user.currency}</p>
                                </div>
                            </li>
                        ))}
                    </div>
                </div>
                <button className={styles.confirm_transfer} onClick={handleConfirmClick}>Confirm</button>
            </div>
            <Keyboard onButtonClick={handleButtonClick}/>
        </div>
    )
}

export default Transfer