import React from 'react';
import styles from './style.module.css';

const CTAButton = ({ heading = null, style = null, onPress }) => {
    return (
        <button
            onClick={() => onPress()}
            className={[styles.btnStyle, style].join(' ')}
        >
            {heading}
        </button>
    );
};

export default CTAButton;
