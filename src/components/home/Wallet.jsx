/* Значение кошелька */
const Wallet  = [
        { code: 'USD', full_name: 'Dollar USA', balance: 2950, image: './public/images/USD.png' },
        { code: 'EUR', full_name: 'Euro', balance: 1800, image: './public/images/EUR.png' },
        { code: 'RUB', full_name: 'Ruble', balance: 600000, image: './public/images/RUB.png' },
        { code: 'GEL', full_name: 'Lari', balance: 39000, image: './public/images/GEL.png' },
        { code: 'AMD', full_name: 'Dram', balance: 400850, image: './public/images/AMD.png' }
]


export {Wallet}

const updateBalanceForCurrency = (selectedCurrency, newBalance) => {
  const currencyIndex = Wallet.findIndex(currency => currency.code === selectedCurrency);
  if (currencyIndex !== -1) {
    Wallet[currencyIndex].balance = newBalance;
  }
}

export { updateBalanceForCurrency };

  /* Локальные курсы валют */
  const course = {
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
  }

export {course}