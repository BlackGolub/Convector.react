import React, { useState } from 'react';
import styles from './Popup.module.css'

function Popup() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const showPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div>
      <h3>Exchange free</h3>
      <h4 onClick={showPopup}>Read terms and conditions</h4>
        
      {isPopupVisible && (
        <div>
          <div className={styles.popup_blackout}></div>
          <div className={styles.popup_content}>
            <h5 className={styles.popup_heading}>Terms of exchange</h5>
            <p className={styles.popup_text}>Currency conversion operations up to
               $40 are performed without commission.
               Transactions exceeding $40 will be
               subject to a commission of 0.01%</p>
            <button onClick={closePopup} className={styles.button_popup}>Close</button>    
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;