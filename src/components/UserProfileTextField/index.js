import React from 'react';
import styles from './styles.module.css';
const AddUserTextField = ({ value, label }) => {
    return (
        <div className={styles.container}>
            <p className={styles.heading}>{label}</p>
            <p className={styles.textField}>{value}</p>
        </div>
    );
};

export default AddUserTextField;
