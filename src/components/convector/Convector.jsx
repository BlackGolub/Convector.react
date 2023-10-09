import React, { useState, useEffect, useMemo } from 'react';
import Decimal from 'decimal.js';
import styles from './Convector.module.css';
import Keyboard from './keyboard/Keyboard.jsx';
import CurrencyList from './currencylist/Currencylist';
import WalletPoint from './currencydata/CurrencyData.jsx';
import Popup from './popup/Popup';

function Convector () {
  const [inputValue, setInputValue] = useState('')
  const [selectedCurrencyTop, setSelectedCurrencyTop] = useState('RUB');
  const [selectedCurrencyBot, setSelectedCurrencyBot] = useState('USD');
  const [balance, setBalance] = useState('0');
  const [isRed, setIsRed] = useState(false);
   
  /* Значение кошелька */
  const [currencyData] = useState([
    { code: 'USD', balance: 2950, image: '/Convector.react/images/USD.png' },
    { code: 'EUR', balance: 1800, image: '/Convector.react/images/EUR.png' },
    { code: 'RUB', balance: 600000, image: '/Convector.react/images/RUB.png' },
    { code: 'GEL', balance: 39000, image: '/Convector.react/images/GEL.png' },
    { code: 'AMD', balance: 400850, image: '/Convector.react/images/AMD.png' }
  ])

  /* Локальные курсы валют */
  const course = useMemo(() => ({
    USDEUR: 1.06,
    EURUSD: 0.943612,
    RUBEUR: 0.009805,
    EURRUB: 101.99,
    GELEUR: 0.353664,
    EURGEL: 2.83,
    AMDEUR: 0.002434,
    EURAMD: 410.88,
    RUBUSD: 0.010412,
    USDRUB: 96.24,
    RUBGEL: 0.027724,
    GELRUB: 36.07,
    RUBAMD: 4.03,
    AMDGEL: 0.006882,
    GELUSD: 0.372038,
    AMDUSD: 0.002582, 
    USDGEL: 2.68,
    USDAMD: 429.14,
    GELAMD: 160.12,
    AMDRUB: 0.231755,
    USDUSD: 1,
    GELGEL: 1,
    AMDAMD: 1,
    EUREUR: 1,
    RUBRUB: 1,
  }), []);

  /* Отслеживание выбранных валют */
  const handleCurrencyChange = (currency, location) => {
    if (location === 'top') {
      setSelectedCurrencyTop(currency);
    } else if (location === 'bot') {
      setSelectedCurrencyBot(currency);
    }
  };
    
  /* Поле ввода */
  const handleButtonClick = (event) => {
    let clickedValue = event.currentTarget.getAttribute('value');
      
    if (clickedValue === 'null') {
      setInputValue((prevValue) => {
        const withoutLastChar = prevValue.slice(0, -1).replace(/ /g, '');
        return withoutLastChar.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      });
    } else if (clickedValue === '.') {
      if (inputValue.indexOf('.') === -1) {
        setInputValue((prevValue) => prevValue + clickedValue);
      }
    } else {
      const newValue = (inputValue.replace(/ /g, '') + clickedValue).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      const parts = newValue.split('.');
      if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].slice(0, 2);
      }
      setInputValue(parts.join('.'));
    }
  };

  /* Замена значения поля ввода на значение кошелька */
  useEffect(() => {
    const formattedValue = inputValue.replace(/\s/g, '');
    let numericValue = parseFloat(formattedValue);
    
    const conversionRateToUSD = course[`${selectedCurrencyTop}USD`];
    const convertedValueToUSD = numericValue * conversionRateToUSD;
    
    setIsRed(convertedValueToUSD > 40);
    
    if (numericValue > balance) {
      numericValue = balance;
      setInputValue(formatNumber(numericValue));
    }
  }, [inputValue, balance, setInputValue, selectedCurrencyTop, course]);

  /* Форматирование конвертации вывод */
  const formatNumber = (number) => {
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).replace(/,/g, ' ');
  };

  /* Конвертация */
  const convertValue = () => {
    const inputValueWithoutSpaces = inputValue.replace(/ /g, '');
    const inputValueAsNumber = parseFloat(inputValueWithoutSpaces);
      
    if (!isNaN(inputValueAsNumber)) {
      const conversionRate = course[`${selectedCurrencyTop}${selectedCurrencyBot}`];
      const originalConvertedValue = inputValueAsNumber * conversionRate;
        
      let convertedValue = originalConvertedValue;
    
      if (isRed) {
        convertedValue = new Decimal(originalConvertedValue).times(0.9999).toDecimalPlaces(2).toNumber();
      }
    
      return formatNumber(convertedValue);
    }
      
    return '';
  };

  /* Изменение значения кошелька */
  const calculateBalance = () => {
    const numericInputValue = parseFloat(inputValue.replace(/ /g, ''));
    const convertValueResult = convertValue().replace(/ /g, '');
    const numericConvertValue = parseFloat(convertValueResult);
    
    if (!isNaN(numericInputValue) && !isNaN(numericConvertValue)) {
      const selectedCurrencyTopItem = currencyData.find((item) => item.code === selectedCurrencyTop);
      const selectedCurrencyBotItem = currencyData.find((item) => item.code === selectedCurrencyBot);
      
      selectedCurrencyTopItem.balance -= numericInputValue;
      selectedCurrencyBotItem.balance += numericConvertValue

      setInputValue('');
    }
  };


  return(
    <div className={styles.content}>
      <button className={styles.back}> &#5193;</button>
      <h1>Convert</h1>
      <div className={styles.entering_currency}>
        <h2>Send</h2>
        <input className={styles.entering_left} id='show_keyboard' value={inputValue} onChange={handleButtonClick}></input>
        <CurrencyList id='top' initialSelectedCurrency="RUB" updateSelectedCurrency={(currency) => handleCurrencyChange(currency, 'top')}/>
      </div>
      <input className={styles.convert} type="checkbox" id="checkbox-convert" onChange={calculateBalance}/>
        <label htmlFor="checkbox-convert" className={styles.convert_label} id="dark">&#8645;</label>
      <div className={styles.conclusion_currency}>
        <h2>Receive</h2>
        <input className={styles.entering_left} id='show_keyboard' value={convertValue()} onChange={handleButtonClick}></input>
        <CurrencyList id='bot' initialSelectedCurrency="USD" updateSelectedCurrency={(currency) => handleCurrencyChange(currency, 'bot')}/>
      </div>
        <WalletPoint selectedCurrency={selectedCurrencyTop} setBalance={setBalance} currencyData={currencyData}/>
      <div className={styles.tax}>
        <Popup />
        <div className={`${styles.tax_lvl} ${isRed ? styles.red : ''}`}>40$</div>
      </div>
      <Keyboard onButtonClick={handleButtonClick}/>
    </div>
  )
}

export default Convector