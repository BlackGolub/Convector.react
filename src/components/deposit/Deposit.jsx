import React, { useRef, useState } from "react";
import styles from './Deposit.module.css';
import Keyboard from '../convector/keyboard/Keyboard';
import { Link } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';

const DepositPage = () => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [inputValues, setInputValues] = useState(['', '', '', '']);
  const [activeInputIndex, setActiveInputIndex] = useState(0);
  
  const handleInput = (index, value) => {
    if (value.length === 4 && index < inputRefs.length - 1) {
      setActiveInputIndex(index + 1);
    }
  };
  
  const handleButtonClick = (event) => {
    let clickedValue = event.currentTarget.getAttribute('value');
    const index = activeInputIndex;

    if (clickedValue === 'null') {
      if (inputValues[index]) {
        const newValue = inputValues[index].slice(0, -1);
        setInputValues((prevValues) => {
          const newValues = [...prevValues];
          newValues[index] = newValue;
          return newValues;
        });
      }
    } else if (clickedValue !== '.') {
      if (inputValues[index].length < 4) {
        const newValue = inputValues[index] + clickedValue;
        setInputValues((prevValues) => {
          const newValues = [...prevValues];
          newValues[index] = newValue;
          return newValues;
        });
  
        if (newValue.length === 4) {
            handleInput(index, newValue);
        }
      }
    }
  };

  const areAllFieldsFilled = () => {
      return inputValues.every((value) => value.length === 4);
  };
  
  return(
    <div className={styles.deposit_page}>
      <Link to="/" className={styles.back}><IoIosArrowBack /></Link>
        <h1 className={styles.deposit_h1}>Deposit</h1>
        <div className={styles.card_block}>
            <p className={styles.info}>*The card data does not have to be real<br/>
                *The card data will not be saved
            </p>
            <div className={styles.input_block}>
                {inputRefs.map((inputRef, index) => (
                    <input className={styles.input_number_card} key={index} ref={inputRef} id='show_keyboard' 
                      maxLength="4" value={inputValues[index]} onChange={() => handleInput(index, inputValues[index])}
                      onFocus={() => setActiveInputIndex(index)}/>
                ))}
            </div>
            <Link to="/add_money" className={`${styles.continue} ${areAllFieldsFilled() ? styles.active : ''}`}>Continue</Link>
        </div>
        <Keyboard onButtonClick={handleButtonClick}/>
    </div>
  )
}

export default DepositPage