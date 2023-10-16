import React, { useEffect } from 'react';
import styles from './Keyboard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import './Keyboard'

function Keyboard({ onButtonClick }) {
    
    useEffect(() => {
        const show_keyboard_elements = document.querySelectorAll(`[id="show_keyboard"]`);
        const keyboard = document.getElementById('show');
      
        show_keyboard_elements.forEach(show_keyboard => {
          show_keyboard.addEventListener("click", () => {
            keyboard.classList.add(styles.show, "show");
          });
        });
      
        document.addEventListener("click", (event) => {
          const clickedElement = event.target;
          if (clickedElement !== keyboard && !Array.from(show_keyboard_elements).includes(clickedElement) && !keyboard.contains(clickedElement)) {
            keyboard.classList.remove(styles.show, "show");
          }
        });
      }, []);

    return(
        <div className={styles.keyboard} id='show'>
            <div className={styles.line_digit}>
                <button className={styles.digit} value={1} onClick={onButtonClick}>1</button>
                <button className={styles.digit} value={2} onClick={onButtonClick}>2</button>
                <button className={styles.digit} value={3} onClick={onButtonClick}>3</button>
            </div>
            <div className={styles.line1}/>
            <div className={styles.line_digit}>
                <button className={styles.digit} value={4} onClick={onButtonClick}>4</button>
                <button className={styles.digit} value={5} onClick={onButtonClick}>5</button>
                <button className={styles.digit} value={6} onClick={onButtonClick}>6</button>
            </div>
            <div className={styles.line2}/>
            <div className={styles.line_digit}>
                <button className={styles.digit} value={7} onClick={onButtonClick}>7</button>
                <button className={styles.digit} value={8} onClick={onButtonClick}>8</button>
                <button className={styles.digit} value={9} onClick={onButtonClick}>9</button>
            </div>
            <div className={styles.line_digit}>
                <button className={styles.digit} value={'.'} onClick={onButtonClick}>.</button>
                <button className={styles.digit} value={0} onClick={onButtonClick}>0</button>
                <FontAwesomeIcon icon={faDeleteLeft} className={styles.digit} value={'null'} data-value={null} onClick={onButtonClick}/>
            </div>
        </div>
    )
}

export default Keyboard