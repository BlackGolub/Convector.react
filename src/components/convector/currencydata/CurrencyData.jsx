import React, { useEffect, useState } from 'react';
import styles from './CurrencyData.module.css'

function WalletPoint({ selectedCurrency, setBalance, currencyData }) {
  const [portfolioVisible, setPortfolioVisible] = useState(false);

  /* Показать баланс */
  const showBalance = () => {
    setPortfolioVisible(true);
  };

  /* Скрыть баланс */
  const closeBalance = () => {
    setPortfolioVisible(false);
  };

  /* Форматирование */
  function formatBalanceWithSpaces(balance) {
    return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
 
  /* Отображение форматированного кошелька */
  const formattedCurrencyData = currencyData.map(item => ({
    ...item,
    balance: formatBalanceWithSpaces(item.balance)
  }));

  const currency = formattedCurrencyData.find(item => item.code === selectedCurrency);

  /* Оригинальное значение кошелька */
  const originalCurrencyData = currencyData.map(item => ({
    ...item,
    balance: item.balance
  }));

  const originalCurrency = originalCurrencyData.find(item => item.code === selectedCurrency);

  /* Передача огигинального значения в родительсктй компонент */
  useEffect(()=>{
    setBalance(originalCurrency.balance)
  }, [originalCurrency, setBalance])
  

  if (!currency) {
    return null;
  }


  return (
    <div className={styles.wallet}>
      <h3 onClick={showBalance}>Available Portfolio</h3>
      {portfolioVisible && (
            <div>
                <div className={styles.wallet_blackout}></div>
                  <div className={styles.wallet_content}>
                    <h5 className={styles.wallet_heading}>Wallet Balance</h5>
                    <div className={styles.wallet_balance}>
                      {currencyData.map((currency, index) => (
                        <div className={styles.currency_balance} key={index}>
                          <img src={currency.image} className={styles.icon} alt={currency.code} />
                          <p>{currency.code} :</p>
                          <p>{formatBalanceWithSpaces(currency.balance)}</p>
                        </div>
                      ))}
                    </div>
                    <button onClick={closeBalance} className={styles.button_balance}>Close</button>
                  </div>
            </div>
        )}
      <div className={styles.wallet_point}>
        <img src={currency.image} className={styles.icon} alt={currency.code} />
        <div className={styles.balance}>{currency.balance}</div>
        <div className={styles.currency}>{selectedCurrency}</div>
      </div>
    </div>
  );
}

export default WalletPoint;