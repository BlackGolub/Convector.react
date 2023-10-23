import React, { useState } from "react";
import styles from './AddMoney.module.css';
import Keyboard from '../../convector/keyboard/Keyboard'
import { Link } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';
import { Wallet } from "../../home/Wallet";

const AddMoney = () => {
  const [inputValue, setInputValue] = useState(Wallet[0].balance);
  const currency = Wallet[0]

  /* Форматирование ввода */
  const formatValue = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  /* Функция клавиатуры */
  const handleButtonClick = (event) => {
    let clickedValue = event.currentTarget.getAttribute('value');
    let newInputValue = inputValue;
  
    if (clickedValue === 'null') {
      newInputValue = newInputValue.toString().slice(0, -1);
    } else if (clickedValue !== '.') {
      newInputValue = newInputValue + clickedValue;
    }
    setInputValue(newInputValue);
  };

  /* Подтвердить, выйти на главную*/
  const handleConfirm = () => {
    const newValue = parseFloat(inputValue.replace(/ /g, ''));
    Wallet[0].balance = newValue;
  };

  return(
    <div className={styles.add_money}>
      <Link to="/" className={styles.back}><IoIosArrowBack /></Link>
      <h1 className={styles.balance_h1}>Balance</h1>
        <div className={styles.replenishment}>
          <div className={styles.info}>
            <p>*Replenishment of the balance is possible only<br/>
              in USD so that you use the Convector function</p>
            <p>*The entered amount will be the value of the USD balance</p>
          </div>
          <div className={styles.currency_balance}>
            <div className={styles.currency_info}>
              <img src={currency.image} className={styles.icon} alt={currency.code} />
              <p className={styles.full_name}>{currency.full_name}</p>
            </div>
            <div className={styles.currency_number}>
              <input id='show_keyboard' value={formatValue(inputValue)}
                className={styles.code} onChange={(event) => handleButtonClick(event)}/>
              <p className={styles.currency_name}>{currency.code}</p>
            </div>
          </div>
          <Link to="/" className={styles.confirm} onClick={handleConfirm}>Confirm</Link>
        </div>
        <Keyboard onButtonClick={handleButtonClick}/>
    </div>
  )
}

export default AddMoney