import React from 'react';
import styles from './header.module.css';
import { Navbar } from 'react-bootstrap';
import classnames from 'classnames';
import { Notifications } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const Header = ({ name = 'Loading' }) => {
    const userImgClass = classnames('d-inline-block', 'align-top', 'p-2');

    return (
        <Navbar className='d-flex'>
            <Navbar.Brand className='p-2'>
                <img
                    src={require('../../assets/images/logo.svg')}
                    className='d-inline-block align-top'
                    alt='logo'
                />{' '}
            </Navbar.Brand>
            <img
                src={require('../../assets/images/banner.jpg')}
                className='center d-inline-block align-top p-2 flex-grow-1'
                alt='logo'
            />
            <Navbar.Collapse className='justify-content-end justify-content-end d-flex'>
                <Notifications style={{ fontSize: 40 }} />
                <Navbar.Text className={styles.userName}>{name}</Navbar.Text>
                <Link to='/home/profile'>
                <img
                    src={require('../../assets/images/user.svg')}
                    className={userImgClass}
                    width='50'
                    alt='logo'
                />{' '}
                </Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
