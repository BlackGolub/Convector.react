import React, { useState, useEffect } from 'react';
import styles from './Currencylist.module.css';

const CurrencyList = ({ id, initialSelectedCurrency, updateSelectedCurrency }) => {
  const [showList, setShowList] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(initialSelectedCurrency);
  
  const currencies = ['USD', 'EUR', 'RUB', 'GEL', 'AMD'];

  /* Исключение выбранного элемента */
  const filteredCurrencies = currencies.filter(currency => currency !== selectedCurrency);

 /* Разворот стрелки */
  const toggleRotated = (labelId) => {
    const label = document.getElementById(labelId);
      if (label) {
        label.classList.toggle(styles.rotated);
      }
  };

  /* Показать список, повернуть стрелку */
  const handleCheckboxChange = () => {
    setShowList(!showList);
    toggleRotated(`label-${id}`)
  };
  
 /* Скрыть список, обновить элемент, повернуть стрелку*/
  const handleCurrencySelect = (currencyCode) => {
    setSelectedCurrency(currencyCode);
    handleCheckboxChange();
    updateSelectedCurrency(currencyCode)
  };

  /* Скрытие списка при клике */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showList) {
        const componentElement = document.getElementById(id);
        if (componentElement && !componentElement.contains(event.target)) {
          setShowList(false);
          toggleRotated(`label-${id}`);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showList, id]);

  return (
      <div className={styles.entering_rite} id={id}>
        <div className={styles.currency} id={`currency-${id}`}>{selectedCurrency}</div>
        <ul  id={`ul-${id}`} className={showList ? styles.show_list : ''}>
          {filteredCurrencies.map(currency => (
            <li key={currency} onClick={() => handleCurrencySelect(currency)}>{currency}</li>
          ))}
        </ul>
        <input className={styles.checkbox} type="checkbox" id={`checkbox-${id}`} onChange={handleCheckboxChange}/>
        <label htmlFor={`checkbox-${id}`} className={styles.label} id={`label-${id}`}>&#5167;</label>
      </div>
  );
};

export default CurrencyList;